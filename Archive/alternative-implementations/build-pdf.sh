#!/bin/bash

# BMPOA Guide PDF Generation Script

echo "📚 Blue Mountain Property Owners Association Guide - PDF Builder"
echo "============================================================"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Generate the PDF
echo "🚀 Generating PDF..."
npm run build

echo ""
echo "✨ Done! Check the output/ directory for your PDF."
echo ""

# Ask if user wants to open the PDF
read -p "Would you like to open the PDF? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    open output/BMPOA-Guide.pdf
fi
