#!/usr/bin/env node

import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '../images');
const OPTIMIZED_DIR = path.join(__dirname, '../images/optimized');
const MAX_WIDTH = 1200;
const MAX_HEIGHT = 1200;
const JPEG_QUALITY = 85;
const PNG_COMPRESSION = 9;

async function optimizeImages() {
  console.log('🖼️  Starting image optimization...');
  
  // Create optimized directory if it doesn't exist
  await fs.mkdir(OPTIMIZED_DIR, { recursive: true });
  
  // Get all image files
  const files = await fs.readdir(IMAGES_DIR);
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png)$/i.test(file) && !file.includes('optimized')
  );
  
  console.log(`Found ${imageFiles.length} images to optimize`);
  
  for (const file of imageFiles) {
    const inputPath = path.join(IMAGES_DIR, file);
    const outputPath = path.join(OPTIMIZED_DIR, file);
    
    try {
      const stats = await fs.stat(inputPath);
      const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
      
      console.log(`\nProcessing: ${file} (${sizeMB}MB)`);
      
      const image = sharp(inputPath);
      const metadata = await image.metadata();
      
      // Resize if larger than max dimensions
      if (metadata.width > MAX_WIDTH || metadata.height > MAX_HEIGHT) {
        image.resize(MAX_WIDTH, MAX_HEIGHT, {
          fit: 'inside',
          withoutEnlargement: true
        });
      }
      
      // Apply format-specific optimizations
      if (/\.png$/i.test(file)) {
        await image
          .png({ 
            compressionLevel: PNG_COMPRESSION,
            quality: 100 
          })
          .toFile(outputPath);
      } else {
        await image
          .jpeg({ 
            quality: JPEG_QUALITY,
            progressive: true 
          })
          .toFile(outputPath);
      }
      
      const newStats = await fs.stat(outputPath);
      const newSizeMB = (newStats.size / 1024 / 1024).toFixed(2);
      const reduction = ((1 - newStats.size / stats.size) * 100).toFixed(1);
      
      console.log(`  ✓ Optimized: ${newSizeMB}MB (${reduction}% reduction)`);
      
    } catch (error) {
      console.error(`  ✗ Error processing ${file}:`, error.message);
    }
  }
  
  console.log('\n✅ Image optimization complete!');
  console.log(`\nOptimized images saved to: ${OPTIMIZED_DIR}`);
  console.log('\nTo use optimized images, update your assetMap to point to the optimized directory.');
}

// Check if sharp is installed
async function checkDependencies() {
  try {
    await import('sharp');
    return true;
  } catch (e) {
    console.error('❌ Sharp is not installed. Please run:');
    console.error('   npm install --save-dev sharp');
    return false;
  }
}

// Main execution
(async () => {
  if (await checkDependencies()) {
    await optimizeImages();
  }
})();