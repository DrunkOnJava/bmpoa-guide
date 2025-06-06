import { createPrelimTOC } from '../src/generate-pdf.js';

(async () => {
  try {
    await createPrelimTOC();
    process.exit(0);
  } catch (err) {
    console.error('❌ Preliminary TOC failed:', err);
    process.exit(1);
  }
})();