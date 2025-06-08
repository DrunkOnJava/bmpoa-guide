import React from 'react';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { mkdirSync, writeFileSync, copyFileSync, existsSync } from 'fs';
import FullAppNoJSX from './FullAppNoJSX.js';
import { colors } from './designTokens.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Recursive component resolver - turns function components into rendered output
function resolveElement(element, depth = 0) {
  // Safety check for infinite recursion
  if (depth > 50) {
    console.warn('⚠️  Max recursion depth reached');
    return null;
  }

  // Handle null/undefined
  if (!element) return null;

  // Handle primitives (strings, numbers)
  if (typeof element === 'string' || typeof element === 'number') {
    return element;
  }

  // Handle arrays - flatten and resolve each item
  if (Array.isArray(element)) {
    return element
      .map(item => resolveElement(item, depth + 1))
      .filter(item => item !== null)
      .flat();
  }

  // Handle React elements
  if (element.type) {
    // If it's a function component, call it to get the rendered output
    if (typeof element.type === 'function') {
      try {
        const rendered = element.type(element.props || {});
        return resolveElement(rendered, depth + 1);
      } catch (error) {
        console.warn(`⚠️  Error rendering component ${element.type.name}:`, error.message);
        return null;
      }
    }

    // It's a primitive React-PDF component - return as is
    return element;
  }

  return null;
}

// Convert React-PDF styles to CSS
function stylesToCSS(styles) {
  if (!styles) return '';
  
  const cssProps = [];
  
  // Map React-PDF style props to CSS
  if (styles.backgroundColor) cssProps.push(`background-color: ${styles.backgroundColor}`);
  if (styles.color) cssProps.push(`color: ${styles.color}`);
  if (styles.fontSize) cssProps.push(`font-size: ${styles.fontSize}px`);
  if (styles.fontWeight) cssProps.push(`font-weight: ${styles.fontWeight}`);
  if (styles.fontFamily) cssProps.push(`font-family: ${styles.fontFamily}`);
  if (styles.margin) cssProps.push(`margin: ${styles.margin}px`);
  if (styles.marginTop) cssProps.push(`margin-top: ${styles.marginTop}px`);
  if (styles.marginBottom) cssProps.push(`margin-bottom: ${styles.marginBottom}px`);
  if (styles.marginLeft) cssProps.push(`margin-left: ${styles.marginLeft}px`);
  if (styles.marginRight) cssProps.push(`margin-right: ${styles.marginRight}px`);
  if (styles.padding) cssProps.push(`padding: ${styles.padding}px`);
  if (styles.paddingTop) cssProps.push(`padding-top: ${styles.paddingTop}px`);
  if (styles.paddingBottom) cssProps.push(`padding-bottom: ${styles.paddingBottom}px`);
  if (styles.paddingLeft) cssProps.push(`padding-left: ${styles.paddingLeft}px`);
  if (styles.paddingRight) cssProps.push(`padding-right: ${styles.paddingRight}px`);
  if (styles.textAlign) cssProps.push(`text-align: ${styles.textAlign}`);
  if (styles.lineHeight) cssProps.push(`line-height: ${styles.lineHeight}`);
  if (styles.width) cssProps.push(`width: ${styles.width}`);
  if (styles.height) cssProps.push(`height: ${styles.height}`);
  if (styles.flexDirection) cssProps.push(`flex-direction: ${styles.flexDirection}`);
  if (styles.justifyContent) cssProps.push(`justify-content: ${styles.justifyContent}`);
  if (styles.alignItems) cssProps.push(`align-items: ${styles.alignItems}`);
  if (styles.display === 'flex') cssProps.push('display: flex');
  if (styles.border) cssProps.push(`border: ${styles.border}`);
  if (styles.borderRadius) cssProps.push(`border-radius: ${styles.borderRadius}px`);
  
  return cssProps.join('; ');
}

