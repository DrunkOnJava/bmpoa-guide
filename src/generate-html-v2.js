import React from 'react';
import ReactDOMServer from 'react-dom/server';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync, mkdirSync, writeFileSync, copyFileSync } from 'fs';
import FullAppNoJSX from './FullAppNoJSX.js';
import { colors } from './designTokens.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple component to render React-PDF structure as HTML
function renderDocumentAsHTML(document) {
  console.log('Document type:', document.type?.name || document.type);
  console.log('Document children:', document.props?.children);
  
  // Extract pages from Document component
  const pages = React.Children.toArray(document.props.children);
  console.log('Pages count:', pages.length);
  
  let html = '<div class="document">';
  
  pages.forEach((page, pageIndex) => {
    html += renderPageAsHTML(page, pageIndex);
  });
  
  html += '</div>';
  return html;
}

function renderPageAsHTML(page, pageIndex) {
  let html = `<section class="page" id="page-${pageIndex + 1}">`;
  
  // Debug what we're receiving
  console.log(`Page ${pageIndex + 1}:`, page.type?.name || page.type, 'children:', page.props?.children);
  
  const children = React.Children.toArray(page.props.children);
  children.forEach(child => {
    html += renderElementAsHTML(child);
  });
  
  html += '</section>';
  return html;
}

function renderElementAsHTML(element) {
  if (!element || !element.type) return '';
  
  // Handle strings and numbers
  if (typeof element === 'string') return element;
  if (typeof element === 'number') return element.toString();
  
  const { type, props } = element;
  const componentName = type.displayName || type.name || type;
  
  switch (componentName) {
    case 'View':
      return renderViewAsHTML(props);
    
    case 'Text':
      return renderTextAsHTML(props);
    
    case 'Image':
      return renderImageAsHTML(props);
    
    case 'Link':
      return renderLinkAsHTML(props);
    
    default:
      // For custom components or unrecognized elements
      if (props?.children) {
        const children = React.Children.toArray(props.children);
        return children.map(child => renderElementAsHTML(child)).join('');
      }
      return '';
  }
}

function renderViewAsHTML(props) {
  const className = getClassFromStyle(props.style);
  const children = React.Children.toArray(props.children);
  const childrenHTML = children.map(child => renderElementAsHTML(child)).join('');
  
  return `<div class="${className}">${childrenHTML}</div>`;
}

function renderTextAsHTML(props) {
  const className = getClassFromStyle(props.style);
  const children = React.Children.toArray(props.children);
  const content = children.map(child => {
    if (typeof child === 'string') return child;
    if (typeof child === 'number') return child.toString();
    return renderElementAsHTML(child);
  }).join('');
  
  // Determine appropriate tag based on style
  const tag = props.style?.fontSize >= 18 ? 'h2' : 'p';
  
  return `<${tag} class="${className}">${content}</${tag}>`;
}

