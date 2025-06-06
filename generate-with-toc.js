import { createFinalPDF } from './src/generate-pdf.js';
import { generatePDFScreenshotsTimestamped } from './scripts/generate-pdf-screenshots-timestamped.js';
import { checkBuildLock, createBuildLock, removeBuildLock } from './scripts/check-build-lock.js';
import { exec, execSync } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';

const execAsync = promisify(exec);

(async () => {
  try {
    // Check for concurrent builds
    if (!await checkBuildLock()) {
      process.exit(1);
    }
    
    // Check disk space
    try {
      execSync('./scripts/check-disk-space.sh', { stdio: 'inherit' });
    } catch (err) {
      console.error('❌ Disk space check failed');
      process.exit(1);
    }
    
    // Create build lock
    await createBuildLock();
    
    // Ensure the output folder exists
    await fs.mkdir('output', { recursive: true });
    
    // Generate the PDF
    await createFinalPDF();
    
    // Generate timestamped build with screenshots
    console.log('\n📸 Creating timestamped build with PDF screenshots...');
    const buildDir = await generatePDFScreenshotsTimestamped();
    
    // Automatically start content analysis
    console.log('\n🤖 Starting automated analysis processes...');
    console.log('   These will run in the background.');
    console.log('   Check status with: npm run build:status');
    
    // Create a file to track that PDF generation is complete
    await fs.writeFile(`${buildDir}/pdf-generation-complete.flag`, new Date().toISOString());
    
    // Run content analysis script asynchronously
    const analysisProcess = exec('./scripts/analyze-latest-build.sh', { detached: true });
    analysisProcess.unref(); // Allow the main process to exit
    
    // Run rename script asynchronously
    const renameProcess = exec('./scripts/rename-pdf-screenshots-direct.sh', { detached: true });
    renameProcess.unref(); // Allow the main process to exit
    
    console.log('\n📊 Build outputs:');
    console.log(`   PDF: output/BMPOA-Guide.pdf`);
    console.log(`   Build: ${buildDir}/`);
    console.log(`   Screenshots: output/PDF-Screenshots/`);
    console.log('\n✅ PDF generation complete! Analysis running in background.');
    
    // Remove build lock on success
    await removeBuildLock();
    process.exit(0);
  } catch (err) {
    console.error('❌ Final PDF generation failed:', err);
    // Remove build lock on error
    await removeBuildLock();
    process.exit(1);
  }
})();