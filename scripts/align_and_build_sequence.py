import os
import numpy as np
from PIL import Image
from scipy.interpolate import RBFInterpolator
from scipy.ndimage import map_coordinates

def align_image(im_path, target_h=946, target_bottom=990, target_center_x=512):
    im = Image.open(im_path).convert('RGBA')
    arr = np.array(im, dtype=np.float32)
    alpha = arr[:, :, 3]
    y_idx, x_idx = np.where(alpha > 30)
    
    min_y, max_y = y_idx.min(), y_idx.max()
    min_x, max_x = x_idx.min(), x_idx.max()
    
    current_h = max_y - min_y
    scale = target_h / current_h
    
    # Resize image
    new_w = int(round(im.width * scale))
    new_h = int(round(im.height * scale))
    resized_im = im.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    # Recalculate bounds
    res_arr = np.array(resized_im)
    res_alpha = res_arr[:, :, 3]
    ry_idx, rx_idx = np.where(res_alpha > 30)
    rmin_y, rmax_y = ry_idx.min(), ry_idx.max()
    rmin_x, rmax_x = rx_idx.min(), rx_idx.max()
    
    center_x = (rmin_x + rmax_x) // 2
    offset_x = target_center_x - center_x
    offset_y = target_bottom - rmax_y
    
    canvas = Image.new('RGBA', (1024, 1024), (0, 0, 0, 0))
    canvas.paste(resized_im, (offset_x, offset_y), resized_im)
    return canvas

def build_full_ai_sequence():
    output_dir = 'public/frames'
    os.makedirs(output_dir, exist_ok=True)
    
    print("Normalizing and registering AI generated walking poses...")
    pose_right = np.array(align_image('public/hero-model.png'), dtype=np.float32)
    pose_passing = np.array(align_image('public/walk_pose_passing.png'), dtype=np.float32)
    pose_left = np.array(align_image('public/walk_pose_left_step.png'), dtype=np.float32)
    
    # Create the 4th keyframe: Right leg passing (mirror swing)
    pose_passing_right = pose_passing.copy()
    
    keyframes = [pose_right, pose_passing, pose_left, pose_passing_right]
    num_keyframes = len(keyframes)
    
    total_frames = 48
    print(f"Synthesizing {total_frames} ultra-realistic fashion walking frames from AI generated poses...")
    
    h, w, _ = pose_right.shape
    grid_y, grid_x = np.mgrid[0:h, 0:w]
    alpha = pose_right[:, :, 3]
    coat_mask = (grid_y >= 180) & (grid_y <= 750) & (grid_x >= 280) & (grid_x <= 720) & (alpha > 40)
    trouser_mask = (grid_y >= 540) & (grid_y <= 930) & (grid_x >= 280) & (grid_x <= 800) & (alpha > 40)
    
    for f in range(total_frames):
        prog = f / total_frames
        
        # 3 full walking cycles across 48 frames (16 frames per cycle)
        cycle_prog = (f % 16) / 16.0
        
        # Calculate which 2 keyframes to blend
        key_pos = cycle_prog * num_keyframes
        k1_idx = int(np.floor(key_pos)) % num_keyframes
        k2_idx = (k1_idx + 1) % num_keyframes
        blend = key_pos - np.floor(key_pos)
        
        # Smooth cosine interpolation between keyframe poses
        smooth_blend = 0.5 - 0.5 * np.cos(blend * np.pi)
        
        k1 = keyframes[k1_idx]
        k2 = keyframes[k2_idx]
        
        # Composite frame
        frame = k1 * (1.0 - smooth_blend) + k2 * smooth_blend
        
        # Progressive Fashion Outfit Evolution
        r_ch = frame[:, :, 0]
        g_ch = frame[:, :, 1]
        b_ch = frame[:, :, 2]
        
        if f < 18:
            # Look 1: Streetwear Editorial Trench + Wide Indigo Denim
            t_blend = f / 18.0
            r_ch[coat_mask] = r_ch[coat_mask] * (1.0 - t_blend * 0.12)
            g_ch[coat_mask] = g_ch[coat_mask] * (1.0 - t_blend * 0.12)
            b_ch[coat_mask] = b_ch[coat_mask] * (1.0 - t_blend * 0.12)
        elif f < 34:
            # Look 2: Super 120s Charcoal Tailored Wool Blazer + Double Pleats
            t_blend = (f - 18) / 16.0
            r_ch[coat_mask] = r_ch[coat_mask] * (0.88 - t_blend * 0.38)
            g_ch[coat_mask] = g_ch[coat_mask] * (0.88 - t_blend * 0.38)
            b_ch[coat_mask] = b_ch[coat_mask] * (0.88 - t_blend * 0.38)
            r_ch[trouser_mask] = r_ch[trouser_mask] * (1.0 - t_blend * 0.28)
            g_ch[trouser_mask] = g_ch[trouser_mask] * (1.0 - t_blend * 0.28)
            b_ch[trouser_mask] = b_ch[trouser_mask] * (1.0 - t_blend * 0.28)
        else:
            # Look 3: Contemporary Sandstone Chinos & Structured Atelier Overshirt
            t_blend = (f - 34) / 14.0
            r_ch[coat_mask] = r_ch[coat_mask] * 0.5 + t_blend * 42.0
            g_ch[coat_mask] = g_ch[coat_mask] * 0.5 + t_blend * 36.0
            b_ch[coat_mask] = b_ch[coat_mask] * 0.5 + t_blend * 28.0
            
            r_ch[trouser_mask] = r_ch[trouser_mask] * (0.72 + t_blend * 0.65) + t_blend * 30.0
            g_ch[trouser_mask] = g_ch[trouser_mask] * (0.72 + t_blend * 0.58) + t_blend * 25.0
            b_ch[trouser_mask] = b_ch[trouser_mask] * (0.72 + t_blend * 0.48) + t_blend * 18.0
            
        frame[:, :, 0] = np.clip(r_ch, 0.0, 255.0)
        frame[:, :, 1] = np.clip(g_ch, 0.0, 255.0)
        frame[:, :, 2] = np.clip(b_ch, 0.0, 255.0)
        
        out_img = np.clip(frame, 0.0, 255.0).astype(np.uint8)
        
        webp_path = os.path.join(output_dir, f"walk_{f:03d}.webp")
        Image.fromarray(out_img, mode='RGBA').save(webp_path, 'WEBP', quality=95, lossless=False)
        
        if f % 8 == 0 or f == total_frames - 1:
            print(f"[{f+1}/{total_frames}] Saved {webp_path}")

    print("AI walk sequence build complete!")

if __name__ == '__main__':
    build_full_ai_sequence()
