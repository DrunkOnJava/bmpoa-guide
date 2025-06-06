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

// Read the violations file
let violationsContent = fs.readFileSync(violationsFile, 'utf8');

// Extract all JSON objects from the file
const jsonObjects = [];
const regex = /\{[^{}]*"pageNumber":\s*\d+[^{}]*"violations":[^{}]*\}(?:\s*\])?/gs;
let match;

// First, try to extract complete page objects with nested violations
const pageRegex = /\{\s*"pageNumber"[\s\S]*?"notes"[^}]*\}/g;
const matches = violationsContent.match(pageRegex);

if (matches) {
  matches.forEach(match => {
    try {
      // Clean up the match
      const cleaned = match
        .replace(/,\s*\]/g, ']')  // Remove trailing commas before ]
        .replace(/\]\s*,\s*\}/g, ']}')  // Fix trailing commas
        .replace(/,\s*\}/g, '}');  // Remove trailing commas before }
      
      const parsed = JSON.parse(cleaned);
      if (parsed.pageNumber) {
        jsonObjects.push(parsed);
      }
    } catch (e) {
      console.error(`Failed to parse object: ${e.message}`);
    }
  });
}

console.log(`Found ${jsonObjects.length} page analyses`);

// Generate TODO items and fix tasks
const todoItems = [];
const tasksByCategory = {
  typography: [],
  layout: [],
  spacing: [],
  component: []
};

jsonObjects.forEach(page => {
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
        location: violation.location,
        compliance: page.overallCompliance,
        professionalismScore: page.professionalismScore,
        presentationScore: page.presentationScore
      };
      todoItems.push(todoItem);

      // Group by category for fix tasks
      const category = violation.category || 'other';
      if (!tasksByCategory[category]) {
        tasksByCategory[category] = [];
      }
      tasksByCategory[category].push({
        page: page.pageNumber,
        ...violation
      });
    });
  }
});

// Sort TODO items by severity and page
todoItems.sort((a, b) => {
  const severityOrder = { critical: 0, major: 1, minor: 2 };
  if (severityOrder[a.severity] !== severityOrder[b.severity]) {
    return severityOrder[a.severity] - severityOrder[b.severity];
  }
  return a.page - b.page;
});

// Write TODO items JSON
fs.writeFileSync(todoFile, JSON.stringify(todoItems, null, 2));

// Generate Fix Tasks Markdown
let tasksContent = `# Style Fix Tasks
Generated from style analysis of build ${path.basename(buildDir)}

## Summary
- Pages analyzed: ${jsonObjects.length}
- Total violations: ${todoItems.length}
- Critical: ${todoItems.filter(t => t.severity === 'critical').length}
- Major: ${todoItems.filter(t => t.severity === 'major').length}
- Minor: ${todoItems.filter(t => t.severity === 'minor').length}

## Pages with Issues
`;

// Group violations by page for summary
const pageViolations = {};
todoItems.forEach(item => {
  if (!pageViolations[item.page]) {
    pageViolations[item.page] = {
      critical: 0,
      major: 0,
      minor: 0,
      compliance: item.compliance
    };
  }
  pageViolations[item.page][item.severity]++;
});

// List pages with violations
Object.entries(pageViolations)
  .sort(([a], [b]) => parseInt(a) - parseInt(b))
  .forEach(([page, stats]) => {
    const icons = [];
    if (stats.critical > 0) icons.push(`🔴 ${stats.critical}`);
    if (stats.major > 0) icons.push(`🟡 ${stats.major}`);
    if (stats.minor > 0) icons.push(`🔵 ${stats.minor}`);
    tasksContent += `- **Page ${page}**: ${icons.join(' ')} (${stats.compliance}% compliant)\n`;
  });

tasksContent += `\n## Tasks by Category\n\n`;

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
        tasksContent += `  - Location: ${task.location}\n`;
        tasksContent += `  - Fix: ${task.fix}\n\n`;
      });
    }
    
    if (major.length > 0) {
      tasksContent += `#### 🟡 Major Issues\n`;
      major.forEach(task => {
        tasksContent += `- **Page ${task.page}** - ${task.element}: ${task.issue}\n`;
        tasksContent += `  - Location: ${task.location}\n`;
        tasksContent += `  - Fix: ${task.fix}\n\n`;
      });
    }
    
    if (minor.length > 0) {
      tasksContent += `#### 🔵 Minor Issues\n`;
      minor.forEach(task => {
        tasksContent += `- **Page ${task.page}** - ${task.element}: ${task.issue}\n`;
        tasksContent += `  - Location: ${task.location}\n`;
        tasksContent += `  - Fix: ${task.fix}\n\n`;
      });
    }
  }
});

// Add most common issues section
const issueFrequency = {};
todoItems.forEach(item => {
  const key = `${item.element}: ${item.issue}`;
  if (!issueFrequency[key]) {
    issueFrequency[key] = {
      count: 0,
      fix: item.fix,
      severity: item.severity,
      pages: []
    };
  }
  issueFrequency[key].count++;
  issueFrequency[key].pages.push(item.page);
});

tasksContent += `## Most Common Issues\n\n`;
Object.entries(issueFrequency)
  .sort(([, a], [, b]) => b.count - a.count)
  .slice(0, 10)
  .forEach(([issue, data]) => {
    const severityIcon = data.severity === 'critical' ? '🔴' : 
                        data.severity === 'major' ? '🟡' : '🔵';
    tasksContent += `- ${severityIcon} **${issue}** (${data.count} occurrences)\n`;
    tasksContent += `  - Pages: ${data.pages.slice(0, 5).join(', ')}${data.pages.length > 5 ? '...' : ''}\n`;
    tasksContent += `  - Fix: ${data.fix}\n\n`;
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
  - Subsection titles: 18pt
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

### Files to Update
Based on the violations found, focus on:
1. \`src/theme.js\` - Typography and spacing constants
2. \`src/components/*PageNoJSX.js\` - Individual page components
3. \`src/components/DesignComponents.js\` - Shared components

### Verification
After making fixes, regenerate the PDF and run style analysis again to verify compliance.
`;

fs.writeFileSync(tasksFile, tasksContent);

// Also create a properly formatted violations JSON
fs.writeFileSync(violationsFile, JSON.stringify(jsonObjects, null, 2));

console.log(`✅ Generated style reports:
- TODO items: ${todoFile} (${todoItems.length} items)
- Fix tasks: ${tasksFile}
- Fixed violations JSON: ${violationsFile} (${jsonObjects.length} pages)

Summary:
- Critical violations: ${todoItems.filter(t => t.severity === 'critical').length}
- Major violations: ${todoItems.filter(t => t.severity === 'major').length}
- Minor violations: ${todoItems.filter(t => t.severity === 'minor').length}
`);