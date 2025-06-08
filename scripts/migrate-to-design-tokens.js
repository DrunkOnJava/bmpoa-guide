#!/usr/bin/env node

// Migration Script - Convert existing styles to use design tokens
// This script updates all component files to use the centralized design token system

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mapping of old values to new token references
const replacements = {
  // Font sizes
  'fontSize: 32': 'fontSize: typography.sizes.h1',
  'fontSize: 24': 'fontSize: typography.sizes.h2',
  'fontSize: 18': 'fontSize: typography.sizes.toc',
  'fontSize: 16': 'fontSize: typography.sizes.h3',
  'fontSize: 12': 'fontSize: typography.sizes.base',
  'fontSize: 11': 'fontSize: typography.sizes.base', // Standardize to 12pt
  'fontSize: 10.5': 'fontSize: typography.sizes.base', // Standardize to 12pt
  'fontSize: 10': 'fontSize: typography.sizes.sm',
  'fontSize: 9': 'fontSize: typography.sizes.sm', // Standardize to 10pt minimum
  'fontSize: 8': 'fontSize: typography.sizes.sm', // Standardize to 10pt minimum
  
  // Colors - Primary palette
  "color: '#1B4332'": 'color: colors.primary',
  "color: '#004235'": 'color: colors.primary',
  "color: '#003F2D'": 'color: colors.primary',
  "color: '#003049'": 'color: colors.secondary',
  "color: '#006644'": 'color: colors.accent',
  "color: '#005C3C'": 'color: colors.accent',
  "color: '#D97706'": 'color: colors.danger',
  "color: '#C81D25'": 'color: colors.danger',
  "color: '#DC2626'": 'color: colors.danger',
  
  // Colors - Text
  "color: '#374151'": 'color: colors.text',
  "color: '#333333'": 'color: colors.text',
  "color: '#6B7280'": 'color: colors.muted',
  "color: '#666666'": 'color: colors.muted',
  "color: '#475569'": 'color: colors.muted',
  "color: '#FFFFFF'": 'color: colors.inverse',
  
  // Background colors
  "backgroundColor: '#1B4332'": 'backgroundColor: colors.primary',
  "backgroundColor: '#004235'": 'backgroundColor: colors.primary',
  "backgroundColor: '#003049'": 'backgroundColor: colors.secondary',
  "backgroundColor: '#006644'": 'backgroundColor: colors.accent',
  "backgroundColor: '#FFFFFF'": 'backgroundColor: colors.background',
  "backgroundColor: '#F3F4F6'": 'backgroundColor: colors.backgroundAlt',
  "backgroundColor: '#F5F5F5'": 'backgroundColor: colors.backgroundAlt',
  "backgroundColor: '#FEE2E2'": 'backgroundColor: colors.backgroundDanger',
  
  // Line heights
  'lineHeight: 1.2': 'lineHeight: typography.lineHeights.tight',
  'lineHeight: 1.3': 'lineHeight: typography.lineHeights.normal',
  'lineHeight: 1.4': 'lineHeight: typography.lineHeights.relaxed',
  'lineHeight: 1.5': 'lineHeight: typography.lineHeights.relaxed',
  
  // Font families
  "fontFamily: 'Helvetica'": 'fontFamily: typography.families.base',
  "fontFamily: 'Helvetica-Bold'": 'fontFamily: typography.families.heading',
  "fontFamily: 'Montserrat'": 'fontFamily: typography.families.heading',
  
  // Font weights
  'fontWeight: 400': 'fontWeight: typography.weights.normal',
  'fontWeight: 600': 'fontWeight: typography.weights.semibold',
  'fontWeight: 700': 'fontWeight: typography.weights.bold',
  'fontWeight: 800': 'fontWeight: typography.weights.extrabold',
  "fontWeight: 'normal'": 'fontWeight: typography.weights.normal',
  "fontWeight: 'bold'": 'fontWeight: typography.weights.bold',
  
  // Spacing
  'marginBottom: 4': 'marginBottom: layout.spacing.xs',
  'marginBottom: 8': 'marginBottom: layout.spacing.sm',
  'marginBottom: 12': 'marginBottom: layout.spacing.md',
  'marginBottom: 16': 'marginBottom: layout.spacing.lg',
  'marginBottom: 24': 'marginBottom: layout.spacing.xl',
  'marginBottom: 32': 'marginBottom: layout.spacing.xxl',
  
  'marginTop: 4': 'marginTop: layout.spacing.xs',
  'marginTop: 8': 'marginTop: layout.spacing.sm',
  'marginTop: 12': 'marginTop: layout.spacing.md',
  'marginTop: 16': 'marginTop: layout.spacing.lg',
  'marginTop: 24': 'marginTop: layout.spacing.xl',
  
  'padding: 4': 'padding: layout.spacing.xs',
  'padding: 8': 'padding: layout.spacing.sm',
  'padding: 12': 'padding: layout.spacing.md',
  'padding: 16': 'padding: layout.spacing.lg',
  'padding: 24': 'padding: layout.spacing.xl',
  
  // Border properties
  'borderRadius: 4': 'borderRadius: callout.radius',
  'borderWidth: 1.5': 'borderWidth: callout.border.width',
  'borderWidth: 0.5': 'borderWidth: 0.5', // Keep as is - standard
  'borderWidth: 1': 'borderWidth: 1', // Keep as is - standard
  
  // Common patterns
  'paddingTop: 54': 'paddingTop: layout.margins.content',
  'paddingBottom: 54': 'paddingBottom: layout.margins.content',
  'paddingHorizontal: 54': 'paddingHorizontal: layout.margins.content',
  'padding: 54': 'padding: layout.margins.content',
};

