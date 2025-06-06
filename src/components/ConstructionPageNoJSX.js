import React from 'react';
import { Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import { styles, colors, spacing } from '../theme.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import SectionDivider from './SectionDivider.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const assetMap = JSON.parse(readFileSync(join(__dirname, '../assetMap.json'), 'utf8'));

export default function ConstructionPageNoJSX({ pageNumberMap = {} }) {
  const e = React.createElement;

  const constructionStyles = StyleSheet.create({
    sectionDivider: {
      backgroundColor: colors.primary,
      color: '#fff',
      padding: spacing.xl,
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100%',
    },
    sectionNumber: {
      fontSize: 72,
      fontWeight: 'bold',
      marginBottom: spacing.lg,
      opacity: 0.9,
    },
    sectionTitle: {
      fontSize: 36,
      fontWeight: 'bold',
      marginBottom: spacing.lg,
      textAlign: 'center',
    },
    sectionDescription: {
      fontSize: 16,
      textAlign: 'center',
      maxWidth: '80%',
      lineHeight: 1.6,
    },
    alertBox: {
      backgroundColor: '#FFE4E1',
      borderLeft: `4px solid #DC143C`,
      padding: spacing.md,
      marginVertical: spacing.md,
      borderRadius: 4,
    },
    alertTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: spacing.xs,
      color: '#DC143C',
    },
    infoBox: {
      borderWidth: 1,
      borderColor: colors.accent,
      padding: spacing.md,
      marginVertical: spacing.md,
      borderRadius: 4,
    },
    highlightBox: {
      backgroundColor: colors.background,
      padding: spacing.md,
      marginVertical: spacing.md,
      borderRadius: 4,
    },
    highlightTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: spacing.xs,
      color: colors.primary,
    },
    checklistContainer: {
      borderWidth: 1,
      borderColor: colors.accent,
      padding: spacing.md,
      marginVertical: spacing.md,
      borderRadius: 4,
    },
    checklistTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: spacing.sm,
      color: colors.primary,
    },
    checklistItem: {
      marginBottom: spacing.xs,
      paddingLeft: spacing.md,
    },
    paragraph: {
      marginBottom: spacing.sm,
      textAlign: 'justify',
    },
    listItem: {
      marginBottom: spacing.xs,
      paddingLeft: spacing.sm,
    },
    nestedListItem: {
      marginBottom: spacing.xs,
      paddingLeft: spacing.lg,
      fontSize: 11,
    },
    h3: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: spacing.md,
      marginBottom: spacing.sm,
      color: colors.accent,
    },
    h4: {
      fontSize: 14,
      fontWeight: 'bold',
      marginTop: spacing.sm,
      marginBottom: spacing.xs,
    },
    twoColumn: {
      marginBottom: spacing.md,
      columnGap: 22,  // 0.3 inch = 22pt gutter between columns
    },
    resourceList: {
      marginTop: spacing.md,
      padding: spacing.md,
      backgroundColor: colors.background,
      borderRadius: 4,
    },
    prominentText: {
      backgroundColor: colors.background,
      padding: spacing.md,
      marginVertical: spacing.md,
      borderLeft: `4px solid ${colors.primary}`,
      fontSize: 14,
      fontStyle: 'italic',
      color: colors.primary,
    },
    pageImage: {
      width: '100%',
      height: 200,
      marginBottom: spacing.sm,
      objectFit: 'cover',
    },
    imageCaption: {
      fontSize: 10,
      fontStyle: 'italic',
      color: colors.lightText,
      textAlign: 'center',
      marginBottom: spacing.md,
    }
  });

  return [
    // Section Divider Page
    e(SectionDivider, {
      number: '11',
      title: 'NEW HOME CONSTRUCTION',
      description: 'Building or renovating in Blue Mountain requires adherence to specific guidelines that preserve our community\'s character and natural beauty. This section outlines the requirements and approval process for all construction projects.',
      backgroundColor: colors.primary
    }),

    // Pre-Construction Requirements Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'PRE-CONSTRUCTION REQUIREMENTS')
      ),
      e(
        View,
        null,
        e(Text, { style: constructionStyles.paragraph },
          'These requirements work in conjunction with the Blue Mountain Declaration of Protective Covenants, Conditions & Restrictions and BMPOA Bylaws. All construction projects must receive approval from the Architectural Review Committee (ARC) before any work begins.'
        ),

        e(View, { style: constructionStyles.alertBox },
          e(Text, { style: constructionStyles.alertTitle }, 'IMPORTANT: ARC APPROVAL REQUIRED'),
          e(Text, null,
            'Before applying for any Warren County building permit or zoning variance, you must notify and receive approval from the ARC Chair. This includes all new construction, additions, exterior modifications, and accessory buildings.'
          )
        ),

        e(Text, { style: constructionStyles.h3 }, 'SUBMISSION PROCESS'),

        e(View, { style: constructionStyles.twoColumn },
          e(Text, { style: constructionStyles.paragraph },
            'All submissions and questions go to the ARC Chair via the "Contact Us" form on BMPOA.org under "Homeowners." Include:'
          ),
          
          e(Text, { style: constructionStyles.listItem }, '• Your name and email address'),
          e(Text, { style: constructionStyles.listItem }, '• Property address'),
          e(Text, { style: constructionStyles.listItem }, '• Contractor information (must include sponsoring owner)'),
          e(Text, { style: constructionStyles.listItem }, '• Detailed plans and specifications'),
          e(Text, { style: constructionStyles.listItem }, '• Materials list with colors and samples'),
          e(Text, { style: constructionStyles.listItem }, '• Site plan showing setbacks and tree removal'),
          
          e(Text, { style: { ...constructionStyles.paragraph, fontWeight: 'bold', marginTop: spacing.sm } }, 
            'Response Timeline:'
          ),
          e(Text, { style: constructionStyles.listItem }, '• ARC Chair will respond within 30 days with:'),
          e(Text, { style: constructionStyles.nestedListItem }, '- Approval'),
          e(Text, { style: constructionStyles.nestedListItem }, '- Disapproval (with reasons)'),
          e(Text, { style: constructionStyles.nestedListItem }, '- Request for additional information'),
          e(Text, { style: constructionStyles.listItem }, '• If additional information requested, owner has 30 days to supply'),
          e(Text, { style: constructionStyles.listItem }, '• ARC has 30 days to respond after receiving additional information'),
          e(Text, { style: constructionStyles.listItem }, '• If no response within 30 days, request is deemed approved')
        ),
        
        // Site Visit call-out box
        e(View, { style: { 
          backgroundColor: colors.lightGray,
          borderWidth: 0.5,
          borderColor: colors.slateGray,
          padding: spacing.sm,
          marginTop: spacing.md,
          marginBottom: spacing.md,
          borderRadius: 4
        } },
          e(View, { style: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xs } },
            e(Text, { style: { fontSize: 12, marginRight: spacing.xs } }, '🏠'),
            e(Text, { style: { fontSize: 11, fontWeight: 'bold', color: colors.forestGreen } }, 'SITE VISIT')
          ),
          e(Text, { style: { fontSize: 10, color: colors.darkCharcoal } }, 
            'The ARC may require a site visit before final approval to ensure proper siting and minimal environmental impact. This helps verify that plans align with the actual topography and existing vegetation.'
          )
        ),

        e(Text, { style: constructionStyles.h3 }, 'REQUIRED DOCUMENTATION'),

        e(View, { style: constructionStyles.checklistContainer },
          e(Text, { style: constructionStyles.checklistTitle }, 'SUBMISSION CHECKLIST'),
          e(Text, { style: constructionStyles.checklistItem }, '□ Building site plan with all setbacks clearly marked'),
          e(Text, { style: constructionStyles.checklistItem }, '□ Detailed architectural plans and elevations'),
          e(Text, { style: constructionStyles.checklistItem }, '□ Complete materials list with manufacturer and color specifications'),
          e(Text, { style: constructionStyles.checklistItem }, '□ Tree removal plan identifying all trees to be removed'),
          e(Text, { style: constructionStyles.checklistItem }, '□ Grading and drainage plan'),
          e(Text, { style: constructionStyles.checklistItem }, '□ Driveway location and construction details'),
          e(Text, { style: constructionStyles.checklistItem }, '□ Well and septic system locations (if applicable)')
        ),

        e(View, { style: constructionStyles.infoBox },
          e(Text, { style: constructionStyles.highlightTitle }, 'DEVIATIONS FROM APPROVED PLANS'),
          e(Text, null,
            'Any deviation from approved plans risks legal action. If changes become necessary during construction, you must submit revised plans to the ARC for approval before proceeding with the changes.'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, '51')
      )
    ),

    // Building Requirements Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'BUILDING REQUIREMENTS')
      ),
      e(
        View,
        null,
        assetMap.Building1 && e(
          View,
          { style: { marginBottom: spacing.md } },
          e(Image, { src: assetMap.Building1, style: constructionStyles.pageImage }),
          e(Text, { style: constructionStyles.imageCaption }, 'Example of mountain-style architecture that complements Blue Mountain\'s natural setting')
        ),
        
        e(Text, { style: constructionStyles.h3 }, 'PERMITTED STRUCTURES'),

        e(Text, { style: constructionStyles.paragraph }, 'Each lot in Blue Mountain may contain:'),
        e(Text, { style: constructionStyles.listItem }, '• One detached single-family dwelling'),
        e(Text, { style: constructionStyles.listItem }, '• One private garage (attached or detached)'),
        e(Text, { style: constructionStyles.listItem }, '• One accessory building (subject to requirements)'),

        e(Text, { style: constructionStyles.h3 }, 'EXTERIOR MATERIALS & COLORS'),

        e(View, { style: constructionStyles.twoColumn },
          e(View, { style: constructionStyles.highlightBox },
            e(Text, { style: constructionStyles.highlightTitle }, 'APPROVED MATERIALS'),
            e(Text, { style: constructionStyles.listItem }, '• Wood or wood-look siding (cedar lap, HardiePlank)'),
            e(Text, { style: constructionStyles.listItem }, '• Solid-surface synthetics'),
            e(Text, { style: constructionStyles.listItem }, '• Solid log construction'),
            e(Text, { style: constructionStyles.listItem }, '• Stone or brick accents'),
            e(Text, { style: constructionStyles.listItem }, '• Metal roofing (muted colors)'),
            e(Text, { style: constructionStyles.listItem }, '• Architectural shingle roofing')
          ),
          
          e(View, { style: constructionStyles.alertBox },
            e(Text, { style: constructionStyles.alertTitle }, 'PROHIBITED MATERIALS'),
            e(Text, { style: constructionStyles.listItem }, '• Vinyl siding'),
            e(Text, { style: constructionStyles.listItem }, '• T-111 or similar sheet siding'),
            e(Text, { style: constructionStyles.listItem }, '• Concrete block (unless faced)'),
            e(Text, { style: constructionStyles.listItem }, '• Bright or vibrant colors'),
            e(Text, { style: constructionStyles.listItem }, '• Reflective metal finishes')
          )
        ),

        e(Text, { style: { ...constructionStyles.paragraph, fontWeight: 'bold' } },
          'Color Requirements:'
        ),
        e(Text, { style: constructionStyles.paragraph },
          'All colors must be muted and nature-reflective (greens, browns, tans, grays). No bright or vibrant colors are permitted. The ARC may request color samples before approval.'
        ),

        e(Text, { style: constructionStyles.h3 }, 'SETBACK REQUIREMENTS'),

        e(View, { style: constructionStyles.infoBox },
          e(Text, { style: constructionStyles.highlightTitle }, 'MINIMUM SETBACKS'),
          e(Text, { style: constructionStyles.listItem }, '• From Route 638 centerline: 75 feet'),
          e(Text, { style: constructionStyles.listItem }, '• From BMPOA road centerline: 70 feet'),
          e(Text, { style: constructionStyles.listItem }, '• From side property lines: 20 feet each side'),
          e(Text, { style: constructionStyles.listItem }, '• From rear property line: 25 feet'),
          e(Text, { style: { ...constructionStyles.paragraph, fontStyle: 'italic', marginTop: spacing.sm } },
            'Note: The ARC/Board may grant exceptions to side/rear setbacks on a case-by-case basis'
          )
        ),

        e(Text, { style: constructionStyles.h3 }, 'SIZE REQUIREMENTS'),

        e(Text, { style: constructionStyles.listItem }, '• Minimum dwelling size: 1,000 square feet of living space'),
        e(Text, { style: constructionStyles.listItem }, '• Manufactured homes: Must meet Class A design criteria'),
        e(Text, { style: constructionStyles.listItem }, '• Garages and accessory buildings: Must match primary structure\'s design and materials'),

        e(Text, { style: constructionStyles.h3 }, 'SITE CONSIDERATIONS'),

        e(View, { style: constructionStyles.twoColumn },
          e(Text, { style: { ...constructionStyles.paragraph, fontWeight: 'bold' } },
            'Construction must be sited unobtrusively:'
          ),
          e(Text, { style: constructionStyles.listItem }, '• Use natural flora to screen from access roads'),
          e(Text, { style: constructionStyles.listItem }, '• Minimize tree removal to what\'s necessary for:'),
          e(Text, { style: constructionStyles.nestedListItem }, '- Foundation footprint'),
          e(Text, { style: constructionStyles.nestedListItem }, '- Septic field'),
          e(Text, { style: constructionStyles.nestedListItem }, '- Driveway access'),
          e(Text, { style: constructionStyles.listItem }, '• Additional clearing requires specific ARC approval'),
          
          e(Text, { style: { ...constructionStyles.paragraph, fontWeight: 'bold', marginTop: spacing.sm } },
            'Tree and vegetation management:'
          ),
          e(Text, { style: constructionStyles.listItem }, '• Trees felled during construction must be:'),
          e(Text, { style: constructionStyles.nestedListItem }, '- Staged unobtrusively, or'),
          e(Text, { style: constructionStyles.nestedListItem }, '- Removed from the property'),
          e(Text, { style: constructionStyles.listItem }, '• Limited scenic view clearing may be allowed'),
          e(Text, { style: constructionStyles.listItem }, '• Extensive clearing is not permitted'),
          e(Text, { style: constructionStyles.listItem }, '• No permanent outside outhouses allowed')
        ),

        e(View, { style: constructionStyles.highlightBox },
          e(Text, { style: constructionStyles.highlightTitle }, 'FIRE-RESISTANT MATERIALS'),
          e(Text, null,
            'Fire-resistant materials are strongly advised for all exterior components including roofing, siding, and decking. This helps protect your investment and our community from wildfire risks.'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, '52')
      )
    ),

    // Accessory Buildings & Special Requirements Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'ACCESSORY BUILDINGS & SPECIAL REQUIREMENTS')
      ),
      e(
        View,
        null,
        e(Text, { style: constructionStyles.h3 }, 'ACCESSORY BUILDING REQUIREMENTS'),

        e(Text, { style: constructionStyles.paragraph },
          'One accessory building per 1-acre lot (other than a garage) is permitted if it:'
        ),
        e(Text, { style: constructionStyles.listItem }, '• Complies with Warren County setback, size, and height ordinances'),
        e(Text, { style: constructionStyles.listItem }, '• Matches the primary structure in style and materials'),
        e(Text, { style: constructionStyles.listItem }, '• Is pre-approved in writing by the ARC'),

        e(Text, { style: constructionStyles.h4 }, 'Warren County Definitions & Requirements:'),

        e(View, { style: constructionStyles.twoColumn },
          e(Text, { style: constructionStyles.listItem }, '• Building: Any roofed structure supported by walls/columns'),
          e(Text, { style: constructionStyles.listItem }, '• Permit Exception: Structures under 200 sq ft in side/rear yard don\'t require County permit but still need ARC approval'),
          e(Text, { style: constructionStyles.listItem }, '• Height Limit: 12 ft average height (average of eaves to ridge)'),
          
          e(Text, { style: constructionStyles.listItem }, '• Cannot be placed: Forward of primary residence\'s front plane'),
          e(Text, { style: constructionStyles.listItem }, '• Setback from roads: 50 ft minimum from front property line or any road'),
          e(Text, { style: constructionStyles.listItem }, '• Side setbacks: 10 ft minimum from side lot lines')
        ),

        e(View, { style: constructionStyles.infoBox },
          e(Text, { style: constructionStyles.highlightTitle }, 'NONCONFORMING STRUCTURES'),
          e(Text, null,
            'Pre-1992 accessory buildings are grandfathered by the County but still require ARC pre-approval to avoid covenant violations.'
          )
        ),

        e(Text, { style: constructionStyles.h3 }, 'FOUNDATIONS & ADDITIONS'),

        e(Text, { style: constructionStyles.listItem }, '• Accessory buildings on pilings, skids, or slabs must be in side/rear yard'),
        e(Text, { style: constructionStyles.listItem }, '• Structures within 4 ft of primary residence are considered additions and must:'),
        e(Text, { style: constructionStyles.nestedListItem }, '- Require County building permit'),
        e(Text, { style: constructionStyles.nestedListItem }, '- Meet primary structure setbacks and height requirements'),

        e(Text, { style: constructionStyles.h3 }, 'FENCE REQUIREMENTS'),

        e(View, { style: constructionStyles.twoColumn },
          e(Text, { style: { ...constructionStyles.paragraph, fontWeight: 'bold' } },
            'Standard requirement: Only split-rail fences are allowed'
          ),
          
          e(Text, { style: { ...constructionStyles.paragraph, fontWeight: 'bold' } }, 'Approval process:'),
          e(Text, { style: constructionStyles.listItem }, '• Submit design and materials plan to ARC'),
          e(Text, { style: constructionStyles.listItem }, '• Receive written approval before installation'),
          e(Text, { style: constructionStyles.listItem }, '• Exceptions considered case-by-case based on compatibility')
        ),

        e(Text, { style: constructionStyles.h3 }, 'BUILDING ON UNPAVED ROADS'),

        e(View, { style: constructionStyles.highlightBox },
          e(Text, { style: constructionStyles.highlightTitle }, 'ROAD CONSTRUCTION REQUIREMENTS'),
          e(Text, { style: constructionStyles.paragraph },
            'If your lot is accessed by an unpaved road, the lot developer must construct the roadway within the platted easement to BMPOA specifications:'
          ),
          e(Text, { style: constructionStyles.listItem }, '• 3" compacted #3 gravel base'),
          e(Text, { style: constructionStyles.listItem }, '• 2" crusher run surface'),
          e(Text, { style: constructionStyles.listItem }, '• 10 ft minimum width between ditches'),
          e(Text, { style: constructionStyles.listItem }, '• Proper grading and crowning'),
          e(Text, { style: constructionStyles.listItem }, '• Culverts installed at low points'),
          e(Text, { style: constructionStyles.paragraph },
            'Once inspected and accepted by the BMPOA Roads Committee, maintenance will be assumed by BMPOA.'
          )
        ),

        e(Text, { style: constructionStyles.h3 }, 'CONSTRUCTION TIMELINE'),

        e(Text, { style: constructionStyles.listItem }, '• All exterior work must be completed within one year of construction start'),
        e(Text, { style: constructionStyles.listItem }, '• This includes:'),
        e(Text, { style: constructionStyles.nestedListItem }, '- Siding installation'),
        e(Text, { style: constructionStyles.nestedListItem }, '- Exterior painting/staining'),
        e(Text, { style: constructionStyles.nestedListItem }, '- Roofing completion'),
        e(Text, { style: constructionStyles.nestedListItem }, '- Deck/porch construction')
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, '53')
      )
    ),

    // Compliance & Enforcement Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'COMPLIANCE & ENFORCEMENT')
      ),
      e(
        View,
        null,
        e(Text, { style: constructionStyles.h3 }, 'FAILURE TO COMPLY'),

        e(Text, { style: constructionStyles.paragraph },
          'The BMPOA takes covenant enforcement seriously to maintain property values and community standards. The following process applies to violations:'
        ),

        e(View, { style: constructionStyles.checklistContainer },
          e(Text, { style: constructionStyles.checklistTitle }, 'ENFORCEMENT PROCESS'),
          e(Text, { style: constructionStyles.checklistItem }, '□ BMPOA/ARC notifies owner in writing of violation and required corrective action'),
          e(Text, { style: constructionStyles.checklistItem }, '□ Owner has 60 days to correct OR 20 days to submit alternative plan/timetable'),
          e(Text, { style: constructionStyles.checklistItem }, '□ ARC has 30 days to approve/disapprove alternative plan'),
          e(Text, { style: constructionStyles.checklistItem }, '□ No response from ARC within 30 days = deemed approved'),
          e(Text, { style: constructionStyles.checklistItem }, '□ If alternative denied, owner has 60 days to comply'),
          e(Text, { style: constructionStyles.checklistItem }, '□ Appeals may be submitted to Arbitration Committee within 30 days'),
          e(Text, { style: constructionStyles.checklistItem }, '□ If appeal denied, owner must comply within 30 days or face legal action')
        ),

        e(View, { style: constructionStyles.alertBox },
          e(Text, { style: constructionStyles.alertTitle }, 'LEGAL ACTION'),
          e(Text, { style: constructionStyles.paragraph },
            'If compliance is not achieved through the above process, the Board may pursue legal action including:'
          ),
          e(Text, { style: constructionStyles.listItem }, '• Injunctive relief to stop or correct violations'),
          e(Text, { style: constructionStyles.listItem }, '• Recovery of attorney fees and court costs'),
          e(Text, { style: constructionStyles.listItem }, '• Daily fines for continuing violations'),
          e(Text, { style: constructionStyles.listItem }, '• Liens against the property')
        ),

        e(Text, { style: constructionStyles.h3 }, 'COMMON VIOLATIONS TO AVOID'),

        e(View, { style: constructionStyles.twoColumn },
          e(Text, { style: constructionStyles.listItem }, '• Starting construction without ARC approval'),
          e(Text, { style: constructionStyles.listItem }, '• Deviating from approved plans'),
          e(Text, { style: constructionStyles.listItem }, '• Using prohibited materials'),
          e(Text, { style: constructionStyles.listItem }, '• Violating setback requirements'),
          e(Text, { style: constructionStyles.listItem }, '• Excessive tree clearing'),
          
          e(Text, { style: constructionStyles.listItem }, '• Bright or non-approved colors'),
          e(Text, { style: constructionStyles.listItem }, '• Incomplete exterior work'),
          e(Text, { style: constructionStyles.listItem }, '• Unapproved accessory structures'),
          e(Text, { style: constructionStyles.listItem }, '• Improper construction staging'),
          e(Text, { style: constructionStyles.listItem }, '• Non-compliant fencing')
        ),

        e(Text, { style: constructionStyles.h3 }, 'WORKING WITH THE ARC'),

        e(View, { style: constructionStyles.infoBox },
          e(Text, { style: constructionStyles.highlightTitle }, 'TIPS FOR SMOOTH APPROVAL'),
          e(Text, { style: constructionStyles.listItem }, '• Submit complete plans with your initial application'),
          e(Text, { style: constructionStyles.listItem }, '• Include photos of similar homes you\'re using as inspiration'),
          e(Text, { style: constructionStyles.listItem }, '• Provide material samples when requested'),
          e(Text, { style: constructionStyles.listItem }, '• Attend an ARC meeting to discuss your project'),
          e(Text, { style: constructionStyles.listItem }, '• Communicate any changes immediately'),
          e(Text, { style: constructionStyles.listItem }, '• Ask questions before making assumptions')
        ),

        e(Text, { style: constructionStyles.h3 }, 'ADDITIONAL RESOURCES'),

        e(View, { style: constructionStyles.resourceList },
          e(Text, { style: constructionStyles.h4 }, 'HELPFUL DOCUMENTS'),
          e(Text, { style: constructionStyles.listItem }, '• Declaration of Covenants: Available on BMPOA.org under "Homeowners"'),
          e(Text, { style: constructionStyles.listItem }, '• BMPOA Bylaws: Complete governance documents online'),
          e(Text, { style: constructionStyles.listItem }, '• ARC Application Form: Download from website'),
          e(Text, { style: constructionStyles.listItem }, '• Warren County Building Codes: warrencountyva.gov/building')
        ),

        e(View, { style: constructionStyles.prominentText },
          e(Text, null,
            'The ARC is here to help you create a home that enhances both your lifestyle and our community\'s character. We encourage early consultation to ensure a smooth approval process.'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, '54')
      )
    )
  ];
}