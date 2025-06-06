# Enhanced Style Guide Specifications

## Page Layout Principles

### 1. Dense Information Architecture
- **Target**: 85-90% content density (vs current ~60%)
- **Multi-column layouts**: Use 60/40 or 70/30 splits for main content + sidebar
- **Vertical space**: Reduce paragraph gaps from 12pt to 8pt
- **Margins**: Tighten from 1" to 0.75" for more content area

### 2. Component Patterns

#### A. Two-Column Layout with Sidebar
```jsx
// React component structure
<View style={styles.twoColumnLayout}>
  <View style={styles.mainColumn}> // 65% width
    {/* Primary content */}
  </View>
  <View style={styles.sidebarColumn}> // 35% width
    <QuickFactsBox />
    <RelatedLinksBox />
    <ContactCard />
  </View>
</View>
```

#### B. Information Boxes (Multiple per page)
```jsx
// Compact info box for sidebar
<View style={styles.infoBox}>
  <View style={styles.infoBoxHeader}>
    <Text style={styles.infoBoxTitle}>Quick Facts</Text>
  </View>
  <View style={styles.infoBoxContent}>
    {/* Bullet points or key-value pairs */}
  </View>
</View>
```

#### C. Condensed Tables
- Use alternating row colors (#F7FAFC and white)
- Reduce cell padding from 12px to 8px
- Fit more rows per page
- Consider horizontal rules only (no vertical borders)

### 3. Typography Optimization

#### Current vs Enhanced
```
Section Headers: 24pt → 20pt
Subsection Headers: 18pt → 16pt  
Body Text: 11pt → 10.5pt
Line Height: 1.5 → 1.4
Paragraph Spacing: 12pt → 8pt
```

### 4. Page Templates

#### Template A: Information-Dense Service Page
```
┌─────────────────────────────────────┐
│ SECTION HEADER (full width)         │
├──────────────────┬──────────────────┤
│                  │ QUICK FACTS BOX  │
│ MAIN CONTENT     ├──────────────────┤
│ - Overview       │ HOURS BOX        │
│ - Details        ├──────────────────┤
│ - Process steps  │ CONTACT CARD     │
│                  ├──────────────────┤
│ PRICING TABLE    │ RELATED LINKS    │
│                  │                  │
└──────────────────┴──────────────────┘
```

#### Template B: Multi-Section Overview Page
```
┌─────────────────────────────────────┐
│ PAGE TITLE                          │
├─────────────┬───────────┬───────────┤
│ COLUMN 1    │ COLUMN 2  │ SIDEBAR   │
│ • Topic A   │ • Topic C │ AT A      │
│ • Topic B   │ • Topic D │ GLANCE    │
├─────────────┴───────────┼───────────┤
│ FULL WIDTH CALLOUT BOX  │ IMPORTANT │
│                         │ DATES     │
└─────────────────────────┴───────────┘
```

### 5. Space-Saving Techniques

#### A. Inline Elements
Instead of:
```
Property Type: Single Family
Lot Size: 0.5 acres  
Zoning: Residential
```

Use:
```
Property Type: Single Family | Lot Size: 0.5 acres | Zoning: Residential
```

#### B. Compact Lists
- Use two-column bullet lists for long items
- Reduce spacing between list items
- Consider icon + text format

#### C. Floating Elements
- Pull quotes in margins
- Page numbers in running headers
- Icons inline with headers

### 6. Visual Hierarchy Improvements

#### Color Usage
- **Primary sections**: Dark green header (#2C5282)
- **Subsections**: Light gray background (#F7FAFC)
- **Callouts**: Green border with light green tint
- **Tables**: Alternating white/#F7FAFC rows

#### Border and Spacing
- Consistent 1px borders for boxes
- 8px padding inside boxes (reduced from 16px)
- 4px radius on corners
- Remove unnecessary divider lines

### 7. Specific Component Enhancements

#### Enhanced Table Component
```jsx
const CompactTable = ({ data }) => (
  <View style={styles.compactTable}>
    <View style={styles.tableHeader}>
      {/* Header with smaller font and tighter padding */}
    </View>
    {data.map((row, i) => (
      <View style={[
        styles.tableRow,
        i % 2 === 0 ? styles.evenRow : styles.oddRow
      ]}>
        {/* Condensed row content */}
      </View>
    ))}
  </View>
);
```

#### Sidebar Quick Reference
```jsx
const QuickReferenceCard = () => (
  <View style={styles.sidebarCard}>
    <Text style={styles.cardTitle}>At a Glance</Text>
    <View style={styles.kvPair}>
      <Text style={styles.key}>Hours:</Text>
      <Text style={styles.value}>8am-5pm</Text>
    </View>
    {/* More key-value pairs */}
  </View>
);
```

### 8. Page Consolidation Strategies

1. **Combine related topics**: Merge short sections that are under 1/3 page
2. **Use tabbed content**: For multiple related forms or processes
3. **Accordion sections**: For FAQ or detailed procedures
4. **Matrix layouts**: For comparing multiple items (facilities, services)

### 9. Implementation Priority

1. **Phase 1**: Convert single-column pages to two-column layouts
2. **Phase 2**: Add sidebar components to service pages
3. **Phase 3**: Consolidate sparse pages (combine 2-3 short sections)
4. **Phase 4**: Implement compact tables and lists
5. **Phase 5**: Fine-tune spacing and typography

### 10. Measurement Targets

- **Content density**: 85%+ of page area utilized
- **White space**: Max 15% (excluding margins)
- **Pages reduced**: Target 25-30% reduction in total page count
- **Information per page**: 2-3x current density