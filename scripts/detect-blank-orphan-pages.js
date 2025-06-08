#!/usr/bin/env node

import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import { createCanvas, loadImage } from 'canvas';

/**
 * Automated blank page and orphan detection system
 * Analyzes PDF page images to identify layout issues
 */

class PageAnalyzer {
  constructor(buildDir) {
    this.jpgDir = join(buildDir, 'jpg-efficient');
    this.issues = {
      blankPages: [],
      orphanPages: [],
      nearBlankPages: [],
      layoutIssues: []
    };
  }

  async analyzeAllPages() {
    console.log('🔍 Starting automated page analysis...\n');
    
    const files = await readdir(this.jpgDir);
    const pageFiles = files.filter(f => f.match(/^page-\d+\.jpg$/)).sort();
    
    for (const file of pageFiles) {
      const pageNum = parseInt(file.match(/\d+/)[0]);
      await this.analyzePage(join(this.jpgDir, file), pageNum);
    }
    
    return this.generateReport();
  }

  async analyzePage(imagePath, pageNum) {
    try {
      const img = await loadImage(imagePath);
      const canvas = createCanvas(img.width, img.height);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const pixels = imageData.data;
      
      // Calculate content metrics
      const metrics = this.calculateMetrics(pixels, img.width, img.height);
      
      // Detect issues
      if (metrics.contentRatio < 0.02) {
        this.issues.blankPages.push({
          page: pageNum,
          contentRatio: metrics.contentRatio,
          reason: 'Less than 2% non-white content'
        });
      } else if (metrics.contentRatio < 0.10) {
        this.issues.nearBlankPages.push({
          page: pageNum,
          contentRatio: metrics.contentRatio,
          contentLocation: metrics.contentLocation,
          reason: 'Less than 10% content'
        });
      }
      
      // Detect orphans (content only in top or bottom 20%)
      if (metrics.isOrphan) {
        this.issues.orphanPages.push({
          page: pageNum,
          orphanType: metrics.orphanType,
          contentLocation: metrics.contentLocation
        });
      }
      
      // Detect other layout issues
      if (metrics.hasAsymmetry) {
        this.issues.layoutIssues.push({
          page: pageNum,
          issue: 'Content heavily skewed to one side',
          details: metrics.asymmetryDetails
        });
      }
      
    } catch (error) {
      console.error(`Error analyzing page ${pageNum}:`, error);
    }
  }

