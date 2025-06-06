import React from 'react';
import { renderToBuffer, Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  headerBadge: {
    position: 'absolute',
    top: 24,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 12,
  },
  badgeLeft: {
    left: 24,
  },
  badgeText: {
    fontSize: 8,
    color: '#FFFFFF',
  }
});

(async () => {
  console.log('Testing cover with array styles...');
  
  try {
    const doc = React.createElement(
      Document,
      null,
      React.createElement(
        Page,
        { size: 'LETTER' },
        React.createElement(
          View,
          { style: [styles.headerBadge, styles.badgeLeft] }, // Array style
          React.createElement(Text, { style: styles.badgeText }, 'EST. 1975')
        )
      )
    );
    
    const start = Date.now();
    const buffer = await renderToBuffer(doc);
    const elapsed = Date.now() - start;
    
    console.log(`✅ Cover with array styles rendered in ${elapsed}ms, size: ${buffer.length} bytes`);
  } catch (err) {
    console.error('❌ Cover with array styles failed:', err.message);
  }
})();