import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const MOBILE_WIDTH = 640;
const DESKTOP_WIDTH = 1280;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, '..', 'public', 'images');

async function optimizeImages() {
    try {
        const files = await readdir(publicDir);
        
        for (const file of files) {
            // Skip already processed files
            if (file.includes('-mobile') || file.includes('-desktop') || !file.match(/\.(jpg|jpeg|png|webp)$/i)) {
                continue;
            }

            const inputPath = join(publicDir, file);
            const fileNameWithoutExt = file.replace(/\.[^/.]+$/, '');
            
            // Create mobile version
            const mobileOutputPath = join(publicDir, `${fileNameWithoutExt}-mobile.avif`);
            await sharp(inputPath)
                .resize(MOBILE_WIDTH)
                .avif({ quality: 80, effort: 9 })
                .toFile(mobileOutputPath);

            // Create desktop version
            const desktopOutputPath = join(publicDir, `${fileNameWithoutExt}-desktop.avif`);
            await sharp(inputPath)
                .resize(DESKTOP_WIDTH)
                .avif({ quality: 90, effort: 9 })
                .toFile(desktopOutputPath);

            console.log(`✓ Optimized: ${file}`);
            console.log(`  ├─ Created mobile version: ${fileNameWithoutExt}-mobile.avif`);
            console.log(`  └─ Created desktop version: ${fileNameWithoutExt}-desktop.avif`);
        }
        
        console.log('\n✨ Image optimization complete!');
    } catch (error) {
        console.error('Error optimizing images:', error);
        process.exit(1);
    }
}

optimizeImages();
