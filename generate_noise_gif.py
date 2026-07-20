import os
import random
from PIL import Image, ImageDraw

def generate_noise_frame(width, height):
    img = Image.new('L', (width, height))
    pixels = img.load()
    for y in range(height):
        for x in range(width):
            pixels[x, y] = random.randint(0, 255)
            
    # Add scanline effect
    draw = ImageDraw.Draw(img)
    for y in range(0, height, 4):
        draw.line([(0, y), (width, y)], fill=0, width=1)
        
    return img

print("Generating noise frames...")
frames = [generate_noise_frame(128, 128) for _ in range(4)]

out_path = os.path.join("public", "noise.gif")
frames[0].save(
    out_path,
    save_all=True,
    append_images=frames[1:],
    optimize=True,
    duration=80,  # fast flicker
    loop=0
)
print(f"Saved to {out_path}")
