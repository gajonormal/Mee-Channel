import os
from PIL import Image, ImageDraw

width = 256
height = 600  # Multiplo de 150
frames = []

for frame_idx in range(60): # 60 frames for smooth 4s animation
    # RGBA for transparency
    img = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # 1. Scanlines (black 2px, transparent 2px)
    for y in range(0, height, 4):
        # 2px black line with some opacity
        draw.line([(0, y), (width, y)], fill=(0, 0, 0, 50), width=2)
        
    # 2. Moving tracking bar (simulating the 150px repeating gradient)
    # offset moves from 0 to 150 over the frames
    offset_y = int((frame_idx / 60.0) * 150)
    
    for repeat_y in range(-150, height, 150):
        base_y = repeat_y + offset_y
        
        # transparent 0-100, darker 100-120, darkest 120-130, fade 130-150
        for dy in range(150):
            y_pos = base_y + dy
            if 0 <= y_pos < height:
                alpha = 0
                if 100 <= dy < 120:
                    alpha = int(((dy - 100) / 20.0) * 60)
                elif 120 <= dy <= 130:
                    alpha = 60
                elif 130 < dy <= 150:
                    alpha = int(((150 - dy) / 20.0) * 60)
                
                if alpha > 0:
                    draw.line([(0, y_pos), (width, y_pos)], fill=(0, 0, 0, alpha), width=1)
                    
    # 3. Flicker
    # tv-flicker 0.7s. If 60 frames = 4s (15fps), 0.7s is ~10 frames.
    if frame_idx % 10 < 5:
        # Slight opacity dip
        flicker_layer = Image.new('RGBA', (width, height), (0, 0, 0, 10))
        img = Image.alpha_composite(img, flicker_layer)
        
    frames.append(img)

out_path = os.path.join("public", "tv_animation.webp")
frames[0].save(
    out_path,
    save_all=True,
    append_images=frames[1:],
    duration=66, # ~15 fps
    loop=0,
    format="WEBP"
)
print(f"Saved to {out_path}")
