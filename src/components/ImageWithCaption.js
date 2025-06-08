import React from 'react';
import { View, Image, Text } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { baseImageStyle, captionStyle } from '../imageStyles.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const assetMap = JSON.parse(readFileSync(join(__dirname, '../assetMap.json'), 'utf8'));

// Reusable component:
// - `srcKey` is the key to `assetMap[...]`
// - `captionText` is the string for the caption
// - `overrideStyle` can optionally adjust height, margin, etc.
export default function ImageWithCaption({ srcKey, captionText, overrideStyle = {} }) {
  const e = React.createElement;
  
  if (!assetMap[srcKey]) {
    console.warn(`Image key "${srcKey}" not found in assetMap`);
    return null;
  }
  
  return e(
    View,
    { style: { marginBottom: layout.spacing.xl } },
    e(
      Image,
      {
        src: assetMap[srcKey],
        style: {
          ...baseImageStyle,
          ...overrideStyle,
        }
      }
    ),
    e(Text, { style: captionStyle }, captionText)
  );
}