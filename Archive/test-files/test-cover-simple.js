import React from 'react';
import { renderToBuffer, Document } from '@react-pdf/renderer';
import CoverPageNoJSXSimple from './src/components/CoverPageNoJSX-Simple.js';

(async () => {
  console.log('Testing simplified cover page...');
  try {
    const doc = React.createElement(
      Document,
      null,
      React.createElement(CoverPageNoJSXSimple, { pageNumberMap: {} })
    );
    
    const start = Date.now();
    const buffer = await renderToBuffer(doc);
    const elapsed = Date.now() - start;
    
    console.log(`✅ Simple cover rendered in ${elapsed}ms, size: ${buffer.length} bytes`);
  } catch (err) {
    console.error('❌ Simple cover failed:', err.message);
  }
})();