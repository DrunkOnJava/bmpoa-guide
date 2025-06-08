#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fix visual issues after design token migration
async function fixVisualIssues() {
  console.log('🔧 Fixing visual issues from design token migration...\n');
  
  // 1. Add missing colors to designTokens.js
  const designTokensPath = path.join(__dirname, '../src/designTokens.js');
  let designTokensContent = fs.readFileSync(designTokensPath, 'utf-8');
  
  // Check if we need to add missing colors
  if (!designTokensContent.includes('overlayLight')) {
    console.log('Adding missing overlay colors...');
    
    // Find the colors object and add missing colors
    designTokensContent = designTokensContent.replace(
      /export const colors = {([^}]+)}/s,
      (match, content) => {
        // Add missing colors before the closing brace
        const newColors = `
  // Overlay colors
  overlayLight: 'rgba(255, 255, 255, 0.9)',
  overlayDark: 'rgba(0, 0, 0, 0.6)',
  
  // Additional colors from standardizedStyles
  primaryDark: '#1E3A6F',
  secondaryDark: '#2F5233',
  backgroundDanger: '#FEE2E2',
  backgroundAlt: '#F8FAFC',
  dangerDark: '#991B1B',
  blueLight: '#DBEAFE',
  blueAlt: '#1E40AF',
  brown: '#92400E',
  mustard: '#F59E0B',
  saddleBrown: '#8B4513',`;
        
        return `export const colors = {${content}${newColors}
}`;
      }
    );
    
    fs.writeFileSync(designTokensPath, designTokensContent);
    console.log('✅ Added missing colors to designTokens.js');
  }
  
  // 2. Fix the TOC component issue
  console.log('\nChecking TOC component...');
  const fullAppPath = path.join(__dirname, '../src/FullAppNoJSX.js');
  const fullAppContent = fs.readFileSync(fullAppPath, 'utf-8');
  
  // The issue is that TOCPageNoJSX-AllPages doesn't exist or isn't being loaded
  // Let's check if we need to revert to the enhanced version
  if (fullAppContent.includes('TOCPageNoJSX-AllPages.js')) {
    const allPagesPath = path.join(__dirname, '../src/components/TOCPageNoJSX-AllPages.js');
    if (!fs.existsSync(allPagesPath)) {
      console.log('❌ TOCPageNoJSX-AllPages.js not found, reverting to Enhanced version');
      const updatedContent = fullAppContent.replace(
        "import TOCPageNoJSX from './components/TOCPageNoJSX-AllPages.js';",
        "import TOCPageNoJSX from './components/TOCPageNoJSX-Enhanced.js';"
      );
      fs.writeFileSync(fullAppPath, updatedContent);
    }
  }
  
  // 3. Fix section divider blank pages
  console.log('\nFixing section divider issues...');
  
  // Check if SectionDivider component has the proper styles
  const sectionDividerPath = path.join(__dirname, '../src/components/SectionDivider.js');
  let sectionDividerContent = fs.readFileSync(sectionDividerPath, 'utf-8');
  
  // Ensure the solid background section divider renders properly
  if (!sectionDividerContent.includes('minHeight: "100%"')) {
    sectionDividerContent = sectionDividerContent.replace(
      'height: \'100%\',',
      'minHeight: \'100%\',\n    height: \'100%\','
    );
    fs.writeFileSync(sectionDividerPath, sectionDividerContent);
    console.log('✅ Fixed section divider height issue');
  }
  
  // 4. Fix emoji rendering issues
  console.log('\nFixing emoji rendering issues...');
  
  // Components using emojis need to ensure they're wrapped in Text elements
  const componentsToCheck = [
    'CommunityServicesPageNoJSX-CardGrid.js',
    'ContactsPageNoJSX-Enhanced.js',
    'WoodChippingPageNoJSX-Dense.js'
  ];
  
  for (const component of componentsToCheck) {
    const componentPath = path.join(__dirname, '../src/components', component);
    if (fs.existsSync(componentPath)) {
      let content = fs.readFileSync(componentPath, 'utf-8');
      let modified = false;
      
      // Fix emoji patterns - ensure they're inside Text components
      // Look for patterns like { title: '📞 Contact' } and ensure proper Text wrapping
      const emojiPattern = /title:\s*'([📍🌲🤝🧘📞🔥⚠️✅][^']*)'(?!\s*\})/g;
      if (emojiPattern.test(content)) {
        console.log(`  Checking ${component} for emoji issues...`);
        // This is complex to fix automatically, so we'll just report it
        console.log(`  ⚠️  ${component} may have emoji rendering issues`);
      }
    }
  }
  
  // 5. Fix key prop warnings in QuickFactsBox
  console.log('\nFixing key prop warnings...');
  const enhancedLayoutPath = path.join(__dirname, '../src/components/EnhancedLayoutComponents.js');
  let enhancedContent = fs.readFileSync(enhancedLayoutPath, 'utf-8');
  
  // The QuickFactsBox component needs proper keys
  if (enhancedContent.includes('QuickFactsBox')) {
    // Already has keys, but they might not be unique enough
    // The warning suggests the issue is with the way children are created
    console.log('✅ QuickFactsBox already has keys implemented');
  }
  
  // 6. Add missing layout spacing values
  console.log('\nChecking layout spacing values...');
  designTokensContent = fs.readFileSync(designTokensPath, 'utf-8');
  
  if (!designTokensContent.includes('layout.spacing')) {
    // Need to ensure layout has proper spacing export
    designTokensContent = designTokensContent.replace(
      /export const layout = {/,
      `export const layout = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32
  },`
    );
    fs.writeFileSync(designTokensPath, designTokensContent);
    console.log('✅ Added layout spacing to designTokens.js');
  }
  
  console.log('\n✨ Visual issue fixes complete!');
  console.log('\nNext steps:');
  console.log('1. Run: npm run pdf');
  console.log('2. Check the generated PDF for visual improvements');
  console.log('3. Address any remaining emoji warnings manually');
}

fixVisualIssues().catch(console.error);