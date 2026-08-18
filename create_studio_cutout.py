import urllib.request
import io
from PIL import Image, ImageFilter, ImageOps, ImageEnhance
import numpy as np

# High-resolution studio menswear model walking in coat and tailored trousers
url = 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=90&w=1800&auto=format&fit=crop'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as resp:
        data = resp.read()
    img = Image.open(io.BytesIO(data)).convert('RGBA')
    print('Loaded HD model:', img.size)

    # In this studio photo, the background is a smooth studio backdrop
    # Let's compute high-precision alpha mask
    arr = np.array(img, dtype=np.float32)
    r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
    
    # Calculate background color from perimeter
    top_border = arr[:20, :, :3].mean(axis=(0, 1))
    left_border = arr[:, :20, :3].mean(axis=(0, 1))
    right_border = arr[:, -20:, :3].mean(axis=(0, 1))
    bg_color = (top_border + left_border + right_border) / 3.0
    print('Studio BG Color:', bg_color)
    
    # Distance from studio background
    dist = np.sqrt((r - bg_color[0])**2 + (g - bg_color[1])**2 + (b - bg_color[2])**2)
    
    # Sigmoidal smooth alpha transition for ultra-clean commercial look
    alpha = np.clip((dist - 14.0) / 18.0, 0.0, 1.0) * 255.0
    
    # Feather and apply
    mask_img = Image.fromarray(alpha.astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.8))
    img.putalpha(mask_img)
    
    # Save as hero-model-hd.png
    out_path = r'c:\Users\jeshu\OneDrive\Desktop\Surfer\public\hero-model-hd.png'
    img.save(out_path, 'PNG')
    print('Successfully saved studio HD model to', out_path)
except Exception as e:
    print('Error:', e)
