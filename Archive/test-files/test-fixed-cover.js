import React from 'react';
import { renderToBuffer, Document } from '@react-pdf/renderer';
import CoverPageNoJSXFixed from './src/components/CoverPageNoJSX-Fixed.js';

(async () => {
  console.log('Testing fixed CoverPageNoJSX component...');
  
  try {
    const doc = React.createElement(
      Document,
      null,
      React.createElement(CoverPageNoJSXFixed, { pageNumberMap: {} })
    );
    
    const start = Date.now();
    const buffer = await renderToBuffer(doc);
    const elapsed = Date.now() - start;
    
    console.log(`✅ Fixed CoverPageNoJSX rendered in ${elapsed}ms, size: ${buffer.length} bytes`);
  } catch (err) {
    console.error('❌ Fixed CoverPageNoJSX failed:', err.message);
  }
})();