from PIL import Image, ImageDraw, ImageFont
import os

def create_placeholder(filename, width, height, text, bg_color):
    img = Image.new('RGB', (width, height), color=bg_color)
    draw = ImageDraw.Draw(img)
    
    # Try to use a larger font
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 48)
    except:
        font = ImageFont.load_default()
    
    # Calculate text position
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    x = (width - text_width) // 2
    y = (height - text_height) // 2
    
    # Draw text
    draw.text((x, y), text, fill='white', font=font)
    
    # Save image
    img.save(filename)
    print(f"Created: {filename}")

# Create placeholder images
create_placeholder('marshall-lexington.jpg', 800, 500, 'Marshall - Lexington Ave', '#0066cc')
create_placeholder('marshall-arrow.jpg', 800, 500, 'Marshall - Arrow St', '#0052a3')
create_placeholder('bates-city.jpg', 800, 500, 'Bates City Location', '#004080')
create_placeholder('odessa-rv.jpg', 800, 500, 'Odessa RV Lot', '#003366')
create_placeholder('storage-facility.jpg', 1200, 600, 'Storage Banks LLC', '#0066cc')

print("All placeholder images created!")
