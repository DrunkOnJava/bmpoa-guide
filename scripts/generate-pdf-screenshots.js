#!/usr/bin/env node

import { exec } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function generatePDFScreenshots() {
  const pdfPath = 'output/BMPOA-Guide.pdf';
  const outputDir = 'output/PDF-Screenshots';
  
  try {
    // Check if PDF exists
    await fs.access(pdfPath);
    console.log('✅ PDF found:', pdfPath);
    
    // Create output directory (removes existing if present)
    try {
      await fs.rm(outputDir, { recursive: true, force: true });
    } catch (err) {
      // Directory might not exist, that's fine
    }
    await fs.mkdir(outputDir, { recursive: true });
    console.log('✅ Created output directory:', outputDir);
    
    // Generate PNG files using pdftoppm
    console.log('🔄 Converting PDF pages to PNG images...');
    const outputPrefix = path.join(outputDir, 'page');
    
    // Run pdftoppm command
    // -png: output PNG format
    // -r 150: 150 DPI resolution (good balance of quality and file size)
    const { stdout, stderr } = await execAsync(
      `pdftoppm -png -r 150 "${pdfPath}" "${outputPrefix}"`
    );
    
    if (stderr) {
      console.warn('⚠️  pdftoppm warnings:', stderr);
    }
    
    // Count generated files
    const files = await fs.readdir(outputDir);
    const pngFiles = files.filter(f => f.endsWith('.png'));
    
    console.log(`✅ Successfully generated ${pngFiles.length} PNG files`);
    console.log(`📁 PNG files saved to: ${outputDir}/`);
    
    // List first few files as confirmation
    const preview = pngFiles.slice(0, 5).join(', ');
    const remaining = pngFiles.length > 5 ? `, ... and ${pngFiles.length - 5} more` : '';
    console.log(`   Files: ${preview}${remaining}`);
    
  } catch (error) {
    console.error('❌ Error generating PDF screenshots:', error.message);
    
    // Check if pdftoppm is installed
    if (error.message.includes('pdftoppm')) {
      console.error('\n⚠️  pdftoppm not found. Please install poppler:');
      console.error('   macOS: brew install poppler');
      console.error('   Ubuntu/Debian: sudo apt-get install poppler-utils');
      console.error('   RHEL/CentOS: sudo yum install poppler-utils');
    }
    
    process.exit(1);
  }
}

// Run if called directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  generatePDFScreenshots();
}

export { generatePDFScreenshots };