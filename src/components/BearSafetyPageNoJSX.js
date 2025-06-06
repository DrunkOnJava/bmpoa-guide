import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { styles, colors, spacing } from '../theme.js';
import SectionDivider from './SectionDivider.js';

export default function BearSafetyPageNoJSX({ pageNumberMap = {} }) {
  const e = React.createElement;
  
  const bearStyles = StyleSheet.create({
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
      marginBottom: 12,  // 12pt spacing between items
      paddingLeft: 18,  // 0.25 inch = 18pt
    },
    servicesGrid: {
      marginTop: spacing.sm,
      marginBottom: spacing.md,
    },
    serviceItem: {
      marginBottom: spacing.sm,
      paddingLeft: spacing.sm,
      borderLeft: `2px solid ${colors.background}`,
    },
    serviceName: {
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 2,
      color: colors.accent,
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
    paragraph: {
      marginBottom: spacing.sm,
      textAlign: 'justify',
    },
    listItem: {
      marginBottom: spacing.xs,
      paddingLeft: spacing.sm,
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
    }
  });

  return [
    // Section Divider Page
    e(SectionDivider, {
      number: '12',
      title: 'BEAR SAFETY',
      description: 'Living in harmony with black bears requires understanding their behavior and taking proactive steps to prevent conflicts. This section provides essential information for keeping your family, property, and our bear population safe.',
      backgroundColor: colors.primary
    }),
    
    // Understanding Bear Behavior Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'UNDERSTANDING BEAR BEHAVIOR')
      ),
      e(
        View,
        null,
        e(Text, { style: bearStyles.paragraph },
          'Black bears are intelligent and typically avoid humans. Most conflicts occur because bears seek out food attractants, not out of aggression. Understanding bear behavior helps us coexist peacefully with these magnificent animals that share our mountain home.'
        ),
        
        e(Text, { style: bearStyles.h3 }, 'BLACK BEAR FACTS'),
        e(Text, { style: bearStyles.listItem }, "• Virginia's black bear population has grown significantly in recent decades"),
        e(Text, { style: bearStyles.listItem }, '• Bears have excellent memories and will return to reliable food sources'),
        e(Text, { style: bearStyles.listItem }, '• They can smell food from over a mile away'),
        e(Text, { style: bearStyles.listItem }, '• Bears are most active in spring and fall when natural food is scarce'),
        e(Text, { style: bearStyles.listItem }, '• A fed bear becomes a problem bear - and often a dead bear'),
        e(Text, { style: bearStyles.listItem }, '• Adult males weigh 200-500 pounds; females 100-300 pounds'),
        e(Text, { style: bearStyles.listItem }, '• Despite their size, bears can run 35 mph and climb trees easily'),
        
        e(View, { style: bearStyles.infoBox },
          e(Text, { style: bearStyles.highlightTitle }, 'COMMON MISCONCEPTIONS'),
          e(Text, { style: bearStyles.listItem }, '• Myth: Bears standing on hind legs are aggressive'),
          e(Text, { style: bearStyles.listItem }, '  Truth: They\'re trying to see or smell better'),
          e(Text, { style: bearStyles.listItem }, '• Myth: Mother bears always attack to defend cubs'),
          e(Text, { style: bearStyles.listItem }, '  Truth: Mothers usually flee or send cubs up trees when threatened'),
          e(Text, { style: bearStyles.listItem }, '• Myth: Relocating bears solves problems'),
          e(Text, { style: bearStyles.listItem }, '  Truth: Another bear often moves into the vacant territory')
        ),
        
        e(Text, { style: bearStyles.h3 }, 'SEASONAL BEAR ACTIVITY'),
        
        e(View, { style: bearStyles.servicesGrid },
          e(View, { style: bearStyles.serviceItem },
            e(Text, { style: bearStyles.serviceName }, 'Spring (March-May)'),
            e(Text, null, '🐻 Bears emerge hungry • 🌱 Natural food scarce • ⚠️ Highest conflict risk')
          ),
          e(View, { style: bearStyles.serviceItem },
            e(Text, { style: bearStyles.serviceName }, 'Summer (June-Aug)'),
            e(Text, null, '🫐 Natural berries available • 🐝 Bears seek beehives • 🏕️ Camping food attracts')
          ),
          e(View, { style: bearStyles.serviceItem },
            e(Text, { style: bearStyles.serviceName }, 'Fall (Sept-Nov)'),
            e(Text, null, '🌰 Hyperphagia begins • 🍎 20,000 calories/day • 🏠 Property damage peaks')
          ),
          e(View, { style: bearStyles.serviceItem },
            e(Text, { style: bearStyles.serviceName }, 'Winter (Dec-Feb)'),
            e(Text, null, '😴 Most bears denning • 🌡️ Warm spells = activity • 👀 Yearlings may roam')
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, '56')
      )
    ),

    // Common Bear Attractants & Prevention Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'COMMON BEAR ATTRACTANTS & PREVENTION')
      ),
      e(
        View,
        null,
        e(Text, { style: bearStyles.h3 }, 'COMMON BEAR ATTRACTANTS'),
        e(Text, { style: bearStyles.paragraph },
          'Bears are opportunistic feeders attracted to easy calories. The following items commonly draw bears to residential properties:'
        ),
        
        // Attractants table with 60% Prevention column
        e(View, { style: { marginTop: spacing.md, marginBottom: spacing.md } },
          e(View, { style: { borderWidth: 0.5, borderColor: colors.slateGray, borderRadius: 4, overflow: 'hidden' } },
            // Header row
            e(View, { style: { flexDirection: 'row', backgroundColor: colors.lightGray, borderBottomWidth: 1, borderBottomColor: colors.slateGray } },
              e(Text, { style: { width: '40%', fontSize: 11, fontFamily: 'Helvetica-Bold', fontWeight: 'bold', color: colors.forestGreen, paddingVertical: 4, paddingHorizontal: 6 } }, 'Attractant'),
              e(Text, { style: { width: '60%', fontSize: 11, fontFamily: 'Helvetica-Bold', fontWeight: 'bold', color: colors.forestGreen, paddingVertical: 4, paddingHorizontal: 6 } }, 'Prevention Method')
            ),
            // Data rows
            ...[
              ['Bird feeders', 'Remove April–November or use bear-resistant models'],
              ['Garbage cans', 'Store in locked garage/shed or bear-proof container'],
              ['Pet food', 'Feed pets indoors, clean up any outdoor spills immediately'],
              ['Grills', 'Burn off grease 5 min after use, clean thoroughly, cover'],
              ['Fruit trees', 'Harvest ripe fruit promptly, remove fallen fruit daily'],
              ['Compost', 'No meat/bones/fats, use electric fence if needed'],
              ['Coolers/trash', 'Never leave on porches/decks, store indoors'],
              ['Beehives', 'Install electric fencing around hive perimeter']
            ].map((row, index) => 
              e(View, { 
                key: index,
                style: { 
                  flexDirection: 'row', 
                  borderBottomWidth: index < 7 ? 0.5 : 0, 
                  borderBottomColor: colors.lightGray,
                  backgroundColor: index % 2 === 1 ? colors.lightGray : 'transparent'
                } 
              },
                e(Text, { style: { width: '40%', fontSize: 10, color: colors.warmGray, paddingVertical: 4, paddingHorizontal: 6 } }, row[0]),
                e(Text, { style: { width: '60%', fontSize: 10, color: colors.warmGray, paddingVertical: 4, paddingHorizontal: 6 } }, row[1])
              )
            )
          )
        ),
        
        e(View, { style: bearStyles.checklistContainer },
          e(Text, { style: bearStyles.checklistTitle }, 'BEAR-PROOFING CHECKLIST'),
          e(Text, { style: bearStyles.checklistItem }, '□ Remove bird feeders during active season or switch to bear-resistant models'),
          e(Text, { style: bearStyles.checklistItem }, '□ Store garbage in locked garage, shed, or bear-proof container'),
          e(Text, { style: bearStyles.checklistItem }, '□ Never leave trash outdoors overnight'),
          e(Text, { style: bearStyles.checklistItem }, '□ Feed pets indoors and clean up any food scraps immediately'),
          e(Text, { style: bearStyles.checklistItem }, '□ Clean grills after each use (burn off grease for 5 minutes, then cover)'),
          e(Text, { style: bearStyles.checklistItem }, '□ Use electric fencing around beehives, compost piles, and gardens'),
          e(Text, { style: bearStyles.checklistItem }, '□ Harvest ripe fruit promptly; remove fallen fruit daily'),
          e(Text, { style: bearStyles.checklistItem }, '□ Do not store any food or scented items on porches/decks'),
          e(Text, { style: bearStyles.checklistItem }, '□ Compost responsibly—no meat, bones, or fatty scraps')
        ),
        
        e(View, { style: { ...bearStyles.alertBox, borderWidth: 1, borderColor: '#DC143C', marginLeft: 4, marginRight: 4 } },
          e(Text, { style: bearStyles.alertTitle }, 'LEGAL REMINDER'),
          e(Text, null, 
            'Feeding bears (intentionally or not) is illegal under Virginia Code. Placing food, minerals, or trash to attract bears violates state law. Violators face fines and potential legal action. More importantly, fed bears often must be destroyed for public safety.'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, '57')
      )
    ),

    // Bear Encounters & Hazing Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'BEAR ENCOUNTERS & HAZING')
      ),
      e(
        View,
        null,
        e(Text, { style: bearStyles.h3 }, 'IF YOU ENCOUNTER A BEAR'),
        
        e(View, { style: bearStyles.alertBox },
          e(Text, { style: bearStyles.alertTitle }, 'IN YOUR YARD OR HOME'),
          e(Text, { style: bearStyles.listItem }, '• Remain calm - do not run (running can trigger chase response)'),
          e(Text, { style: bearStyles.listItem }, '• Identify an exit route - back away slowly while making noise'),
          e(Text, { style: bearStyles.listItem }, '• Make yourself appear large - raise arms, open jacket'),
          e(Text, { style: bearStyles.listItem }, '• Make noise - clap, yell "Go away bear!" in firm voice'),
          e(Text, { style: bearStyles.listItem }, '• If indoors - open doors to allow bear to exit; do not trap it'),
          e(Text, { style: bearStyles.listItem }, '• Never approach - give the bear space to leave')
        ),
        
        e(View, { style: bearStyles.alertBox },
          e(Text, { style: bearStyles.alertTitle }, 'WHILE HIKING'),
          e(Text, { style: bearStyles.listItem }, '• Make noise - talk loudly, clap hands around blind corners'),
          e(Text, { style: bearStyles.listItem }, '• Hike in groups - bears avoid larger groups'),
          e(Text, { style: bearStyles.listItem }, '• Keep children close and dogs leashed'),
          e(Text, { style: bearStyles.listItem }, '• If surprised at close range - speak calmly, back away slowly'),
          e(Text, { style: bearStyles.listItem }, '• Avoid direct eye contact - this can be seen as a threat'),
          e(Text, { style: bearStyles.listItem }, '• If a bear charges - use bear spray if available'),
          e(Text, { style: bearStyles.listItem }, '• If contact is imminent - DO NOT play dead; fight back')
        ),
        
        e(Text, { style: bearStyles.h3 }, 'HAZING & DETERRENTS'),
        e(Text, { style: bearStyles.paragraph },
          "Hazing teaches bears to avoid human spaces. It's most effective when done immediately and consistently by the entire community."
        ),
        
        e(View, { style: bearStyles.infoBox },
          e(Text, { style: bearStyles.highlightTitle }, 'SAFE HAZING METHODS'),
          e(Text, { style: bearStyles.listItem }, "• Paintballs aimed at bear's rump"),
          e(Text, { style: bearStyles.listItem }, '• Air horns or boat horns'),
          e(Text, { style: bearStyles.listItem }, '• Shouting and banging pots/pans'),
          e(Text, { style: bearStyles.listItem }, '• Motion-activated alarms'),
          e(Text, { style: bearStyles.listItem }, '• Water hose (if available)'),
          e(Text, { style: bearStyles.listItem }, '• Throwing small objects (not at head)')
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, '58')
      )
    ),

    // Living with Bears Page
    e(
      Page,
      { size: 'LETTER', style: styles.page },
      e(
        View,
        { style: styles.pageHeader },
        e(Text, { style: styles.pageTitle }, 'LIVING WITH BEARS')
      ),
      e(
        View,
        null,
        e(Text, { style: bearStyles.h3 }, 'PROPERTY MODIFICATIONS'),
        e(Text, { style: bearStyles.paragraph },
          'Making your property less attractive to bears is a long-term investment in safety and coexistence:'
        ),
        
        e(Text, { style: bearStyles.listItem }, '• Replace fruit trees with non-bearing ornamentals'),
        e(Text, { style: bearStyles.listItem }, '• Install motion lights around potential food sources'),
        e(Text, { style: bearStyles.listItem }, '• Build secure enclosures for trash and recycling'),
        e(Text, { style: bearStyles.listItem }, '• Create clear sight lines by trimming dense shrubs'),
        e(Text, { style: bearStyles.listItem }, '• Remove bird baths during drought (bears seek water)'),
        e(Text, { style: bearStyles.listItem }, '• Secure crawl spaces under decks and sheds'),
        
        e(View, { style: bearStyles.highlightBox },
          e(Text, { style: bearStyles.highlightTitle }, 'TEACHING CHILDREN'),
          e(Text, { style: bearStyles.listItem }, '• Bears are wild animals, not pets or cartoon characters'),
          e(Text, { style: bearStyles.listItem }, '• Never run from a bear - back away slowly'),
          e(Text, { style: bearStyles.listItem }, '• Make noise when playing outside'),
          e(Text, { style: bearStyles.listItem }, '• Come inside immediately if a bear is spotted'),
          e(Text, { style: bearStyles.listItem }, '• Never feed or approach any wildlife')
        ),
        
        e(Text, { style: bearStyles.h3 }, 'RESOURCES & CONTACTS'),
        e(Text, { style: bearStyles.h4 }, 'BEAR SAFETY RESOURCES'),
        e(Text, { style: bearStyles.listItem }, '• Virginia DWR Wildlife Helpline: (804) 367-1000'),
        e(Text, { style: bearStyles.listItem }, '• Warren County Animal Control: (540) 636-7834'),
        e(Text, { style: bearStyles.listItem }, '• BearWise Website: bearwise.org'),
        e(Text, { style: bearStyles.listItem }, '• DWR Black Bear Info: dwr.virginia.gov/wildlife/bear/'),
        e(Text, { style: bearStyles.listItem }, '• BMPOA Emergency Coordinator: Contact via BMPOA.org'),
        
        e(View, { style: bearStyles.prominentText },
          e(Text, null, 
            'Remember: A fed bear is a dead bear. By working together to eliminate attractants and practice proper bear safety, we can protect both our community and these magnificent animals that share our mountain home.'
          )
        )
      ),
      e(
        View,
        { style: styles.pageFooter },
        e(Text, null, 'BMPOA Community Guide'),
        e(Text, null, '59')
      )
    )
  ];
}