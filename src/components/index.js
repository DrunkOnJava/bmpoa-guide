// Central export file for all BMPOA components
// Import all components from here to simplify imports in your pages

// Enhanced Layout Components (Dense layouts)
export {
  TwoColumnLayout,
  QuickFactsBox,
  InfoBox,
  CompactTable,
  DenseText,
  CompactSectionHeader,
  CompactSubsectionHeader,
  InlineInfo,
  TwoColumnList,
  EmergencyBox
} from './EnhancedLayoutComponents.js';

// Advanced Layout Components (Professional patterns)
export {
  CardGrid,
  HierarchicalList,
  Timeline,
  FeatureBox,
  SidebarBox,
  QuoteBox,
  Badge,
  MixedLayout,
  CoverHeader,
  TOCEntry
} from './AdvancedLayoutComponents.js';

// Extended Layout Components (Specialized components)
export {
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
} from './ExtendedLayoutComponents.js';

// Section Divider
export { default as SectionDivider } from './SectionDivider.js';

// Design Components (if still used)
// export * from './DesignComponents.js';

// Usage in your components:
// import { TwoColumnLayout, QuickFactsBox, CardGrid, ChecklistBox } from './components/index.js';