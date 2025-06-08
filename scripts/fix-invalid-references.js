#!/usr/bin/env node

// Fix invalid references to non-existent properties
import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fix invalid property references
const replacements = {
  // Fix invalid spacing references
  'layout.spacing.xs0': 'layout.spacing.xs',
  'layout.spacing.xs8': 'layout.spacing.xl',
  'spacing.xs8': 'spacing.xl',
  
  // Fix invalid line height references
  'typography.lineHeights.tight4': 'typography.lineHeights.relaxed',
  
  // Fix color references
  "borderColor: '#7DD3FC'": 'borderColor: colors.blueLight',
};

async function fixReferences() {
  console.log('🔧 Fixing invalid property references...\n');
  
  const files = await glob('src/**/*.js', {
    cwd: path.join(__dirname, '..'),
    absolute: true
  });
  
  let fixedCount = 0;
  
  for (const file of files) {
    let content = fs.readFileSync(file, 'utf-8');
    const originalContent = content;
    
    // Apply simple replacements
    Object.entries(replacements).forEach(([oldValue, newValue]) => {
      if (typeof newValue === 'string') {
        content = content.replace(new RegExp(escapeRegExp(oldValue), 'g'), newValue);
      }
    });
    
    // Fix any property access that doesn't exist
    // Look for patterns like .xs0, .xs8, .tight4 etc
    content = content.replace(/\.(xs0|xs8|tight4)\b/g, (match, prop) => {
      const fixes = {
        'xs0': '.xs',
        'xs8': '.xl',
        'tight4': '.relaxed'
      };
      return fixes[prop] || match;
    });
    
    if (content !== originalContent) {
      fs.writeFileSync(file, content);
      console.log(`✅ Fixed: ${path.basename(file)}`);
      fixedCount++;
    }
  }
  
  console.log(`\n✨ Fixed ${fixedCount} files`);
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

fixReferences().catch(console.error);