const React = require('react');
const ReactPDF = require('@react-pdf/renderer');
const fs = require('fs');
const path = require('path');
const { InfoBox, Figure, SectionHeader, WarningBox, Table, ChecklistItem, TwoColumns } = require('./PDFComponents.js');

const { Document, Page, Text, View, Image, StyleSheet, Font } = ReactPDF;

// Register fonts for better typography
Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff2',
      fontWeight: 400,
    },
    {
      src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
      fontWeight: 700,
    },
  ],
});

// Define reusable styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Roboto',
    paddingTop: 72,
    paddingBottom: 72,
    paddingHorizontal: 72,
  },
  coverPage: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
  heading1: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
    breakAfter: 'avoid',
    color: '#1e40af',
  },
  heading2: {
    fontSize: 18,
    marginBottom: 12,
    fontWeight: 'bold',
    breakAfter: 'avoid',
    color: '#2563eb',
  },
  heading3: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: 'bold',
    breakAfter: 'avoid',
    color: '#3b82f6',
  },
  paragraph: {
    fontSize: 11,
    lineHeight: 1.6,
    marginBottom: 12,
    textAlign: 'justify',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 10,
    color: '#6b7280',
  },
  keepTogether: {
    breakInside: 'avoid',
  },
  list: {
    marginBottom: 12,
    paddingLeft: 20,
  },
  listItem: {
    fontSize: 11,
    marginBottom: 4,
    lineHeight: 1.5,
  },
  tocEntry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    fontSize: 12,
  },
  tocDots: {
    flex: 1,
    marginHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomStyle: 'dotted',
    borderBottomColor: '#6b7280',
    marginBottom: 4,
  },
});

// Cover Page Component
const CoverPage = ({ emblemImage }) => (
  React.createElement(Page, { size: "LETTER", style: styles.coverPage },
    React.createElement(View, { style: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 72 } },
      // Top badges
      React.createElement(View, { 
        style: { 
          position: 'absolute', 
          top: 60, 
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 60,
        } 
      },
        React.createElement(View, { 
          style: { 
            backgroundColor: '#dbeafe',
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 20,
          } 
        },
          React.createElement(Text, { 
            style: { fontSize: 11, color: '#1e40af', fontWeight: 'bold' } 
          }, "EST. 1975")
        ),
        React.createElement(View, { 
          style: { 
            backgroundColor: '#dbeafe',
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 20,
          } 
        },
          React.createElement(Text, { 
            style: { fontSize: 11, color: '#1e40af', fontWeight: 'bold' } 
          }, "WELCOME BOOKLET")
        )
      ),
      // Emblem
      emblemImage && React.createElement(Image, { 
        src: emblemImage,
        style: {
          width: 220,
          height: 220,
          objectFit: 'contain',
          marginBottom: 30,
        }
      }),
      // Title
      React.createElement(View, { style: { alignItems: 'center', marginBottom: 40 } },
        React.createElement(Text, { 
          style: { 
            fontSize: 42, 
            fontWeight: 'bold', 
            color: '#1e3a8a',
            textAlign: 'center',
            letterSpacing: 2,
          } 
        }, "BLUE MOUNTAIN"),
        React.createElement(Text, { 
          style: { 
            fontSize: 38, 
            fontWeight: 'bold', 
            color: '#1e3a8a',
            textAlign: 'center',
            letterSpacing: 1,
            marginTop: 8,
          } 
        }, "PROPERTY OWNERS"),
        React.createElement(Text, { 
          style: { 
            fontSize: 38, 
            fontWeight: 'bold', 
            color: '#1e3a8a',
            textAlign: 'center',
            letterSpacing: 1,
            marginTop: 8,
          } 
        }, "ASSOCIATION")
      ),
      // Subtitle
      React.createElement(View, { style: { alignItems: 'center', marginBottom: 20 } },
        React.createElement(Text, { 
          style: { 
            fontSize: 18, 
            color: '#374151',
            textAlign: 'center',
            marginBottom: 4,
          } 
        }, "Your Complete Guide to Mountain Living in"),
        React.createElement(Text, { 
          style: { 
            fontSize: 18, 
            color: '#374151',
            textAlign: 'center',
          } 
        }, "Linden, Virginia")
      ),
      // Description
      React.createElement(Text, { 
        style: { 
          fontSize: 14, 
          color: '#6b7280',
          textAlign: 'center',
          fontStyle: 'italic',
        } 
      }, "A comprehensive resource for new and existing residents"),
      // Footer
      React.createElement(View, { 
        style: { 
          position: 'absolute', 
          bottom: 60, 
          alignItems: 'center',
        } 
      },
        React.createElement(Text, { 
          style: { fontSize: 12, color: '#374151', marginBottom: 4 } 
        }, "BMPOA • P.O. Box 114 • Linden, VA 22642"),
        React.createElement(Text, { 
          style: { fontSize: 12, color: '#1e40af' } 
        }, "www.bmpoa.org")
      )
    )
  )
);

