import React from 'react';
import { renderToBuffer, Document, Page, Text, Image } from '@react-pdf/renderer';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Testing minimal PDF with image...');

// Load assetMap
const assetMap = JSON.parse(readFileSync(join(__dirname, 'src/assetMap.json'), 'utf8'));

// Test with a simple document
const testDoc = React.createElement(
  Document,
  null,
  React.createElement(
    Page,
    { size: 'LETTER' },
    React.createElement(Text, null, 'Test Page'),
    React.createElement(
      Image,
      { 
        src: assetMap.bmpoaemblem,
        style: { width: 100, height: 100 }
      }
    )
  )
);

(async () => {
  try {
    console.log('Image path:', assetMap.bmpoaemblem);
    console.log('Starting render...');
    const startTime = Date.now();
    const buffer = await renderToBuffer(testDoc);
    const elapsed = Date.now() - startTime;
    console.log(`✅ Render successful in ${elapsed}ms! Buffer size: ${buffer.length}`);
  } catch (error) {
    console.error('❌ Render failed:', error.message);
    console.error('Stack:', error.stack);
  }
})();