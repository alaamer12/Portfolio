const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceImage = path.join(__dirname, '../public/images/light_true_core_icon.png');
const outputDir = path.join(__dirname, '../public');

async function generateIcons() {
    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Generate OG Image
    await sharp(sourceImage)
        .resize(1200, 630, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
        .toFile(path.join(outputDir, 'og-image.png'));

    // Generate apple-touch-icon
    await sharp(sourceImage)
        .resize(180, 180)
        .toFile(path.join(outputDir, 'apple-touch-icon.png'));

    // Generate android chrome icons
    await sharp(sourceImage)
        .resize(192, 192)
        .toFile(path.join(outputDir, 'android-chrome-192x192.png'));

    await sharp(sourceImage)
        .resize(512, 512)
        .toFile(path.join(outputDir, 'android-chrome-512x512.png'));

    // Generate favicons
    await sharp(sourceImage)
        .resize(16, 16)
        .toFile(path.join(outputDir, 'favicon-16x16.png'));

    await sharp(sourceImage)
        .resize(32, 32)
        .toFile(path.join(outputDir, 'favicon-32x32.png'));
}

generateIcons().catch(console.error);
