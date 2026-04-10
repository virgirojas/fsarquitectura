from PIL import Image
import sys

def remove_white(src_path, dest_path):
    print(f"Opening {src_path}...")
    img = Image.open(src_path)
    img = img.convert("RGBA")
    new_data = []
    
    for item in img.getdata():
        r, g, b, a = item
        if r > 240 and g > 240 and b > 240:
            new_data.append((255, 255, 255, 0))
        elif r > 200 and g > 200 and b > 200:
            alpha = int(255 * (240 - ((r + g + b) / 3)) / 40)
            if alpha < 0: alpha = 0
            if alpha > 255: alpha = 255
            factor = alpha / 255.0
            new_r, new_g, new_b = int(r * factor), int(g * factor), int(b * factor)
            new_data.append((new_r, new_g, new_b, alpha))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    
    # Auto-crop the bounding box since it's a screenshot!
    bbox = img.getbbox()
    if bbox:
        print(f"Cropping transparent padding. Bounding box: {bbox}")
        img = img.crop(bbox)
        
    img.save(dest_path, "PNG")
    print(f"Saved {dest_path}")

if __name__ == '__main__':
    try:
        remove_white(sys.argv[1], sys.argv[2])
    except Exception as e:
        print("Error:", e)
        sys.exit(1)