  calculateMetrics(pixels, width, height) {
    let nonWhitePixels = 0;
    let topContent = 0;
    let bottomContent = 0;
    let leftContent = 0;
    let rightContent = 0;
    
    const threshold = 250; // RGB values above this are considered "white"
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        const r = pixels[idx];
        const g = pixels[idx + 1];
        const b = pixels[idx + 2];
        
        if (r < threshold || g < threshold || b < threshold) {
          nonWhitePixels++;
          
          // Track content location
          if (y < height * 0.2) topContent++;
          if (y > height * 0.8) bottomContent++;
          if (x < width * 0.5) leftContent++;
          else rightContent++;
        }
      }
    }
    
    const totalPixels = width * height;
    const contentRatio = nonWhitePixels / totalPixels;
    
    // Determine content location
    let contentLocation = 'distributed';
    let isOrphan = false;
    let orphanType = '';
    
    if (nonWhitePixels > 0) {
      const topRatio = topContent / nonWhitePixels;
      const bottomRatio = bottomContent / nonWhitePixels;
      
      if (topRatio > 0.8) {
        contentLocation = 'top';
        isOrphan = true;
        orphanType = 'widow';
      } else if (bottomRatio > 0.8) {
        contentLocation = 'bottom';
        isOrphan = true;
        orphanType = 'orphan';
      }
    }
    
    // Check for asymmetry
    const hasAsymmetry = Math.abs(leftContent - rightContent) / nonWhitePixels > 0.3;
    
    return {
      contentRatio,
      contentLocation,
      isOrphan,
      orphanType,
      hasAsymmetry,
      asymmetryDetails: {
        leftRatio: leftContent / nonWhitePixels,
        rightRatio: rightContent / nonWhitePixels
      }
    };
  }

  generateReport() {
    const report = {
      summary: {
        totalIssues: 
          this.issues.blankPages.length + 
          this.issues.orphanPages.length + 
          this.issues.nearBlankPages.length +
          this.issues.layoutIssues.length,
        blankPages: this.issues.blankPages.length,
        orphanPages: this.issues.orphanPages.length,
        nearBlankPages: this.issues.nearBlankPages.length,
        layoutIssues: this.issues.layoutIssues.length
      },
      details: this.issues,
      recommendations: this.generateRecommendations()
    };
    
    return report;
  }

  generateRecommendations() {
    const recs = [];
    
    if (this.issues.blankPages.length > 0) {
      recs.push({
        priority: 'HIGH',
        action: 'Remove blank pages',
        pages: this.issues.blankPages.map(p => p.page),
        description: 'These pages contain less than 2% content and should be removed'
      });
    }
    
    if (this.issues.orphanPages.length > 0) {
      recs.push({
        priority: 'MEDIUM',
        action: 'Fix orphaned content',
        pages: this.issues.orphanPages.map(p => p.page),
        description: 'Content appears only at top/bottom of page - merge with adjacent pages'
      });
    }
    
    if (this.issues.nearBlankPages.length > 0) {
      recs.push({
        priority: 'MEDIUM',
        action: 'Consolidate sparse pages',
        pages: this.issues.nearBlankPages.map(p => p.page),
        description: 'Pages with minimal content should be merged or expanded'
      });
    }
    
    return recs;
  }
}

// Run analysis
async function main() {
  const buildDir = process.argv[2];
  if (!buildDir) {
    console.error('Usage: node detect-blank-orphan-pages.js <build-directory>');
    process.exit(1);
  }
  
  const analyzer = new PageAnalyzer(buildDir);
  const report = await analyzer.analyzeAllPages();
  
  console.log('\n📊 ANALYSIS REPORT\n');
  console.log('Summary:');
  console.log(`  Total Issues: ${report.summary.totalIssues}`);
  console.log(`  Blank Pages: ${report.summary.blankPages}`);
  console.log(`  Orphan Pages: ${report.summary.orphanPages}`);
  console.log(`  Near-Blank Pages: ${report.summary.nearBlankPages}`);
  console.log(`  Layout Issues: ${report.summary.layoutIssues}`);
  
  if (report.summary.totalIssues > 0) {
    console.log('\n🔴 Issues Found:\n');
    
    if (report.details.blankPages.length > 0) {
      console.log('BLANK PAGES:');
      report.details.blankPages.forEach(p => {
        console.log(`  - Page ${p.page}: ${p.reason}`);
      });
    }
    
    if (report.details.orphanPages.length > 0) {
      console.log('\nORPHAN PAGES:');
      report.details.orphanPages.forEach(p => {
        console.log(`  - Page ${p.page}: ${p.orphanType} (content at ${p.contentLocation})`);
      });
    }
    
    if (report.details.nearBlankPages.length > 0) {
      console.log('\nNEAR-BLANK PAGES:');
      report.details.nearBlankPages.forEach(p => {
        console.log(`  - Page ${p.page}: ${(p.contentRatio * 100).toFixed(1)}% content`);
      });
    }
    
    console.log('\n📋 Recommendations:\n');
    report.recommendations.forEach(rec => {
      console.log(`[${rec.priority}] ${rec.action}`);
      console.log(`  Pages: ${rec.pages.join(', ')}`);
      console.log(`  ${rec.description}\n`);
    });
  } else {
    console.log('\n✅ No layout issues detected!');
  }
  
  // Write detailed report
  const fs = await import('fs/promises');
  await fs.writeFile(
    join(buildDir, 'layout-analysis.json'),
    JSON.stringify(report, null, 2)
  );
  
  process.exit(report.summary.totalIssues > 0 ? 1 : 0);
}

main().catch(console.error);