// Files to update
const filesToUpdate = [];
const updatedFiles = [];

// Process a single file
function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const originalContent = content;
  let updated = false;
  
  // Check if file already imports design tokens
  const hasDesignTokenImport = content.includes("from '../designTokens'") || 
                               content.includes("from './designTokens'");
  
  // Apply replacements
  Object.entries(replacements).forEach(([oldValue, newValue]) => {
    if (content.includes(oldValue)) {
      content = content.replace(new RegExp(escapeRegExp(oldValue), 'g'), newValue);
      updated = true;
    }
  });
  
  // If file was updated and doesn't have design token import, add it
  if (updated && !hasDesignTokenImport) {
    // Find the right place to add import (after React imports)
    const importRegex = /import.*from.*[@'"]react.*[@'"];?\n/g;
    const lastImport = [...content.matchAll(importRegex)].pop();
    
    if (lastImport) {
      const insertPosition = lastImport.index + lastImport[0].length;
      const relativePathPrefix = filePath.includes('src/components/') ? '../' : './';
      const importStatement = `import { typography, layout, colors, callout, footer } from '${relativePathPrefix}designTokens';\n`;
      
      content = content.slice(0, insertPosition) + importStatement + content.slice(insertPosition);
    }
  }
  
  // Write updated content if changed
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    updatedFiles.push({
      file: path.basename(filePath),
      changes: countChanges(originalContent, content)
    });
    return true;
  }
  
  return false;
}

// Count number of changes made
function countChanges(original, updated) {
  let count = 0;
  Object.keys(replacements).forEach(pattern => {
    const regex = new RegExp(escapeRegExp(pattern), 'g');
    const matches = original.match(regex);
    if (matches) count += matches.length;
  });
  return count;
}

// Escape special regex characters
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Main migration function
function migrate() {
  console.log('🚀 Starting migration to design tokens...\n');
  
  // Find all component files
  const componentFiles = glob.sync('src/components/**/*.js', {
    cwd: path.join(__dirname, '..'),
    absolute: true
  });
  
  // Also include main files
  const mainFiles = [
    'src/FullAppNoJSX.js',
    'src/theme.js',
    'src/generate-pdf.js',
  ].map(f => path.join(__dirname, '..', f)).filter(fs.existsSync);
  
  const allFiles = [...componentFiles, ...mainFiles];
  
  console.log(`Found ${allFiles.length} files to process...\n`);
  
  // Process each file
  allFiles.forEach(file => {
    const result = processFile(file);
    if (result) {
      console.log(`✅ Updated: ${path.basename(file)}`);
    } else {
      console.log(`⏭️  Skipped: ${path.basename(file)} (no changes needed)`);
    }
  });
  
  // Summary
  console.log('\n📊 Migration Summary:\n');
  console.log(`Total files processed: ${allFiles.length}`);
  console.log(`Files updated: ${updatedFiles.length}`);
  console.log(`Files skipped: ${allFiles.length - updatedFiles.length}`);
  
  if (updatedFiles.length > 0) {
    console.log('\n📝 Updated files:');
    updatedFiles.forEach(f => {
      console.log(`  - ${f.file} (${f.changes} changes)`);
    });
  }
  
  // Generate migration report
  const report = {
    timestamp: new Date().toISOString(),
    filesProcessed: allFiles.length,
    filesUpdated: updatedFiles.length,
    updates: updatedFiles,
    nextSteps: [
      'Run npm run pdf to regenerate with new styles',
      'Run npm run validate:styles to check compliance',
      'Review generated PDFs for visual consistency'
    ]
  };
  
  const reportPath = path.join(__dirname, '..', 'output', 'migration-report.json');
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  console.log(`\n📄 Migration report saved to: output/migration-report.json`);
  console.log('\n✨ Migration complete! Next steps:');
  console.log('  1. Run: npm run pdf');
  console.log('  2. Run: npm run validate:styles');
  console.log('  3. Review the generated PDF\n');
}

// Run migration
migrate();