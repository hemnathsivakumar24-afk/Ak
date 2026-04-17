import sys
from PIL import Image

def process_logo(input_path, output_path):
    try:
        # Open the image
        img = Image.open(input_path)
        img = img.convert("RGBA")
        
        datas = img.getdata()
        
        newData = []
        for item in datas:
            # Change all white (also shades of white)
            # to transparent
            if item[0] >= 240 and item[1] >= 240 and item[2] >= 240:
                newData.append((255, 255, 255, 0))
            else:
                newData.append(item)
                
        img.putdata(newData)
        
        # Get bounding box of non-transparent areas
        bbox = img.getbbox()
        if bbox:
            img = img.crop(bbox)
        
        img.save(output_path, "PNG")
        print("Logo processed successfully!")
        
    except Exception as e:
        print(f"Error processing logo: {e}")

if __name__ == "__main__":
    if len(sys.argv) > 2:
        process_logo(sys.argv[1], sys.argv[2])
    else:
        print("Usage: python process_logo.py <input> <output>")
