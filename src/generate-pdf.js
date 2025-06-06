// src/generate-pdf.js
import React from 'react';
import { renderToBuffer, render } from '@react-pdf/renderer';
import fs from 'fs/promises';
import { PDFDocument } from 'pdf-lib';
import FullAppNoJSX from './FullAppNoJSX.js';
// import FullAppNoJSX from './FullAppNoJSX-NoImages.js';
import { pages } from '../config.js';

export async function createPrelimTOC() {
  console.log('▶️ [createPrelimTOC] Start');
  
  try {
    console.log('Creating React element...');
    const element = React.createElement(FullAppNoJSX, { pageNumberMap: {} });
    console.log('✓ React element created');
    
    console.log('Starting renderToBuffer...');
    const startTime = Date.now();
    
    // Add a timeout wrapper to detect if renderToBuffer hangs
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('renderToBuffer timed out after 30 seconds')), 30000);
    });
    
    const buffer = await Promise.race([
      renderToBuffer(element),
      timeoutPromise
    ]);
    
    const renderTime = Date.now() - startTime;
    console.log(`✓ Buffer created in ${renderTime}ms, size: ${buffer.length} bytes`);
    
    // Load into pdf-lib to count pages
    console.log('Loading buffer into PDFDocument...');
    const pdfDoc = await PDFDocument.load(buffer);
    const pageCount = pdfDoc.getPageCount();
    console.log(`✓ PDF loaded, page count: ${pageCount}`);

    // Build a simple map: 1 page per entry in config.pages
    const pageNumberMap = {};
    pages.forEach((p, i) => {
      pageNumberMap[p.key] = i + 1;
    });
    
    // Save mapping so the final render can use accurate TOC
    console.log('Writing pageNumberMap.json...');
    await fs.writeFile('pageNumberMap.json', JSON.stringify(pageNumberMap, null, 2));
    console.log(`📊 pageNumberMap.json saved (total pages: ${pageCount}).`);
    
    console.log('✅ [createPrelimTOC] End - returning successfully');
  } catch (error) {
    console.error('❌ [createPrelimTOC] Error:', error.message);
    console.error('Stack trace:', error.stack);
    throw error;
  }
}

export async function createFinalPDF() {
  console.log('📄 Generating final PDF with TOC...');
  const pageNumberMap = JSON.parse(await fs.readFile('pageNumberMap.json', 'utf8'));
  await render(
    React.createElement(FullAppNoJSX, { pageNumberMap }),
    'output/BMPOA-Guide.pdf'
  );
  console.log('✅ BMPOA-Guide.pdf generated successfully in output/.');
}

// Export a function that runs both steps (for backward compatibility)
export async function generateFullPDF() {
  try {
    // Ensure the "output" folder exists
    await fs.mkdir('output', { recursive: true });

    // 2-step generation
    await createPrelimTOC();
    await createFinalPDF();
  } catch (err) {
    console.error('❌ PDF generation failed:', err);
    throw err;
  }
}

// Only run automatically if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateFullPDF().catch(err => {
    console.error('❌ PDF generation failed:', err);
    process.exit(1);
  });
}