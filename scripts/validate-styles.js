#!/usr/bin/env node

// Style Validation Script for BMPOA Guide
// Checks all components for compliance with design tokens

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { fileURLToPath } from 'url';
import { typography, layout, colors, callout, footer } from '../src/designTokens.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Validation rules
const rules = {
  // Font size validation
  fontSize: {
    allowed: Object.values(typography.sizes),
    message: 'Font size must use design token values',
  },
  
  // Color validation
  colors: {
    allowed: Object.values(colors),
    message: 'Colors must use design token values',
  },
  
  // Spacing validation
  spacing: {
    allowed: Object.values(layout.spacing),
    message: 'Spacing must use design token values',
  },
  
  // Line height validation
  lineHeight: {
    allowed: Object.values(typography.lineHeights),
    message: 'Line height must use design token multipliers',
  },
  
  // Border width validation
  borderWidth: {
    allowed: [0.5, 1, 1.5, 2],
    message: 'Border width must be 0.5pt, 1pt, 1.5pt, or 2pt',
  },
};

// Patterns to check
const patterns = {
  fontSize: /fontSize:\s*(\d+)/g,
  color: /color:\s*['"]#([A-Fa-f0-9]{6})['"]/g,
  backgroundColor: /backgroundColor:\s*['"]#([A-Fa-f0-9]{6})['"]/g,
  margin: /margin(?:Top|Bottom|Left|Right)?:\s*(\d+)/g,
  padding: /padding(?:Top|Bottom|Left|Right)?:\s*(\d+)/g,
  lineHeight: /lineHeight:\s*([\d.]+)/g,
  borderWidth: /borderWidth:\s*([\d.]+)/g,
};

// Validation results
const violations = [];
const warnings = [];

// Helper function to check if value is in allowed list
function isAllowed(value, allowedValues, tolerance = 0) {
  return allowedValues.some(allowed => 
    Math.abs(parseFloat(value) - parseFloat(allowed)) <= tolerance
  );
}

// Validate a single file
function validateFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const fileName = path.basename(filePath);
  
  // Skip design tokens file itself
  if (fileName === 'designTokens.js') return;
  
  console.log(`Checking ${fileName}...`);
  
  // Check font sizes
  let match;
  while ((match = patterns.fontSize.exec(content)) !== null) {
    const value = parseInt(match[1]);
    if (!isAllowed(value, rules.fontSize.allowed)) {
      violations.push({
        file: fileName,
        line: getLineNumber(content, match.index),
        type: 'fontSize',
        value: value,
        message: `Font size ${value}pt not in design tokens. Use: ${rules.fontSize.allowed.join(', ')}`
      });
    }
  }
  
  // Check colors
  const colorPatterns = [patterns.color, patterns.backgroundColor];
  colorPatterns.forEach(pattern => {
    pattern.lastIndex = 0;
    while ((match = pattern.exec(content)) !== null) {
      const colorValue = `#${match[1]}`.toUpperCase();
      if (!isAllowed(colorValue, rules.colors.allowed.map(c => c.toUpperCase()))) {
        violations.push({
          file: fileName,
          line: getLineNumber(content, match.index),
          type: 'color',
          value: colorValue,
          message: `Color ${colorValue} not in design tokens`
        });
      }
    }
  });
  
  // Check spacing
  const spacingPatterns = [patterns.margin, patterns.padding];
  spacingPatterns.forEach(pattern => {
    pattern.lastIndex = 0;
    while ((match = pattern.exec(content)) !== null) {
      const value = parseInt(match[1]);
      // Allow 0 and check against spacing scale
      if (value !== 0 && !isAllowed(value, rules.spacing.allowed, 2)) {
        warnings.push({
          file: fileName,
          line: getLineNumber(content, match.index),
          type: 'spacing',
          value: value,
          message: `Spacing ${value}pt not in design tokens. Consider using: ${rules.spacing.allowed.join(', ')}`
        });
      }
    }
  });
  
  // Check line heights
  patterns.lineHeight.lastIndex = 0;
  while ((match = patterns.lineHeight.exec(content)) !== null) {
    const value = parseFloat(match[1]);
    if (!isAllowed(value, rules.lineHeight.allowed, 0.05)) {
      violations.push({
        file: fileName,
        line: getLineNumber(content, match.index),
        type: 'lineHeight',
        value: value,
        message: `Line height ${value} not in design tokens. Use: ${rules.lineHeight.allowed.join(', ')}`
      });
    }
  }
  
  // Check border widths
  patterns.borderWidth.lastIndex = 0;
  while ((match = patterns.borderWidth.exec(content)) !== null) {
    const value = parseFloat(match[1]);
    if (!isAllowed(value, rules.borderWidth.allowed)) {
      violations.push({
        file: fileName,
        line: getLineNumber(content, match.index),
        type: 'borderWidth',
        value: value,
        message: `Border width ${value}pt not standard. Use: ${rules.borderWidth.allowed.join(', ')}`
      });
    }
  }
}

// Get line number from index
function getLineNumber(content, index) {
  const lines = content.substring(0, index).split('\n');
  return lines.length;
}

// Validate all component files
function validateAll() {
  console.log('🔍 Validating styles against design tokens...\n');
  
  // Find all component files
  const componentFiles = glob.sync('src/components/**/*.js', {
    cwd: path.join(__dirname, '..'),
    absolute: true
  });
  
  // Also check main files
  const mainFiles = [
    'src/FullAppNoJSX.js',
    'src/theme.js',
    'src/standardizedStyles.js',
    'src/standardizedStylesV2.js',
  ].map(f => path.join(__dirname, '..', f)).filter(fs.existsSync);
  
  const allFiles = [...componentFiles, ...mainFiles];
  
  // Validate each file
  allFiles.forEach(validateFile);
  
  // Report results
  console.log('\n📊 Validation Results:\n');
  
  if (violations.length === 0 && warnings.length === 0) {
    console.log('✅ All styles comply with design tokens!');
    return 0;
  }
  
  if (violations.length > 0) {
    console.log(`❌ Found ${violations.length} violations:\n`);
    violations.forEach(v => {
      console.log(`  ${v.file}:${v.line} - ${v.type}: ${v.message}`);
    });
  }
  
  if (warnings.length > 0) {
    console.log(`\n⚠️  Found ${warnings.length} warnings:\n`);
    warnings.forEach(w => {
      console.log(`  ${w.file}:${w.line} - ${w.type}: ${w.message}`);
    });
  }
  
  // Generate report
  generateReport();
  
  return violations.length > 0 ? 1 : 0;
}

// Generate detailed report
function generateReport() {
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalFiles: 0,
      violations: violations.length,
      warnings: warnings.length,
    },
    violations: violations,
    warnings: warnings,
    recommendations: generateRecommendations(),
  };
  
  const reportPath = path.join(__dirname, '..', 'output', 'style-validation-report.json');
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  console.log(`\n📄 Detailed report saved to: output/style-validation-report.json`);
}

// Generate recommendations based on violations
function generateRecommendations() {
  const recommendations = [];
  
  // Group violations by type
  const violationsByType = violations.reduce((acc, v) => {
    acc[v.type] = (acc[v.type] || 0) + 1;
    return acc;
  }, {});
  
  if (violationsByType.fontSize > 0) {
    recommendations.push({
      type: 'fontSize',
      count: violationsByType.fontSize,
      action: 'Import typography.sizes from designTokens.js and use predefined values',
      example: 'fontSize: typography.sizes.base // Instead of fontSize: 12'
    });
  }
  
  if (violationsByType.color > 0) {
    recommendations.push({
      type: 'color',
      count: violationsByType.color,
      action: 'Import colors from designTokens.js and use predefined values',
      example: 'color: colors.text // Instead of color: "#333333"'
    });
  }
  
  if (violationsByType.lineHeight > 0) {
    recommendations.push({
      type: 'lineHeight',
      count: violationsByType.lineHeight,
      action: 'Use typography.lineHeights multipliers',
      example: 'lineHeight: typography.lineHeights.relaxed // Instead of lineHeight: 1.4'
    });
  }
  
  return recommendations;
}

// Run validation
const exitCode = validateAll();