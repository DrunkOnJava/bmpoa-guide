#!/usr/bin/env node

// Fix duplicate imports after migration
import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fixDuplicateImports() {
  console.log('🔧 Fixing duplicate imports...\n');
  
  // Find all component files
  const files = await glob('src/**/*.js', {
    cwd: path.join(__dirname, '..'),
    absolute: true
  });
  
  let fixedCount = 0;
  
  for (const file of files) {
    let content = fs.readFileSync(file, 'utf-8');
    const originalContent = content;
    
    // Check if file has both design token and theme imports
    const hasDesignTokenImport = content.includes("from '../designTokens'") || 
                                 content.includes("from './designTokens'");
    const hasThemeImport = content.includes("from '../theme'") || 
                          content.includes("from './theme'");
    
    if (hasDesignTokenImport && hasThemeImport) {
      // Remove the theme import for colors if design tokens are imported
      const themeImportRegex = /import\s*{\s*colors\s*(?:,\s*[^}]*)?\s*}\s*from\s*['"]\.\.?\/theme(?:\.js)?['"];?\n?/g;
      content = content.replace(themeImportRegex, (match) => {
        // Check if there are other imports besides colors
        const otherImports = match.match(/import\s*{\s*([^}]+)\s*}/);
        if (otherImports) {
          const imports = otherImports[1].split(',').map(i => i.trim());
          const remainingImports = imports.filter(i => i !== 'colors');
          if (remainingImports.length > 0) {
            // Keep the import but remove colors
            return `import { ${remainingImports.join(', ')} } from '../theme';\n`;
          }
        }
        // Remove the entire import if only colors
        return '';
      });
      
      // Also check for duplicate typography, layout imports
      const duplicateImports = ['typography', 'layout', 'spacing'];
      for (const importName of duplicateImports) {
        const regex = new RegExp(`(${importName})\\s*as\\s*\\w+`, 'g');
        const matches = content.match(regex);
        if (matches && matches.length > 1) {
          // Remove aliased imports from theme if design tokens are imported
          const themeAliasRegex = new RegExp(
            `import\\s*{[^}]*${importName}\\s*as\\s*\\w+[^}]*}\\s*from\\s*['"]\.\.?\/theme(?:\.js)?['"];?`,
            'g'
          );
          content = content.replace(themeAliasRegex, (match) => {
            const imports = match.match(/{\s*([^}]+)\s*}/)[1]
              .split(',')
              .map(i => i.trim())
              .filter(i => !i.includes(importName));
            
            if (imports.length > 0) {
              return match.replace(/{\s*[^}]+\s*}/, `{ ${imports.join(', ')} }`);
            }
            return '';
          });
        }
      }
    }
    
    // Clean up double newlines
    content = content.replace(/\n\n\n+/g, '\n\n');
    
    if (content !== originalContent) {
      fs.writeFileSync(file, content);
      console.log(`✅ Fixed: ${path.basename(file)}`);
      fixedCount++;
    }
  }
  
  console.log(`\n✨ Fixed ${fixedCount} files with duplicate imports`);
}

// Run the fix
fixDuplicateImports().catch(console.error);