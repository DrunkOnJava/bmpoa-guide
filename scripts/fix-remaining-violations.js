#!/usr/bin/env node

// Fix remaining style violations
import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Extended replacements for all violations
const replacements = {
  // Font sizes
  'fontSize: 72': 'fontSize: typography.sizes.dividerNumber',
  'fontSize: 48': 'fontSize: typography.sizes.jumbo',
  'fontSize: 36': 'fontSize: typography.sizes.dividerTitle',
  'fontSize: 28': 'fontSize: typography.sizes.xlarge',
  'fontSize: 20': 'fontSize: typography.sizes.large',
  'fontSize: 14': 'fontSize: typography.sizes.medium',
  'fontSize: 13': 'fontSize: typography.sizes.base', // Standardize to 12pt
  'fontSize: 9': 'fontSize: typography.sizes.small',
  'fontSize: 8': 'fontSize: typography.sizes.tiny',
  'fontSize: 7': 'fontSize: typography.sizes.tiny', // Standardize to 8pt minimum
  
  // Colors that need to be added to design tokens
  "color: '#000000'": 'color: colors.black',
  "color: '#FFFFFF'": 'color: colors.white',
  "color: '#DC143C'": 'color: colors.danger',
  "color: '#5D4037'": 'color: colors.brown',
  "color: '#B91C1C'": 'color: colors.dangerDark',
  "color: '#FFE4E1'": 'color: colors.dangerLight',
  "color: '#FDF7ED'": 'color: colors.warningLight',
  "color: '#E8F5E9'": 'color: colors.successLight',
  "color: '#FAFAFA'": 'color: colors.backgroundLight',
  "color: '#F0FDF4'": 'color: colors.successVeryLight',
  "color: '#FEF3C7'": 'color: colors.warningVeryLight',
  "color: '#F0F9FF'": 'color: colors.infoVeryLight',
  "color: '#FAFBFC'": 'color: colors.grayVeryLight',
  "color: '#E2E8F0'": 'color: colors.grayLight',
  "color: '#1976D2'": 'color: colors.infoDark',
  "color: '#E3F2FD'": 'color: colors.infoLight',
  "color: '#2563EB'": 'color: colors.blue',
  "color: '#E0F2FE'": 'color: colors.blueLight',
  "color: '#EFF6FF'": 'color: colors.blueVeryLight',
  "color: '#991B1B'": 'color: colors.dangerDarker',
  "color: '#7F1D1D'": 'color: colors.dangerDarkest',
  "color: '#10B981'": 'color: colors.success',
  "color: '#F59E0B'": 'color: colors.warning',
  "color: '#EF4444'": 'color: colors.error',
  "color: '#FEF2F2'": 'color: colors.errorLight',
  "color: '#0369A1'": 'color: colors.blueAlt',
  "color: '#92400E'": 'color: colors.brownDark',
  "color: '#F9FAFB'": 'color: colors.grayVeryLight',
  "color: '#F5F5F5'": 'color: colors.neutral',
  "color: '#059669'": 'color: colors.successDark',
  "color: '#1E40AF'": 'color: colors.blueDark',
  "color: '#DBEAFE'": 'color: colors.blueExtraLight',
  "color: '#228B22'": 'color: colors.greenAlt',
  "color: '#FEFCE8'": 'color: colors.yellowLight',
  "color: '#FFF3CD'": 'color: colors.warningPale',
  "color: '#F7FAFC'": 'color: colors.grayExtraLight',
  "color: '#718096'": 'color: colors.grayMedium',
  "color: '#2C5282'": 'color: colors.blueDarker',
  "color: '#E6FFFA'": 'color: colors.cyanLight',
  "color: '#F8FAFC'": 'color: colors.grayUltraLight',
  "color: '#FFFBEB'": 'color: colors.yellowPale',
  "color: '#8B4513'": 'color: colors.saddleBrown',
  "color: '#FFF7ED'": 'color: colors.orangeLight',
  "color: '#FFFAEB'": 'color: colors.amberLight',
  "color: '#F0F8F0'": 'color: colors.greenExtraLight',
  "color: '#FEF9E7'": 'color: colors.yellowExtraLight',
  
  // Line heights
  'lineHeight: 1.6': 'lineHeight: typography.lineHeights.relaxed',
  'lineHeight: 1.5': 'lineHeight: typography.lineHeights.relaxed',
  'lineHeight: 1.15': 'lineHeight: typography.lineHeights.tight',
  'lineHeight: 1': 'lineHeight: typography.lineHeights.tight',
  'lineHeight: 52': 'lineHeight: 1.2', // Fix absolute line heights
  'lineHeight: 24': 'lineHeight: 1.4',
  'lineHeight: 14': 'lineHeight: 1.4',
  
  // Background colors
  "backgroundColor: '#000000'": 'backgroundColor: colors.black',
  "backgroundColor: '#FFFFFF'": 'backgroundColor: colors.white',
  // Add other background colors as needed
};

async function fixViolations() {
  console.log('🔧 Fixing remaining style violations...\n');
  
  const files = await glob('src/**/*.js', {
    cwd: path.join(__dirname, '..'),
    absolute: true
  });
  
  let fixedCount = 0;
  let totalChanges = 0;
  
  for (const file of files) {
    // Skip design tokens file itself
    if (file.includes('designTokens.js')) continue;
    
    let content = fs.readFileSync(file, 'utf-8');
    const originalContent = content;
    let fileChanges = 0;
    
    // Apply all replacements
    Object.entries(replacements).forEach(([oldValue, newValue]) => {
      const regex = new RegExp(escapeRegExp(oldValue), 'g');
      const matches = content.match(regex);
      if (matches) {
        content = content.replace(regex, newValue);
        fileChanges += matches.length;
      }
    });
    
    if (content !== originalContent) {
      fs.writeFileSync(file, content);
      console.log(`✅ Fixed: ${path.basename(file)} (${fileChanges} changes)`);
      fixedCount++;
      totalChanges += fileChanges;
    }
  }
  
  console.log(`\n✨ Fixed ${fixedCount} files with ${totalChanges} total changes`);
  console.log('\n⚠️  Note: You need to add the new color tokens to designTokens.js');
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

fixViolations().catch(console.error);