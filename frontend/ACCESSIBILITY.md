# Accessibility Guide

This document outlines accessibility standards and best practices for the HLPFL frontend application.

## Table of Contents

- [Overview](#overview)
- [Standards](#standards)
- [Testing](#testing)
- [Best Practices](#best-practices)
- [Common Patterns](#common-patterns)
- [Resources](#resources)

## Overview

We are committed to making HLPFL accessible to everyone, including people with disabilities. Our goal is to meet or exceed WCAG 2.1 Level AA standards.

### Why Accessibility Matters

- **Legal Compliance**: ADA, Section 508, WCAG requirements
- **Inclusive Design**: 15% of the world's population has some form of disability
- **Better UX**: Accessible design benefits everyone
- **SEO Benefits**: Better semantic HTML improves search rankings
- **Business Impact**: Larger potential user base

## Standards

### WCAG 2.1 Level AA

We follow the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA, which includes:

#### 1. Perceivable

Information and UI components must be presentable to users in ways they can perceive.

- **Text Alternatives**: Provide text alternatives for non-text content
- **Time-based Media**: Provide alternatives for time-based media
- **Adaptable**: Create content that can be presented in different ways
- **Distinguishable**: Make it easier for users to see and hear content

#### 2. Operable

UI components and navigation must be operable.

- **Keyboard Accessible**: Make all functionality available from a keyboard
- **Enough Time**: Provide users enough time to read and use content
- **Seizures**: Do not design content that causes seizures
- **Navigable**: Provide ways to help users navigate and find content

#### 3. Understandable

Information and UI operation must be understandable.

- **Readable**: Make text content readable and understandable
- **Predictable**: Make web pages appear and operate in predictable ways
- **Input Assistance**: Help users avoid and correct mistakes

#### 4. Robust

Content must be robust enough to be interpreted by a wide variety of user agents.

- **Compatible**: Maximize compatibility with current and future user agents

## Testing

### Automated Testing

#### axe DevTools

```bash
npm install --save-dev @axe-core/react

# Add to your app
import { axe } from '@axe-core/react';

if (process.env.NODE_ENV !== 'production') {
  axe(React, ReactDOM, 1000);
}
```

#### ESLint Plugin

```bash
npm install --save-dev eslint-plugin-jsx-a11y
```

```json
// .eslintrc.json
{
  "extends": ["plugin:jsx-a11y/recommended"]
}
```

### Manual Testing

#### Keyboard Navigation

Test all functionality using only keyboard:

- `Tab`: Navigate forward
- `Shift + Tab`: Navigate backward
- `Enter`: Activate buttons/links
- `Space`: Toggle checkboxes/buttons
- `Arrow keys`: Navigate within components
- `Esc`: Close modals/menus

#### Screen Reader Testing

Test with popular screen readers:

- **NVDA** (Windows, free)
- **JAWS** (Windows, paid)
- **VoiceOver** (macOS/iOS, built-in)
- **TalkBack** (Android, built-in)

#### Color Contrast

Use tools to check color contrast:

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Contrast Ratio](https://contrast-ratio.com/)
- Chrome DevTools (Lighthouse audit)

Minimum ratios:
- **Normal text**: 4.5:1
- **Large text**: 3:1
- **UI components**: 3:1

## Best Practices

### 1. Semantic HTML

Use appropriate HTML elements:

```typescript
// ✅ Good: Semantic HTML
<nav>
  <ul>
    <li><a href="/home">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>

// ❌ Bad: Non-semantic divs
<div className="nav">
  <div className="link" onClick={goHome}>Home</div>
  <div className="link" onClick={goAbout}>About</div>
</div>
```

### 2. ARIA Labels

Use ARIA attributes when semantic HTML isn't enough:

```typescript
// Button with icon only
<button aria-label="Close dialog">
  <X className="h-4 w-4" />
</button>

// Form input
<input
  type="email"
  aria-label="Email address"
  aria-required="true"
  aria-invalid={hasError}
  aria-describedby="email-error"
/>
{hasError && <span id="email-error">Please enter a valid email</span>}
```

### 3. Keyboard Navigation

Ensure all interactive elements are keyboard accessible:

```typescript
// ✅ Good: Keyboard accessible
<button onClick={handleClick}>Click me</button>

// ❌ Bad: Not keyboard accessible
<div onClick={handleClick}>Click me</div>

// ✅ Good: Custom interactive element with keyboard support
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
  Click me
</div>
```

### 4. Focus Management

Manage focus appropriately:

```typescript
import { useRef, useEffect } from 'react';

function Modal({ isOpen, onClose }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Focus close button when modal opens
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <div role="dialog" aria-modal="true">
      <button ref={closeButtonRef} onClick={onClose}>
        Close
      </button>
      {/* Modal content */}
    </div>
  );
}
```

### 5. Focus Indicators

Always show focus indicators:

```css
/* ✅ Good: Visible focus indicator */
button:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* ❌ Bad: Removing focus indicator */
button:focus {
  outline: none; /* Never do this! */
}
```

### 6. Alt Text for Images

Provide meaningful alt text:

```typescript
// ✅ Good: Descriptive alt text
<Image
  src="/team-photo.jpg"
  alt="Team members celebrating project launch"
  width={800}
  height={600}
/>

// ❌ Bad: Generic alt text
<Image
  src="/team-photo.jpg"
  alt="image"
  width={800}
  height={600}
/>

// ✅ Good: Decorative image
<Image
  src="/decorative-pattern.jpg"
  alt=""
  width={800}
  height={600}
  aria-hidden="true"
/>
```

### 7. Form Accessibility

Make forms accessible:

```typescript
function LoginForm() {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          required
          aria-required="true"
          aria-describedby="email-hint"
        />
        <span id="email-hint">We'll never share your email</span>
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          required
          aria-required="true"
          aria-describedby="password-requirements"
        />
        <span id="password-requirements">
          Must be at least 8 characters
        </span>
      </div>

      <button type="submit">Sign In</button>
    </form>
  );
}
```

### 8. Error Messages

Make error messages accessible:

```typescript
function FormField({ error, ...props }) {
  const errorId = `${props.id}-error`;

  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        {...props}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        <span id={errorId} role="alert" className="text-red-600">
          {error}
        </span>
      )}
    </div>
  );
}
```

### 9. Loading States

Announce loading states to screen readers:

```typescript
function DataTable() {
  const { data, isLoading } = useData();

  if (isLoading) {
    return (
      <div role="status" aria-live="polite">
        <LoadingSpinner />
        <span className="sr-only">Loading data...</span>
      </div>
    );
  }

  return <Table data={data} />;
}
```

### 10. Skip Links

Provide skip links for keyboard users:

```typescript
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4"
        >
          Skip to main content
        </a>
        <nav>{/* Navigation */}</nav>
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
```

## Common Patterns

### Accessible Button

```typescript
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary';
}

function Button({ children, onClick, disabled, loading, variant = 'primary' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      aria-disabled={disabled}
      className={cn(
        'px-4 py-2 rounded-lg font-semibold',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        variant === 'primary' && 'bg-purple-600 text-white focus:ring-purple-500',
        variant === 'secondary' && 'bg-gray-200 text-gray-900 focus:ring-gray-500',
        (disabled || loading) && 'opacity-50 cursor-not-allowed'
      )}
    >
      {loading && <LoadingSpinner size="sm" />}
      {children}
    </button>
  );
}
```

### Accessible Modal

```typescript
function Modal({ isOpen, onClose, title, children }) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Trap focus in modal
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements?.[0] as HTMLElement;
      firstElement?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="bg-white rounded-lg p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="modal-title" className="text-xl font-bold mb-4">
          {title}
        </h2>
        {children}
        <button
          onClick={onClose}
          className="mt-4"
          aria-label="Close dialog"
        >
          Close
        </button>
      </div>
    </div>
  );
}
```

### Accessible Dropdown

```typescript
function Dropdown({ label, options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby="dropdown-label"
      >
        <span id="dropdown-label" className="sr-only">{label}</span>
        {value || 'Select an option'}
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-labelledby="dropdown-label"
          className="absolute mt-1 bg-white border rounded shadow-lg"
        >
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={value === option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
                buttonRef.current?.focus();
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

### Accessible Tabs

```typescript
function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div>
      <div role="tablist" aria-label="Content tabs">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            onClick={() => onChange(tab.id)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') {
                const nextIndex = (index + 1) % tabs.length;
                onChange(tabs[nextIndex].id);
              } else if (e.key === 'ArrowLeft') {
                const prevIndex = (index - 1 + tabs.length) % tabs.length;
                onChange(tabs[prevIndex].id);
              }
            }}
            tabIndex={activeTab === tab.id ? 0 : -1}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={activeTab !== tab.id}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
```

## Accessibility Checklist

Before deploying:

- [ ] All images have alt text
- [ ] All form inputs have labels
- [ ] Color contrast meets WCAG AA standards
- [ ] All functionality works with keyboard only
- [ ] Focus indicators are visible
- [ ] Skip links are present
- [ ] ARIA labels are used appropriately
- [ ] Error messages are announced
- [ ] Loading states are announced
- [ ] Modals trap focus
- [ ] Headings are in logical order
- [ ] Links have descriptive text
- [ ] Tables have proper headers
- [ ] Videos have captions
- [ ] Tested with screen reader
- [ ] Passed automated accessibility tests

## Resources

### Tools

- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Documentation

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [A11y Project](https://www.a11yproject.com/)
- [WebAIM](https://webaim.org/)

### Testing

- [NVDA Screen Reader](https://www.nvaccess.org/)
- [VoiceOver Guide](https://www.apple.com/accessibility/voiceover/)
- [Keyboard Testing Guide](https://webaim.org/articles/keyboard/)

---

**Remember**: Accessibility is not optional—it's essential! ♿