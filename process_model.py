import sys
import os
from PIL import Image, ImageFilter, ImageOps
import numpy as np

# Load source image
src_path = r"C:\Users\jeshu\.gemini\antigravity\brain\66c1835a-2971-427d-aa2a-6e073a7e11b4\.user_uploaded\media_1787034187746.jpg"
orig = Image.open(src_path).convert("RGBA")
w, h = orig.size

# The walking model is in the top hero section:
# x: ~225 to ~445, y: ~65 to ~425 (in 608x1024)
crop_box = (int(w * 0.36), int(h * 0.065), int(w * 0.72), int(h * 0.415))
crop = orig.crop(crop_box)

arr = np.array(crop, dtype=np.float32)
r, g, b, a = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2], arr[:, :, 3]

# The studio background is an off-white/light grey color around rgb(220..240, 220..240, 220..240)
# Background has high brightness (r+g+b)/3 > 212 and low saturation
brightness = (r + g + b) / 3.0
saturation = np.max(arr[:, :, :3], axis=2) - np.min(arr[:, :, :3], axis=2)

# The model's skin, cap, coat (grey/brown/dark), pants (dark), shoes are distinct
# Shoes are light grey/white near the bottom, so let's handle the bottom carefully
mask = np.ones((crop.height, crop.width), dtype=np.uint8) * 255

# Background is bright and unsaturated
is_bg = (brightness > 210) & (saturation < 18)

# The letters 'GAZU' were behind the person (very dark letters outside the body).
# The person occupies the central column of the crop (from x ~ 25 to ~185 in cropped coordinates)
cw, ch = crop.width, crop.height
for y in range(ch):
    for x in range(cw):
        # Far edges outside person
        if x < int(cw * 0.12) and y < int(ch * 0.85):
            mask[y, x] = 0
        elif x > int(cw * 0.88) and y < int(ch * 0.75):
            mask[y, x] = 0
        elif is_bg[y, x]:
            mask[y, x] = 0

# Convert mask to image and smooth edges for anti-aliasing
mask_img = Image.fromarray(mask).filter(ImageFilter.GaussianBlur(1.0))

# Apply mask as alpha channel
result = crop.copy()
result.putalpha(mask_img)

# Save high-res cutout PNG
output_path = r"c:\Users\jeshu\OneDrive\Desktop\Surfer\public\hero-model.png"
result.save(output_path, "PNG")
print(f"Successfully saved transparent cutout PNG to {output_path} (size: {result.size})")
