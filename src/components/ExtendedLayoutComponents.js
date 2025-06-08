import React from 'react';
import { View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import { typography, layout, colors, callout, footer } from '../designTokens.js';
import { spacing } from '../theme.js';

// Extended layout components extracted from ComponentGarden analysis

const extendedStyles = StyleSheet.create({
  // Decorative Stars Component
  decorativeStars: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
},
  
  star: {
    fontSize: typography.sizes.medium,
    color: colors.primary,
    marginHorizontal: 4,
},
  
  // Image Caption Box
  imageCaptionBox: {
    marginVertical: 12,
    alignItems: 'center',
},
  
  imagePlaceholder: {
    width: '100%',
    height: 120,
    backgroundColor: colors.backgroundAlt,
    borderWidth: 0.5,
    borderColor: colors.mediumGray,
    justifyContent: 'center',
    alignItems: 'center',
},
  
  imageCaption: {
    fontSize: typography.sizes.sm,
    color: colors.mediumGray,
    fontStyle: 'italic',
    marginTop: 6,
    textAlign: 'center',
    paddingHorizontal: 20,
},
  
  // Full-Width Info Box (like SEASONAL SCHEDULING)
  fullWidthInfoBox: {
    backgroundColor: '#DBEAFE',
    padding: layout.spacing.lg,
    marginVertical: 12,
    borderRadius: callout.radius,
},
  
  fullWidthInfoTitle: {
    fontSize: typography.sizes.medium,
    fontWeight: typography.weights.bold,
    color: colors.blueDark,
    marginBottom: layout.spacing.sm,
    textTransform: 'uppercase',
},
  
  fullWidthInfoText: {
    fontSize: typography.sizes.base,
    color: colors.darkGray,
    lineHeight: typography.lineHeights.relaxed,
},
  
  // Checklist with Background
  checklistBox: {
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#F59E0B',
    borderRadius: callout.radius,
    padding: layout.spacing.md,
    marginVertical: 12,
},
  
  checklistTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    color: colors.danger,
    marginBottom: layout.spacing.sm,
    textTransform: 'uppercase',
},
  
  checklistItem: {
    flexDirection: 'row',
    marginBottom: 6,
},
  
  checkmark: {
    fontSize: typography.sizes.base,
    color: colors.successDark,
    marginRight: 8,
},
  
  checklistText: {
    fontSize: typography.sizes.sm,
    color: colors.darkGray,
    flex: 1,
},
  
  // Numbered Requirements List
  numberedRequirement: {
    flexDirection: 'row',
    marginBottom: layout.spacing.sm,
    alignItems: 'flex-start',
},
  
  requirementNumber: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    color: colors.darkGray,
    marginRight: 8,
    minWidth: 20,
},
  
  requirementText: {
    fontSize: typography.sizes.base,
    color: colors.darkGray,
    flex: 1,
    lineHeight: typography.lineHeights.relaxed,
},
  
  // Section Header with Underline
  sectionHeaderUnderlined: {
    marginBottom: layout.spacing.lg,
},
  
  sectionHeaderText: {
    fontSize: typography.sizes.h3,
    fontWeight: typography.weights.bold,
    color: colors.darkGray,
    marginBottom: layout.spacing.xs,
},
  
  underline: {
    height: 3,
    backgroundColor: colors.primary,
    width: 40,
},
  
  // Risk Level Box
  riskLevelBox: {
    marginVertical: 8,
},
  
  riskLevelTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    color: colors.darkGray,
    marginBottom: layout.spacing.xs,
},
  
  riskLevelText: {
    fontSize: typography.sizes.sm,
    color: colors.darkGray,
    lineHeight: typography.lineHeights.relaxed,
},
  
  // Contact Card with Icon
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 0.5,
    borderColor: '#E5E7EB',
    borderRadius: callout.radius,
    padding: 10,
    marginBottom: layout.spacing.sm,
},
  
  contactIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
    backgroundColor: colors.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
},
  
  contactIconText: {
    color: colors.white,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
},
  
  contactInfo: {
    flex: 1,
},
  
  contactLabel: {
    fontSize: typography.sizes.sm,
    color: colors.mediumGray,
    marginBottom: 2,
},
  
  contactValue: {
    fontSize: typography.sizes.base,
    color: colors.darkGray,
    fontWeight: typography.weights.bold,
},
  
  // Burn Ban Alert Box
  burnBanBox: {
    backgroundColor: colors.backgroundDanger,
    borderWidth: callout.border.width,
    borderColor: '#DC2626',
    borderRadius: callout.radius,
    padding: layout.spacing.md,
    marginVertical: 12,
},
  
  burnBanTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    color: colors.dangerDark,
    marginBottom: 6,
    textTransform: 'uppercase',
},
  
  burnBanText: {
    fontSize: typography.sizes.sm,
    color: colors.dangerDarkest,
    lineHeight: typography.lineHeights.relaxed,
},
  
  // Meeting Places Section
  meetingPlacesBox: {
    marginVertical: 12,
},
  
  meetingPlacesTitle: {
    fontSize: typography.sizes.medium,
    fontWeight: typography.weights.bold,
    color: colors.darkGray,
    marginBottom: layout.spacing.sm,
},
  
  meetingPlace: {
    marginBottom: layout.spacing.sm,
},
  
  meetingPlaceNumber: {
    fontSize: typography.sizes.base,
    color: colors.darkGray,
    marginBottom: 2,
},
  
  // Seasonal Info with Bold Terms
  seasonalInfo: {
    marginBottom: layout.spacing.sm,
},
  
  seasonLabel: {
    fontWeight: typography.weights.bold,
},
  
  // Specification List
  specificationList: {
    marginVertical: 8,
},
  
  specItem: {
    flexDirection: 'row',
    marginBottom: 6,
    paddingLeft: 16,
},
  
  specBullet: {
    position: 'absolute',
    left: 0,
    fontSize: typography.sizes.sm,
    color: colors.darkGray,
},
  
  specText: {
    fontSize: typography.sizes.sm,
    color: colors.darkGray,
    lineHeight: typography.lineHeights.relaxed,
},
});

