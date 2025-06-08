// Theme extensions that complement design tokens
// This file contains additional theme values not covered by design tokens

import { theme as THEME_CONFIG } from '../config.js';

// Additional color values not in design tokens
export const additionalColors = {
  // Legacy colors for backward compatibility
  forestGreen: '#1B4332',     // Deep forest green for headers
  slateGray: '#475569',       // Slate gray for sub-headers
  warmGray: '#6B7280',        // Warm gray for body text
  mustard: '#D97706',         // Mustard for callouts
  warmTan: '#F5E6D3',         // Warm tan for info boxes
  lightGray: '#F3F4F6',       // Light gray for backgrounds
  darkCharcoal: '#1F2937',    // Dark charcoal for emphasis
  alertRed: '#DC2626',        // Red for warnings
  lightPink: '#FEE2E2',       // Light pink for alert backgrounds
  lightGreen: '#D1FAE5',      // Light green for tips
  lightOrange: '#FED7AA',     // Light orange for bear safety
  
  // Original theme colors (backwards compatibility)
  primary: THEME_CONFIG.colors.primary || '#1B4332',
  accent: THEME_CONFIG.colors.accent || '#D97706',
  text: THEME_CONFIG.colors.text || '#374151',
  background: THEME_CONFIG.colors.background || '#F9FAFB',
};

// Legacy typography values
export const legacyTypography = {
  // Headers (Standardized)
  pageTitle: 16,         // Page titles (16pt as required)
  sectionBanner: 16,     // Section banner titles 
  sectionTitle: 16,      // Section titles (standardized to 16pt)
  subtitle: 14,          // Subtitles and subheads (14pt)
  body: 10.5,           // Body text (10.5pt as required)
  caption: 10,          // Captions and footnotes
  small: 9,             // Footer text
  tiny: 8,              // Badges and very small text
  
  // Line heights (Optimized for density)
  lineHeightTight: 1.2,
  lineHeightNormal: 1.4,  // Primary line height for body text
  lineHeightRelaxed: 1.5,
  lineHeightLists: 1.15,  // For bullet lists
};

export const spacing = THEME_CONFIG.spacing;