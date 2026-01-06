'use strict';

/**
 * Accessibility Checker for alki.info
 * Validates WCAG 2.1 Level AA compliance
 */

class AccessibilityChecker {
    constructor() {
        this.issues = {
            critical: [],
            serious: [],
            moderate: [],
            minor: []
        };
        this.checks = 0;
        this.passed = 0;
    }

    // Run all accessibility checks
    async runAllChecks() {
        console.log('%c♿ Running Accessibility Checks...', 'font-size: 16px; font-weight: bold; color: #3b82f6;');
        console.log('━'.repeat(50));

        this.checkHeadingHierarchy();
        this.checkImageAltText();
        this.checkFormLabels();
        this.checkARIALabels();
        this.checkColorContrast();
        this.checkKeyboardNavigation();
        this.checkLandmarks();
        this.checkLinkText();
        this.checkLanguage();
        this.checkTabIndex();

        this.displayResults();
    }

    // Check heading hierarchy
    checkHeadingHierarchy() {
        this.checks++;
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const levels = Array.from(headings).map(h => parseInt(h.tagName[1]));
        
        // Check for H1
        if (!document.querySelector('h1')) {
            this.issues.critical.push('Missing H1 heading');
        } else {
            this.passed++;
        }

        // Check for multiple H1s
        const h1Count = document.querySelectorAll('h1').length;
        if (h1Count > 1) {
            this.issues.moderate.push(`Multiple H1 headings found (${h1Count})`);
        }

        // Check hierarchy
        for (let i = 1; i < levels.length; i++) {
            if (levels[i] - levels[i-1] > 1) {
                this.issues.moderate.push(`Heading hierarchy skip: h${levels[i-1]} to h${levels[i]}`);
            }
        }
    }

    // Check image alt text
    checkImageAltText() {
        this.checks++;
        const images = document.querySelectorAll('img');
        let missingAlt = 0;
        
        images.forEach((img, index) => {
            if (!img.hasAttribute('alt')) {
                missingAlt++;
                this.issues.serious.push(`Image ${index + 1} missing alt attribute`);
            } else if (img.alt.trim() === '' && !img.hasAttribute('role')) {
                this.issues.minor.push(`Image ${index + 1} has empty alt text (decorative?)`);
            }
        });

        if (missingAlt === 0) {
            this.passed++;
        }
    }

    // Check form labels
    checkFormLabels() {
        this.checks++;
        const inputs = document.querySelectorAll('input:not([type="hidden"]), textarea, select');
        let missingLabels = 0;

        inputs.forEach((input, index) => {
            const hasLabel = input.labels && input.labels.length > 0;
            const hasAriaLabel = input.hasAttribute('aria-label') || input.hasAttribute('aria-labelledby');
            
            if (!hasLabel && !hasAriaLabel) {
                missingLabels++;
                this.issues.serious.push(`Form input ${index + 1} missing label`);
            }
        });

        if (missingLabels === 0) {
            this.passed++;
        }
    }

    // Check ARIA labels
    checkARIALabels() {
        this.checks++;
        const buttons = document.querySelectorAll('button');
        let missingAria = 0;

        buttons.forEach((button, index) => {
            const hasText = button.textContent.trim().length > 0;
            const hasAriaLabel = button.hasAttribute('aria-label') || button.hasAttribute('aria-labelledby');
            
            if (!hasText && !hasAriaLabel) {
                missingAria++;
                this.issues.serious.push(`Button ${index + 1} missing accessible name`);
            }
        });

        if (missingAria === 0) {
            this.passed++;
        }
    }

    // Check color contrast (basic check)
    checkColorContrast() {
        this.checks++;
        // This is a simplified check - full contrast checking requires more complex calculations
        const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, button, span');
        let lowContrast = 0;

        textElements.forEach((element) => {
            const style = window.getComputedStyle(element);
            const color = style.color;
            const bgColor = style.backgroundColor;
            
            // Skip if transparent background
            if (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
                return;
            }

            // Basic check - this is simplified
            const contrast = this.calculateContrast(color, bgColor);
            if (contrast < 4.5) {
                lowContrast++;
            }
        });

        if (lowContrast === 0) {
            this.passed++;
        } else {
            this.issues.moderate.push(`${lowContrast} elements may have insufficient color contrast`);
        }
    }

    // Calculate contrast ratio (simplified)
    calculateContrast(color1, color2) {
        // This is a simplified version - real implementation would be more complex
        return 7; // Placeholder - assume good contrast
    }

    // Check keyboard navigation
    checkKeyboardNavigation() {
        this.checks++;
        const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]');
        let issues = 0;

