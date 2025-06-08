#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fixAllImports() {
  console.log('🔧 Comprehensively fixing all import conflicts...\n');
  
  const files = await glob('src/**/*.js', {
    cwd: path.join(__dirname, '..'),
    absolute: true
  });
  
  let fixedCount = 0;
  const duplicateTokens = ['typography', 'layout', 'colors', 'callout', 'footer', 'spacing'];
  
  for (const file of files) {
    let content = fs.readFileSync(file, 'utf-8');
    const originalContent = content;
    
    // Check what's imported from designTokens
    const designTokenMatch = content.match(/import\s*{\s*([^}]+)\s*}\s*from\s*['"]\.\.?\/designTokens/);
    const designTokenImports = designTokenMatch 
      ? designTokenMatch[1].split(',').map(i => i.trim())
      : [];
    
    // If we have design token imports, remove duplicates from theme imports
    if (designTokenImports.length > 0) {
      // Find theme and standardizedStyles import lines
      const importRegexes = [
        /import\s*{\s*([^}]+)\s*}\s*from\s*['"]\.\.?\/theme(?:\.js)?['"];?/g,
        /import\s*{\s*([^}]+)\s*}\s*from\s*['"]\.\.?\/standardizedStyles(?:\.js)?['"];?/g,
        /import\s*{\s*([^}]+)\s*}\s*from\s*['"]\.\.?\/standardizedStylesV2(?:\.js)?['"];?/g
      ];
      
      for (const regex of importRegexes) {
        content = content.replace(regex, (match, imports) => {
          const moduleImports = imports.split(',').map(i => i.trim());
        
          // Filter out any imports that are already in designTokens
          const filteredImports = moduleImports.filter(imp => {
            // Check if this import conflicts with design tokens
            return !designTokenImports.some(dtImport => {
              // Handle both direct imports and aliased imports
              const importName = imp.split(/\s+as\s+/)[0].trim();
              const dtImportName = dtImport.split(/\s+as\s+/)[0].trim();
              return importName === dtImportName;
            });
          });
          
          if (filteredImports.length === 0) {
            // Remove the entire import line
            return '';
          } else {
            // Keep only non-conflicting imports, preserve the original module path
            const modulePath = match.match(/from\s*['"]([^'"]+)['"]/)[1];
            return `import { ${filteredImports.join(', ')} } from '${modulePath}';`;
          }
        });
      }
      
      // Clean up any resulting empty lines
      content = content.replace(/\n\n\n+/g, '\n\n');
      content = content.replace(/\nimport\s*{\s*}\s*from\s*['"]\.\.?\/theme(?:\.js)?['"];?/g, '');
    }
    
    if (content !== originalContent) {
      fs.writeFileSync(file, content);
      console.log(`✅ Fixed: ${path.basename(file)}`);
      fixedCount++;
    }
  }
  
  console.log(`\n✨ Fixed ${fixedCount} files with import conflicts`);
}

fixAllImports().catch(console.error);