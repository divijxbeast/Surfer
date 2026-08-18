import urllib.request
import io
from PIL import Image
import rembg

# High-resolution luxury menswear model walking in long dark trench coat & tailored relaxed trousers
url = 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=90&w=1600&auto=format&fit=crop'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
print('Fetching high-res model image...')
with urllib.request.urlopen(req) as resp:
    data = resp.read()

img = Image.open(io.BytesIO(data)).convert('RGB')
print('Image loaded, dimensions:', img.size)

# Run rembg to extract flawless transparent cutout
print('Running AI background segmentation...')
cutout = rembg.remove(img)

# Save as hero-model.png in public
out_path = r'c:\Users\jeshu\OneDrive\Desktop\Surfer\public\hero-model.png'
cutout.save(out_path, 'PNG')
print('Successfully saved razor-sharp transparent hero-model.png!')
