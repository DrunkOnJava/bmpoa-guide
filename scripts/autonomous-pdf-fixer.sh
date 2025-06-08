#!/bin/bash

# Autonomous PDF Build & Fix System
# Continuously builds and fixes issues until clean

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
MAX_ITERATIONS=10
ITERATION=0

echo "🤖 AUTONOMOUS PDF FIXER"
echo "======================"
echo "Starting automated build and fix cycle..."
echo ""

cd "$PROJECT_DIR"

while [ $ITERATION -lt $MAX_ITERATIONS ]; do
  ITERATION=$((ITERATION + 1))
  echo "🔄 ITERATION $ITERATION/$MAX_ITERATIONS"
  echo "========================"
  
  # Build PDF
  echo "📄 Building PDF..."
  npm run pdf > build-log.txt 2>&1
  
  if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    tail -20 build-log.txt
    exit 1
  fi
  
  # Get latest build directory
  LATEST_BUILD=$(ls -td output/builds/* | head -1)
  echo "✅ Build successful: $LATEST_BUILD"
  
  # Run blank page detection
  echo "🔍 Detecting blank pages..."
  ./scripts/simple-blank-detector.sh "$LATEST_BUILD" > detection-log.txt
  ISSUES=$?
  
  if [ $ISSUES -eq 0 ]; then
    echo "✅ No blank pages detected!"
    echo "🎉 PDF is clean after $ITERATION iterations"
    break
  fi
  
  echo "❌ Found $ISSUES issues"
  cat detection-log.txt | grep -E "❌|⚠️"
  
  # Analyze and fix issues
  echo "🔧 Attempting automatic fixes..."
  
  # Extract issue details
  BLANK_PAGES=$(grep "❌.*BLANK" detection-log.txt | grep -o "Page [0-9]\+" | grep -o "[0-9]\+")
  NEAR_BLANK_PAGES=$(grep "⚠️.*NEAR-BLANK" detection-log.txt | grep -o "Page [0-9]\+" | grep -o "[0-9]\+")
  
  # Fix blank page 9 (Governance issue)
  if echo "$BLANK_PAGES" | grep -q "^9$"; then
    echo "🔧 Fixing blank page 9 (Governance component)..."
    # Create fixed version that returns array properly
    cat > src/components/GovernancePageNoJSX-Enhanced-Fixed.js << 'EOF'
import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { styles } from '../theme.js';
import { 
  InfoBox, 
  TwoColumnLayout,
  QuickFactsBox,
  DenseText,
  CompactSectionHeader,
  CompactSubsectionHeader
} from './EnhancedLayoutComponents.js';
import { ChecklistBox } from './ExtendedLayoutComponents.js';
import { FeatureBox } from './AdvancedLayoutComponents.js';

export default function GovernancePageNoJSXEnhancedFixed({ pageNumberMap = {} }) {
  const e = React.createElement;

  const governanceStyles = StyleSheet.create({
    missionBox: {
      backgroundColor: colors.lightGray,
      borderLeft: `4px solid ${colors.forestGreen}`,
      padding: layout.spacing.md,
      marginBottom: layout.spacing.md,
    },
    officerList: {
      paddingLeft: layout.spacing.md,
      marginTop: layout.spacing.xs,
    },
    benefitItem: {
      fontSize: typography.sizes.sm,
      lineHeight: typography.lineHeights.relaxed,
      marginBottom: layout.spacing.xs,
    }
  });

  // Return array to prevent blank pages
  return [
    e(
      Page,
      { key: 'governance-main', size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'GOVERNANCE & STRUCTURE')
      ),
      e(
        TwoColumnLayout,
        { 
          sidebarContent: [
            e(InfoBox, {
              key: 'membership',
              title: 'YOUR MEMBERSHIP',
              content: [
                'As a Blue Mountain property owner, you are automatically a member of the Association.',
                '',
                'No additional dues required - community services are funded through the Sanitary District tax collected with your property taxes.'
              ]
            }),

            e(QuickFactsBox, {
              key: 'board-structure',
              facts: [
                { label: 'Board Size', value: '9 members' },
                { label: 'Officers', value: '5 positions' },
                { label: 'Directors', value: '4 at-large' },
                { label: 'Terms', value: '2 years' },
                { label: 'Election', value: 'Annual Meeting' }
              ]
            }),

            e(InfoBox, {
              key: 'officers',
              title: 'BOARD OFFICERS',
              content: [
                '• President',
                '• First Vice President', 
                '• Second Vice President',
                '• Secretary',
                '• Treasurer',
                '',
                'Plus 4 Directors-at-Large'
              ]
            }),

            e(InfoBox, {
              key: 'budget-process',
              title: 'ANNUAL BUDGET',
              content: [
                'Board → Annual Meeting → County → Owners',
                '',
                'Ensures community oversight.'
              ]
            })
          ]
        },
        
        e(Text, { style: styles.h2 }, 'BMPOA OVERVIEW'),
        
        e(DenseText, null, 
          'The Blue Mountain Property Owners Association (BMPOA) is your voice in maintaining and improving our mountain community. Established in 1975, the Association serves all property owners within the Blue Mountain Subdivision in Warren County, Virginia.'
        ),

        e(View, {
          style: governanceStyles.missionBox
        },
          e(Text, { style: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold, marginBottom: layout.spacing.xs, color: colors.forestGreen } }, 
            'BMPOA MISSION'
          ),
          e(ChecklistBox, {
            title: null,
            items: [
              'Promote the health, safety, and general welfare of its members',
              'Preserve the natural beauty of the subdivision',
              'Maintain roads and common areas',
              'Protect property values',
              'Foster a sense of community among residents',
              'Provide information and resources to property owners'
            ]
          })
        ),

        e(Text, { style: styles.h3 }, 'LEGAL STATUS'),
        
        e(DenseText, null, 
          'The BMPOA is a Virginia non-stock corporation formed under state law. We operate as the managing agent for the Blue Mountain Sanitary District, which provides funding for our operations through a special tax assessment collected with your property taxes.'
        ),

        e(Text, { style: styles.h3 }, 'SANITARY DISTRICT BENEFITS'),
        
        e(FeatureBox, {
          title: 'WHY THIS MATTERS TO YOU',
          content: 'Our Sanitary District status ensures that all property owners, including developers, contribute fairly to community maintenance. Taxes are collected reliably by Warren County, may be tax-deductible, and qualify us for disaster relief funds.'
        })
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(View, { style: styles.footerLine }),
        e(View, { style: styles.footerContent },
          e(Text, null, 'BMPOA Community Guide'),
          e(Text, { style: styles.footerPageNumber }, pageNumberMap.governance || '4'),
          e(Text, null, 'www.bmpoa.org')
        )
      )
    )
  ];
}
EOF
  fi
  
  # Fix near-blank page 28 (Deer Lake overflow)
  if echo "$NEAR_BLANK_PAGES" | grep -q "^28$"; then
    echo "🔧 Fixing near-blank page 28 (Deer Lake overflow)..."
    # This would need component-specific fixes
  fi
  
  # Add delay to avoid rapid rebuilds
  sleep 2
done

if [ $ITERATION -eq $MAX_ITERATIONS ]; then
  echo "⚠️  Maximum iterations reached. Manual intervention required."
  exit 1
fi

echo ""
echo "📊 FINAL REPORT"
echo "=============="
echo "Iterations: $ITERATION"
echo "Final build: $LATEST_BUILD"
echo ""
ls -la output/BMPOA-Guide.pdf