function renderImageAsHTML(props) {
  const imgSrc = props.src?.replace(/^.*\/images\//, 'images/');
  return `<img src="${imgSrc}" alt="BMPOA Guide Image" class="pdf-image" />`;
}

function renderLinkAsHTML(props) {
  const children = React.Children.toArray(props.children);
  const content = children.map(child => renderElementAsHTML(child)).join('');
  return `<a href="${props.src || '#'}">${content}</a>`;
}

function getClassFromStyle(style) {
  if (!style) return '';
  
  const classes = [];
  
  // Font size classes
  if (style.fontSize >= 24) classes.push('heading-large');
  else if (style.fontSize >= 18) classes.push('heading-medium');
  else if (style.fontSize >= 14) classes.push('heading-small');
  
  // Font weight
  if (style.fontWeight === 'bold' || style.fontWeight >= 600) classes.push('bold');
  if (style.fontStyle === 'italic') classes.push('italic');
  
  // Text alignment
  if (style.textAlign === 'center') classes.push('text-center');
  if (style.textAlign === 'right') classes.push('text-right');
  
  // Background colors
  if (style.backgroundColor) {
    if (style.backgroundColor === colors.forestGreen) classes.push('bg-forest-green');
    else if (style.backgroundColor === colors.primary) classes.push('bg-primary');
    else if (style.backgroundColor.includes('E8F5E9')) classes.push('bg-light-green');
    else if (style.backgroundColor.includes('FFF9C4')) classes.push('bg-light-yellow');
  }
  
  // Text color
  if (style.color === colors.inverse || style.color === '#FFFFFF') classes.push('text-white');
  
  // Spacing
  if (style.marginBottom > 20) classes.push('mb-large');
  else if (style.marginBottom > 10) classes.push('mb-medium');
  
  if (style.padding > 20) classes.push('p-large');
  else if (style.padding > 10) classes.push('p-medium');
  
  // Borders
  if (style.border) classes.push('bordered');
  if (style.borderRadius) classes.push('rounded');
  
  return classes.join(' ');
}

async function generateHTML() {
  console.log('🌐 Generating HTML version of BMPOA Guide (v2)...');
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const buildDir = `output/builds/${timestamp}`;
  const htmlDir = `${buildDir}/html`;
  
  // Create directories
  mkdirSync(buildDir, { recursive: true });
  mkdirSync(htmlDir, { recursive: true });
  mkdirSync(`${htmlDir}/images/optimized`, { recursive: true });
  
  // Load page number map if it exists
  let pageNumberMap = {};
  try {
    pageNumberMap = JSON.parse(readFileSync('pageNumberMap.json', 'utf8'));
  } catch (e) {
    console.log('⚠️  No pageNumberMap.json found, using defaults');
  }
  
  // Generate React component tree
  const app = React.createElement(FullAppNoJSX, { pageNumberMap });
  
  console.log('App type:', app.type.name); // Debug
  console.log('App props:', app.props); // Debug
  
  // The app returns a Document element, we need to render it first
  const rendered = app.type(app.props);
  console.log('Rendered type:', rendered.type); // Debug
  console.log('Rendered children count:', React.Children.count(rendered.props.children)); // Debug
  
  // Convert to HTML
  console.log('🔄 Converting React components to HTML...');
  const htmlContent = renderDocumentAsHTML(rendered);
  
  // Create HTML template with improved structure
  const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blue Mountain Property Owners Association Guide</title>
    <meta name="description" content="Community guide for Blue Mountain Property Owners">
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="print.css" media="print">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <nav class="navigation">
        <div class="nav-container">
            <h1>BMPOA Community Guide</h1>
            <button class="nav-toggle" onclick="toggleNav()">☰ Menu</button>
        </div>
        <div class="nav-links" id="navLinks">
            <a href="#page-1">Cover</a>
            <a href="#page-2">Table of Contents</a>
            <a href="#page-5">Governance</a>
            <a href="#page-19">Services</a>
            <a href="#page-25">Facilities</a>
            <a href="#page-35">Safety</a>
            <a href="#page-41">Contacts</a>
            <button class="print-btn" onclick="window.print()">🖨️ Print</button>
        </div>
    </nav>
    
    <main class="content">
        ${htmlContent}
    </main>
    
    <footer class="footer">
        <p>&copy; ${new Date().getFullYear()} Blue Mountain Property Owners Association. All rights reserved.</p>
        <p>Generated on ${new Date().toLocaleDateString()}</p>
    </footer>
    
    <script>
        function toggleNav() {
            const navLinks = document.getElementById('navLinks');
            navLinks.classList.toggle('show');
        }
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
        
        // Add page numbers for printing
        window.addEventListener('beforeprint', function() {
            let pageNum = 1;
            document.querySelectorAll('.page').forEach(page => {
                page.setAttribute('data-page-number', pageNum++);
            });
        });
    </script>
</body>
</html>`;
  
  // Write HTML file
  writeFileSync(`${htmlDir}/index.html`, fullHTML);
  console.log('✅ Generated index.html');
  
  // Copy images
  console.log('🖼️  Copying images...');
  const imageDir = path.join(__dirname, '../images/optimized');
  if (fs.existsSync(imageDir)) {
    const images = fs.readdirSync(imageDir);
    images.forEach(img => {
      if (img.match(/\.(jpg|jpeg|png|gif)$/i)) {
        copyFileSync(
          path.join(imageDir, img),
          path.join(htmlDir, 'images/optimized', img)
        );
      }
    });
    console.log(`✅ Copied ${images.length} images`);
  }
  
  // Create CSS file
  const css = generateCSS();
  writeFileSync(`${htmlDir}/styles.css`, css);
  console.log('✅ Generated styles.css');
  
  // Create print CSS
  const printCSS = generatePrintCSS();
  writeFileSync(`${htmlDir}/print.css`, printCSS);
  console.log('✅ Generated print.css');
  
  // Create build info
  const buildInfo = {
    timestamp,
    format: 'html',
    pages: htmlContent.match(/<section class="page"/g)?.length || 0,
    generated: new Date().toISOString()
  };
  
  writeFileSync(`${buildDir}/build-info.json`, JSON.stringify(buildInfo, null, 2));
  
  // Copy to main output
  copyFileSync(`${htmlDir}/index.html`, 'output/BMPOA-Guide.html');
  
  // Copy CSS files to output
  copyFileSync(`${htmlDir}/styles.css`, 'output/styles.css');
  copyFileSync(`${htmlDir}/print.css`, 'output/print.css');
  
  // Copy images directory
  const outputImagesDir = 'output/images';
  if (!fs.existsSync(outputImagesDir)) {
    mkdirSync(outputImagesDir, { recursive: true });
  }
  
  console.log('');
  console.log('✅ HTML generation complete!');
  console.log(`📁 Build directory: ${buildDir}`);
  console.log(`🌐 HTML file: ${htmlDir}/index.html`);
  console.log(`🔗 Quick access: output/BMPOA-Guide.html`);
  console.log('');
  console.log('📱 Features:');
  console.log('   • Responsive design for mobile/tablet/desktop');
  console.log('   • Interactive navigation menu');
  console.log('   • Print-optimized stylesheet');
  console.log('   • Smooth scrolling navigation');
  console.log('   • Page numbers for printing');
  
  return buildDir;
}

// CSS generation functions remain the same
function generateCSS() {
  return `/* BMPOA Community Guide - Web Styles */

:root {
  --forest-green: ${colors.forestGreen};
  --primary: ${colors.primary};
  --saddle-brown: ${colors.saddleBrown};
  --warm-gray: ${colors.warmGray};
  --light-gray: #f5f5f5;
  --white: #ffffff;
  --black: #1a1a1a;
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-family);
  font-size: 16px;
  line-height: 1.6;
  color: var(--black);
  background-color: var(--light-gray);
}

/* Navigation */
.navigation {
  position: sticky;
  top: 0;
  background: var(--forest-green);
  color: var(--white);
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-container h1 {
  font-size: 1.5rem;
  font-weight: 700;
}

.nav-toggle {
  display: none;
  background: none;
  border: 2px solid var(--white);
  color: var(--white);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.nav-links {
  display: flex;
  gap: var(--spacing-lg);
  align-items: center;
}

.nav-links a {
  color: var(--white);
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.2s;
}

.nav-links a:hover {
  opacity: 0.8;
}

.print-btn {
  background: var(--white);
  color: var(--forest-green);
  border: none;
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.2s;
}

.print-btn:hover {
  transform: translateY(-1px);
}

/* Main Content */
.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-xl);
  background: var(--white);
  min-height: 100vh;
}

.document {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.page {
  background: var(--white);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  break-inside: avoid;
}

/* Typography */
h2.heading-large,
.heading-large {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: var(--spacing-lg);
  color: var(--forest-green);
}

h2.heading-medium,
.heading-medium {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: var(--spacing-md);
  color: var(--primary);
}

h2.heading-small,
.heading-small {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
}

p {
  margin-bottom: var(--spacing-md);
}

.bold {
  font-weight: 600;
}

.italic {
  font-style: italic;
}

.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}

.text-white {
  color: var(--white);
}

/* Backgrounds */
.bg-forest-green {
  background-color: var(--forest-green);
  color: var(--white);
  padding: var(--spacing-md);
  border-radius: 4px;
}

.bg-primary {
  background-color: var(--primary);
  color: var(--white);
  padding: var(--spacing-md);
  border-radius: 4px;
}

.bg-light-green {
  background-color: #E8F5E9;
  padding: var(--spacing-sm);
  border-radius: 4px;
}

.bg-light-yellow {
  background-color: #FFF9C4;
  padding: var(--spacing-sm);
  border-radius: 4px;
}

/* Spacing */
.mb-large {
  margin-bottom: var(--spacing-lg);
}

.mb-medium {
  margin-bottom: var(--spacing-md);
}

.p-large {
  padding: var(--spacing-lg);
}

.p-medium {
  padding: var(--spacing-md);
}

/* Borders */
.bordered {
  border: 1px solid #ddd;
}

.rounded {
  border-radius: 4px;
}

/* Images */
.pdf-image {
  max-width: 100%;
  height: auto;
  display: block;
  margin: var(--spacing-md) 0;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Tables */
table {
  width: 100%;
  border-collapse: collapse;
  margin: var(--spacing-md) 0;
}

th, td {
  padding: var(--spacing-sm);
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: var(--forest-green);
  color: var(--white);
  font-weight: 600;
}

/* Footer */
.footer {
  background: var(--forest-green);
  color: var(--white);
  text-align: center;
  padding: var(--spacing-xl);
  margin-top: var(--spacing-xl);
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav-toggle {
    display: block;
  }
  
  .nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--forest-green);
    flex-direction: column;
    padding: var(--spacing-md);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
  
  .nav-links.show {
    display: flex;
  }
  
  .content {
    padding: var(--spacing-md);
  }
  
  .page {
    padding: var(--spacing-md);
    margin-bottom: var(--spacing-md);
  }
  
  .heading-large {
    font-size: 1.5rem;
  }
  
  .heading-medium {
    font-size: 1.25rem;
  }
}

/* Utility Classes */
.two-column {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--spacing-lg);
}