// Table of Contents Page
const TableOfContentsPage = () => (
  React.createElement(Page, { size: "LETTER", style: styles.page },
    React.createElement(View, { style: { marginBottom: 40 } },
      React.createElement(Text, { 
        style: { 
          fontSize: 32, 
          fontWeight: 'bold', 
          color: '#1e3a8a',
          textAlign: 'center',
        } 
      }, "TABLE OF CONTENTS")
    ),
    React.createElement(View, { style: { paddingHorizontal: 20 } },
      // Section 1
      React.createElement(View, { style: { marginBottom: 20, breakInside: 'avoid' } },
        React.createElement(Text, { 
          style: { 
            fontSize: 16, 
            fontWeight: 'bold', 
            color: '#1e40af',
            marginBottom: 8,
          } 
        }, "1. Governance & Structure"),
        React.createElement(View, { style: styles.tocEntry },
          React.createElement(Text, {}, "BMPOA Overview"),
          React.createElement(View, { style: styles.tocDots }),
          React.createElement(Text, {}, "4")
        ),
        React.createElement(View, { style: styles.tocEntry },
          React.createElement(Text, {}, "Sanitary District Explained"),
          React.createElement(View, { style: styles.tocDots }),
          React.createElement(Text, {}, "5-6")
        )
      ),
      // Section 2
      React.createElement(View, { style: { marginBottom: 20, breakInside: 'avoid' } },
        React.createElement(Text, { 
          style: { 
            fontSize: 16, 
            fontWeight: 'bold', 
            color: '#1e40af',
            marginBottom: 8,
          } 
        }, "2. A Mountain Home"),
        React.createElement(View, { style: styles.tocEntry },
          React.createElement(Text, {}, "Community Origins"),
          React.createElement(View, { style: styles.tocDots }),
          React.createElement(Text, {}, "9")
        ),
        React.createElement(View, { style: styles.tocEntry },
          React.createElement(Text, {}, "Natural Beauty & Wildlife"),
          React.createElement(View, { style: styles.tocDots }),
          React.createElement(Text, {}, "11")
        )
      )
    ),
    React.createElement(Text, { 
      style: styles.pageNumber,
      render: ({ pageNumber }) => `BMPOA Community Guide ${pageNumber}`
    })
  )
);

// Introduction Page
const IntroductionPage = ({ images }) => (
  React.createElement(Page, { size: "LETTER", style: styles.page },
    React.createElement(Text, { style: styles.heading1 }, "INTRODUCTION"),
    React.createElement(Text, { style: styles.paragraph }, 
      "Welcome to Blue Mountain Property Owners Association (BMPOA)! We're delighted " +
      "that you've chosen to make our mountain community your home. This welcome " +
      "booklet is designed to provide residents with essential information about " +
      "living in our community, local resources, and important contact information."
    ),
    React.createElement(Text, { style: styles.paragraph }, 
      "Blue Mountain is a special place with stunning views of the Shenandoah Valley, " +
      "rich wildlife, and a close-knit community. Our neighborhood is located in " +
      "Warren County, Virginia, just outside the town of Linden."
    ),
    images.mountainVista && React.createElement(Figure, {
      src: images.mountainVista,
      caption: "Breathtaking views of the Shenandoah Valley from Blue Mountain",
      width: 450,
      height: 280
    }),
    React.createElement(InfoBox, { title: "ABOUT THIS GUIDE" },
      React.createElement(Text, { style: { fontSize: 11, lineHeight: 1.5 } },
        "This comprehensive guide contains everything you need to know about living " +
        "in the Blue Mountain community. It includes: community governance and structure, " +
        "covenants and rules, construction and home improvement guidelines, fire safety " +
        "and emergency preparedness, community services and amenities, local resources " +
        "and information, contacts and communication channels, and seasonal information " +
        "and maintenance guidelines."
      )
    ),
    React.createElement(Text, { 
      style: styles.pageNumber,
      render: ({ pageNumber }) => `BMPOA Community Guide ${pageNumber}`
    })
  )
);