// Convert React-PDF primitives to HTML
function primitiveToHTML(element, context = {}) {
  if (!element || !element.type) return '';

  const { type, props = {} } = element;
  const { style, children } = props;
  const componentName = type.displayName || type.name || type;

  // Handle different React-PDF components (uppercase from primitives)
  switch (componentName) {
    case 'Document':
    case 'DOCUMENT':
      const resolvedChildren = resolveChildren(children, context);
      return `<div class="document">${resolvedChildren}</div>`;

    case 'Page':
    case 'PAGE':
      context.pageNumber = (context.pageNumber || 0) + 1;
      const pageChildren = resolveChildren(children, context);
      return `<section class="page" id="page-${context.pageNumber}" style="${stylesToCSS(style)}">${pageChildren}</section>`;

    case 'View':
    case 'VIEW':
      const viewStyle = stylesToCSS(style);
      const viewClass = getViewClass(style);
      const viewChildren = resolveChildren(children, context);
      return `<div class="${viewClass}" ${viewStyle ? `style="${viewStyle}"` : ''}>${viewChildren}</div>`;

    case 'Text':
    case 'TEXT':
      const textStyle = stylesToCSS(style);
      const textContent = resolveChildren(children, context);
      // Determine if it's a header based on fontSize
      if (style?.fontSize >= 24) {
        return `<h1 style="${textStyle}">${textContent}</h1>`;
      } else if (style?.fontSize >= 20) {
        return `<h2 style="${textStyle}">${textContent}</h2>`;
      } else if (style?.fontSize >= 16) {
        return `<h3 style="${textStyle}">${textContent}</h3>`;
      }
      return `<p style="${textStyle}">${textContent}</p>`;

    case 'Image':
    case 'IMAGE':
      const src = props.src || props.source;
      const imagePath = src.startsWith('images/') ? src : `images/${path.basename(src)}`;
      return `<img src="${imagePath}" alt="${props.alt || ''}" style="${stylesToCSS(style)}" />`;

    case 'Link':
    case 'LINK':
      const linkChildren = resolveChildren(children, context);
      return `<a href="${props.src || '#'}" style="${stylesToCSS(style)}">${linkChildren}</a>`;

    default:
      console.warn(`⚠️  Unknown component type: ${componentName}`);
      return resolveChildren(children, context);
  }
}

// Helper to determine View classes based on style
function getViewClass(style) {
  const classes = ['view'];
  
  if (style?.flexDirection === 'row') classes.push('flex-row');
  if (style?.flexDirection === 'column') classes.push('flex-col');
  if (style?.backgroundColor === colors.bmGreen) classes.push('section-divider');
  if (style?.backgroundColor && style.backgroundColor !== 'white') classes.push('has-background');
  
  return classes.join(' ');
}

// Resolve children elements
function resolveChildren(children, context) {
  if (!children) return '';
  
  if (typeof children === 'string' || typeof children === 'number') {
    return children.toString();
  }

  if (Array.isArray(children)) {
    return children
      .map(child => {
        const resolved = resolveElement(child);
        if (Array.isArray(resolved)) {
          return resolved.map(r => primitiveToHTML(r, context)).join('');
        }
        return primitiveToHTML(resolved, context);
      })
      .join('');
  }

  const resolved = resolveElement(children);
  if (Array.isArray(resolved)) {
    return resolved.map(r => primitiveToHTML(r, context)).join('');
  }
  return primitiveToHTML(resolved, context);
}

// Generate comprehensive CSS
function generateCSS() {
  return `
/* Reset and Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: #333;
  background: #f5f5f5;
}

/* Document Container */
.document {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

/* Page Styles */
.page {
  padding: 72px;
  min-height: 100vh;
  page-break-after: always;
  position: relative;
  background: white;
}

/* Navigation */
.nav-menu {
  position: fixed;
  top: 20px;
  right: 20px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-height: 80vh;
  overflow-y: auto;
  z-index: 1000;
}

.nav-menu h3 {
  margin-bottom: 10px;
  color: ${colors.bmGreen};
}

.nav-menu ul {
  list-style: none;
}

.nav-menu a {
  display: block;
  padding: 5px 10px;
  color: #333;
  text-decoration: none;
  border-radius: 4px;
  transition: background 0.2s;
}

.nav-menu a:hover {
  background: ${colors.bmLightGreen};
}

/* Typography */
h1 {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
  color: ${colors.bmGreen};
}

h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  color: ${colors.bmGreen};
}

h3 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
  color: #333;
}

p {
  margin-bottom: 12px;
}

/* Layout Components */
.view {
  display: block;
}

.flex-row {
  display: flex;
  flex-direction: row;
}

.flex-col {
  display: flex;
  flex-direction: column;
}

.section-divider {
  background-color: ${colors.bmGreen};
  color: white;
  padding: 40px;
  margin: -72px;
  margin-bottom: 40px;
  text-align: center;
}

.section-divider h1 {
  color: white;
  font-size: 48px;
}

/* Images */
img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 20px 0;
}

/* Tables */
table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: ${colors.bmGreen};
  color: white;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

/* Info Boxes */
.info-box, .quick-facts-box {
  background: ${colors.bmLightGray};
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
}

.info-box h3, .quick-facts-box h3 {
  color: ${colors.bmGreen};
  margin-bottom: 12px;
}

/* Print Styles */
@media print {
  body {
    background: white;
  }
  
  .nav-menu {
    display: none;
  }
  
  .page {
    padding: 0.75in;
    box-shadow: none;
    page-break-after: always;
  }
  
  .section-divider {
    margin: -0.75in;
    margin-bottom: 0.5in;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .page {
    padding: 20px;
  }
  
  .nav-menu {
    position: static;
    margin: 20px;
    max-height: none;
  }
  
  .flex-row {
    flex-direction: column;
  }
}
`;
}