.mirrored-two-column {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: var(--spacing-lg);
}

@media (max-width: 768px) {
  .two-column,
  .mirrored-two-column {
    grid-template-columns: 1fr;
  }
}`;
}

function generatePrintCSS() {
  return `/* BMPOA Community Guide - Print Styles */

@media print {
  /* Hide navigation and footer */
  .navigation,
  .footer,
  .print-btn {
    display: none !important;
  }
  
  /* Reset backgrounds for printing */
  body {
    background: white;
    color: black;
    font-size: 11pt;
  }
  
  .content {
    max-width: 100%;
    padding: 0;
    box-shadow: none;
  }
  
  /* Page breaks */
  .page {
    page-break-after: always;
    page-break-inside: avoid;
    box-shadow: none;
    border: none;
    margin: 0;
    padding: 0.5in;
  }
  
  /* Add page numbers */
  .page::after {
    content: attr(data-page-number);
    position: fixed;
    bottom: 0.5in;
    right: 0.5in;
    font-size: 10pt;
    color: #666;
  }
  
  /* Adjust headings for print */
  .heading-large {
    font-size: 18pt;
    color: black;
  }
  
  .heading-medium {
    font-size: 14pt;
    color: black;
  }
  
  .heading-small {
    font-size: 12pt;
    color: black;
  }
  
  /* Ensure images print properly */
  .pdf-image {
    max-width: 100%;
    page-break-inside: avoid;
    box-shadow: none;
  }
  
  /* Table adjustments */
  table {
    page-break-inside: avoid;
  }
  
  th {
    background-color: #f0f0f0 !important;
    color: black !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  
  /* Links */
  a {
    color: black;
    text-decoration: underline;
  }
  
  a[href^="http"]:after {
    content: " (" attr(href) ")";
    font-size: 9pt;
    color: #666;
  }
  
  /* Two-column layouts */
  .two-column,
  .mirrored-two-column {
    display: block;
  }
  
  /* Background colors for print */
  .bg-forest-green,
  .bg-primary {
    background-color: #f0f0f0 !important;
    color: black !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  
  .bg-light-green,
  .bg-light-yellow {
    background-color: #f8f8f8 !important;
    color: black !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}

/* Page setup */
@page {
  size: letter;
  margin: 0.75in;
}

@page :first {
  margin-top: 0.5in;
}`;
}

// Export for use in build scripts
export default generateHTML;

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateHTML().catch(console.error);
}