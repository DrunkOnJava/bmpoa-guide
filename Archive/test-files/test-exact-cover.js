import React from 'react';
import { renderToBuffer, Document } from '@react-pdf/renderer';
import CoverPageNoJSX from './src/components/CoverPageNoJSX.js';

(async () => {
  console.log('Testing exact CoverPageNoJSX component...');
  
  try {
    const doc = React.createElement(
      Document,
      null,
      React.createElement(CoverPageNoJSX, { pageNumberMap: {} })
    );
    
    console.log('Document created, starting render...');
    const start = Date.now();
    
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Render timeout after 5 seconds')), 5000);
    });
    
    const buffer = await Promise.race([
      renderToBuffer(doc),
      timeoutPromise
    ]);
    
    const elapsed = Date.now() - start;
    console.log(`✅ CoverPageNoJSX rendered in ${elapsed}ms, size: ${buffer.length} bytes`);
  } catch (err) {
    console.error('❌ CoverPageNoJSX failed:', err.message);
    if (err.stack) {
      console.error('Stack trace:', err.stack);
    }
  }
})();