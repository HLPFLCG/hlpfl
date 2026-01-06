#!/bin/bash

# Image Optimization Script for alki.info
# Converts images to WebP format with fallbacks

echo "🎨 Starting image optimization..."

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null; then
    echo "Installing webp tools..."
    apt-get update && apt-get install -y webp
fi

# Create webp directory if it doesn't exist
mkdir -p images/webp

# Convert JPEG images to WebP
echo "Converting JPEG images..."
find images -name "*.jpeg" -o -name "*.jpg" | while read img; do
    filename=$(basename "$img")
    name="${filename%.*}"
    dir=$(dirname "$img")
    
    # Convert to WebP with quality 85
    cwebp -q 85 "$img" -o "${dir}/${name}.webp"
    echo "✅ Converted: $img -> ${dir}/${name}.webp"
done

# Convert PNG images to WebP
echo "Converting PNG images..."
find images -name "*.png" | while read img; do
    filename=$(basename "$img")
    name="${filename%.*}"
    dir=$(dirname "$img")
    
    # Convert to WebP with quality 90 (higher for PNG)
    cwebp -q 90 "$img" -o "${dir}/${name}.webp"
    echo "✅ Converted: $img -> ${dir}/${name}.webp"
done

echo "✅ Image optimization complete!"
echo "📊 Checking file sizes..."

# Show size comparison
echo ""
echo "Original vs WebP sizes:"
find images -name "*.webp" | while read webp; do
    original="${webp%.webp}.jpeg"
    if [ ! -f "$original" ]; then
        original="${webp%.webp}.jpg"
    fi
    if [ ! -f "$original" ]; then
        original="${webp%.webp}.png"
    fi
    
    if [ -f "$original" ]; then
        orig_size=$(du -h "$original" | cut -f1)
        webp_size=$(du -h "$webp" | cut -f1)
        echo "$original ($orig_size) -> $webp ($webp_size)"
    fi
done

echo ""
echo "🎉 Optimization complete! Update HTML to use WebP with fallbacks."