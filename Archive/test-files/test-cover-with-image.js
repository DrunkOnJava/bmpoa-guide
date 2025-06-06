import React from 'react';
import { renderToBuffer, Document, Page, Image, Text } from '@react-pdf/renderer';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const assetMap = JSON.parse(readFileSync(join(__dirname, 'src/assetMap.json'), 'utf8'));

(async () => {
  console.log('Testing cover with background image...');
  console.log('Image path:', assetMap.mountainoverlook);
  
  try {
    const doc = React.createElement(
      Document,
      null,
      React.createElement(
        Page,
        { size: 'LETTER' },
        React.createElement(
          Image,
          {
            src: assetMap.mountainoverlook,
            style: {
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }
          }
        ),
        React.createElement(
          Text,
          { style: { position: 'absolute', top: 100, left: 100, color: 'white', fontSize: 24 } },
          'TEST'
        )
      )
    );
    
    const start = Date.now();
    const buffer = await renderToBuffer(doc);
    const elapsed = Date.now() - start;
    
    console.log(`✅ Cover with image rendered in ${elapsed}ms, size: ${buffer.length} bytes`);
  } catch (err) {
    console.error('❌ Cover with image failed:', err.message);
    console.error('Stack:', err.stack);
  }
})();