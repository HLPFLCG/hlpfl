/**
 * Comprehensive Website Audit Script
 * Checks for HTML validation, accessibility, performance, and best practices
 */

const fs = require('fs');
const path = require('path');

class WebsiteAuditor {
    constructor() {
        this.issues = {
            critical: [],
            high: [],
            medium: [],
            low: [],
            info: []
        };
    }

    // Audit HTML Structure
    auditHTML(htmlContent) {
        console.log('🔍 Auditing HTML Structure...\n');
        
        // Check for missing alt attributes
        const imgRegex = /<img[^>]*>/gi;
        const images = htmlContent.match(imgRegex) || [];
        images.forEach((img, index) => {
            if (!img.includes('alt=')) {
                this.issues.high.push(`Image ${index + 1} missing alt attribute: ${img.substring(0, 50)}...`);
            }
        });

        // Check for proper heading hierarchy
        const h1Count = (htmlContent.match(/<h1[^>]*>/gi) || []).length;
        if (h1Count === 0) {
            this.issues.critical.push('No H1 heading found on page');
        } else if (h1Count > 1) {
            this.issues.medium.push(`Multiple H1 headings found (${h1Count}). Should have only one.`);
        }

        // Check for semantic HTML5 elements
        const semanticElements = ['header', 'main', 'footer', 'nav', 'article', 'section'];
        semanticElements.forEach(element => {
            if (!htmlContent.includes(`<${element}`)) {
                this.issues.info.push(`Consider using <${element}> for better semantics`);
            }
        });

        // Check for lang attribute
        if (!htmlContent.includes('lang=')) {
            this.issues.high.push('Missing lang attribute on <html> tag');
        }

        // Check for viewport meta tag
        if (!htmlContent.includes('viewport')) {
            this.issues.critical.push('Missing viewport meta tag');
        }

        // Check for charset
        if (!htmlContent.includes('charset')) {
            this.issues.critical.push('Missing charset declaration');
        }

        // Check for ARIA labels on interactive elements
        const buttons = htmlContent.match(/<button[^>]*>/gi) || [];
        buttons.forEach((button, index) => {
            if (!button.includes('aria-label') && !button.includes('aria-labelledby')) {
                this.issues.medium.push(`Button ${index + 1} missing ARIA label`);
            }
        });

        // Check for form labels
        const inputs = htmlContent.match(/<input[^>]*>/gi) || [];
        inputs.forEach((input, index) => {
            if (!input.includes('aria-label') && !input.includes('id=')) {
                this.issues.medium.push(`Input ${index + 1} may be missing associated label`);
            }
        });

        // Check for external links with proper attributes
        const externalLinks = htmlContent.match(/<a[^>]*href=["']https?:\/\/[^"']*["'][^>]*>/gi) || [];
        externalLinks.forEach((link, index) => {
            if (!link.includes('rel=')) {
                this.issues.low.push(`External link ${index + 1} missing rel attribute`);
            }
            if (!link.includes('target=')) {
                this.issues.info.push(`External link ${index + 1} consider adding target="_blank"`);
            }
        });

        // Check for inline styles
        const inlineStyles = (htmlContent.match(/style="/gi) || []).length;
        if (inlineStyles > 5) {
            this.issues.medium.push(`Found ${inlineStyles} inline styles. Consider moving to CSS file.`);
        }

        // Check for deprecated tags
        const deprecatedTags = ['center', 'font', 'marquee', 'blink'];
        deprecatedTags.forEach(tag => {
            if (htmlContent.includes(`<${tag}`)) {
                this.issues.high.push(`Deprecated tag found: <${tag}>`);
            }
        });
    }

    // Audit CSS
    auditCSS(cssContent) {
        console.log('🎨 Auditing CSS...\n');

        // Check for !important overuse
        const importantCount = (cssContent.match(/!important/gi) || []).length;
        if (importantCount > 10) {
            this.issues.medium.push(`Excessive use of !important (${importantCount} instances)`);
        }

        // Check for vendor prefixes
        const vendorPrefixes = ['-webkit-', '-moz-', '-ms-', '-o-'];
        vendorPrefixes.forEach(prefix => {
            if (cssContent.includes(prefix)) {
                this.issues.info.push(`Consider using autoprefixer instead of manual ${prefix} prefixes`);
            }
        });

        // Check for CSS variables usage
        if (!cssContent.includes('--')) {
            this.issues.info.push('Consider using CSS custom properties (variables) for better maintainability');
        }

        // Check for media queries
        if (!cssContent.includes('@media')) {
            this.issues.medium.push('No media queries found. Site may not be responsive.');
        }

        // Check for print styles
        if (!cssContent.includes('@media print')) {
            this.issues.low.push('No print styles defined');
        }

        // Check for prefers-reduced-motion
        if (!cssContent.includes('prefers-reduced-motion')) {
            this.issues.medium.push('Missing prefers-reduced-motion media query for accessibility');
        }

        // Check for color contrast (basic check)
        const colorRegex = /#[0-9a-f]{3,6}/gi;
        const colors = cssContent.match(colorRegex) || [];
        if (colors.length > 50) {
            this.issues.info.push(`Many color values found (${colors.length}). Consider using CSS variables.`);
        }
    }

    // Audit JavaScript
    auditJS(jsContent) {
        console.log('⚡ Auditing JavaScript...\n');

        // Check for console.log statements
        const consoleCount = (jsContent.match(/console\.(log|warn|error)/gi) || []).length;
        if (consoleCount > 5) {
            this.issues.low.push(`Found ${consoleCount} console statements. Remove before production.`);
        }

        // Check for strict mode
        if (!jsContent.includes('"use strict"') && !jsContent.includes("'use strict'")) {
            this.issues.medium.push('JavaScript not running in strict mode');
        }

        // Check for error handling
        const tryCount = (jsContent.match(/try\s*{/gi) || []).length;
        const catchCount = (jsContent.match(/catch\s*\(/gi) || []).length;
        if (tryCount !== catchCount) {
            this.issues.medium.push('Mismatched try-catch blocks');
        }

        // Check for event listener cleanup
        if (jsContent.includes('addEventListener') && !jsContent.includes('removeEventListener')) {
            this.issues.low.push('Event listeners added but no cleanup found. May cause memory leaks.');
        }

        // Check for async/await usage
        if (jsContent.includes('Promise') && !jsContent.includes('async')) {
            this.issues.info.push('Consider using async/await for better Promise handling');
        }

        // Check for ES6+ features
        const es6Features = ['const ', 'let ', '=>', 'class ', '...', 'async ', 'await '];
        const usesES6 = es6Features.some(feature => jsContent.includes(feature));
        if (!usesES6) {
            this.issues.info.push('Consider using modern ES6+ features');
        }
    }

    // Generate Report
    generateReport() {
        console.log('\n' + '='.repeat(80));
        console.log('📊 AUDIT REPORT');
        console.log('='.repeat(80) + '\n');

        const totalIssues = 
            this.issues.critical.length +
            this.issues.high.length +
            this.issues.medium.length +
            this.issues.low.length +
            this.issues.info.length;

        console.log(`Total Issues Found: ${totalIssues}\n`);

        if (this.issues.critical.length > 0) {
            console.log('🔴 CRITICAL ISSUES:');
            this.issues.critical.forEach((issue, i) => {
                console.log(`  ${i + 1}. ${issue}`);
            });
            console.log('');
        }

        if (this.issues.high.length > 0) {
            console.log('🟠 HIGH PRIORITY ISSUES:');
            this.issues.high.forEach((issue, i) => {
                console.log(`  ${i + 1}. ${issue}`);
            });
            console.log('');
        }

        if (this.issues.medium.length > 0) {
            console.log('🟡 MEDIUM PRIORITY ISSUES:');
            this.issues.medium.forEach((issue, i) => {
                console.log(`  ${i + 1}. ${issue}`);
            });
            console.log('');
        }

        if (this.issues.low.length > 0) {
            console.log('🟢 LOW PRIORITY ISSUES:');
            this.issues.low.forEach((issue, i) => {
                console.log(`  ${i + 1}. ${issue}`);
            });
            console.log('');
        }

        if (this.issues.info.length > 0) {
            console.log('ℹ️  INFORMATIONAL:');
            this.issues.info.forEach((issue, i) => {
                console.log(`  ${i + 1}. ${issue}`);
            });
            console.log('');
        }

        // Save report to file
        const report = {
            timestamp: new Date().toISOString(),
            totalIssues,
            issues: this.issues
        };

        fs.writeFileSync('audit-report.json', JSON.stringify(report, null, 2));
        console.log('📄 Detailed report saved to: audit-report.json\n');

        return report;
    }

    // Run full audit
    async runAudit() {
        try {
            // Read files
            const htmlContent = fs.readFileSync('index.html', 'utf8');
            const cssContent = fs.readFileSync('style-simplified.css', 'utf8');
            const jsContent = fs.readFileSync('scripts.js', 'utf8');

            // Run audits
            this.auditHTML(htmlContent);
            this.auditCSS(cssContent);
            this.auditJS(jsContent);

            // Generate report
            return this.generateReport();
        } catch (error) {
            console.error('Error running audit:', error);
            throw error;
        }
    }
}

// Run the audit
const auditor = new WebsiteAuditor();
auditor.runAudit().then(() => {
    console.log('✅ Audit complete!');
}).catch(error => {
    console.error('❌ Audit failed:', error);
    process.exit(1);
});