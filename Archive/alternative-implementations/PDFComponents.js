const React = require('react');
const { Text, View, Image, StyleSheet } = require('@react-pdf/renderer');

const componentStyles = StyleSheet.create({
  // Section header that prevents orphaning
  sectionHeader: {
    backgroundColor: '#1e40af',
    color: 'white',
    padding: 20,
    marginBottom: 20,
    breakAfter: 'avoid',
    breakInside: 'avoid',
  },
  
  // Info box with proper spacing
  infoBox: {
    backgroundColor: '#dbeafe',
    padding: 16,
    marginVertical: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2563eb',
    breakInside: 'avoid',
  },
  
  // Warning box
  warningBox: {
    backgroundColor: '#fef3c7',
    padding: 16,
    marginVertical: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
    breakInside: 'avoid',
  },
  
  // Contact card
  contactCard: {
    backgroundColor: '#f3f4f6',
    padding: 12,
    marginVertical: 8,
    borderRadius: 6,
    breakInside: 'avoid',
  },
  
  // Centered image with caption
  figureContainer: {
    alignItems: 'center',
    marginVertical: 16,
    breakInside: 'avoid',
  },
  
  figureCaption: {
    fontSize: 10,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
  
  // Table styles
  table: {
    display: 'table',
    width: 'auto',
    breakInside: 'avoid',
    marginBottom: 16,
  },
  
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    borderBottomStyle: 'solid',
    alignItems: 'stretch',
    minHeight: 24,
    breakInside: 'avoid',
  },
  
  tableCell: {
    flex: 1,
    padding: 8,
    fontSize: 10,
    wordBreak: 'break-word',
    overflow: 'hidden',
  },
  
  // Checklist style
  checklistItem: {
    flexDirection: 'row',
    marginBottom: 6,
    paddingLeft: 20,
  },
  
  checkbox: {
    width: 12,
    height: 12,
    borderWidth: 1,
    borderColor: '#6b7280',
    marginRight: 8,
    marginLeft: -20,
    marginTop: 2,
  },
  
  // Two-column layout
  twoColumns: {
    flexDirection: 'row',
    gap: 20,
    marginVertical: 12,
  },
  
  column: {
    flex: 1,
  },
});

// Section Header Component
const SectionHeader = ({ number, title }) => (
  React.createElement(View, { style: componentStyles.sectionHeader },
    React.createElement(Text, { style: { fontSize: 32, fontWeight: 'bold', marginBottom: 8 } }, number),
    React.createElement(Text, { style: { fontSize: 24, fontWeight: 'bold' } }, title)
  )
);

// Info Box Component
const InfoBox = ({ title, children }) => (
  React.createElement(View, { style: componentStyles.infoBox },
    title && React.createElement(Text, { 
      style: { fontSize: 12, fontWeight: 'bold', marginBottom: 8, color: '#1e40af' } 
    }, title),
    children
  )
);

// Warning Box Component
const WarningBox = ({ title, children }) => (
  React.createElement(View, { style: componentStyles.warningBox },
    React.createElement(Text, { 
      style: { fontSize: 12, fontWeight: 'bold', marginBottom: 8, color: '#92400e' } 
    }, title || 'IMPORTANT'),
    children
  )
);

// Contact Card Component
const ContactCard = ({ name, title, email, phone }) => (
  React.createElement(View, { style: componentStyles.contactCard },
    React.createElement(Text, { style: { fontSize: 12, fontWeight: 'bold', marginBottom: 4 } }, name),
    title && React.createElement(Text, { style: { fontSize: 10, color: '#6b7280', marginBottom: 4 } }, title),
    email && React.createElement(Text, { style: { fontSize: 10, color: '#2563eb' } }, `✉ ${email}`),
    phone && React.createElement(Text, { style: { fontSize: 10, color: '#374151' } }, `☎ ${phone}`)
  )
);

// Figure Component with Caption
const Figure = ({ src, caption, width = 400, height = 300 }) => (
  React.createElement(View, { style: componentStyles.figureContainer },
    React.createElement(Image, { 
      src: src, 
      style: { 
        width, 
        height,
        objectFit: 'contain',
        borderRadius: 8,
      } 
    }),
    caption && React.createElement(Text, { style: componentStyles.figureCaption }, caption)
  )
);

// Two Column Layout
const TwoColumns = ({ left, right }) => (
  React.createElement(View, { style: componentStyles.twoColumns },
    React.createElement(View, { style: componentStyles.column }, left),
    React.createElement(View, { style: componentStyles.column }, right)
  )
);

// Checklist Item
const ChecklistItem = ({ children }) => (
  React.createElement(View, { style: componentStyles.checklistItem },
    React.createElement(View, { style: componentStyles.checkbox }),
    React.createElement(Text, { style: { flex: 1, fontSize: 11 } }, children)
  )
);

// Table Component
const Table = ({ headers, rows, columnWidths = [] }) => {
  return React.createElement(View, { style: componentStyles.table },
    // Headers
    React.createElement(View, { 
      style: { 
        flexDirection: 'row', 
        backgroundColor: '#1e40af',
        padding: 8,
      } 
    },
      headers.map((header, i) => 
        React.createElement(Text, {
          key: i,
          style: { 
            flex: columnWidths[i] || 1,
            color: 'white',
            fontSize: 10,
            fontWeight: 'bold',
          }
        }, header)
      )
    ),
    // Rows
    rows.map((row, rowIndex) => 
      React.createElement(View, {
        key: rowIndex,
        style: { 
          flexDirection: 'row',
          backgroundColor: rowIndex % 2 === 0 ? '#f9fafb' : '#ffffff',
          padding: 8,
          borderBottomWidth: 1,
          borderBottomColor: '#e5e7eb',
        }
      },
        row.map((cell, cellIndex) => 
          React.createElement(Text, {
            key: cellIndex,
            style: { 
              flex: columnWidths[cellIndex] || 1,
              fontSize: 10,
              wordBreak: 'break-word',
            }
          }, cell)
        )
      )
    )
  );
};

module.exports = {
  SectionHeader,
  InfoBox,
  WarningBox,
  ContactCard,
  Figure,
  TwoColumns,
  ChecklistItem,
  Table,
};
