# Style Analysis System Documentation

## Overview

The BMPOA Guide now includes an advanced style analysis system that uses Claude 3.5 Sonnet to:
- Analyze each page for style guide compliance
- Score professionalism and presentation (0-100%)
- Suggest React/Tailwind CSS improvements
- Generate actionable fix tasks
- Create TODO items for systematic improvements

## Key Features

1. **Deep Style Analysis** - Goes beyond basic layout to analyze design quality
2. **Scoring System** - Rates each page's professionalism and presentation
3. **React/Tailwind Suggestions** - Modern component architecture recommendations
4. **Automated Task Generation** - Creates specific fix tasks with implementation details
5. **TODO Integration** - Converts violations into trackable TODO items

## Commands

### Run Complete Style Analysis
```bash
npm run style:analyze
```

This runs the full workflow:
1. Ensures content analysis is complete
2. Runs style guide analysis with Claude Sonnet
3. Generates reports and tasks
4. Creates TODO items

### Individual Commands
```bash
# Run style analysis on specific build
./scripts/analyze-style-guide.sh 2025-01-06T12-30-45

# Extract React/Tailwind suggestions
npm run style:extract

# Generate HTML report
npm run style:report 2025-01-06T12-30-45

# Convert to TODO items
node scripts/style-tasks-to-todo.js
```

## Analysis Output

Each analysis creates these files in the build directory:

### 1. Style Analysis Report (`style-analysis-report.md`)
```markdown
### Page 1

**Professionalism Score:** 85% | **Presentation Score:** 90%
**Compliance Score:** 87%

**Score Breakdown:**
- Typography: 85%
- Layout: 90%
- Consistency: 80%
- Whitespace: 95%
- Hierarchy: 85%

**Violations Found:**
- 🔴 **CRITICAL** - Header: Text cut off at right margin
  - Location: top-right
  - Fix: Reduce header font size or adjust margins

**React/Tailwind Enhancement Suggestions:**

**Header Component:**
- Current: Basic Text element with inline styles
- Suggested: `<Header className="text-2xl font-bold text-gray-800 mb-6" />`
- Benefits:
  - Consistent styling across all headers
  - Easy to maintain and update
  - Better responsive behavior
```

### 2. Style Violations JSON (`style-violations.json`)
```json
{
  "buildId": "2025-01-06T12-30-45",
  "violations": [{
    "pageNumber": 1,
    "professionalismScore": 85,
    "presentationScore": 90,
    "violations": [{
      "severity": "critical",
      "category": "layout",
      "element": "header",
      "issue": "Text cut off at right margin",
      "location": "top-right",
      "fix": "Reduce header font size or adjust margins"
    }],
    "reactTailwindSuggestions": {
      "components": [{
        "element": "header",
        "currentImplementation": "Basic Text element",
        "suggestedImplementation": "<Header className=\"text-2xl font-bold text-gray-800 mb-6\" />",
        "benefits": ["Consistent styling", "Easy maintenance"]
      }]
    }
  }]
}
```

### 3. Fix Tasks (`style-fix-tasks.md`)
```markdown
### 🔴 Critical Issues (Must Fix)

#### Page 1 - Header
**Issue:** Text cut off at right margin
**Location:** top-right
**Fix Required:** Reduce header font size or adjust margins
**Component File:** src/components/CoverPageNoJSX.js
- [ ] Implement fix
- [ ] Test rendering
- [ ] Verify compliance
```

### 4. React/Tailwind Suggestions (`react-tailwind-suggestions.md`)
```markdown
## Page Scores Summary

| Page | Professionalism | Presentation | Overall |
|------|----------------|--------------|---------|
| 1    | 85%            | 90%          | 88%     |
| 2    | 82%            | 88%          | 85%     |
| **Average** | **84%** | **89%** | **87%** |

## Component Enhancement Suggestions

### Header
**Recommended Implementation:**
```jsx
<View style={combineStyles('text-2xl', 'font-bold', 'mb-6')}>
  <Text>{children}</Text>
</View>
```
```

## Scoring System

### Professionalism Score (0-100%)
Evaluates:
- Appropriate typography choices
- Consistent formatting
- Professional color usage
- Proper hierarchy
- Business-appropriate design

### Presentation Score (0-100%)
Evaluates:
- Visual appeal
- Layout balance
- Whitespace usage
- Element alignment
- Overall polish

### Score Breakdown Categories
- **Typography**: Font choices, sizes, readability
- **Layout**: Structure, alignment, spacing
- **Consistency**: Uniform styling throughout
- **Whitespace**: Proper breathing room
- **Hierarchy**: Clear visual importance

## Workflow Example

### 1. Generate PDF and Run Analysis
```bash
# Generate PDF
npm run pdf

# Wait for build to complete, then run style analysis
npm run style:analyze
```

### 2. Review Results
```bash
# Check scores
cat output/builds/latest/style-analysis-report.md | grep "Score:"

# View critical issues
grep -A5 "🔴 CRITICAL" output/builds/latest/style-analysis-report.md
```

### 3. Import Tasks to TODO System
```bash
# Generate TODO items
node scripts/style-tasks-to-todo.js

# View generated TODOs
cat output/builds/latest/style-todo-items.json
```

### 4. Implement Fixes
- Start with critical issues
- Use suggested React/Tailwind implementations
- Test each fix with `npm run pdf`
- Re-run analysis to verify improvements

## Benefits

1. **Objective Scoring** - Quantifiable metrics for quality
2. **Modern Best Practices** - React/Tailwind suggestions
3. **Systematic Improvement** - Prioritized task lists
4. **Progress Tracking** - Compare scores between builds
5. **Component Reusability** - Suggested components can be reused

## Tips

- Run style analysis after major changes
- Track score improvements over time
- Focus on pages with scores below 80%
- Implement suggested components globally
- Use the HTML report for visual review