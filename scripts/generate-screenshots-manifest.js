#!/usr/bin/env node

/**
 * Generate screenshots manifest for browser consumption
 * This script scans the public/images/screens directory and creates a JSON manifest
 * that can be loaded by the browser to populate project screenshots
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCREENSHOTS_DIR = path.join(process.cwd(), 'public', 'images', 'screens');
const OUTPUT_FILE = path.join(process.cwd(), 'public', 'screenshots-manifest.json');

// Supported image extensions
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg'];

function isImageFile(filename) {
    const ext = path.extname(filename).toLowerCase();
    return IMAGE_EXTENSIONS.includes(ext);
}

function generateManifest() {
    const manifest = {};
    
    try {
        if (!fs.existsSync(SCREENSHOTS_DIR)) {
            console.log('📁 Screenshots directory not found, creating empty manifest');
            fs.writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, 2));
            return;
        }

        // Read all directories in screenshots folder
        const projectDirs = fs.readdirSync(SCREENSHOTS_DIR, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);

        let totalScreenshots = 0;

        projectDirs.forEach(projectId => {
            const projectDir = path.join(SCREENSHOTS_DIR, projectId);
            
            try {
                // Read all files in project directory
                const files = fs.readdirSync(projectDir)
                    .filter(isImageFile)
                    .sort((a, b) => {
                        // Natural sort for numbered files
                        const aNum = a.match(/(\d+)/);
                        const bNum = b.match(/(\d+)/);
                        if (aNum && bNum) {
                            return parseInt(aNum[1]) - parseInt(bNum[1]);
                        }
                        return a.localeCompare(b);
                    });

                if (files.length > 0) {
                    // Convert to web paths
                    manifest[projectId] = files.map(file => 
                        `/images/screens/${projectId}/${file}`
                    );
                    totalScreenshots += files.length;
                    console.log(`✅ Found ${files.length} screenshots for project: ${projectId}`);
                }
            } catch (error) {
                console.warn(`⚠️  Could not read directory for project: ${projectId}`, error.message);
            }
        });

        // Write manifest file
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, 2));
        console.log(`🎉 Generated manifest with ${totalScreenshots} screenshots for ${Object.keys(manifest).length} projects`);
        console.log(`📄 Manifest saved to: ${OUTPUT_FILE}`);

    } catch (error) {
        console.error('❌ Error generating screenshots manifest:', error);
        process.exit(1);
    }
}

// Run the script
generateManifest();