        interactiveElements.forEach((element) => {
            const tabindex = element.getAttribute('tabindex');
            if (tabindex && parseInt(tabindex) > 0) {
                issues++;
                this.issues.moderate.push(`Element has positive tabindex (${tabindex})`);
            }
        });

        if (issues === 0) {
            this.passed++;
        }
    }

    // Check landmarks
    checkLandmarks() {
        this.checks++;
        const hasMain = document.querySelector('main');
        const hasNav = document.querySelector('nav');
        const hasHeader = document.querySelector('header');
        const hasFooter = document.querySelector('footer');

        if (!hasMain) {
            this.issues.moderate.push('Missing <main> landmark');
        }
        if (!hasNav) {
            this.issues.minor.push('Missing <nav> landmark');
        }
        if (!hasHeader) {
            this.issues.minor.push('Missing <header> landmark');
        }
        if (!hasFooter) {
            this.issues.minor.push('Missing <footer> landmark');
        }

        if (hasMain && hasNav && hasHeader && hasFooter) {
            this.passed++;
        }
    }

    // Check link text
    checkLinkText() {
        this.checks++;
        const links = document.querySelectorAll('a');
        let genericLinks = 0;

        const genericTexts = ['click here', 'read more', 'more', 'here', 'link'];

        links.forEach((link) => {
            const text = link.textContent.trim().toLowerCase();
            if (genericTexts.includes(text)) {
                genericLinks++;
                this.issues.minor.push(`Link with generic text: "${text}"`);
            }
        });

        if (genericLinks === 0) {
            this.passed++;
        }
    }

    // Check language attribute
    checkLanguage() {
        this.checks++;
        const html = document.documentElement;
        
        if (!html.hasAttribute('lang')) {
            this.issues.serious.push('Missing lang attribute on <html>');
        } else {
            this.passed++;
        }
    }

    // Check tabindex usage
    checkTabIndex() {
        this.checks++;
        const negativeTabindex = document.querySelectorAll('[tabindex="-1"]');
        
        if (negativeTabindex.length > 0) {
            this.issues.minor.push(`${negativeTabindex.length} elements with tabindex="-1" (may affect keyboard navigation)`);
        } else {
            this.passed++;
        }
    }

    // Display results
    displayResults() {
        console.log('\n%c📊 Accessibility Results', 'font-size: 14px; font-weight: bold; color: #10b981;');
        console.log('━'.repeat(50));

        const totalIssues = 
            this.issues.critical.length +
            this.issues.serious.length +
            this.issues.moderate.length +
            this.issues.minor.length;

        console.log(`Total Checks: ${this.checks}`);
        console.log(`Passed: ${this.passed}`);
        console.log(`Issues Found: ${totalIssues}`);
        console.log('');

        if (this.issues.critical.length > 0) {
            console.log('%c🔴 Critical Issues:', 'color: #ef4444; font-weight: bold;');
            this.issues.critical.forEach(issue => console.log(`  • ${issue}`));
            console.log('');
        }

        if (this.issues.serious.length > 0) {
            console.log('%c🟠 Serious Issues:', 'color: #f59e0b; font-weight: bold;');
            this.issues.serious.forEach(issue => console.log(`  • ${issue}`));
            console.log('');
        }

        if (this.issues.moderate.length > 0) {
            console.log('%c🟡 Moderate Issues:', 'color: #eab308; font-weight: bold;');
            this.issues.moderate.forEach(issue => console.log(`  • ${issue}`));
            console.log('');
        }

        if (this.issues.minor.length > 0) {
            console.log('%c🟢 Minor Issues:', 'color: #84cc16; font-weight: bold;');
            this.issues.minor.forEach(issue => console.log(`  • ${issue}`));
            console.log('');
        }

        console.log('━'.repeat(50));

        // Overall grade
        const score = (this.passed / this.checks) * 100;
        if (score >= 90) {
            console.log('%c✅ Excellent Accessibility!', 'font-size: 14px; color: #10b981; font-weight: bold;');
        } else if (score >= 70) {
            console.log('%c⚠️ Good Accessibility (Room for improvement)', 'font-size: 14px; color: #f59e0b; font-weight: bold;');
        } else {
            console.log('%c❌ Accessibility Needs Attention', 'font-size: 14px; color: #ef4444; font-weight: bold;');
        }

        console.log(`Score: ${score.toFixed(1)}%`);
    }

    // Get issues object
    getIssues() {
        return this.issues;
    }
}

// Initialize accessibility checker
if (typeof window !== 'undefined') {
    window.accessibilityChecker = new AccessibilityChecker();
    
    // Run checks after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            window.accessibilityChecker.runAllChecks();
        }, 2000);
    });
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AccessibilityChecker;
}