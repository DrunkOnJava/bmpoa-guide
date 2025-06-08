import React from 'react';
import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { styles, spacing } from '../theme.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { MixedLayout, QuoteBox, FeatureBox } from './AdvancedLayoutComponents.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const assetMap = JSON.parse(readFileSync(join(__dirname, '../assetMap.json'), 'utf8'));

export default function WelcomeLetterPageNoJSX({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const letterStyles = StyleSheet.create({
    page: {
      padding: '0.75in',
      backgroundColor: colors.white,
  },
    headerSection: {
      textAlign: 'center',
      marginBottom: layout.spacing.lg,
  },
    title: {
      fontSize: typography.sizes.h2,
      fontWeight: typography.weights.bold,
      color: colors.forestGreen,
      marginBottom: layout.spacing.sm,
      letterSpacing: 0.5,
  },
    tagline: {
      fontSize: typography.sizes.medium,
      fontStyle: 'italic',
      color: colors.darkCharcoal,
      marginBottom: 0,
  },
    emblemImage: {
      width: 120,
      height: 120,
      marginBottom: layout.spacing.md,
      marginTop: layout.spacing.md,
      alignSelf: 'center',
  },
    salutation: {
      fontSize: typography.sizes.medium,
      fontWeight: typography.weights.bold,
      marginBottom: layout.spacing.md,
      color: colors.darkCharcoal,
  },
    paragraph: {
      fontSize: typography.sizes.base,
      lineHeight: typography.lineHeights.relaxed,
      marginBottom: layout.spacing.md,
      textAlign: 'justify',
      color: colors.darkCharcoal,
  },
    bulletPoint: {
      fontSize: typography.sizes.base,
      marginBottom: 6,
      paddingLeft: 16,
      lineHeight: typography.lineHeights.relaxed,
      color: colors.darkCharcoal,
  },
    sectionTitle: {
      fontSize: typography.sizes.medium,
      fontWeight: typography.weights.bold,
      color: colors.forestGreen,
      marginTop: layout.spacing.lg,
      marginBottom: layout.spacing.sm,
      letterSpacing: 0.3,
  },
    signature: {
      marginTop: 20,
      fontSize: typography.sizes.base,
  },
    signatureName: {
      fontSize: typography.sizes.base,
      fontWeight: typography.weights.bold,
      marginTop: layout.spacing.xs,
      color: colors.forestGreen,
  },
    contactBox: {
      backgroundColor: colors.backgroundAlt,
      padding: layout.spacing.lg,
      borderRadius: 6,
      marginTop: 20,
      borderWidth: 1,
      borderColor: '#E0E0E0',
  },
    contactTitle: {
      fontSize: typography.sizes.base,
      fontWeight: typography.weights.bold,
      marginBottom: 6,
      color: colors.forestGreen,
  },
    contactInfo: {
      fontSize: typography.sizes.sm,
      lineHeight: typography.lineHeights.relaxed,
      color: colors.darkCharcoal,
  },
    pageNumber: {
      position: 'absolute',
      bottom: 36,
      right: 36,
      fontSize: typography.sizes.sm,
      color: colors.warmGray,
  },
    divider: {
      height: 1,
      backgroundColor: colors.forestGreen,
      marginVertical: 16,
      opacity: 0.3,
  }
});
  
  return e(
    Page,
    { size: 'LETTER', style: letterStyles.page },
    
    // Header Section
    e(View, { style: letterStyles.headerSection },
      e(Text, { style: letterStyles.title }, 'Welcome to Blue Mountain'),
      e(Text, { style: letterStyles.tagline }, 
        '"A Community United by Natural Beauty and Shared Stewardship"'
      )
    ),
    
    // BMPOA Emblem
    assetMap.bmpoaemblem && e(View, { style: { alignItems: 'center', marginVertical: 16 } },
      e(Image, { 
        src: assetMap.bmpoaemblem, 
        style: letterStyles.emblemImage 
    })
    ),
    
    // Letter Content
    e(View, null,
      e(Text, { style: letterStyles.salutation }, 'Dear Neighbor,'),
      
      e(Text, { style: letterStyles.paragraph },
        "Welcome to the Blue Mountain Property Owners Association (BMPOA) and the Blue Mountain Sanitary District. Whether you're a new resident, a longtime property owner, or considering joining our community, this booklet serves as your comprehensive guide to life on Blue Mountain. Our mountain community is special. Created in the late 1950s as a vacation retreat for Washington D.C. area residents, Blue Mountain has evolved into a unique blend of weekend retreats and year-round homes. We are bound together not just by property lines, but by our shared appreciation for the natural beauty that surrounds us and our commitment to preserving it for future generations."
      ),
      
      e(Text, { style: letterStyles.sectionTitle }, 'What Makes Blue Mountain Unique'),
      
      e(Text, { style: letterStyles.bulletPoint }, 
        '• Natural Beauty: From our famous trillium blooms to scenic mountain vistas, we live in one of Virginia\'s most beautiful settings'
      ),
      e(Text, { style: letterStyles.bulletPoint }, 
        '• Community Spirit: Our volunteer-run association brings neighbors together through social events, shared amenities, and mutual support'
      ),
      e(Text, { style: letterStyles.bulletPoint }, 
        '• Environmental Stewardship: We\'re a certified FireWise Community committed to forest health and wildfire prevention'
      ),
      e(Text, { style: letterStyles.bulletPoint }, 
        '• Rich History: Over six decades of stories, traditions, and careful development have shaped our community'
      ),
      
      e(Text, { style: letterStyles.sectionTitle }, 'Your Role in Our Community'),
      
      e(Text, { style: letterStyles.paragraph },
        "As a property owner, you're not just a resident—you're a steward of this special place. Your participation in community events, adherence to our covenants, and support of association initiatives help maintain the character and value of Blue Mountain."
      ),
      
      e(View, { style: { backgroundColor: '#E8F5E9', padding: layout.spacing.md, borderRadius: 6, marginVertical: 16, borderLeftWidth: 4, borderLeftColor: colors.forestGreen } },
        e(Text, { style: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold, marginBottom: layout.spacing.xs, color: colors.forestGreen } }, 'THIS GUIDE CONTAINS:'),
        e(Text, { style: { fontSize: typography.sizes.base, lineHeight: typography.lineHeights.relaxed } }, 'Essential information about emergency contacts, community rules, amenities, safety guidelines, social activities, and natural resources.')
      ),
      
      e(Text, { style: letterStyles.sectionTitle }, 'Getting Involved'),
      
      e(Text, { style: letterStyles.paragraph },
        "We encourage you to attend board meetings (first Saturday of each month), join our Facebook groups for community updates, participate in social events and work days, volunteer for committees that interest you, and share your skills and ideas with the board. Thank you for being part of Blue Mountain. Together, we maintain not just properties, but a way of life that celebrates nature, community, and the simple pleasure of mountain living."
      ),
      
      // Signature
      e(View, { style: letterStyles.signature },
        e(Text, null, 'Warmly,'),
        e(Text, { style: letterStyles.signatureName }, 'The BMPOA Board of Directors')
      ),
      
      // Contact Box
      e(View, { style: letterStyles.contactBox },
        e(Text, { style: letterStyles.contactTitle }, 'Contact Us'),
        e(Text, { style: letterStyles.contactInfo }, 'BMPOA Board of Directors'),
        e(Text, { style: letterStyles.contactInfo }, 'P.O. Box 114, Linden, VA 22642'),
        e(Text, { style: letterStyles.contactInfo }, 'Email: bmpoaoffice@gmail.com'),
        e(Text, { style: letterStyles.contactInfo }, 'Website: bluemountainpoa.org')
      )
    ),
    
    // Page Number
    e(Text, { style: letterStyles.pageNumber }, '2')
  );
}