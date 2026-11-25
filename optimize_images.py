
from pathlib import Path
from PIL import Image, ImageOps

# Image directory
folder = Path(__file__).resolve().parent / "images"

# Optimization settings
MAX_WIDTH = 1200
MAX_HEIGHT = 1200
QUALITY = 80

files = ["bread.jpg", "cake.jpg", "cupcake.jpg"]

total_before = 0
total_after = 0

print("LUSAKA FRESH BAKES")
print("IMAGE OPTIMIZATION")
print("-" * 45)

for filename in files:

    source = folder / filename
    destination = source.with_suffix(".webp")

    if not source.exists():
        print(f"File not found: {filename}")
        continue

    original_size = source.stat().st_size / 1024

    with Image.open(source) as img:

        # Correct image orientation
        img = ImageOps.exif_transpose(img)

        # Convert image to RGB
        img = img.convert("RGB")

        # Resize while maintaining aspect ratio
        img.thumbnail(
            (MAX_WIDTH, MAX_HEIGHT),
            Image.Resampling.LANCZOS
        )

        # Save optimized image
        img.save(
            destination,
            format="WEBP",
            quality=QUALITY,
            method=6
        )

    new_size = destination.stat().st_size / 1024

    reduction = (1 - new_size / original_size) * 100

    total_before += original_size
    total_after += new_size

    print(f"\nImage: {filename}")
    print(f"Original: {original_size:.2f} KB")
    print(f"Optimized: {new_size:.2f} KB")
    print(f"Reduction: {reduction:.2f}%")

print("\n" + "-" * 45)
print(f"Total before: {total_before:.2f} KB")
print(f"Total after: {total_after:.2f} KB")

if total_before > 0:
    savings = (1 - total_after / total_before) * 100
    print(f"Total reduction: {savings:.2f}%")

print("\nOptimization completed.")
