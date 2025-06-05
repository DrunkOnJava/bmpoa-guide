/**
 * @file load-sections.js
 * @description Dynamically loads all guide sections and manages interactive features
 * 
 * @author BMPOA Development Team
 * @created 2025-01-01
 * @updated 2025-01-23
 * @version 1.1.0
 */

// Load all sections into the main document
document.addEventListener('DOMContentLoaded', function() {
    // Show loading indicator
    showLoadingIndicator();
    
    // Define all sections to load in order
    const sections = [
        { id: 'cover-page', file: 'sections/cover-page.html', name: 'Cover Page' },
        { id: 'introduction-page', file: 'sections/introduction-page.html', name: 'Introduction' },
        { id: 'table-of-contents', file: 'sections/table-of-contents.html', name: 'Table of Contents' },
        { id: 'section-1-governance', file: 'sections/section-1-governance.html', name: 'Governance & Structure' },
        { id: 'section-2-mountain-home', file: 'sections/section-2-mountain-home.html', name: 'A Mountain Home' },
        { id: 'section-3-wood-chipping', file: 'sections/section-3-wood-chipping.html', name: 'Wood-Chipping Program' },
        { id: 'section-4-fire-safety', file: 'sections/section-4-fire-safety.html', name: 'Fire Safety' },
        { id: 'section-5-community-services', file: 'sections/section-5-community-services.html', name: 'Community Services' },
        { id: 'section-6-deer-lake', file: 'sections/section-6-deer-lake.html', name: 'Deer Lake' },
        { id: 'section-7-lodge', file: 'sections/section-7-lodge.html', name: 'The Lodge' },
        { id: 'section-8-communication', file: 'sections/section-8-communication.html', name: 'Community Communication' },
        { id: 'section-9-contacts', file: 'sections/section-9-contacts.html', name: 'Contacts' },
        { id: 'section-10-natural-attractions', file: 'sections/section-10-natural-attractions.html', name: 'Natural Attractions' },
        { id: 'section-11-construction', file: 'sections/section-11-construction.html', name: 'Construction Guidelines' },
        { id: 'section-12-bear-safety', file: 'sections/section-12-bear-safety.html', name: 'Bear Safety' },
        { id: 'back-cover', file: 'sections/back-cover.html', name: 'Back Cover' }
    ];

    // Function to show loading indicator
    function showLoadingIndicator() {
        const loadingDiv = document.createElement('div');
        loadingDiv.id = 'loading-indicator';
        loadingDiv.className = 'loading';
        loadingDiv.innerHTML = '<h2>Loading BMPOA Community Guide</h2><p>Please wait while we prepare your guide</p>';
        loadingDiv.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; z-index: 1000; background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);';
        document.body.appendChild(loadingDiv);
    }
    
    // Function to hide loading indicator
    function hideLoadingIndicator() {
        const loadingDiv = document.getElementById('loading-indicator');
        if (loadingDiv) {
            loadingDiv.style.opacity = '0';
            loadingDiv.style.transition = 'opacity 0.3s ease';
            setTimeout(() => loadingDiv.remove(), 300);
        }
    }
    
    // Function to load a section
    function loadSection(section, index, total) {
        return fetch(section.file)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: Failed to load ${section.file}`);
                }
                return response.text();
            })
            .then(html => {
                const container = document.getElementById(section.id);
                if (container) {
                    container.innerHTML = html;
                    // Update loading progress
                    updateLoadingProgress(index + 1, total);
                } else {
                    console.warn(`Container not found for section: ${section.id}`);
                }
            })
            .catch(error => {
                console.error(`Error loading section ${section.name}:`, error);
                const container = document.getElementById(section.id);
                if (container) {
                    container.innerHTML = `
                        <div class="page">
                            <div class="content-page">
                                <div class="alert-box">
                                    <h4 class="alert-box-title">Loading Error</h4>
                                    <p>Unable to load section: <strong>${section.name}</strong></p>
                                    <p style="font-size: 0.9em; color: var(--text-muted);">${error.message}</p>
                                </div>
                            </div>
                        </div>`;
                }
            });
    }
    
    // Function to update loading progress
    function updateLoadingProgress(loaded, total) {
        const loadingDiv = document.getElementById('loading-indicator');
        if (loadingDiv) {
            const progress = Math.round((loaded / total) * 100);
            const progressText = loadingDiv.querySelector('p');
            if (progressText) {
                progressText.textContent = `Loading sections: ${loaded} of ${total} (${progress}%)`;
            }
        }
    }

    // Load all sections sequentially
    async function loadAllSections() {
        const startTime = performance.now();
        
        try {
            for (let i = 0; i < sections.length; i++) {
                await loadSection(sections[i], i, sections.length);
            }
            
            const loadTime = ((performance.now() - startTime) / 1000).toFixed(2);
            console.log(`All sections loaded successfully in ${loadTime} seconds`);
            
            // Hide loading indicator
            hideLoadingIndicator();
            
            // After all sections are loaded, set up any interactive elements
            setupInteractivity();
            
            // Announce to screen readers
            announceToScreenReaders('BMPOA Community Guide has finished loading');
            
        } catch (error) {
            console.error('Critical error loading guide:', error);
            hideLoadingIndicator();
            showCriticalError();
        }
    }
    
    // Function to show critical error
    function showCriticalError() {
        document.body.innerHTML = `
            <div style="max-width: 600px; margin: 50px auto; padding: 20px; text-align: center;">
                <h1 style="color: var(--danger);">Loading Error</h1>
                <p>We're sorry, but there was a problem loading the BMPOA Community Guide.</p>
                <p>Please try refreshing the page or contact support at secretary@bmpoa.org</p>
                <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; background: var(--primary); color: white; border: none; border-radius: 4px; cursor: pointer;">
                    Refresh Page
                </button>
            </div>`;
    }
    
    // Function to announce to screen readers
    function announceToScreenReaders(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        announcement.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
        document.body.appendChild(announcement);
        setTimeout(() => announcement.remove(), 1000);
    }

    // Setup any interactive elements
    function setupInteractivity() {
        // Add print button functionality if needed
        const printButton = document.getElementById('print-button');
        if (printButton) {
            printButton.addEventListener('click', function() {
                window.print();
            });
        }
        
        // Add smooth scrolling for internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Add keyboard navigation hints
        document.addEventListener('keydown', function(e) {
            // Ctrl/Cmd + P for print
            if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
                e.preventDefault();
                window.print();
            }
        });
        
        // Check for print parameter in URL
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('print') === 'true') {
            setTimeout(() => window.print(), 1000);
        }
    }

    // Start loading sections
    loadAllSections();
});

// Helper function to handle print layout
window.addEventListener('beforeprint', function() {
    // Add any print-specific adjustments here
    document.body.classList.add('printing');
    
    // Ensure all images are loaded
    const images = document.querySelectorAll('img');
    const imagePromises = Array.from(images).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve, reject) => {
            img.addEventListener('load', resolve);
            img.addEventListener('error', () => {
                console.warn(`Failed to load image: ${img.src}`);
                resolve(); // Resolve anyway to not block printing
            });
        });
    });
    
    // Wait for all images before printing
    Promise.all(imagePromises).then(() => {
        console.log('All images loaded, ready to print');
    });
});

window.addEventListener('afterprint', function() {
    // Remove print-specific adjustments
    document.body.classList.remove('printing');
});

// Error boundary for uncaught errors
window.addEventListener('error', function(event) {
    console.error('Uncaught error:', event.error);
    // Don't show error UI for minor issues
    if (event.error && event.error.message && event.error.message.includes('ResizeObserver')) {
        event.preventDefault(); // Ignore ResizeObserver errors
    }
});

// Performance monitoring
window.addEventListener('load', function() {
    // Log performance metrics
    if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`Page fully loaded in ${loadTime}ms`);
    }
});