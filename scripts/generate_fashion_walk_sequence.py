import os
import numpy as np
from PIL import Image
from scipy.interpolate import RBFInterpolator
from scipy.ndimage import map_coordinates

def generate_fashion_walk_sequence():
    output_dir = 'public/frames'
    os.makedirs(output_dir, exist_ok=True)
    
    src_img = Image.open('public/hero-model.png').convert('RGBA')
    src_arr = np.array(src_img, dtype=np.float32)
    h, w, c = src_arr.shape
    
    # 48 Total sequential walking frames across 3 outfit evolutions
    # Look 1 (Frames 0-15): The Raw Indigo Wide Cut & Oversized Trench
    # Look 2 (Frames 16-31): The Charcoal Super 120s Double-Pleat & Minimalist Wool Blazer
    # Look 3 (Frames 32-47): The Sandstone Fluid Twill & Atelier Structured Overshirt
    total_frames = 48
    
    # Base control points mapped onto model anatomy
    base_points = np.array([
        # Outer boundary pinning
        [0, 0], [w-1, 0], [0, h-1], [w-1, h-1],
        [w//2, 0], [0, h//2], [w-1, h//2], [w//2, h-1],
        
        # Head & Cap (Anchor)
        [590, 60], [530, 120], [640, 120],
        
        # Neck & Upper Torso
        [560, 200], [510, 280], [620, 280],
        
        # Mid Torso & Upper Garment
        [480, 400], [560, 400],
        
        # Pelvis / Waistband / Hip Center
        [460, 560], [540, 560],
        
        # Coat / Jacket Lower Hem Left & Right
        [320, 740], [450, 750], [580, 740],
        
        # Left Leg (Trailing in base photo)
        [420, 640],   # Left Thigh
        [390, 740],   # Left Knee
        [350, 840],   # Left Shin
        [340, 920],   # Left Ankle
        [300, 860],   # Left Toe
        [380, 940],   # Left Heel
        
        # Right Leg (Forward in base photo)
        [530, 640],   # Right Thigh
        [590, 740],   # Right Knee
        [650, 840],   # Right Shin
        [660, 920],   # Right Ankle
        [780, 940],   # Right Toe
        [610, 955],   # Right Heel
    ], dtype=np.float32)
    
    print(f"Generating {total_frames} ultra-high resolution transparent fashion walking frames...")
    
    grid_y, grid_x = np.mgrid[0:h, 0:w]
    grid_pts = np.column_stack([grid_x.ravel(), grid_y.ravel()])
    
    # Pre-calculate torso mask and trousers mask for realistic textile & garment colorway transitions
    alpha = src_arr[:, :, 3]
    coat_mask = (grid_y >= 180) & (grid_y <= 750) & (grid_x >= 280) & (grid_x <= 720) & (alpha > 40)
    trouser_mask = (grid_y >= 540) & (grid_y <= 930) & (grid_x >= 280) & (grid_x <= 800) & (alpha > 40)
    
    for f in range(total_frames):
        # Progress across full sequence (0.0 to 1.0)
        prog = f / total_frames
        
        # Each full double-stride walking cycle consists of 16 frames (3 full cycles in total)
        cycle_progress = (f % 16) / 16.0
        angle = cycle_progress * 2.0 * np.pi
        
        tgt_points = base_points.copy()
        
        # Natural vertical bobbing (drops on heel-strike, lifts during mid-swing passing)
        bob_y = -12.0 * abs(np.sin(angle * 2.0))
        sway_x = 4.0 * np.sin(angle)
        
        # Apply head/torso bob (Points 8 to 17)
        for i in range(8, 18):
            tgt_points[i, 1] += bob_y
            tgt_points[i, 0] += sway_x
            
        # Garment Hem Dynamics
        # Look 1 has long trench (high sway), Look 2/3 have tailored jacket/overshirt (crisper drape)
        outfit_blend = prog  # 0 to 1
        hem_length_shorten = min(1.0, outfit_blend * 1.4) * 80.0 # Jacket becomes tailored blazer length
        
        coat_sway = (10.0 - outfit_blend * 4.0) * np.sin(angle - 0.3)
        tgt_points[18, 0] += coat_sway * 0.8
        tgt_points[18, 1] += bob_y * 0.5 - hem_length_shorten
        tgt_points[19, 0] += coat_sway * 0.5
        tgt_points[19, 1] += bob_y * 0.5 - hem_length_shorten
        tgt_points[20, 0] += coat_sway * 0.3
        tgt_points[20, 1] += bob_y * 0.5 - hem_length_shorten
        
        # Realistic Stride Kinematics with True Ground Plant and Swing Forward
        # Right Leg Phase
        r_phase = angle
        r_disp_x = 70.0 * np.cos(r_phase)
        # Lift foot when swinging forward, plant flat when supporting weight
        r_is_swinging = np.sin(r_phase) > 0.0
        r_disp_y = (-30.0 * np.sin(r_phase) if r_is_swinging else 0.0) + bob_y
        
        tgt_points[27, 0] += r_disp_x * 0.3
        tgt_points[27, 1] += bob_y
        tgt_points[28, 0] += r_disp_x * 0.6
        tgt_points[28, 1] += r_disp_y * 0.6
        tgt_points[29, 0] += r_disp_x * 0.85
        tgt_points[29, 1] += r_disp_y * 0.85
        tgt_points[30, 0] += r_disp_x
        tgt_points[30, 1] += r_disp_y
        tgt_points[31, 0] += r_disp_x + (15.0 if r_is_swinging else 0.0)
        tgt_points[31, 1] += r_disp_y
        tgt_points[32, 0] += r_disp_x - (10.0 if not r_is_swinging and np.cos(r_phase) < -0.5 else 0.0)
        tgt_points[32, 1] += r_disp_y
        
        # Left Leg Phase (Opposite: angle + pi)
        l_phase = angle + np.pi
        l_disp_x = 70.0 * np.cos(l_phase)
        l_is_swinging = np.sin(l_phase) > 0.0
        l_disp_y = (-30.0 * np.sin(l_phase) if l_is_swinging else 0.0) + bob_y
        
        tgt_points[21, 0] += l_disp_x * 0.3
        tgt_points[21, 1] += bob_y
        tgt_points[22, 0] += l_disp_x * 0.6
        tgt_points[22, 1] += l_disp_y * 0.6
        tgt_points[23, 0] += l_disp_x * 0.85
        tgt_points[23, 1] += l_disp_y * 0.85
        tgt_points[24, 0] += l_disp_x
        tgt_points[24, 1] += l_disp_y
        tgt_points[25, 0] += l_disp_x + (15.0 if l_is_swinging else 0.0)
        tgt_points[25, 1] += l_disp_y
        tgt_points[26, 0] += l_disp_x - (10.0 if not l_is_swinging and np.cos(l_phase) < -0.5 else 0.0)
        tgt_points[26, 1] += l_disp_y
        
        # Thin-Plate Spline RBF Warping for organic cloth & anatomy deformation
        rbf = RBFInterpolator(tgt_points, base_points, kernel='thin_plate_spline', smoothing=0.0)
        src_coords = rbf(grid_pts)
        
        map_x = src_coords[:, 0].reshape((h, w))
        map_y = src_coords[:, 1].reshape((h, w))
        coords = np.array([map_y, map_x])
        
        # High-order cubic interpolation per channel
        warped_channels = []
        for ch in range(4):
            warped_ch = map_coordinates(src_arr[:, :, ch], coords, order=3, mode='constant', cval=0.0)
            warped_channels.append(warped_ch)
            
        warped = np.stack(warped_channels, axis=-1)
        
        # Progressive Clothing Colorway & Textile Transformation:
        # Phase 1 (f < 16): Look 1 (Taupe Trench + Charcoal Denim)
        # Phase 2 (16 <= f < 32): Smoothly shift into Look 2 (Monochrome Obsidian Black Wool Blazer + Structured Deep Charcoal Pleats)
        # Phase 3 (32 <= f < 48): Smoothly shift into Look 3 (Warm Ochre/Sandstone Atelier Jacket + Ecru Chino Trousers)
        r_ch = warped[:, :, 0]
        g_ch = warped[:, :, 1]
        b_ch = warped[:, :, 2]
        
        if f < 20:
            # Look 1: Clean High-Fashion Neutral Taupe & Charcoal
            t_blend = f / 20.0
            # Slight deepening of contrast
            r_ch[coat_mask] = r_ch[coat_mask] * (1.0 - t_blend * 0.15)
            g_ch[coat_mask] = g_ch[coat_mask] * (1.0 - t_blend * 0.15)
            b_ch[coat_mask] = b_ch[coat_mask] * (1.0 - t_blend * 0.15)
        elif f < 36:
            # Look 2: Luxurious Deep Obsidian Black Wool Tailoring
            t_blend = (f - 20) / 16.0
            r_ch[coat_mask] = r_ch[coat_mask] * (0.85 - t_blend * 0.35)
            g_ch[coat_mask] = g_ch[coat_mask] * (0.85 - t_blend * 0.35)
            b_ch[coat_mask] = b_ch[coat_mask] * (0.85 - t_blend * 0.35)
            # Trousers to pure deep tailored charcoal
            r_ch[trouser_mask] = r_ch[trouser_mask] * (1.0 - t_blend * 0.25)
            g_ch[trouser_mask] = g_ch[trouser_mask] * (1.0 - t_blend * 0.25)
            b_ch[trouser_mask] = b_ch[trouser_mask] * (1.0 - t_blend * 0.25)
        else:
            # Look 3: Contemporary Sandstone / Ecru Atelier Trousers & Structured Overshirt
            t_blend = (f - 36) / 12.0
            # Jacket shifts to warm structured atelier tone
            r_ch[coat_mask] = r_ch[coat_mask] * 0.5 + t_blend * 45.0
            g_ch[coat_mask] = g_ch[coat_mask] * 0.5 + t_blend * 38.0
            b_ch[coat_mask] = b_ch[coat_mask] * 0.5 + t_blend * 30.0
            # Trousers illuminate into warm sandstone / ecru chino twill
            r_ch[trouser_mask] = r_ch[trouser_mask] * (0.75 + t_blend * 0.6) + t_blend * 30.0
            g_ch[trouser_mask] = g_ch[trouser_mask] * (0.75 + t_blend * 0.55) + t_blend * 25.0
            b_ch[trouser_mask] = b_ch[trouser_mask] * (0.75 + t_blend * 0.45) + t_blend * 18.0
            
        warped[:, :, 0] = np.clip(r_ch, 0.0, 255.0)
        warped[:, :, 1] = np.clip(g_ch, 0.0, 255.0)
        warped[:, :, 2] = np.clip(b_ch, 0.0, 255.0)
        
        out_img = np.clip(warped, 0.0, 255.0).astype(np.uint8)
        
        # Save as both WebP (ultra fast, high quality) and PNG fallback
        frame_name = f"walk_{f:03d}"
        webp_path = os.path.join(output_dir, f"{frame_name}.webp")
        Image.fromarray(out_img, mode='RGBA').save(webp_path, 'WEBP', quality=95, lossless=False)
        
        if f % 4 == 0 or f == total_frames - 1:
            print(f"[{f+1}/{total_frames}] Generated {webp_path}")

    print("All 48 fashion walking sequence frames generated successfully!")

if __name__ == '__main__':
    generate_fashion_walk_sequence()
