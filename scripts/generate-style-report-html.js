#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';

async function generateStyleReportHTML(buildId) {
  const buildDir = `output/builds/${buildId}`;
  const violationsFile = path.join(buildDir, 'style-violations.json');
  const reportFile = path.join(buildDir, 'style-report.html');
  
  try {
    const violationsData = await fs.readFile(violationsFile, 'utf8');
    const violations = JSON.parse(violationsData);
    
    // Count violations by type
    let criticalCount = 0, majorCount = 0, minorCount = 0;
    const pageViolations = {};
    const categoryCount = {};
    
    for (const page of violations.violations) {
      if (!page.violations) continue;
      
      pageViolations[page.pageNumber] = {
        critical: 0,
        major: 0,
        minor: 0,
        violations: page.violations
      };
      
      for (const v of page.violations) {
        if (v.severity === 'critical') criticalCount++;
        else if (v.severity === 'major') majorCount++;
        else if (v.severity === 'minor') minorCount++;
        
        pageViolations[page.pageNumber][v.severity]++;
        categoryCount[v.category] = (categoryCount[v.category] || 0) + 1;
      }
    }
    
    // Generate HTML report
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BMPOA Style Guide Analysis - ${buildId}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .header {
            background: #2C5282;
            color: white;
            padding: 30px;
            border-radius: 8px;
            margin-bottom: 30px;
        }
        .header h1 { margin: 0; }
        .summary-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .card {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .card h3 { margin-top: 0; }
        .critical { color: #E53E3E; }
        .major { color: #D69E2E; }
        .minor { color: #3182CE; }
        .number {
            font-size: 2.5em;
            font-weight: bold;
            margin: 10px 0;
        }
        .violations-list {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }
        .violation {
            padding: 15px;
            margin: 10px 0;
            border-left: 4px solid;
            background: #f8f8f8;
        }
        .violation.critical { border-color: #E53E3E; }
        .violation.major { border-color: #D69E2E; }
        .violation.minor { border-color: #3182CE; }
        .page-header {
            background: #e2e8f0;
            padding: 10px 15px;
            margin: 20px 0 10px 0;
            border-radius: 4px;
            font-weight: bold;
        }
        .fix {
            background: #e6fffa;
            padding: 8px 12px;
            margin-top: 8px;
            border-radius: 4px;
            font-size: 0.9em;
        }
        .chart {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }
        .progress-bar {
            width: 100%;
            height: 30px;
            background: #e2e8f0;
            border-radius: 15px;
            overflow: hidden;
            margin: 20px 0;
        }
        .progress-fill {
            height: 100%;
            background: #38A169;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>BMPOA Style Guide Analysis Report</h1>
        <p>Build: ${buildId} | Generated: ${new Date().toLocaleString()}</p>
    </div>
    
    <div class="summary-cards">
        <div class="card">
            <h3 class="critical">Critical Issues</h3>
            <div class="number critical">${criticalCount}</div>
            <p>Must be fixed before publication</p>
        </div>
        
        <div class="card">
            <h3 class="major">Major Issues</h3>
            <div class="number major">${majorCount}</div>
            <p>Should be fixed for quality</p>
        </div>
        
        <div class="card">
            <h3 class="minor">Minor Issues</h3>
            <div class="number minor">${minorCount}</div>
            <p>Nice to fix for perfection</p>
        </div>
        
        <div class="card">
            <h3>Overall Compliance</h3>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${Math.round((100 - (criticalCount + majorCount * 0.5 + minorCount * 0.2)))}%">
                    ${Math.round((100 - (criticalCount + majorCount * 0.5 + minorCount * 0.2)))}%
                </div>
            </div>
            <p>Based on weighted violations</p>
        </div>
    </div>
    
    <div class="chart">
        <h2>Violations by Category</h2>
        <ul>
            ${Object.entries(categoryCount)
              .sort(([,a], [,b]) => b - a)
              .map(([cat, count]) => `<li><strong>${cat}:</strong> ${count} violations</li>`)
              .join('')}
        </ul>
    </div>
    
    <div class="violations-list">
        <h2>Detailed Violations by Page</h2>
        
        ${Object.entries(pageViolations)
          .filter(([_, data]) => data.violations.length > 0)
          .map(([pageNum, data]) => `
            <div class="page-header">
                Page ${pageNum} - 
                ${data.critical > 0 ? `<span class="critical">${data.critical} critical</span>` : ''}
                ${data.major > 0 ? `<span class="major">${data.major} major</span>` : ''}
                ${data.minor > 0 ? `<span class="minor">${data.minor} minor</span>` : ''}
            </div>
            
            ${data.violations.map(v => `
                <div class="violation ${v.severity}">
                    <strong>${v.element}</strong> - ${v.issue}
                    <br><small>Location: ${v.location} | Category: ${v.category}</small>
                    <div class="fix">
                        <strong>Fix:</strong> ${v.fix}
                    </div>
                </div>
            `).join('')}
          `).join('')}
    </div>
    
    <div class="chart">
        <h2>Most Affected Pages</h2>
        <ol>
            ${Object.entries(pageViolations)
              .map(([page, data]) => ({
                page,
                score: data.critical * 3 + data.major * 2 + data.minor
              }))
              .sort((a, b) => b.score - a.score)
              .slice(0, 10)
              .map(({page, score}) => `<li>Page ${page} (severity score: ${score})</li>`)
              .join('')}
        </ol>
    </div>
</body>
</html>`;
    
    await fs.writeFile(reportFile, html);
    console.log(`✅ HTML report generated: ${reportFile}`);
    
  } catch (err) {
    console.error('Error generating HTML report:', err.message);
  }
}

// Run if called directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const buildId = process.argv[2];
  if (!buildId) {
    console.error('Usage: node generate-style-report-html.js <build-id>');
    process.exit(1);
  }
  generateStyleReportHTML(buildId);
}

export { generateStyleReportHTML };