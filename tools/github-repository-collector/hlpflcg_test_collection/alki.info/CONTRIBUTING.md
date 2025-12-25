# Contributing to alki.info

Thank you for your interest in contributing to alki.info! This document provides guidelines and instructions for contributing.

## 🎯 The Perfection Mandate

This project follows **The Perfection Mandate** - a commitment to absolute excellence in every aspect:

- ✅ Lighthouse Performance: 95+
- ✅ Lighthouse Accessibility: 100
- ✅ Lighthouse Best Practices: 95+
- ✅ Lighthouse SEO: 100
- ✅ Zero Console Errors
- ✅ Zero Accessibility Violations
- ✅ 100% Mobile Responsive
- ✅ Cross-Browser Compatible

## 📋 Code of Conduct

### Our Standards
- Be respectful and inclusive
- Focus on constructive feedback
- Prioritize quality over speed
- Document your changes thoroughly
- Test extensively before submitting

## 🚀 Getting Started

### Prerequisites
- Node.js 20.x or higher
- Git
- Modern web browser
- Code editor (VS Code recommended)

### Setup
```bash
# Clone the repository
git clone https://github.com/HLPFLCG/alki.info.git
cd alki.info

# Start local server
python -m http.server 8080

# Or use Node.js
npx http-server -p 8080
```

## 🔧 Development Workflow

### 1. Create a Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### Branch Naming Convention
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `style/` - Code style changes
- `refactor/` - Code refactoring
- `test/` - Test additions/changes
- `perf/` - Performance improvements

### 2. Make Your Changes

#### Code Style Guidelines

**HTML:**
- Use semantic HTML5 elements
- Include ARIA labels for accessibility
- Add alt text to all images
- Maintain proper heading hierarchy
- Use meaningful class names

**CSS:**
- Use CSS custom properties (variables)
- Follow mobile-first approach
- Add comments for complex styles
- Minimize use of `!important`
- Include print styles
- Support prefers-reduced-motion

**JavaScript:**
- Use strict mode (`'use strict'`)
- Write ES6+ code
- Add JSDoc comments
- Handle errors gracefully
- Clean up event listeners
- Avoid console.log in production

### 3. Test Your Changes

#### Manual Testing
```bash
# Run audit script
node audit-script.js

# Check for console logs
grep -r "console.log" scripts.js

# Validate HTML
html-validator --file=index.html
```

#### Browser Testing
Test on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

#### Accessibility Testing
- Run axe DevTools
- Test with screen reader
- Verify keyboard navigation
- Check color contrast

#### Performance Testing
- Run Lighthouse audit
- Check Core Web Vitals
- Test on slow 3G network
- Verify image optimization

### 4. Commit Your Changes

#### Commit Message Format
```
type(scope): subject

body

footer
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Testing
- `chore`: Maintenance

**Example:**
```bash
git commit -m "feat(accessibility): add ARIA labels to all buttons

- Added aria-label to cookie consent buttons
- Added aria-label to settings button
- Improved screen reader experience

Closes #123"
```

### 5. Push and Create Pull Request

```bash
# Push to your branch
git push https://x-access-token:$GITHUB_TOKEN@github.com/HLPFLCG/alki.info.git feature/your-feature-name

# Create pull request via GitHub CLI
gh pr create --title "Your PR Title" --body "Description of changes"
```

## 📝 Pull Request Guidelines

### PR Checklist
- [ ] Code follows style guidelines
- [ ] All tests pass
- [ ] No console errors or warnings
- [ ] Accessibility tested
- [ ] Cross-browser tested
- [ ] Mobile responsive
- [ ] Documentation updated
- [ ] Lighthouse scores maintained
- [ ] Security considerations addressed

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Manual testing completed
- [ ] Browser testing completed
- [ ] Accessibility testing completed
- [ ] Performance testing completed

## Screenshots
(if applicable)

## Checklist
- [ ] Code follows guidelines
- [ ] Tests pass
- [ ] Documentation updated
- [ ] No breaking changes
```

## 🐛 Bug Reports

### Before Submitting
1. Check existing issues
2. Verify it's reproducible
3. Test on multiple browsers
4. Gather relevant information

### Bug Report Template
```markdown
**Description**
Clear description of the bug

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Screenshots**
If applicable

**Environment**
- Browser: [e.g., Chrome 120]
- OS: [e.g., macOS 14]
- Device: [e.g., iPhone 15]
- Screen size: [e.g., 1920x1080]

**Additional Context**
Any other relevant information
```

## 💡 Feature Requests

### Feature Request Template
```markdown
**Feature Description**
Clear description of the feature

**Problem It Solves**
What problem does this solve?

**Proposed Solution**
How should it work?

**Alternatives Considered**
Other solutions you've considered

**Additional Context**
Mockups, examples, etc.
```

## 🎨 Design Guidelines

### Visual Design
- Follow existing color scheme
- Maintain consistent spacing
- Use system fonts where possible
- Optimize images (WebP format)
- Support dark mode (future)

### Interaction Design
- Smooth animations (60fps)
- Clear hover states
- Intuitive navigation
- Fast feedback
- Error prevention

### Accessibility
- WCAG 2.1 Level AA minimum
- Keyboard navigable
- Screen reader friendly
- Sufficient color contrast
- Clear focus indicators

## 📚 Documentation

### What to Document
- New features
- API changes
- Configuration options
- Breaking changes
- Migration guides

### Documentation Style
- Clear and concise
- Include examples
- Use proper formatting
- Add screenshots/diagrams
- Keep up to date

## 🔒 Security

### Security Guidelines
- Never commit secrets
- Validate all inputs
- Sanitize user data
- Use HTTPS only
- Follow OWASP guidelines

### Reporting Security Issues
See [SECURITY.md](SECURITY.md) for details.

## 📊 Performance

### Performance Guidelines
- Optimize images
- Minimize HTTP requests
- Use lazy loading
- Implement caching
- Monitor bundle size

### Performance Targets
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1
- Page load < 2s
- Time to Interactive < 3s

## 🧪 Testing

### Test Coverage
- Unit tests for utilities
- Integration tests for features
- E2E tests for critical paths
- Visual regression tests
- Performance tests

### Testing Tools
- Jest/Vitest for unit tests
- Playwright for E2E tests
- Lighthouse for performance
- axe for accessibility

## 📦 Release Process

### Version Numbering
We follow [Semantic Versioning](https://semver.org/):
- MAJOR: Breaking changes
- MINOR: New features
- PATCH: Bug fixes

### Release Checklist
- [ ] All tests pass
- [ ] Documentation updated
- [ ] CHANGELOG updated
- [ ] Version bumped
- [ ] Git tag created
- [ ] Deployed to production
- [ ] Announcement made

## 🤝 Community

### Getting Help
- GitHub Discussions
- Issue tracker
- Email: support@hlpfl.org

### Recognition
Contributors are recognized in:
- README.md
- Release notes
- Project website

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

## 🙏 Thank You

Thank you for contributing to alki.info! Your efforts help make this project better for everyone.

---

**Questions?** Open an issue or contact us at dev@hlpfl.org