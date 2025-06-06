import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function scanAssets() {
  const imagesDir = path.join(__dirname, '../images');
  const optimizedDir = path.join(__dirname, '../images/optimized');
  const assetMapPath = path.join(__dirname, '../src/assetMap.json');

  try {
    // Check if optimized directory exists
    const hasOptimized = await fs.access(optimizedDir).then(() => true).catch(() => false);
    const scanDir = hasOptimized ? optimizedDir : imagesDir;
    
    console.log(`📁 Scanning ${hasOptimized ? 'optimized' : 'original'} images from: ${scanDir}`);
    
    const files = await fs.readdir(scanDir);
    const assetMap = {};

    for (const file of files) {
      if (file.match(/\.(jpg|jpeg|png|gif|svg)$/i)) {
        const key = file.replace(/\.(jpg|jpeg|png|gif|svg)$/i, '').replace(/[^a-zA-Z0-9]/g, '');
        const fullPath = path.join(scanDir, file);
        assetMap[key] = fullPath;
      }
    }

    await fs.writeFile(assetMapPath, JSON.stringify(assetMap, null, 2));
    console.log(`🔖 assetMap.json updated with ${Object.keys(assetMap).length} entries.`);
  } catch (error) {
    console.error('❌ Error scanning assets:', error);
    process.exit(1);
  }
}

scanAssets();