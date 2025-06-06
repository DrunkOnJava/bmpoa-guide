import React from 'react';
import { renderToBuffer } from '@react-pdf/renderer';
import FullAppNoJSX from './src/FullAppNoJSX.js';

console.log('Testing full document rendering...');

// Test with empty pageNumberMap
const element = React.createElement(FullAppNoJSX, { pageNumberMap: {} });

console.log('Created full document element');

const startTime = Date.now();
try {
  console.log('Starting render...');
  const buffer = await renderToBuffer(element);
  const elapsed = Date.now() - startTime;
  console.log(`✅ Render successful! Buffer size: ${buffer.length} bytes`);
  console.log(`Time taken: ${elapsed}ms`);
} catch (error) {
  const elapsed = Date.now() - startTime;
  console.error(`❌ Render failed after ${elapsed}ms:`, error);
  console.error('Stack trace:', error.stack);
}