import React from 'react';
import { Page, View, Text, Image } from '@react-pdf/renderer';

export default function CoverPageNoJSXSimple({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  return e(
    Page,
    { size: 'LETTER' },
    e(
      View,
      { style: { padding: 50 } },
      e(
        Text,
        { style: { fontSize: 24, marginBottom: 20 } },
        'BLUE MOUNTAIN PROPERTY OWNERS ASSOCIATION'
      ),
      e(
        Text,
        { style: { fontSize: 14 } },
        'Community Guide'
      )
    )
  );
}