#!/usr/bin/env node

import { exec } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function generatePDFScreenshotsTimestamped() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5); // 2025-01-06T12-30-45
  const buildDir = `output/builds/${timestamp}`;
  const pdfSource = 'output/BMPOA-Guide.pdf';
  
  try {
    // Create build directory structure
    await fs.mkdir(path.join(buildDir, 'png-highres'), { recursive: true });
    await fs.mkdir(path.join(buildDir, 'jpg-efficient'), { recursive: true });
    
    console.log('✅ Created build directory:', buildDir);
    
    // Copy PDF to build directory
    const pdfDest = path.join(buildDir, 'BMPOA-Guide.pdf');
    await fs.copyFile(pdfSource, pdfDest);
    console.log('✅ Copied PDF to build directory');
    
    // Generate high-resolution PNG files
    console.log('🔄 Generating high-resolution PNG images...');
    const pngPrefix = path.join(buildDir, 'png-highres/page');
    
    // Run pdftoppm command for PNGs (150 DPI)
    const { stderr: pngErr } = await execAsync(
      `pdftoppm -png -r 150 "${pdfDest}" "${pngPrefix}"`
    );
    
    if (pngErr) {
      console.warn('⚠️  pdftoppm PNG warnings:', pngErr);
    }
    
    // Count PNG files
    const pngFiles = await fs.readdir(path.join(buildDir, 'png-highres'));
    const pngCount = pngFiles.filter(f => f.endsWith('.png')).length;
    console.log(`✅ Generated ${pngCount} high-resolution PNG files`);
    
    // Generate efficient JPEG files
    console.log('🔄 Converting to efficient JPEG format...');
    
    // Convert each PNG to JPEG with ImageMagick
    let convertedCount = 0;
    for (const pngFile of pngFiles) {
      if (pngFile.endsWith('.png')) {
        const pngPath = path.join(buildDir, 'png-highres', pngFile);
        const jpgFile = pngFile.replace('.png', '.jpg');
        const jpgPath = path.join(buildDir, 'jpg-efficient', jpgFile);
        
        // Convert to 50% size, 70% quality JPEG
        await execAsync(`magick "${pngPath}" -resize 50% -quality 70 "${jpgPath}"`);
        convertedCount++;
        
        // Progress indicator
        if (convertedCount % 10 === 0) {
          console.log(`  ✓ Converted ${convertedCount}/${pngCount} to JPEG...`);
        }
      }
    }
    
    console.log(`✅ Created ${convertedCount} efficient JPEG files`);
    
    // Also populate the legacy PDF-Screenshots directory
    console.log('🔄 Updating legacy PDF-Screenshots directory...');
    const legacyDir = 'output/PDF-Screenshots';
    await fs.mkdir(legacyDir, { recursive: true });
    
    // Copy PNG files to legacy directory
    for (const pngFile of pngFiles) {
      if (pngFile.endsWith('.png')) {
        const source = path.join(buildDir, 'png-highres', pngFile);
        const dest = path.join(legacyDir, pngFile);
        await fs.copyFile(source, dest);
      }
    }
    console.log(`✅ Updated legacy directory with ${pngCount} PNG files`);
    
    // Create build info file
    const buildInfo = {
      timestamp,
      pdfFile: 'BMPOA-Guide.pdf',
      totalPages: pngCount,
      pngResolution: '150 DPI',
      jpgSettings: '50% size, 70% quality',
      createdAt: new Date().toISOString()
    };
    
    await fs.writeFile(
      path.join(buildDir, 'build-info.json'),
      JSON.stringify(buildInfo, null, 2)
    );
    
    console.log('\n📁 Build directory structure:');
    console.log(`   ${buildDir}/`);
    console.log(`   ├── BMPOA-Guide.pdf`);
    console.log(`   ├── build-info.json`);
    console.log(`   ├── png-highres/ (${pngCount} files)`);
    console.log(`   └── jpg-efficient/ (${convertedCount} files)`);
    
    // Return build directory for further processing
    return buildDir;
    
  } catch (error) {
    console.error('❌ Error generating PDF screenshots:', error.message);
    
    if (error.message.includes('pdftoppm')) {
      console.error('\n⚠️  pdftoppm not found. Please install poppler:');
      console.error('   macOS: brew install poppler');
      console.error('   Ubuntu/Debian: sudo apt-get install poppler-utils');
    }
    
    throw error;
  }
}

// Export for use in other scripts
export { generatePDFScreenshotsTimestamped };

// Run if called directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  generatePDFScreenshotsTimestamped()
    .then(buildDir => {
      console.log(`\n✅ Build complete: ${buildDir}`);
      process.exit(0);
    })
    .catch(() => process.exit(1));
}