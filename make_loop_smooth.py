import os
from PIL import Image

def boomerang_gif(input_path, output_path):
    print(f"Opening {input_path}...")
    img = Image.open(input_path)
    
    frames = []
    try:
        while True:
            # We must copy the frame because img will change on seek()
            frames.append(img.copy())
            img.seek(img.tell() + 1)
    except EOFError:
        pass # End of sequence
        
    print(f"Loaded {len(frames)} frames. Creating boomerang sequence...")
    
    # Create boomerang by adding the reverse sequence, omitting the first and last frames to avoid stalling
    boomerang_frames = frames + frames[-2:0:-1]
    
    duration = img.info.get('duration', 70)
    print(f"Original duration per frame: {duration}ms")
    
    print(f"Saving {len(boomerang_frames)} frames to {output_path}...")
    boomerang_frames[0].save(
        output_path,
        save_all=True,
        append_images=boomerang_frames[1:],
        optimize=True,
        duration=duration,
        loop=0
    )
    print("Done!")

if __name__ == "__main__":
    input_gif = os.path.join("public", "empty.gif")
    output_gif = os.path.join("public", "empty_smooth.gif")
    boomerang_gif(input_gif, output_gif)
