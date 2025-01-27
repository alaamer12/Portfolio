import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG = {
    quality: {
        jpeg: [80, 70, 85],  // Different quality levels to try
        webp: [80, 75, 85],
        avif: [65, 60, 70],
        png: [80]
    },
    maxWidth: 1200,
    formats: ['webp', 'avif', 'jpeg'],
    concurrency: Math.max(1, Math.min(os.cpus().length - 1, 4)),
    compression: {
        jpeg: { mozjpeg: true },
        webp: { effort: 6 },
        avif: { effort: 7 },
        png: { compressionLevel: 9, palette: true }
    },
    // SSIM threshold for acceptable quality
    ssimThreshold: 0.95
};

class AsyncQueue {
    constructor(concurrency) {
        this.concurrency = concurrency;
        this.running = 0;
        this.queue = [];
    }

    async add(fn) {
        if (this.running >= this.concurrency) {
            await new Promise(resolve => this.queue.push(resolve));
        }
        this.running++;
        try {
            return await fn();
        } finally {
            this.running--;
            if (this.queue.length > 0) {
                const queue = this.queue.shift();
                queue();
            }
        }
    }
}

class ImageOptimizer {
    constructor(inputDir, outputDir, config = CONFIG) {
        this.inputDir = inputDir;
        this.outputDir = outputDir;
        this.config = config;
        this.queue = new AsyncQueue(config.concurrency);
        this.stats = {
            processed: 0,
            failed: 0,
            totalSaved: 0,
            formatStats: {}
        };
    }

    async calculateSSIM(original, compared) {
        // Calculate structural similarity index
        const { similarityScore } = await sharp(compared)
            .resize(original.width, original.height)
            .raw()
            .toBuffer()
            .then(async comparedBuffer => {
                const originalBuffer = await sharp(original.buffer)
                    .raw()
                    .toBuffer();
                
                // Simple SSIM calculation
                let sum = 0;
                for (let i = 0; i < originalBuffer.length; i++) {
                    const diff = originalBuffer[i] - comparedBuffer[i];
                    sum += diff * diff;
                }
                const mse = sum / originalBuffer.length;
                return { similarityScore: 1 / (1 + mse) };
            });
        
        return similarityScore;
    }

    async findOptimalFormat(inputBuffer, metadata, filename) {
        const results = [];
        const originalBuffer = inputBuffer;

        // Try different formats and quality settings
        for (const format of this.config.formats) {
            for (const quality of this.config.quality[format]) {
                try {
                    const outputBuffer = await sharp(inputBuffer)
                        .resize(metadata.width, metadata.height)
                        [format]({
                            quality,
                            ...this.config.compression[format]
                        })
                        .toBuffer();

                    const ssim = await this.calculateSSIM(
                        { buffer: originalBuffer, width: metadata.width, height: metadata.height },
                        outputBuffer
                    );

                    results.push({
                        format,
                        quality,
                        size: outputBuffer.length,
                        ssim,
                        buffer: outputBuffer
                    });
                } catch (error) {
                    console.error(`Error processing ${format} at quality ${quality}:`, error.message);
                }
            }
        }

        // Filter results by minimum quality threshold
        const validResults = results.filter(r => r.ssim >= this.config.ssimThreshold);

        if (validResults.length === 0) {
            // If no format meets quality threshold, use highest quality result
            results.sort((a, b) => b.ssim - a.ssim);
            return results[0];
        }

        // Among valid results, choose smallest file size
        validResults.sort((a, b) => a.size - b.size);
        return validResults[0];
    }

    async optimizeImage(inputPath) {
        const filename = path.basename(inputPath, path.extname(inputPath));
        const originalSize = (await fs.stat(inputPath)).size;
        const inputBuffer = await fs.readFile(inputPath);
        const metadata = await sharp(inputBuffer).metadata();

        // Calculate dimensions
        const width = Math.min(metadata.width, this.config.maxWidth);
        const height = Math.round((width * metadata.height) / metadata.width);

        // Find optimal format
        const optimal = await this.findOptimalFormat(
            inputBuffer,
            { width, height },
            filename
        );

        // Save the optimized image
        const outputPath = path.join(this.outputDir, `${filename}.${optimal.format}`);
        await fs.writeFile(outputPath, optimal.buffer);

        // Update format statistics
        this.stats.formatStats[optimal.format] = (this.stats.formatStats[optimal.format] || 0) + 1;

        return {
            filename,
            originalSize,
            optimizedSize: optimal.buffer.length,
            savedSize: originalSize - optimal.buffer.length,
            format: optimal.format,
            quality: optimal.quality,
            ssim: optimal.ssim
        };
    }

    async processDirectory() {
        try {
            await fs.mkdir(this.outputDir, { recursive: true });

            const files = await fs.readdir(this.inputDir);
            const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

            console.log(`\nFound ${imageFiles.length} images to process...`);
            console.log('Processing with', this.config.concurrency, 'concurrent operations\n');

            const startTime = Date.now();
            const results = await Promise.all(
                imageFiles.map(file => {
                    const inputPath = path.join(this.inputDir, file);
                    return this.queue.add(async () => {
                        try {
                            const result = await this.optimizeImage(inputPath);
                            this.stats.processed++;
                            this.stats.totalSaved += result.savedSize;
                            console.log(
                                `✓ Optimized: ${result.filename} ` +
                                `(${(result.savedSize / 1024).toFixed(2)}KB saved, ` +
                                `${result.format} @ ${result.quality}, ` +
                                `SSIM: ${result.ssim.toFixed(3)})`
                            );
                            return result;
                        } catch (error) {
                            this.stats.failed++;
                            console.error(`✗ Failed: ${file}:`, error.message);
                            return null;
                        }
                    });
                })
            );

            this.printSummary(startTime, results.filter(Boolean));
        } catch (error) {
            console.error('Fatal error during optimization:', error);
            process.exit(1);
        }
    }

    printSummary(startTime, results) {
        const duration = ((Date.now() - startTime) / 1000).toFixed(2);
        const savedMB = (this.stats.totalSaved / (1024 * 1024)).toFixed(2);

        console.log('\n=== Optimization Summary ===');
        console.log(`Time taken: ${duration}s`);
        console.log(`Images processed: ${this.stats.processed}`);
        console.log(`Failed: ${this.stats.failed}`);
        console.log(`Total size reduced: ${savedMB}MB`);
        
        console.log('\nFormat Distribution:');
        Object.entries(this.stats.formatStats).forEach(([format, count]) => {
            const percentage = ((count / this.stats.processed) * 100).toFixed(1);
            console.log(`- ${format}: ${count} images (${percentage}%)`);
        });

        console.log('\nNext steps:');
        console.log('1. Your images have been optimized using the best format for each image');
        console.log('2. Update your image sources to use the new optimized versions');
        console.log('3. Consider implementing lazy loading for images below the fold');
        console.log('\nOptimization complete! 🎉');
    }
}

// Run the optimizer
const inputDir = path.join(__dirname, '../public/images');
const outputDir = path.join(__dirname, '../public/images/optimized');

const optimizer = new ImageOptimizer(inputDir, outputDir);
optimizer.processDirectory();