#!/bin/bash

# BMPOA Guide - Cover Page Preview
# This script creates a standalone preview of the cover page

# Set color codes for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}BMPOA Cover Page Preview${NC}"
echo -e "${BLUE}================================${NC}"
echo ""

cd "$(dirname "$0")/.." || exit 1

# Create preview file
cat > cover-preview.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BMPOA Guide - Cover Preview</title>
    <link rel="stylesheet" href="css/styles.css">
    <style>
        body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #f0f0f0;
        }
        .preview-controls {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            z-index: 1000;
        }
        .preview-controls h3 {
            margin-top: 0;
            font-size: 16px;
        }
        .preview-controls button {
            display: block;
            width: 100%;
            margin: 5px 0;
            padding: 8px;
            border: 1px solid #ddd;
            background: white;
            cursor: pointer;
            border-radius: 4px;
        }
        .preview-controls button:hover {
            background: #f0f0f0;
        }
        .preview-controls button.active {
            background: #3498db;
            color: white;
        }
    </style>
</head>
<body>
    <div class="preview-controls">
        <h3>Background Options:</h3>
        <button onclick="changeBackground('')" class="active">Mountain Vista (Default)</button>
        <button onclick="changeBackground('cover-bg-overlook')">Mountain Overlook</button>
        <button onclick="changeBackground('cover-bg-lodge')">Lodge Overlook</button>
        <button onclick="changeBackground('cover-bg-vineyard')">Vineyard View</button>
        <button onclick="changeBackground('no-background-print')">No Background (Print)</button>
        <hr>
        <button onclick="window.print()">🖨️ Print Preview</button>
    </div>

    <div id="cover-container"></div>

    <script>
        // Load the cover page
        fetch('sections/cover-page.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('cover-container').innerHTML = html;
            })
            .catch(error => {
                document.getElementById('cover-container').innerHTML = 
                    '<div class="page"><div class="content-page"><p>Error loading cover page</p></div></div>';
            });

        // Function to change background
        function changeBackground(className) {
            const coverPage = document.querySelector('.cover-with-background');
            if (coverPage) {
                // Remove all background classes
                coverPage.classList.remove('cover-bg-overlook', 'cover-bg-lodge', 'cover-bg-vineyard', 'no-background-print');
                
                // Add new class if specified
                if (className) {
                    coverPage.classList.add(className);
                }
                
                // Update active button
                document.querySelectorAll('.preview-controls button').forEach(btn => {
                    btn.classList.remove('active');
                });
                event.target.classList.add('active');
            }
        }
    </script>
</body>
</html>
EOF

echo -e "${GREEN}✓${NC} Created cover-preview.html"
echo ""
echo "To view the cover page preview:"
echo "1. Open cover-preview.html in your browser"
echo "2. Try different background options"
echo "3. Test print preview"
echo ""

# Open in browser if on macOS
if [[ "$OSTYPE" == "darwin"* ]]; then
    open cover-preview.html
    echo -e "${GREEN}✓${NC} Opened in browser"
fi