// Decorative Stars Separator
export const DecorativeStars = ({ count = 3 }) => {
  const e = React.createElement;
  
  return e(View, { style: extendedStyles.decorativeStars },
    Array.from({ length: count }).map((_, i) => 
      e(Text, { key: `star-${i}`, style: extendedStyles.star }, '★')
    )
  );
};

// Image with Caption Box
export const ImageCaptionBox = ({ imageSrc, caption, height = 120 }) => {
  const e = React.createElement;
  
  return e(View, { style: extendedStyles.imageCaptionBox },
    imageSrc 
      ? e(Image, { src: imageSrc, style: { width: '100%', height } })
      : e(View, { style: { ...extendedStyles.imagePlaceholder, height } },
          e(Text, { style: { fontSize: typography.sizes.sm, color: colors.mediumGray } }, 'Image Placeholder')
        ),
    caption && e(Text, { style: extendedStyles.imageCaption }, caption)
  );
};

// Full Width Info Box (like SEASONAL SCHEDULING)
export const FullWidthInfoBox = ({ title, content, backgroundColor = '#DBEAFE', titleColor = '#1E40AF' }) => {
  const e = React.createElement;
  
  const customStyle = {
    ...extendedStyles.fullWidthInfoBox,
    backgroundColor
};
  
  const customTitleStyle = {
    ...extendedStyles.fullWidthInfoTitle,
    color: titleColor
};
  
  return e(View, { style: customStyle },
    e(Text, { style: customTitleStyle }, title),
    e(Text, { style: extendedStyles.fullWidthInfoText }, content)
  );
};

// Checklist Box Component
export const ChecklistBox = ({ title, items = [], backgroundColor = '#FEF3C7', borderColor = '#F59E0B' }) => {
  const e = React.createElement;
  
  const customStyle = {
    ...extendedStyles.checklistBox,
    backgroundColor,
    borderColor
};
  
  return e(View, { style: customStyle },
    title && e(Text, { style: extendedStyles.checklistTitle }, title),
    items.map((item, index) => 
      e(View, { key: `check-${index}`, style: extendedStyles.checklistItem },
        e(Text, { style: extendedStyles.checkmark }, '✓'),
        e(Text, { style: extendedStyles.checklistText }, item)
      )
    )
  );
};