// Community Facilities Page
const CommunityFacilitiesPage = ({ images }) => (
  React.createElement(Page, { size: "LETTER", style: styles.page },
    React.createElement(SectionHeader, { number: "06", title: "COMMUNITY FACILITIES" }),
    
    React.createElement(Text, { style: styles.heading2 }, "The Blue Mountain Lodge"),
    
    React.createElement(Text, { style: styles.paragraph }, 
      "The Blue Mountain Lodge serves as our community's central gathering place. " +
      "This beautiful facility is available for rental by property owners and hosts " +
      "numerous community events throughout the year."
    ),

    images.lodge && React.createElement(Figure, {
      src: images.lodge,
      caption: "The Blue Mountain Lodge offers a spacious venue for community gatherings",
      width: 400,
      height: 250
    }),

    React.createElement(View, { style: styles.keepTogether },
      React.createElement(Text, { style: styles.heading3 }, "Lodge Features"),
      React.createElement(View, { style: styles.list },
        React.createElement(Text, { style: styles.listItem }, "• Main Hall: Accommodates up to 100 guests"),
        React.createElement(Text, { style: styles.listItem }, "• Commercial Kitchen: Fully equipped"),
        React.createElement(Text, { style: styles.listItem }, "• Wraparound Deck: Mountain views"),
        React.createElement(Text, { style: styles.listItem }, "• Parking: Space for 40 vehicles")
      )
    ),

    React.createElement(Text, { style: styles.heading2 }, "Deer Lake Recreation Area"),
    
    React.createElement(Text, { style: styles.paragraph }, 
      "Deer Lake is a private recreational area exclusively for Blue Mountain property " +
      "owners and their guests. The lake features a beach area, swimming dock, and " +
      "fishing opportunities."
    ),

    images.deerLakeDock && React.createElement(Figure, {
      src: images.deerLakeDock,
      caption: "Deer Lake offers swimming, fishing, and relaxation for residents",
      width: 400,
      height: 250
    }),

    React.createElement(Text, { 
      style: styles.pageNumber,
      render: ({ pageNumber }) => `BMPOA Community Guide ${pageNumber}`
    })
  )
);

// Natural Attractions Page
const NaturalAttractionsPage = ({ images }) => (
  React.createElement(Page, { size: "LETTER", style: styles.page },
    React.createElement(SectionHeader, { number: "10", title: "NATURAL ATTRACTIONS" }),
    
    React.createElement(Text, { style: styles.heading2 }, "Spring Wildflowers"),
    
    React.createElement(Text, { style: styles.paragraph }, 
      "One of the most spectacular natural events near Blue Mountain is the annual " +
      "trillium bloom at the G. Richard Thompson Wildlife Management Area. This " +
      "remarkable display draws nature enthusiasts from across the region."
    ),

    images.trilliums && React.createElement(Figure, {
      src: images.trilliums,
      caption: "Millions of Great White Trilliums bloom each spring",
      width: 450,
      height: 280
    }),

    React.createElement(Text, { style: styles.heading2 }, "Local Wineries"),
    
    React.createElement(Text, { style: styles.paragraph }, 
      "Blue Mountain's elevation and climate create ideal conditions for grape growing. " +
      "Several excellent wineries call our mountain home, offering fine wines and " +
      "stunning views."
    ),

    React.createElement(TwoColumns, {
      left: images.winery1 && React.createElement(View, { style: { alignItems: 'center' } },
        React.createElement(Image, { 
          src: images.winery1, 
          style: { width: 200, height: 150, objectFit: 'cover', borderRadius: 8 } 
        }),
        React.createElement(Text, { style: { fontSize: 10, marginTop: 4, color: '#6b7280' } }, 
          "Fox Meadow Winery"
        )
      ),
      right: images.vineyardGreen && React.createElement(View, { style: { alignItems: 'center' } },
        React.createElement(Image, { 
          src: images.vineyardGreen, 
          style: { width: 200, height: 150, objectFit: 'cover', borderRadius: 8 } 
        }),
        React.createElement(Text, { style: { fontSize: 10, marginTop: 4, color: '#6b7280' } }, 
          "Scenic vineyard views"
        )
      )
    }),

    React.createElement(Text, { 
      style: styles.pageNumber,
      render: ({ pageNumber }) => `BMPOA Community Guide ${pageNumber}`
    })
  )
);

// Main Document Component
const BMPOADocument = ({ images = {} }) => (
  React.createElement(Document, {
    title: "Blue Mountain Property Owners Association Guide",
    author: "BMPOA",
    subject: "Community Guide",
    creator: "BMPOA",
    producer: "React PDF",
    keywords: "Blue Mountain, BMPOA, Community Guide, Linden, Virginia"
  },
    React.createElement(CoverPage, { emblemImage: images.emblem }),
    React.createElement(TableOfContentsPage),
    React.createElement(IntroductionPage, { images }),
    React.createElement(CommunityFacilitiesPage, { images }),
    React.createElement(NaturalAttractionsPage, { images })
  )
);

module.exports = BMPOADocument;
