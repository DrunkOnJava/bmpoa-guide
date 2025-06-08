#!/bin/bash

echo "🔧 Fixing all duplicate imports..."

# Find all files that have both designTokens and theme imports with colors
files_with_conflicts=$(grep -l "from '../designTokens'" src/**/*.js | xargs grep -l "colors.*from.*theme")

for file in $files_with_conflicts; do
    echo "Fixing: $file"
    # Remove colors from theme imports
    sed -i '' 's/import { \(.*\)colors, \(.*\)} from ['"'"'"]\.\.\/theme/import { \1\2} from '"'"'..\/theme/g' "$file"
    sed -i '' 's/import { colors, \(.*\)} from ['"'"'"]\.\.\/theme/import { \1} from '"'"'..\/theme/g' "$file"
    sed -i '' 's/import { \(.*\), colors } from ['"'"'"]\.\.\/theme/import { \1 } from '"'"'..\/theme/g' "$file"
    sed -i '' 's/import { colors } from ['"'"'"]\.\.\/theme.*//g' "$file"
    
    # Clean up any double commas or spaces
    sed -i '' 's/, ,/,/g' "$file"
    sed -i '' 's/{  /{/g' "$file"
    sed -i '' 's/  }/}/g' "$file"
done

echo "✅ Done!"