// Numbered Requirements List
export const NumberedRequirements = ({ items = [] }) => {
  const e = React.createElement;
  
  return e(View, null,
    items.map((item, index) => 
      e(View, { key: `req-${index}`, style: extendedStyles.numberedRequirement },
        e(Text, { style: extendedStyles.requirementNumber }, `${index + 1}.`),
        e(Text, { style: extendedStyles.requirementText }, item)
      )
    )
  );
};

// Section Header with Underline
export const SectionHeaderUnderlined = ({ title }) => {
  const e = React.createElement;
  
  return e(View, { style: extendedStyles.sectionHeaderUnderlined },
    e(Text, { style: extendedStyles.sectionHeaderText }, title),
    e(View, { style: extendedStyles.underline })
  );
};

// Risk Level Component
export const RiskLevelBox = ({ level, description }) => {
  const e = React.createElement;
  
  return e(View, { style: extendedStyles.riskLevelBox },
    e(Text, { style: extendedStyles.riskLevelTitle }, level),
    e(Text, { style: extendedStyles.riskLevelText }, description)
  );
};

// Contact Card Component
export const ContactCard = ({ icon, label, value }) => {
  const e = React.createElement;
  
  return e(View, { style: extendedStyles.contactCard },
    e(View, { style: extendedStyles.contactIcon },
      e(Text, { style: extendedStyles.contactIconText }, icon || '📞')
    ),
    e(View, { style: extendedStyles.contactInfo },
      e(Text, { style: extendedStyles.contactLabel }, label),
      e(Text, { style: extendedStyles.contactValue }, value)
    )
  );
};

// Burn Ban Alert Box
export const BurnBanBox = ({ title, content }) => {
  const e = React.createElement;
  
  return e(View, { style: extendedStyles.burnBanBox },
    e(Text, { style: extendedStyles.burnBanTitle }, title || 'BURN BAN INFORMATION'),
    e(Text, { style: extendedStyles.burnBanText }, content)
  );
};

// Meeting Places Component
export const MeetingPlaces = ({ title, places = [] }) => {
  const e = React.createElement;
  
  return e(View, { style: extendedStyles.meetingPlacesBox },
    e(Text, { style: extendedStyles.meetingPlacesTitle }, title),
    places.map((place, index) => 
      e(View, { key: `place-${index}`, style: extendedStyles.meetingPlace },
        e(Text, { style: extendedStyles.meetingPlaceNumber }, 
          e(Text, { style: extendedStyles.seasonLabel }, `${index + 1}. `),
          place
        )
      )
    )
  );
};

// Seasonal Information Component
export const SeasonalInfo = ({ seasons = [] }) => {
  const e = React.createElement;
  
  return e(View, null,
    seasons.map((season, index) => 
      e(Text, { key: `season-${index}`, style: { ...extendedStyles.seasonalInfo, fontSize: typography.sizes.base } },
        e(Text, { style: extendedStyles.seasonLabel }, season.label),
        e(Text, null, `: ${season.dates}`)
      )
    )
  );
};

// Specification List Component
export const SpecificationList = ({ items = [] }) => {
  const e = React.createElement;
  
  return e(View, { style: extendedStyles.specificationList },
    items.map((item, index) => 
      e(View, { key: `spec-${index}`, style: extendedStyles.specItem },
        e(Text, { style: extendedStyles.specBullet }, '•'),
        e(Text, { style: extendedStyles.specText }, item)
      )
    )
  );
};

export default {
  DecorativeStars,
  ImageCaptionBox,
  FullWidthInfoBox,
  ChecklistBox,
  NumberedRequirements,
  SectionHeaderUnderlined,
  RiskLevelBox,
  ContactCard,
  BurnBanBox,
  MeetingPlaces,
  SeasonalInfo,
  SpecificationList
};