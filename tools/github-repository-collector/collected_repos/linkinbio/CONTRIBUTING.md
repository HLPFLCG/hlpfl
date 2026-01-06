# Contributing to HLPFL Link-in-Bio

Thank you for your interest in contributing to the HLPFL Link-in-Bio platform! This document provides guidelines and instructions for contributing.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

## 🤝 Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please be respectful and professional in all interactions.

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher
- Git

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/linkinbio.git
   cd linkinbio
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

5. Open http://localhost:3000 in your browser

## 💻 Development Workflow

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes

3. Test your changes:
   ```bash
   npm run lint
   npm run format
   ```

4. Commit your changes (see [Commit Guidelines](#commit-guidelines))

5. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

6. Create a Pull Request

## 📝 Coding Standards

### HTML

- Use semantic HTML5 elements
- Include proper ARIA labels for accessibility
- Maintain proper heading hierarchy (h1 → h2 → h3)
- Add alt text to all images
- Use meaningful class names

### CSS

- Follow BEM naming convention where appropriate
- Use CSS custom properties (variables) for colors and spacing
- Write mobile-first responsive styles
- Group related properties together
- Add comments for complex styles

### JavaScript

- Use ES6+ features
- Follow ESLint rules
- Add JSDoc comments for functions
- Handle errors gracefully
- Use meaningful variable and function names
- Keep functions small and focused

### Accessibility

- Ensure WCAG 2.1 AA compliance
- Test with keyboard navigation
- Test with screen readers
- Maintain color contrast ratios
- Support reduced motion preferences

### Performance

- Optimize images before committing
- Minimize CSS and JavaScript
- Use lazy loading for images
- Avoid render-blocking resources
- Test with Lighthouse

## 🧪 Testing Guidelines

### Manual Testing

- Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- Test on multiple devices (mobile, tablet, desktop)
- Test keyboard navigation
- Test with screen readers
- Test with slow network connections

### Automated Testing

- Run linting: `npm run lint`
- Check formatting: `npx prettier --check "*.{html,css,js}"`
- Validate HTML structure
- Check accessibility with Pa11y

## 📝 Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(links): add new social media link
fix(form): resolve validation error on submit
docs(readme): update installation instructions
style(css): improve button hover effects
refactor(script): simplify animation logic
perf(images): optimize logo file size
```

## 🔄 Pull Request Process

1. **Update Documentation**: Update README.md if needed
2. **Add Tests**: Include tests for new features
3. **Follow Style Guide**: Ensure code follows our standards
4. **Write Clear Description**: Explain what and why
5. **Link Issues**: Reference related issues
6. **Request Review**: Tag relevant reviewers
7. **Address Feedback**: Respond to review comments
8. **Squash Commits**: Clean up commit history if needed

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested on Chrome
- [ ] Tested on Firefox
- [ ] Tested on Safari
- [ ] Tested on mobile
- [ ] Accessibility tested
- [ ] Performance tested

## Screenshots
Add screenshots if applicable

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests pass locally
```

## 🐛 Reporting Bugs

### Before Submitting

- Check existing issues
- Test on latest version
- Gather reproduction steps

### Bug Report Template

```markdown
**Describe the bug**
Clear description of the bug

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What should happen

**Screenshots**
Add screenshots if applicable

**Environment:**
- Browser: [e.g., Chrome 120]
- OS: [e.g., macOS 14]
- Device: [e.g., iPhone 15]
```

## 💡 Suggesting Features

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
Clear description of the problem

**Describe the solution**
How should it work?

**Describe alternatives**
Other solutions considered

**Additional context**
Any other information
```

## 📚 Resources

- [HTML Best Practices](https://github.com/hail2u/html-best-practices)
- [CSS Guidelines](https://cssguidelin.es/)
- [JavaScript Style Guide](https://github.com/airbnb/javascript)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web Performance](https://web.dev/performance/)

## 🙏 Thank You

Thank you for contributing to HLPFL Link-in-Bio! Your efforts help make this project better for everyone.

## 📧 Contact

- Email: dev@hlpfl.org
- Discord: [Join our server](https://discord.gg/hlpfl)
- Twitter: [@hlpfl_](https://twitter.com/hlpfl_)

---

**Happy Coding! 🎵**
