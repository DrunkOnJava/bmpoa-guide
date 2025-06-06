import React from 'react';
import { renderToBuffer, Document, Page, View, Text } from '@react-pdf/renderer';

(async () => {
  console.log('Testing cover with percentage top style...');
  
  try {
    const doc = React.createElement(
      Document,
      null,
      React.createElement(
        Page,
        { size: 'LETTER' },
        React.createElement(
          View,
          { style: { 
            position: 'absolute',
            top: '30%',  // Percentage value
            left: 0,
            right: 0,
            alignItems: 'center'
          } },
          React.createElement(Text, null, 'TEST')
        )
      )
    );
    
    const start = Date.now();
    const buffer = await renderToBuffer(doc);
    const elapsed = Date.now() - start;
    
    console.log(`✅ Cover with percentage style rendered in ${elapsed}ms, size: ${buffer.length} bytes`);
  } catch (err) {
    console.error('❌ Cover with percentage style failed:', err.message);
  }
})();