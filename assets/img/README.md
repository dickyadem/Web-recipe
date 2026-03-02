# Image Optimization Guide

## WebP Conversion

To convert images to WebP format for better performance:

### Option 1: Using Squoosh (Online)
1. Visit https://squoosh.app
2. Upload your images
3. Select WebP format
4. Download optimized versions

### Option 2: Using ImageMagick (CLI)
```bash
# Install ImageMagick first
# Convert single image
magick input.jpg -quality 85 output.webp

# Convert all JPGs in folder
for %i in (*.jpg) do magick "%i" -quality 85 "%~ni.webp"
```

### Option 3: Using Sharp (Node.js)
```bash
npm install -g sharp-cli
sharp input.jpg -o output.webp -q 85
```

## Recommended Settings
- **Quality**: 80-85%
- **Format**: WebP with JPG fallback
- **Max Width**: 1200px for recipe images
- **Max Width**: 800px for profile images

## File Size Targets
- Hero images: < 200KB
- Recipe cards: < 100KB
- Profile images: < 150KB
