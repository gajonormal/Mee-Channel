import os
from PIL import Image, ImageDraw, ImageFilter

height = 150
width = 100

# Create an RGBA image
img = Image.new('RGBA', (width, height), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)

# Recreate the exact CSS gradient:
# transparent 0px to 100px
# rgba(0,0,0,25) (which is 0.1 alpha) from 120px to 130px
for y in range(height):
    alpha = 0
    if 100 <= y < 120:
        alpha = int(((y - 100) / 20.0) * 25)
    elif 120 <= y <= 130:
        alpha = 25
    elif 130 < y <= 150:
        alpha = int(((150 - y) / 20.0) * 25)
        
    draw.line([(0, y), (width, y)], fill=(0, 0, 0, alpha), width=1)

# Apply the exact 4px Gaussian blur the user wants
img_blurred = img.filter(ImageFilter.GaussianBlur(radius=4))

# Save to public directory
out_path = os.path.join("public", "scroll-bar.png")
img_blurred.save(out_path)
print(f"Saved blurred scroll bar to {out_path}")
