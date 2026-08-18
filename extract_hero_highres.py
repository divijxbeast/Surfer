from PIL import Image

src_path = r"C:\Users\jeshu\.gemini\antigravity\brain\66c1835a-2971-427d-aa2a-6e073a7e11b4\.user_uploaded\media_1787034187746.jpg"
orig = Image.open(src_path)
w, h = orig.size

# Crop the walking model cleanly from the user's reference image
# Top: cap (y ~ 65), Bottom: shoes (y ~ 410), Left: x ~ 230, Right: x ~ 430
crop_box = (int(w * 0.38), int(h * 0.065), int(w * 0.70), int(h * 0.415))
crop = orig.crop(crop_box)

# Save uncompressed PNG
out_path = r"c:\Users\jeshu\OneDrive\Desktop\Surfer\public\hero-reference.png"
crop.save(out_path, "PNG")
print("Saved uncompressed hero reference image to", out_path)
