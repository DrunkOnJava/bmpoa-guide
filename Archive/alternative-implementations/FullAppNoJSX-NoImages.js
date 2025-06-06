import React from 'react';
import { Document, Page, Text } from '@react-pdf/renderer';

export default function FullAppNoJSXNoImages({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  return e(
    Document,
    {
      title: 'Blue Mountain Property Owners Association Guide',
      author: 'BMPOA',
      subject: 'Community Guide for Blue Mountain Property Owners',
      keywords: 'BMPOA, Blue Mountain, Property Owners, Community Guide'
    },
    e(
      Page,
      { size: 'LETTER' },
      e(Text, null, 'Test document without images')
    )
  );
}