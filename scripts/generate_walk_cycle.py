import os
import numpy as np
from PIL import Image
from scipy.interpolate import RBFInterpolator
from scipy.ndimage import map_coordinates

def generate_walk_frames():
    os.makedirs('public/walk', exist_ok=True)
    
    src_img = Image.open('public/hero-model.png').convert('RGBA')
    src_arr = np.array(src_img, dtype=np.float32)
    h, w, c = src_arr.shape
    
    # Define control points (x, y) on source image
    # In base photo: model is walking right.
    # Right leg is forward, Left leg is trailing back.
    base_points = np.array([
        # Outer boundary pinning to prevent image edge drift
        [0, 0], [w-1, 0], [0, h-1], [w-1, h-1],
        [w//2, 0], [0, h//2], [w-1, h//2], [w//2, h-1],
        
        # Head & Cap (Anchor)
        [590, 60], [530, 120], [640, 120],
        
        # Neck & Upper Torso
        [560, 200], [510, 280], [620, 280],
        
        # Mid Torso & Coat Upper
        [480, 400], [560, 400],
        
        # Pelvis / Hip Center
        [460, 560], [540, 560],
        
        # Coat Hem Left & Right
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
    
    num_frames = 16
    print(f"Generating {num_frames} ultra-high resolution transparent walking frames...")
    
    # Precompute output grid
    grid_y, grid_x = np.mgrid[0:h, 0:w]
    grid_pts = np.column_stack([grid_x.ravel(), grid_y.ravel()])
    
    for f in range(num_frames):
        t = f / num_frames
        angle = t * 2.0 * np.pi
        
        tgt_points = base_points.copy()
        
        # Torso vertical bob (two natural bounces per full stride cycle)
        bob_y = -10.0 * abs(np.sin(angle * 2.0))
        sway_x = 3.5 * np.sin(angle)
        
        # Apply head/torso bob (Points 8 to 17)
        for i in range(8, 18):
            tgt_points[i, 1] += bob_y
            tgt_points[i, 0] += sway_x
            
        # Coat Hem drag & sway
        coat_sway = 10.0 * np.sin(angle - 0.3)
        tgt_points[18, 0] += coat_sway * 0.8
        tgt_points[18, 1] += bob_y * 0.5
        tgt_points[19, 0] += coat_sway * 0.5
        tgt_points[19, 1] += bob_y * 0.5
        tgt_points[20, 0] += coat_sway * 0.3
        tgt_points[20, 1] += bob_y * 0.5
        
        # Leg 1 (Right Leg) Stride Trajectory
        r_phase = angle
        # In base image, right leg is at extreme forward (+1.0 phase)
        r_disp_x = 65.0 * np.cos(r_phase)
        r_disp_y = -24.0 * max(0.0, np.sin(r_phase)) + bob_y
        
        tgt_points[27, 0] += r_disp_x * 0.3
        tgt_points[27, 1] += bob_y
        tgt_points[28, 0] += r_disp_x * 0.6
        tgt_points[28, 1] += r_disp_y * 0.5
        tgt_points[29, 0] += r_disp_x * 0.85
        tgt_points[29, 1] += r_disp_y * 0.8
        tgt_points[30, 0] += r_disp_x
        tgt_points[30, 1] += r_disp_y
        tgt_points[31, 0] += r_disp_x
        tgt_points[31, 1] += r_disp_y
        tgt_points[32, 0] += r_disp_x
        tgt_points[32, 1] += r_disp_y
        
        # Leg 2 (Left Leg) Stride Trajectory - Opposite Phase
        l_phase = angle + np.pi
        l_disp_x = 65.0 * np.cos(l_phase)
        l_disp_y = -24.0 * max(0.0, np.sin(l_phase)) + bob_y
        
        tgt_points[21, 0] += l_disp_x * 0.3
        tgt_points[21, 1] += bob_y
        tgt_points[22, 0] += l_disp_x * 0.6
        tgt_points[22, 1] += l_disp_y * 0.5
        tgt_points[23, 0] += l_disp_x * 0.85
        tgt_points[23, 1] += l_disp_y * 0.8
        tgt_points[24, 0] += l_disp_x
        tgt_points[24, 1] += l_disp_y
        tgt_points[25, 0] += l_disp_x
        tgt_points[25, 1] += l_disp_y
        tgt_points[26, 0] += l_disp_x
        tgt_points[26, 1] += l_disp_y
        
        # Thin-Plate Spline RBF
        rbf = RBFInterpolator(tgt_points, base_points, kernel='thin_plate_spline', smoothing=0.0)
        src_coords = rbf(grid_pts)
        
        map_x = src_coords[:, 0].reshape((h, w))
        map_y = src_coords[:, 1].reshape((h, w))
        coords = np.array([map_y, map_x])
        
        # Map each RGBA channel with high-order cubic interpolation
        warped_channels = []
        for ch in range(4):
            warped_ch = map_coordinates(src_arr[:, :, ch], coords, order=3, mode='constant', cval=0.0)
            warped_channels.append(warped_ch)
            
        warped = np.stack(warped_channels, axis=-1)
        out_img = np.clip(warped, 0.0, 255.0).astype(np.uint8)
        
        frame_path = f"public/walk/frame_{f:02d}.png"
        Image.fromarray(out_img, mode='RGBA').save(frame_path, optimize=True)
        print(f"[{f+1}/{num_frames}] Generated {frame_path}")

    print("Successfully generated all 16 walk frames!")

if __name__ == '__main__':
    generate_walk_frames()
