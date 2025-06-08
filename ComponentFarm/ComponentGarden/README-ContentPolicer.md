# ContentPolicer - ComponentGarden Verification Project

## Overview

ContentPolicer is an automated content verification system that uses Claude 3.5 Sonnet to analyze extracted page images from the ComponentFarm/ComponentGarden directory. It verifies content accuracy against reference materials and identifies potential hallucinations or unverified claims.

## Directory Contents

This directory contains:
- **181 extracted page images** from various ExtractComponents PDFs (EC1, EC2, EC3, EC5, EC6)
- **content-verification-report.md** - Partially completed verification report
- **verification.log** - Process log from the ContentPolicer bot

## Image Organization

Images are organized by source PDF:
- `EC1-page-*.jpg` - 39 pages from ExtractComponents1.pdf
- `EC2-page-*.jpg` - 49 pages from ExtractComponents2.pdf  
- `EC3-page-*.jpg` - 21 pages from ExtractComponents3.pdf
- `EC5-page-*.jpg` - 36 pages from ExtractComponents5.pdf
- `EC6-page-*.jpg` - 36 pages from ExtractComponents6.pdf

## ContentPolicer Script

### Location
`/Users/griffin/Documents/bmpoa-guide/scripts/content-policer-component-garden-fixed.sh`

### Features
- Uses Claude 3.5 Sonnet for image analysis
- Verifies content against reference materials in `/ReferenceContent/Reference-Content`
- Identifies three types of issues:
  1. **Hallucinations** - Content not supported by references
  2. **Unverified Claims** - Statements that cannot be verified
  3. **Verified Content** - Content matching reference materials
- Outputs findings iteratively to `content-verification-report.md`
- Provides real-time progress in terminal

### Usage
```bash
# Run the ContentPolicer
./scripts/content-policer-component-garden-fixed.sh

# Monitor progress (in separate terminal)
./scripts/monitor-component-garden-verification.sh
```

## Verification Report Structure

Each image analysis includes:
- **Content Summary** - Brief description of page contents
- **Findings** - Count of hallucinations, unverified claims, and verified content
- **Specific Issues** - Detailed list of any problems found
- **Recommendation** - Suggested fixes or verifications needed

## Current Status

- **Processed**: ~6 images (partial run)
- **Remaining**: ~175 images
- **Status**: Paused for future completion

## Future Work

1. **Complete Verification** - Process remaining 175 images
2. **Citation Support** - Add reference citations for all verified claims
3. **Batch Processing** - Optimize for faster processing of multiple images
4. **Integration** - Connect findings to main PDF build process
5. **Reporting** - Generate summary reports by document section

## Known Issues

- Some images have poor quality making text verification difficult
- Binary/test pages (like QR codes) are not applicable for content verification
- Processing 181 images takes significant time (~6 hours estimated)

## Related Files

- Main ContentPolicer: `/scripts/content-policer-fixed.sh`
- Build monitor: `/scripts/monitor-build-activity-fixed.sh`
- Reference materials: `/ReferenceContent/Reference-Content/`

## Next Steps

When resuming this project:
1. Run the ContentPolicer script to continue verification
2. Review completed verifications in the report
3. Address any hallucinations or unverified claims found
4. Update source documents based on findings
5. Consider automating citation insertion