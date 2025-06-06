import React from 'react';
import { renderToBuffer } from '@react-pdf/renderer';
import { Text, Document, Page } from '@react-pdf/renderer';

console.log('Testing basic PDF rendering...');

const TestDoc = React.createElement(
  Document,
  null,
  React.createElement(
    Page,
    { size: 'LETTER' },
    React.createElement(Text, null, 'Hello World')
  )
);

console.log('Created test document');

try {
  console.log('Starting render...');
  const buffer = await renderToBuffer(TestDoc);
  console.log('✅ Render successful! Buffer size:', buffer.length);
} catch (error) {
  console.error('❌ Render failed:', error);
}