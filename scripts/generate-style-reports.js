#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line arguments
const buildDir = process.argv[2] || 'output/builds/2025-06-06T10-49-01';

// File paths
const violationsFile = path.join(buildDir, 'style-violations.json');
const todoFile = path.join(buildDir, 'style-todo-items.json');
const tasksFile = path.join(buildDir, 'style-fix-tasks.md');

// Read and fix the violations JSON
let violationsContent = fs.readFileSync(violationsFile, 'utf8');

// Remove trailing commas and fix JSON structure
violationsContent = violationsContent
  .replace(/,\s*\]/g, ']')  // Remove trailing commas before ]
  .replace(/\]\s*,\s*$/g, ']');  // Remove trailing comma at end

// Parse the JSON
let violations;
try {
  violations = JSON.parse(violationsContent);
} catch (e) {
  console.error('Error parsing JSON:', e);
  // Try to extract individual page objects
  const pageMatches = violationsContent.match(/\{[^{}]*"pageNumber"[^{}]*\}/g);
  if (pageMatches) {
    violations = pageMatches.map(match => {
      try {
        return JSON.parse(match);
      } catch (e) {
        return null;
      }
    }).filter(v => v !== null);
  } else {
    process.exit(1);
  }
}

// Generate TODO items and fix tasks
const todoItems = [];
const fixTasks = [];
const tasksByCategory = {
  typography: [],
  layout: [],
  spacing: [],
  component: []
};

violations.forEach(page => {
  if (page.violations && page.violations.length > 0) {
    page.violations.forEach(violation => {
      // Create TODO item
      const todoItem = {
        page: page.pageNumber,
        severity: violation.severity,
        category: violation.category,
        element: violation.element,
        issue: violation.issue,
        fix: violation.fix,
        location: violation.location
      };
      todoItems.push(todoItem);

      // Group by category for fix tasks
      if (tasksByCategory[violation.category]) {
        tasksByCategory[violation.category].push({
          page: page.pageNumber,
          ...violation
        });
      }
    });
  }
});

// Write TODO items JSON
fs.writeFileSync(todoFile, JSON.stringify(todoItems, null, 2));

// Generate Fix Tasks Markdown
let tasksContent = `# Style Fix Tasks
Generated from style analysis of build ${path.basename(buildDir)}

## Summary
- Total violations: ${todoItems.length}
- Critical: ${todoItems.filter(t => t.severity === 'critical').length}
- Major: ${todoItems.filter(t => t.severity === 'major').length}
- Minor: ${todoItems.filter(t => t.severity === 'minor').length}

## Tasks by Category

`;

// Add tasks by category
Object.entries(tasksByCategory).forEach(([category, tasks]) => {
  if (tasks.length > 0) {
    tasksContent += `### ${category.charAt(0).toUpperCase() + category.slice(1)} (${tasks.length} issues)\n\n`;
    
    // Group by severity within category
    const critical = tasks.filter(t => t.severity === 'critical');
    const major = tasks.filter(t => t.severity === 'major');
    const minor = tasks.filter(t => t.severity === 'minor');
    
    if (critical.length > 0) {
      tasksContent += `#### 🔴 Critical Issues\n`;
      critical.forEach(task => {
        tasksContent += `- **Page ${task.page}** - ${task.element}: ${task.issue}\n`;
        tasksContent += `  - Fix: ${task.fix}\n`;
      });
      tasksContent += '\n';
    }
    
    if (major.length > 0) {
      tasksContent += `#### 🟡 Major Issues\n`;
      major.forEach(task => {
        tasksContent += `- **Page ${task.page}** - ${task.element}: ${task.issue}\n`;
        tasksContent += `  - Fix: ${task.fix}\n`;
      });
      tasksContent += '\n';
    }
    
    if (minor.length > 0) {
      tasksContent += `#### 🔵 Minor Issues\n`;
      minor.forEach(task => {
        tasksContent += `- **Page ${task.page}** - ${task.element}: ${task.issue}\n`;
        tasksContent += `  - Fix: ${task.fix}\n`;
      });
      tasksContent += '\n';
    }
  }
});

// Add implementation guide
tasksContent += `## Implementation Guide

### Priority Order
1. Fix all critical issues first (content cutoff, unreadable text)
2. Address major typography issues (font sizes)
3. Fix major layout issues (margins, alignment)
4. Handle spacing inconsistencies
5. Polish minor issues

### Common Fixes

#### Typography Issues
- Update \`theme.js\` to ensure correct font sizes:
  - Cover title: 48pt
  - Section titles: 24pt
  - Body text: 11pt
  - Captions: 9pt

#### Layout Issues
- Ensure margins in page styles:
  - Top/bottom: 0.75in
  - Left/right: 1in
- Use \`textAlign: 'justify'\` for body text
- Use \`textAlign: 'left'\` for headers

#### Spacing Issues
- Standardize in \`theme.js\`:
  - Paragraph gap: 12pt
  - Section gap: 24pt
  - Line height: 1.5 for body, 1.3 for lists

### Verification
After making fixes, regenerate the PDF and run style analysis again to verify compliance.
`;

fs.writeFileSync(tasksFile, tasksContent);

console.log(`✅ Generated style reports:
- TODO items: ${todoFile} (${todoItems.length} items)
- Fix tasks: ${tasksFile}
`);

// Also fix the violations JSON file
fs.writeFileSync(violationsFile, JSON.stringify(violations, null, 2));
console.log('✅ Fixed violations JSON formatting');