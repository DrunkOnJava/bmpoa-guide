#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';

async function convertStyleTasksToTodo() {
  // Find latest build or use provided one
  const buildArg = process.argv[2];
  let buildDir;
  
  if (buildArg) {
    buildDir = `output/builds/${buildArg}`;
  } else {
    // Get latest build
    const buildsDir = 'output/builds';
    try {
      const builds = await fs.readdir(buildsDir);
      const sorted = builds.sort().reverse();
      if (sorted.length === 0) {
        console.error('No builds found');
        process.exit(1);
      }
      buildDir = path.join(buildsDir, sorted[0]);
    } catch (err) {
      console.error('Error reading builds directory:', err.message);
      process.exit(1);
    }
  }
  
  const violationsFile = path.join(buildDir, 'style-violations.json');
  const todoFile = path.join(buildDir, 'style-todo-items.json');
  
  try {
    // Read violations
    const violationsData = await fs.readFile(violationsFile, 'utf8');
    const violations = JSON.parse(violationsData);
    
    // Convert to TODO items
    const todoItems = [];
    let taskId = 1;
    
    // Group by severity and page
    const criticalTasks = [];
    const majorTasks = [];
    const minorTasks = [];
    
    for (const pageData of violations.violations) {
      if (!pageData.violations) continue;
      
      for (const violation of pageData.violations) {
        const task = {
          id: String(taskId++),
          content: `Fix ${violation.severity} issue on page ${pageData.pageNumber}: ${violation.element} - ${violation.issue}`,
          status: 'pending',
          priority: violation.severity === 'critical' ? 'high' : violation.severity === 'major' ? 'medium' : 'low',
          metadata: {
            pageNumber: pageData.pageNumber,
            element: violation.element,
            category: violation.category,
            location: violation.location,
            fix: violation.fix,
            component: `src/components/Page${pageData.pageNumber}Component.js` // Adjust based on actual structure
          }
        };
        
        if (violation.severity === 'critical') {
          criticalTasks.push(task);
        } else if (violation.severity === 'major') {
          majorTasks.push(task);
        } else {
          minorTasks.push(task);
        }
      }
    }
    
    // Combine in priority order
    todoItems.push(...criticalTasks, ...majorTasks, ...minorTasks);
    
    // Save TODO items
    const todoData = {
      buildId: violations.buildId,
      generatedAt: new Date().toISOString(),
      totalTasks: todoItems.length,
      breakdown: {
        critical: criticalTasks.length,
        major: majorTasks.length,
        minor: minorTasks.length
      },
      tasks: todoItems
    };
    
    await fs.writeFile(todoFile, JSON.stringify(todoData, null, 2));
    
    // Generate summary
    console.log(`✅ Generated ${todoItems.length} TODO items from style analysis`);
    console.log(`   🔴 Critical: ${criticalTasks.length}`);
    console.log(`   🟡 Major: ${majorTasks.length}`);
    console.log(`   🔵 Minor: ${minorTasks.length}`);
    console.log(`\nTODO items saved to: ${todoFile}`);
    
    // Generate import script
    const importScript = `
// Import style fix tasks to TodoWrite
const todoData = ${JSON.stringify(todoItems, null, 2)};

// Use with TodoWrite tool:
// TodoWrite({ todos: todoData })
`;
    
    await fs.writeFile(
      path.join(buildDir, 'import-style-todos.js'),
      importScript
    );
    
    console.log(`\nImport script saved to: ${path.join(buildDir, 'import-style-todos.js')}`);
    
  } catch (err) {
    console.error('Error processing style tasks:', err.message);
    process.exit(1);
  }
}

// Run if called directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  convertStyleTasksToTodo();
}