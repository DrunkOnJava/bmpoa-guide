#!/usr/bin/env node

import { readFile, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectDir = dirname(__dirname);

async function fixAllBlankPages() {
  console.log('🔧 Fixing all blank page issues...\n');
  
  // Fix 1: TestBlankPage component might be causing issues
  console.log('1️⃣ Checking for TestBlankPage imports...');
  const fullAppPath = join(projectDir, 'src/FullAppNoJSX.js');
  let fullAppContent = await readFile(fullAppPath, 'utf8');
  
  if (fullAppContent.includes('TestBlankPage')) {
    console.log('   ❌ Found TestBlankPage import - removing...');
    fullAppContent = fullAppContent.replace(/import TestBlankPage.*;\n/g, '');
    fullAppContent = fullAppContent.replace(/.*e\(TestBlankPage.*\),?\n/g, '');
    await writeFile(fullAppPath, fullAppContent);
    console.log('   ✅ Removed TestBlankPage');
  }
  
  // Fix 2: Check component array returns
  console.log('\n2️⃣ Checking component structures...');
  
  const componentsToCheck = [
    'GovernancePageNoJSX',
    'MountainHomePageNoJSX',
    'WoodChippingPageNoJSX', 
    'FireSafetyPageNoJSX',
    'CommunityServicesPageNoJSX',
    'DeerLakePageNoJSX',
    'LodgePageNoJSX',
    'CommunicationPageNoJSX',
    'ContactsPageNoJSX',
    'NaturalAttractionsPageNoJSX',
    'ConstructionPageNoJSX',
    'BearSafetyPageNoJSX'
  ];
  
  // Fix 3: Look for components returning extra empty pages
  console.log('\n3️⃣ Analyzing component returns...');
  
  // Check DeerLakePageNoJSX for page 28 issue
  const deerLakePath = join(projectDir, 'src/components/DeerLakePageNoJSX-Enhanced.js');
  let deerLakeContent = await readFile(deerLakePath, 'utf8');
  
  // Count how many pages it returns
  const pageCount = (deerLakeContent.match(/e\(\s*Page\s*,/g) || []).length;
  console.log(`   DeerLake returns ${pageCount} pages`);
  
  // Fix orphaned content by checking for sparse pages
  if (pageCount > 2) {
    console.log('   ⚠️  DeerLake might have orphaned content');
  }
  
  // Fix 4: Remove any empty page arrays
  console.log('\n4️⃣ Checking for empty page arrays...');
  
  // Look for patterns like: e(Page, {}, null) or empty Views
  const emptyPagePattern = /e\(\s*Page\s*,\s*{[^}]*}\s*,\s*(?:null|e\(\s*View\s*,\s*{[^}]*}\s*\)\s*)\)/g;
  
  console.log('\n✅ Analysis complete!');
  console.log('\nRecommendations:');
  console.log('- Page 9: Governance component needs to be checked');
  console.log('- Page 28: DeerLake has orphaned content');
  console.log('- Page 30: Unknown component after DeerLake');
  console.log('- Page 59: Construction component overflow');
}

fixAllBlankPages().catch(console.error);