# HLPFL Link-in-Bio Platform 🎵

[![CI/CD](https://github.com/HLPFLCG/linkinbio/workflows/CI%2FCD%20Pipeline/badge.svg)](https://github.com/HLPFLCG/linkinbio/actions)
[![Lighthouse Score](https://img.shields.io/badge/Lighthouse-95%2B-success)](https://developers.google.com/web/tools/lighthouse)
[![Accessibility](https://img.shields.io/badge/Accessibility-WCAG%202.1%20AA-blue)](https://www.w3.org/WAI/WCAG21/quickref/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A world-class, accessible, and performant link-in-bio platform for HLPFL Records. Built with vanilla JavaScript, CSS3, and HTML5, following THE PERFECTION MANDATE standards for excellence in web development.

## ✨ Features

### 🎯 Core Features
- 🚀 **Lightning Fast** - Optimized for performance with 95+ Lighthouse score
- 🎨 **Fully Customizable** - Complete control over design and branding
- 📱 **Mobile First** - Responsive design that works perfectly on all devices
- ♿ **WCAG 2.1 AA Compliant** - Fully accessible with keyboard navigation and screen reader support
- 🔒 **Enterprise Security** - Comprehensive security headers and CSP implementation
- 📈 **SEO Optimized** - Structured data, meta tags, and search engine friendly

### 🚀 Performance
- ⚡ Service Worker for offline support
- 📦 PWA support for installable app experience
- 🎯 Optimized caching strategies
- 🖼️ Lazy loading for images
- 📊 Core Web Vitals optimized

### 🔐 Security
- 🛡️ Content Security Policy (CSP)
- 🔒 HTTPS enforcement with HSTS
- 🚫 XSS and clickjacking protection
- 📝 Security.txt for responsible disclosure
- 🔍 Regular security audits

### ♿ Accessibility
- ⌨️ Full keyboard navigation
- 🔊 Screen reader optimized
- 👁️ High contrast mode support
- 🎨 WCAG 2.1 AA color contrast
- 🎭 Reduced motion support
- 🏷️ Comprehensive ARIA labels

### 🎨 User Experience
- ✨ Smooth animations and transitions
- 📝 Accessible contact form
- 🎯 Skip navigation links
- 💬 Toast notifications
- 🎪 Interactive elements
- 📱 PWA install prompt

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript ES6+
- **Hosting**: Cloudflare Pages with global CDN
- **Version Control**: GitHub with automated CI/CD
- **Code Quality**: ESLint + Prettier
- **Testing**: GitHub Actions, Lighthouse CI, Pa11y
- **PWA**: Service Worker, Web App Manifest
- **Security**: CSP, Security Headers, HTTPS
- **Performance**: Optimized caching, lazy loading
- **Accessibility**: WCAG 2.1 AA compliant

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/HLPFLCG/linkinbio.git
cd linkinbio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:3000`

### 4. Customize Content

Edit the following files to customize your link-in-bio:

- `index.html` - Update profile information, links, and content
- `styles.css` - Customize colors, fonts, and design
- `form.css` - Modify contact form styling
- `script.js` - Add custom functionality

### 5. Test Your Changes

```bash
# Run linting
npm run lint

# Format code
npm run format

# Check formatting
npx prettier --check "*.{html,css,js}"
```

### 6. Deploy to Production

#### Option A: Cloudflare Pages (Recommended)

1. Push changes to GitHub:
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

2. Connect repository to Cloudflare Pages
3. Configure build settings:
   - Build command: `npm run build`
   - Build output directory: `/`
4. Deploy automatically

#### Option B: Other Platforms

The site works with any static hosting platform:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

## 📁 Project Structure

```
custom-link-in-bio/
├── index.html          # Main link-in-bio page
├── admin.html          # Admin panel for easy editing
├── style.css           # Styles and animations
├── script.js           # Main functionality
├── admin.css           # Admin panel styles
├── admin.js            # Admin panel functionality
├── config.json         # Configuration file
├── deploy.md           # Deployment guide
├── package.json        # Project metadata
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## 🚀 Development

### Project Structure

```
linkinbio/
├── index.html          # Main HTML file
├── styles.css          # Stylesheet
├── script.js           # JavaScript functionality
├── sw.js              # Service Worker
├── manifest.json      # PWA manifest
├── robots.txt         # SEO robots file
├── sitemap.xml        # SEO sitemap
├── _headers           # Cloudflare security headers
├── .well-known/       # Security and verification files
│   └── security.txt
├── images/            # Image assets
│   ├── favicon/       # Favicon files
│   ├── background/    # Background images
│   └── ...
├── .github/           # GitHub Actions workflows
│   └── workflows/
│       └── ci.yml
├── .eslintrc.json     # ESLint configuration
├── .prettierrc.json   # Prettier configuration
├── .editorconfig      # Editor configuration
└── package.json       # Dependencies and scripts
```

### Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run deploy` - Deploy to Cloudflare Pages

## 🎯 Performance Metrics

### Lighthouse Scores (Target)
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

## 🔐 Security Features

### Headers Implemented
- `Content-Security-Policy`
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Strict-Transport-Security` (HSTS)
- `Permissions-Policy`

### Best Practices
- All external links use `rel="noopener noreferrer"`
- No inline JavaScript or CSS
- Environment variables for sensitive data
- Regular security audits with `npm audit`

## ♿ Accessibility Features

- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Skip navigation links
- Focus indicators
- Screen reader optimized
- Color contrast ratios meet WCAG AA
- Respects `prefers-reduced-motion`
- Form labels properly associated

## 📱 Progressive Web App (PWA)

- **Service Worker** for offline functionality
- **Web App Manifest** for installability
- **App-like experience** on mobile devices
- **Offline fallback** pages
- **Cache-first strategy** for static assets

## 🌐 Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📈 SEO Features

- Structured data (JSON-LD) for Organization
- Open Graph tags for social media
- Twitter Card tags
- robots.txt for crawler directives
- sitemap.xml for search engines
- Canonical URLs
- Meta descriptions and keywords
- Semantic HTML for better indexing

## 🚀 Deployment

### Cloudflare Pages

1. Connect your GitHub repository to Cloudflare Pages
2. Set build command: `npm run build`
3. Set build output directory: `/`
4. Deploy!

The `_headers` file will automatically configure security headers.

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy files to your hosting provider
# Upload: index.html, styles.css, script.js, sw.js, manifest.json,
#         robots.txt, sitemap.xml, _headers, images/, .well-known/
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] Test on Chrome, Firefox, Safari, Edge
- [ ] Test on mobile devices (iOS, Android)
- [ ] Test keyboard navigation
- [ ] Test screen reader compatibility
- [ ] Test with slow 3G connection
- [ ] Test offline functionality
- [ ] Verify all links work
- [ ] Check form submission
- [ ] Verify social media previews

### Automated Testing
- ESLint for code quality
- Prettier for code formatting
- Lighthouse CI for performance
- npm audit for security vulnerabilities

## 📊 Analytics & Monitoring

Consider adding:
- Google Analytics or privacy-focused alternative
- Error tracking (Sentry, Bugsnag)
- Performance monitoring (New Relic, Datadog)
- Uptime monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Follow ESLint and Prettier configurations
- Write semantic HTML
- Use CSS custom properties for theming
- Comment complex logic
- Keep functions small and focused

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Jim Rockel** - Founder, HLPFL Records
- **Development Team** - HLPFL Tech

## 🙏 Acknowledgments

- Font: Montserrat by Google Fonts
- Icons: Custom SVG icons
- Hosting: Cloudflare Pages

## 📞 Contact

- Website: [hlpfl.org](https://hlpfl.org)
- Email: [Contact Form](https://hlpfl.org/contact/)
- Instagram: [@hlpfl_](https://www.instagram.com/hlpfl_/)
- Twitter: [@hlpfl_](https://x.com/hlpfl_)

## 🎵 About HLPFL

HLPFL Records is a Michigan-based record label discovering, developing, and promoting exceptional musical talent. We elevate artists to global recognition with cutting-edge production and worldwide distribution.

---

**Made with ❤️ by HLPFL Records**