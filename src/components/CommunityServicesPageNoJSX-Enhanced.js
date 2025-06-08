import React from 'react';
import { Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { styles, spacing } from '../theme.js';
import { 
  PageFooterNoJSX, 
  SectionBannerNoJSX,
  CalloutBoxNoJSX,
  TwoColumnLayoutNoJSX,
  TableNoJSX 
} from './DesignComponents.js';
import SectionDivider from './SectionDivider.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const assetMap = JSON.parse(readFileSync(join(__dirname, '../assetMap.json'), 'utf8'));

export default function CommunityServicesPageNoJSXEnhanced({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const servicesStyles = StyleSheet.create({
    serviceBox: {
      backgroundColor: colors.lightGray,
      padding: spacing.md,
      marginBottom: spacing.sm,
      borderLeftWidth: 3,
      borderLeftColor: colors.mustard,
  },
    serviceName: {
      fontSize: typography.subtitle,
      fontFamily: typography.families.heading,
      fontWeight: typography.weights.bold,
      color: colors.forestGreen,
      marginBottom: spacing.xs,
  },
    serviceDesc: {
      fontSize: typography.body,
      color: colors.darkCharcoal,
      lineHeight: typography.lineHeightNormal,
  },
    winterTip: {
      backgroundColor: '#E3F2FD',
      borderLeftWidth: 4,
      borderLeftColor: '#2196F3',
      padding: spacing.md,
      marginVertical: spacing.md,
  },
    winterTipTitle: {
      fontSize: typography.subtitle,
      fontFamily: typography.families.heading,
      fontWeight: typography.weights.bold,
      color: colors.infoDark,
      marginBottom: spacing.xs,
  },
    mapContainer: {
      marginVertical: spacing.lg,
      alignItems: 'center',
  },
    map: {
      width: '100%',
      height: 280,
      borderRadius: callout.radius,
      borderWidth: 1,
      borderColor: colors.slateGray,
  },
    mapCaption: {
      fontSize: typography.caption,
      fontStyle: 'italic',
      color: colors.warmGray,
      textAlign: 'center',
      marginTop: spacing.sm,
  },
    iconBullet: {
      width: 20,
      flexDirection: 'row',
      alignItems: 'flex-start', // Changed from 'center' to align with text baseline
      marginRight: spacing.xs,
  },
    iconText: {
      fontSize: typography.sizes.h3,
      color: colors.mustard,
      lineHeight: typography.lineHeights.tight, // Ensure icon doesn't add extra line height
  },
    trashServiceRow: {
      flexDirection: 'row',
      marginBottom: spacing.sm,
      paddingBottom: spacing.sm,
      borderBottomWidth: 0.5,
      borderBottomColor: colors.lightGray,
  },
    trashServiceName: {
      flex: 1,
      fontSize: typography.body,
      fontWeight: typography.weights.bold,
      color: colors.forestGreen,
  },
    trashServicePhone: {
      fontSize: typography.body,
      color: colors.darkCharcoal,
  },
    bearWarning: {
      backgroundColor: '#FFF3CD',
      borderWidth: 2,
      borderColor: '#5D4037', // Dark brown
      padding: spacing.md,
      marginVertical: spacing.md,
      borderRadius: callout.radius,
  },
    bearIcon: {
      fontSize: typography.sizes.h2,
      textAlign: 'center',
      marginBottom: spacing.xs,
  },
    internetProviderBox: {
      marginBottom: spacing.md,
      paddingBottom: spacing.md,
      borderBottomWidth: 0.5,
      borderBottomColor: colors.lightGray,
  },
    providerName: {
      fontSize: typography.subtitle,
      fontFamily: typography.families.heading,
      fontWeight: typography.weights.bold,
      color: colors.forestGreen,
      marginBottom: 2,
  },
    providerType: {
      fontSize: typography.caption,
      color: colors.mustard,
      marginBottom: spacing.xs,
  },
    providerDesc: {
      fontSize: typography.body,
      color: colors.darkCharcoal,
      lineHeight: typography.lineHeightNormal,
  }
});

  // Return array of pages
  return [
    // Section Divider Page
    e(SectionDivider, {
      number: '05',
      title: 'COMMUNITY SERVICES\n& AMENITIES',
      description: 'Essential services and resources that support our mountain community lifestyle'
  }),
    
    // Roads & Winter Weather Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      
      // Section Banner
      e(SectionBannerNoJSX, {
        number: 'SECTION 5',
        title: 'COMMUNITY SERVICES & AMENITIES',
        subtitle: 'Road maintenance, waste disposal, utilities, and essential services'
    }),
      
      e(Text, { style: styles.h1 }, 'ROADS & WINTER WEATHER'),
      
      e(TwoColumnLayoutNoJSX, {
        left: e(
          View,
          null,
          e(Text, { style: styles.paragraph },
            'Blue Mountain\'s road network presents unique challenges, particularly during winter weather. Understanding maintenance procedures helps you navigate safely year-round.'
          ),
          
          e(Text, { style: styles.h2 }, 'ROAD MAINTENANCE'),
          e(
            CalloutBoxNoJSX,
            { type: 'info' },
            e(Text, { style: { fontWeight: typography.weights.bold, marginBottom: spacing.xs } }, 
              'BMPOA maintains all private roads except:'
            ),
            e(Text, { style: styles.bulletItem }, '• Fire Trail Road (contact VDGIF)'),
            e(Text, { style: styles.bulletItem }, '• State roads (VDOT maintained)')
          ),
          
          e(Text, { style: { fontWeight: typography.weights.bold, marginTop: spacing.md } }, 'Services include:'),
          e(View, { style: styles.bulletList },
            e(Text, { style: styles.bulletItem }, '• Regular grading of gravel roads'),
            e(Text, { style: styles.bulletItem }, '• Pothole filling and drainage maintenance'),
            e(Text, { style: styles.bulletItem }, '• Winter weather response and snow removal'),
            e(Text, { style: styles.bulletItem }, '• Vegetation control along roadways'),
            e(Text, { style: styles.bulletItem }, '• 🌲 Fallen tree removal after storms')
          ),
          
          e(
            View,
            { style: servicesStyles.winterTip },
            e(Text, { style: servicesStyles.winterTipTitle }, 'SALT USE PROHIBITED'),
            e(Text, { style: { fontSize: typography.body } }, 
              'Salt damages gravel roadbeds. Use approved alternatives for traction.'
            )
          )
        ),
        right: e(
          View,
          null,
          e(Text, { style: styles.h2 }, 'WINTER TRACTION'),
          
          e(
            View,
            { style: servicesStyles.serviceBox },
            e(Text, { style: servicesStyles.serviceName }, 'Gravel Chips'),
            e(Text, { style: servicesStyles.serviceDesc }, 
              'Blue poly barrels on hills contain crushed gravel for traction. Notify Roads Committee when refills needed.'
            )
          ),
          
          e(
            View,
            { style: servicesStyles.serviceBox },
            e(Text, { style: servicesStyles.serviceName }, 'Tire Chains'),
            e(Text, { style: servicesStyles.serviceDesc }, 
              'Essential for poor conditions. Practice installation in advance. Cable chains easier than traditional.'
            )
          ),
          
          e(Text, { style: [styles.h2, { marginTop: spacing.md }] }, 'SNOW REMOVAL'),
          e(View, { style: styles.bulletList },
            e(Text, { style: styles.bulletItem }, '• Plowing begins at 4" accumulation'),
            e(Text, { style: styles.bulletItem }, '• Main roads first priority'),
            e(Text, { style: styles.bulletItem }, '• Steep sections get extra attention'),
            e(Text, { style: styles.bulletItem }, '• Be patient during major storms')
          ),
          
          e(
            CalloutBoxNoJSX,
            { title: 'REPORT ISSUES', type: 'tip' },
            e(Text, { style: { fontSize: typography.body } }, 'Email: bmpoaroads@gmail.com'),
            e(Text, { style: { fontSize: typography.caption, marginTop: spacing.xs } }, 
              'Include location, photos if possible'
            )
          )
        )
    }),
      
      // Footer
      e(PageFooterNoJSX, { pageNumber: 22 })
    ),

    // Refuse Collection Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      
      e(Text, { style: styles.h1 }, 'REFUSE COLLECTION & DISPOSAL'),
      
      // Bear Warning Box
      e(
        View,
        { style: servicesStyles.bearWarning },
        e(Text, { style: servicesStyles.bearIcon }, '🐻'),
        e(Text, { style: { fontSize: typography.subtitle, fontWeight: typography.weights.bold, textAlign: 'center', color: colors.brown } }, 
          'BEAR COUNTRY WARNING'
        ),
        e(Text, { style: { fontSize: typography.body, color: colors.brown, textAlign: 'center' } }, 
          'Improperly stored trash attracts bears. Use bear-resistant containers and never leave trash out overnight.'
        )
      ),
      
      e(Text, { style: styles.h2 }, 'WARREN COUNTY CONVENIENCE SITES'),
      
      // Waste Site Schedule Table
      e(TableNoJSX, {
        headers: ['Location', 'Address', 'Hours'],
        rows: [
          ['Linden (Closest)', '2664 Dismal Hollow Rd', '⏰ Tu-Sa: 7AM-7PM\n⏰ Su: 9AM-5PM'],
          ['Cooley', '10037 Winchester Rd', '⏰ Tu-Sa: 7AM-7PM\n⏰ Su: 9AM-5PM'],
          ['Rockledge', '9823 S. Jackson Hwy', '⏰ Tu-Sa: 7AM-7PM\n⏰ Su: 9AM-5PM'],
          ['Shenandoah Farms', '47 Blue Mountain Rd', '⏰ Tu-Sa: 7AM-7PM\n⏰ Su: 9AM-5PM'],
          ['Bentonville*', '232 Shangri-La Rd', '⏰ Tu-Sa: 7AM-7PM\n⏰ Su: 9AM-5PM']
        ],
        columnWidths: [140, 200, 100]
    }),
      e(Text, { style: { fontSize: typography.caption, fontStyle: 'italic', marginTop: spacing.xs } }, 
        '*Bentonville accepts large/bulky items. All sites closed Mondays and holidays.'
      ),
      
      // Warren County Map
      assetMap.warrencountywastemap && e(
        View,
        { style: servicesStyles.mapContainer },
        e(Image, { 
          src: assetMap.warrencountywastemap, 
          style: servicesStyles.map 
      }),
        e(Text, { style: servicesStyles.mapCaption }, 
          'Warren County waste disposal sites. Linden location is closest to BMPOA.'
        )
      ),
      
      e(TwoColumnLayoutNoJSX, {
        left: e(
          View,
          null,
          e(Text, { style: styles.h2 }, 'PRIVATE SERVICES'),
          e(
            View,
            { style: servicesStyles.trashServiceRow },
            e(Text, { style: servicesStyles.trashServiceName }, 'Freedom Disposal'),
            e(Text, { style: servicesStyles.trashServicePhone }, '(540) 631-3467')
          ),
          e(
            View,
            { style: servicesStyles.trashServiceRow },
            e(Text, { style: servicesStyles.trashServiceName }, 'Skyline Trash'),
            e(Text, { style: servicesStyles.trashServicePhone }, '(540) 974-9418')
          ),
          
          e(Text, { style: { fontWeight: typography.weights.bold, marginTop: spacing.md } }, 'Best Practices:'),
          e(View, { style: styles.bulletList },
            e(Text, { style: styles.bulletItem }, '• Use bear-resistant containers'),
            e(Text, { style: styles.bulletItem }, '• Morning pickup only'),
            e(Text, { style: styles.bulletItem }, '• Clean containers regularly')
          )
        ),
        right: e(
          View,
          null,
          e(Text, { style: styles.h2 }, 'RECYCLING'),
          e(View, { style: styles.bulletList },
            e(Text, { style: styles.bulletItem }, '• Paper and cardboard (flattened)'),
            e(Text, { style: styles.bulletItem }, '• Glass bottles and jars (sorted by color)'),
            e(Text, { style: styles.bulletItem }, '• Metal cans (aluminum and steel)'),
            e(Text, { style: styles.bulletItem }, '• Plastics #1 and #2 only'),
            e(Text, { style: styles.bulletItem }, '• Motor oil at designated collection sites')
          ),
          
          e(
            CalloutBoxNoJSX,
            { title: 'ILLEGAL DUMPING', type: 'warning' },
            e(Text, { style: { fontSize: typography.body } }, 
              'Report to Warren County Sheriff:'
            ),
            e(Text, { style: { fontSize: typography.subtitle, fontWeight: typography.weights.bold } }, 
              '(540) 635-4128'
            )
          )
        )
    }),
      
      // Footer
      e(PageFooterNoJSX, { pageNumber: 24 })
    ),

    // Internet Services Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      
      e(Text, { style: styles.h1 }, 'INTERNET SERVICE PROVIDERS'),
      
      e(Text, { style: styles.paragraph },
        'Due to our mountain location, internet options vary by specific location. Check with neighbors for local experiences before committing to a provider.'
      ),
      
      e(TwoColumnLayoutNoJSX, {
        left: e(
          View,
          null,
          e(Text, { style: styles.h2 }, 'WIRED SERVICES'),
          
          e(
            View,
            { style: servicesStyles.internetProviderBox },
            e(Text, { style: servicesStyles.providerName }, 'Xfinity/Comcast'),
            e(Text, { style: servicesStyles.providerType }, 'Cable Internet'),
            e(Text, { style: servicesStyles.providerDesc }, 
              'Available in many areas. High speeds when available. Call 1-855-399-1542 for availability.'
            )
          ),
          
          e(
            View,
            { style: servicesStyles.internetProviderBox },
            e(Text, { style: servicesStyles.providerName }, 'CenturyLink'),
            e(Text, { style: servicesStyles.providerType }, 'DSL'),
            e(Text, { style: servicesStyles.providerDesc }, 
              'Limited availability. Speeds vary significantly by location.'
            )
          ),
          
          e(Text, { style: styles.h2 }, 'SATELLITE OPTIONS'),
          
          e(
            View,
            { style: servicesStyles.internetProviderBox },
            e(Text, { style: servicesStyles.providerName }, 'Starlink'),
            e(Text, { style: servicesStyles.providerType }, 'Low-Earth Orbit Satellite'),
            e(Text, { style: servicesStyles.providerDesc }, 
              'Best satellite option. High speeds, low latency. Works everywhere. Higher upfront cost.'
            )
          ),
          
          e(
            View,
            { style: servicesStyles.internetProviderBox },
            e(Text, { style: servicesStyles.providerName }, 'HughesNet/Viasat'),
            e(Text, { style: servicesStyles.providerType }, 'Traditional Satellite'),
            e(Text, { style: servicesStyles.providerDesc }, 
              'Available everywhere. Higher latency, data caps common.'
            )
          )
        ),
        right: e(
          View,
          null,
          e(Text, { style: styles.h2 }, 'MOBILE OPTIONS'),
          
          e(
            View,
            { style: servicesStyles.internetProviderBox },
            e(Text, { style: servicesStyles.providerName }, 'Cellular Hotspots'),
            e(Text, { style: servicesStyles.providerType }, 'Verizon, AT&T, T-Mobile'),
            e(Text, { style: servicesStyles.providerDesc }, 
              'Coverage varies by location. Test signal strength first. Consider signal boosters.'
            )
          ),
          
          e(
            CalloutBoxNoJSX,
            { title: 'REMOTE WORK TIPS', type: 'tip' },
            e(Text, { style: styles.bulletItem }, '✓ Test service before signing contracts'),
            e(Text, { style: styles.bulletItem }, '✓ Have backup connectivity option ready'),
            e(Text, { style: styles.bulletItem }, '✓ Consider battery backup/generator for power'),
            e(Text, { style: styles.bulletItem }, '✓ Cell signal boosters may improve coverage'),
            e(Text, { style: styles.bulletItem }, '✓ Check bandwidth requirements for work')
          ),
          
          e(
            CalloutBoxNoJSX,
            { title: '📶 COMMUNITY RESOURCES', type: 'info' },
            e(Text, { style: { fontSize: typography.body, marginBottom: spacing.xs } }, 
              'Need temporary internet access? Try these options:'
            ),
            e(Text, { style: styles.bulletItem }, '• Blue Mountain Lodge - WiFi available during events'),
            e(Text, { style: styles.bulletItem }, '• Samuels Public Library (Front Royal) - Free high-speed internet'),
            e(Text, { style: styles.bulletItem }, '• Local coffee shops and restaurants in Front Royal')
          )
        )
    }),
      
      // Footer
      e(PageFooterNoJSX, { pageNumber: 26 })
    )
  ];
}