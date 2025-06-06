import { StyleSheet } from '@react-pdf/renderer';
import { colors, spacing } from './theme.js';

// Base image style for scenic and general photos
export const baseImageStyle = {
  width: '100%',           // Full page width (respecting page margins)
  height: 200,             // Standard height (adjust per section recommendation)
  objectFit: 'cover',      // Scale/crop to fill container without distortion
  borderRadius: 6,         // Subtle rounding for polished look
  marginVertical: 16,      // Vertical spacing above & below image
};

// Caption style (consistent across document)
export const captionStyle = {
  fontSize: 10,
  color: '#6B7280',        // Tailwind gray-500 equivalent
  textAlign: 'center',
  fontStyle: 'italic',
  marginTop: 6,            // Increased from 4pt to 6pt per enhancement plan
};

// Image grid layout styles
export const imageGridStyles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  gridImage: {
    width: 260,
    height: 160,
    objectFit: 'cover',
    borderRadius: 6,
  },
  gridImageHalf: {
    width: '48%',
    height: 160,
    objectFit: 'cover',
    borderRadius: 6,
  }
});

// Map-specific styles
export const mapStyle = {
  width: '100%',
  height: 240,
  objectFit: 'contain',    // Preserve entire map
  backgroundColor: '#FFFFFF',
  padding: 8,
  borderRadius: 6,
  marginVertical: 20,
};

// Lodge interior specific style
export const lodgeImageStyle = {
  width: 400,
  height: 140,
  alignSelf: 'center',
  objectFit: 'cover',
  borderRadius: 8,
  marginVertical: 12,
  borderWidth: 0.5,
  borderColor: '#1B4332',  // Forest green border
};

// Full-page background image style (for cover)
export const fullPageBackgroundStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

// Semi-transparent overlay style
export const overlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: '#000000',
  opacity: 0.4,
};