// Main generation function
async function generateHTML() {
  console.log('🚀 Generating HTML with robust component resolution...\n');

  try {
    // Load page number map for TOC
    let pageNumberMap = {};
    const mapPath = path.join(__dirname, '..', 'pageNumberMap.json');
    if (existsSync(mapPath)) {
      pageNumberMap = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
    }

    // Create output directories
    const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];
    const buildDir = path.join(__dirname, '..', 'output', 'builds', timestamp);
    const htmlDir = path.join(buildDir, 'html');
    const imagesDir = path.join(htmlDir, 'images');
    
    mkdirSync(buildDir, { recursive: true });
    mkdirSync(htmlDir, { recursive: true });
    mkdirSync(imagesDir, { recursive: true });

    // Step 1: Create React component tree
    console.log('📄 Creating React component tree...');
    const app = React.createElement(FullAppNoJSX, { pageNumberMap });

    // Step 2: Resolve all components recursively
    console.log('🔄 Resolving components recursively...');
    const resolved = resolveElement(app);
    
    if (!resolved) {
      throw new Error('Failed to resolve app component');
    }

    // Step 3: Convert to HTML
    console.log('🎨 Converting to HTML...');
    const context = { pageNumber: 0 };
    const htmlContent = primitiveToHTML(resolved, context);

    // Step 4: Create full HTML document
    const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BMPOA Community Guide</title>
  <style>
${generateCSS()}
  </style>
</head>
<body>
  <!-- Navigation Menu -->
  <nav class="nav-menu">
    <h3>Navigation</h3>
    <ul>
      <li><a href="#page-1">Cover</a></li>
      <li><a href="#page-2">Table of Contents</a></li>
      <li><a href="#page-3">Introduction</a></li>
      <li><a href="#page-10">Governance</a></li>
      <li><a href="#page-15">Community Services</a></li>
      <li><a href="#page-20">Deer Lake</a></li>
      <li><a href="#page-25">Fire Safety</a></li>
      <li><a href="#page-30">Construction</a></li>
      <li><a href="#page-40">Bear Safety</a></li>
      <li><a href="#page-45">Contacts</a></li>
    </ul>
  </nav>

  ${htmlContent}

  <script>
    // Smooth scrolling for navigation
    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  </script>
</body>
</html>`;

    // Step 5: Write HTML file
    const htmlPath = path.join(htmlDir, 'index.html');
    writeFileSync(htmlPath, fullHTML);
    console.log('✅ Generated index.html');

    // Step 6: Copy images
    console.log('\n📸 Copying images...');
    const sourceImagesDir = path.join(__dirname, '..', 'images', 'optimized');
    if (existsSync(sourceImagesDir)) {
      const images = fs.readdirSync(sourceImagesDir);
      images.forEach(image => {
        if (image.match(/\.(jpg|jpeg|png|gif)$/i)) {
          copyFileSync(
            path.join(sourceImagesDir, image),
            path.join(imagesDir, image)
          );
        }
      });
      console.log(`✅ Copied ${images.length} images`);
    }

    // Step 7: Create build info
    const buildInfo = {
      timestamp,
      format: 'html',
      pages: context.pageNumber,
      generator: 'generate-html-v3.js',
      features: [
        'Recursive component resolution',
        'React-PDF to HTML mapping',
        'Responsive design',
        'Print styles',
        'Navigation menu'
      ]
    };
    writeFileSync(
      path.join(buildDir, 'build-info.json'),
      JSON.stringify(buildInfo, null, 2)
    );

    // Step 8: Create symlink for easy access
    const outputHtmlPath = path.join(__dirname, '..', 'output', 'BMPOA-Guide.html');
    if (existsSync(outputHtmlPath)) {
      fs.unlinkSync(outputHtmlPath);
    }
    fs.symlinkSync(htmlPath, outputHtmlPath);

    console.log('\n✨ HTML generation complete!');
    console.log(`📁 Build directory: ${buildDir}`);
    console.log(`🌐 HTML file: ${outputHtmlPath}`);
    console.log(`📊 Total pages: ${context.pageNumber}`);

  } catch (error) {
    console.error('\n❌ Error generating HTML:', error);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the generator
generateHTML();