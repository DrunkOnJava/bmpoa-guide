#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';

async function extractReactSuggestions(buildId) {
  const buildDir = `output/builds/${buildId}`;
  const violationsFile = path.join(buildDir, 'style-violations.json');
  const suggestionsFile = path.join(buildDir, 'react-tailwind-suggestions.md');
  const componentsFile = path.join(buildDir, 'suggested-components.js');
  
  try {
    const violationsData = await fs.readFile(violationsFile, 'utf8');
    const data = JSON.parse(violationsData);
    
    // Start suggestions markdown
    let markdown = `# React/Tailwind Enhancement Suggestions

Build: ${buildId}
Generated: ${new Date().toISOString()}

## Overview

This document contains specific React component and Tailwind CSS suggestions to improve the BMPOA Guide's implementation.

## Page Scores Summary

| Page | Professionalism | Presentation | Overall |
|------|----------------|--------------|---------|
`;

    // Start components file
    let componentsCode = `// Suggested React Components with Tailwind CSS
// Generated from build: ${buildId}

import React from 'react';
import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';

// Tailwind-inspired utility classes for React PDF
const tw = {
  // Typography
  'text-4xl': { fontSize: 48 },
  'text-2xl': { fontSize: 24 },
  'text-xl': { fontSize: 18 },
  'text-base': { fontSize: 11 },
  'text-sm': { fontSize: 9 },
  'font-bold': { fontWeight: 'bold' },
  'text-center': { textAlign: 'center' },
  'text-left': { textAlign: 'left' },
  'text-justify': { textAlign: 'justify' },
  
  // Spacing
  'mb-6': { marginBottom: 24 },
  'mb-4': { marginBottom: 16 },
  'mb-3': { marginBottom: 12 },
  'mb-2': { marginBottom: 8 },
  'p-4': { padding: 16 },
  'p-3': { padding: 12 },
  'py-2': { paddingVertical: 8 },
  'px-4': { paddingHorizontal: 16 },
  
  // Layout
  'flex': { display: 'flex' },
  'flex-col': { flexDirection: 'column' },
  'flex-row': { flexDirection: 'row' },
  'items-center': { alignItems: 'center' },
  'justify-between': { justifyContent: 'space-between' },
  
  // Colors
  'bg-blue-600': { backgroundColor: '#2C5282' },
  'bg-gray-100': { backgroundColor: '#F7FAFC' },
  'text-white': { color: '#FFFFFF' },
  'text-gray-800': { color: '#2D3748' },
  'border-gray-300': { borderColor: '#E2E8F0' },
  
  // Borders
  'border': { borderWidth: 1 },
  'border-2': { borderWidth: 2 },
  'rounded': { borderRadius: 4 },
  'rounded-lg': { borderRadius: 8 },
};

// Helper to combine Tailwind-like classes
const combineStyles = (...classes) => {
  return classes.reduce((acc, cls) => {
    if (typeof cls === 'string' && tw[cls]) {
      return { ...acc, ...tw[cls] };
    }
    return { ...acc, ...cls };
  }, {});
};

`;

    const componentMap = new Map();
    const pageScores = [];
    
    // Process each page's analysis
    for (const page of data.violations) {
      if (!page.violations) continue;
      
      const profScore = page.professionalismScore || 0;
      const presScore = page.presentationScore || 0;
      const overall = Math.round((profScore + presScore) / 2);
      
      pageScores.push({
        page: page.pageNumber,
        profScore,
        presScore,
        overall
      });
      
      // Extract React/Tailwind suggestions
      if (page.reactTailwindSuggestions && page.reactTailwindSuggestions.components) {
        for (const comp of page.reactTailwindSuggestions.components) {
          const key = comp.element;
          if (!componentMap.has(key)) {
            componentMap.set(key, []);
          }
          componentMap.get(key).push({
            page: page.pageNumber,
            ...comp
          });
        }
      }
    }
    
    // Add scores to markdown
    pageScores.sort((a, b) => a.page - b.page);
    for (const score of pageScores) {
      markdown += `| ${score.page} | ${score.profScore}% | ${score.presScore}% | ${score.overall}% |\n`;
    }
    
    // Calculate averages
    const avgProf = Math.round(pageScores.reduce((sum, s) => sum + s.profScore, 0) / pageScores.length);
    const avgPres = Math.round(pageScores.reduce((sum, s) => sum + s.presScore, 0) / pageScores.length);
    const avgOverall = Math.round(pageScores.reduce((sum, s) => sum + s.overall, 0) / pageScores.length);
    
    markdown += `| **Average** | **${avgProf}%** | **${avgPres}%** | **${avgOverall}%** |\n\n`;
    
    // Add component suggestions to markdown
    markdown += `## Component Enhancement Suggestions\n\n`;
    
    // Generate component code
    for (const [element, suggestions] of componentMap) {
      markdown += `### ${element}\n\n`;
      
      // Find most common suggestion
      const suggestionCounts = {};
      suggestions.forEach(s => {
        const key = s.suggestedImplementation;
        suggestionCounts[key] = (suggestionCounts[key] || 0) + 1;
      });
      
      const mostCommon = Object.entries(suggestionCounts)
        .sort(([,a], [,b]) => b - a)[0][0];
      
      markdown += `**Recommended Implementation:**\n\`\`\`jsx\n${mostCommon}\n\`\`\`\n\n`;
      markdown += `**Benefits:**\n`;
      const benefits = [...new Set(suggestions.flatMap(s => s.benefits || []))];
      benefits.forEach(b => markdown += `- ${b}\n`);
      markdown += `\n**Affected Pages:** ${suggestions.map(s => s.page).join(', ')}\n\n`;
      
      // Add to components file
      componentsCode += generateComponentCode(element, mostCommon);
    }
    
    // Add global improvements
    markdown += `## Global Improvements\n\n`;
    const globalImprovements = new Set();
    
    for (const page of data.violations) {
      if (page.reactTailwindSuggestions && page.reactTailwindSuggestions.globalImprovements) {
        page.reactTailwindSuggestions.globalImprovements.forEach(imp => globalImprovements.add(imp));
      }
    }
    
    globalImprovements.forEach(imp => markdown += `- ${imp}\n`);
    
    // Close components file
    componentsCode += `
export { combineStyles, tw };
`;
    
    // Save files
    await fs.writeFile(suggestionsFile, markdown);
    await fs.writeFile(componentsFile, componentsCode);
    
    console.log(`✅ React/Tailwind suggestions extracted`);
    console.log(`   Average scores: Prof ${avgProf}% | Pres ${avgPres}% | Overall ${avgOverall}%`);
    console.log(`   Files created:`);
    console.log(`   - ${suggestionsFile}`);
    console.log(`   - ${componentsFile}`);
    
  } catch (err) {
    console.error('Error extracting suggestions:', err.message);
  }
}

function generateComponentCode(element, suggestion) {
  // Parse the suggestion and generate actual component code
  const componentName = element.replace(/\s+/g, '').replace(/^./, c => c.toUpperCase());
  
  return `
// ${element} Component
export const ${componentName} = ({ children, style, ...props }) => {
  const styles = StyleSheet.create({
    container: combineStyles(
      'p-4', 'mb-4', 'border', 'border-gray-300', 'rounded-lg',
      style
    ),
    // Add more styles based on the suggestion
  });
  
  return (
    <View style={styles.container} {...props}>
      {children}
    </View>
  );
};
`;
}

// Run if called directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const buildId = process.argv[2];
  if (!buildId) {
    // Get latest build
    import('fs').then(fs => {
      const builds = fs.readdirSync('output/builds').sort().reverse();
      if (builds.length > 0) {
        extractReactSuggestions(builds[0]);
      } else {
        console.error('No builds found');
      }
    });
  } else {
    extractReactSuggestions(buildId);
  }
}