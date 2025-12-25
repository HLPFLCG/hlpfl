# 💻 HLPFL RECORDS - DEVELOPER GUIDE

## 📋 TABLE OF CONTENTS
1. [Getting Started](#getting-started)
2. [Development Environment](#development-environment)
3. [Project Structure](#project-structure)
4. [Architecture Overview](#architecture-overview)
5. [Component Development](#component-development)
6. [State Management](#state-management)
7. [API Integration](#api-integration)
8. [Testing](#testing)
9. [Performance Optimization](#performance-optimization)
10. [Deployment](#deployment)
11. [Best Practices](#best-practices)
12. [Troubleshooting](#troubleshooting)

---

## 🚀 GETTING STARTED

### Prerequisites
- **Node.js:** 18.x or higher
- **npm:** 9.x or higher (or yarn/pnpm)
- **Git:** Latest version
- **Code Editor:** VS Code recommended

### Initial Setup

#### 1. Clone Repository
```bash
git clone https://github.com/HLPFLCG/hlpflrecords.git
cd hlpflrecords
```

#### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

#### 3. Environment Variables
Create `.env.local` file:
```bash
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Site URL
NEXT_PUBLIC_SITE_URL=https://hlpfl.org

# API Keys (if needed)
# NEXT_PUBLIC_API_KEY=your_api_key
```

#### 4. Run Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Visit http://localhost:3000

#### 5. Build for Production
```bash
npm run build
npm run start
```

---

## 🛠️ DEVELOPMENT ENVIRONMENT

### Recommended VS Code Extensions
```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "streetsidesoftware.code-spell-checker",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

### VS Code Settings
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "[&quot;'`]([^&quot;'`]*).*?[&quot;'`]"]
  ]
}
```

### ESLint Configuration
```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
```

### Prettier Configuration
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

---

## 📁 PROJECT STRUCTURE

### Directory Overview
```
hlpflrecords/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Homepage
│   ├── globals.css              # Global styles
│   ├── releases/                # Releases routes
│   │   ├── page.tsx            # All releases
│   │   └── [slug]/             # Individual release
│   │       └── page.tsx
│   ├── team/                    # Team routes
│   │   ├── page.tsx            # Team overview
│   │   └── [slug]/             # Individual member
│   │       └── page.tsx
│   └── terms/                   # Legal pages
│       └── page.tsx
├── components/                   # React components
│   ├── ui/                      # UI components
│   │   ├── GlobalSearch.tsx
│   │   ├── PerformanceDashboard.tsx
│   │   ├── SecretMusicPlayer.tsx
│   │   ├── CreativeEasterEggs.tsx
│   │   ├── EnhancedErrorBoundary.tsx
│   │   ├── WebVitals.tsx
│   │   ├── Skeleton.tsx
│   │   └── Toast.tsx
│   ├── Header.tsx               # Site header
│   ├── Footer.tsx               # Site footer
│   ├── ReleaseCard.tsx          # Release card
│   └── TeamMemberCard.tsx       # Team member card
├── lib/                         # Utility libraries
│   ├── cache.ts                # Caching system
│   ├── performanceBudget.ts    # Performance monitoring
│   ├── advancedSEO.ts          # SEO utilities
│   ├── errorTracking.ts        # Error tracking
│   ├── advancedAccessibility.ts # A11y tools
│   ├── imageOptimization.ts    # Image utilities
│   ├── analytics.ts            # Analytics tracking
│   └── utils.ts                # General utilities
├── hooks/                       # Custom React hooks
│   ├── useSearch.ts
│   ├── useEasterEggs.ts
│   └── useAnalytics.ts
├── types/                       # TypeScript types
│   ├── release.ts
│   ├── team.ts
│   └── index.ts
├── data/                        # Data files
│   ├── releases.json           # Music releases
│   └── team.json               # Team members
├── public/                      # Static assets
│   ├── images/                 # Image files
│   ├── audio/                  # Audio files
│   └── fonts/                  # Font files
├── tests/                       # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .github/                     # GitHub config
│   └── workflows/              # CI/CD workflows
├── next.config.js              # Next.js config
├── tailwind.config.js          # Tailwind config
├── tsconfig.json               # TypeScript config
└── package.json                # Dependencies
```

---

## 🏗️ ARCHITECTURE OVERVIEW

### Technology Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **State:** React Context + Hooks
- **Testing:** Jest + React Testing Library
- **Deployment:** Cloudflare Pages

### Design Patterns

#### 1. Component Composition
```typescript
// Compose smaller components into larger ones
export function ReleaseDetail({ release }: { release: Release }) {
  return (
    <div>
      <ReleaseHeader release={release} />
      <ReleaseArtwork release={release} />
      <ReleaseInfo release={release} />
      <ReleaseTracklist release={release} />
      <ReleaseStreamingLinks release={release} />
    </div>
  );
}
```

#### 2. Custom Hooks
```typescript
// Encapsulate logic in custom hooks
export function useRelease(slug: string) {
  const [release, setRelease] = useState<Release | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchRelease(slug)
      .then(setRelease)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [slug]);

  return { release, loading, error };
}
```

#### 3. Context Providers
```typescript
// Share state across components
export const SearchContext = createContext<SearchContextType | null>(null);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  return (
    <SearchContext.Provider value={{ query, setQuery, results, setResults }}>
      {children}
    </SearchContext.Provider>
  );
}
```

#### 4. Higher-Order Components
```typescript
// Add functionality to components
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>
) {
  return function WithErrorBoundary(props: P) {
    return (
      <EnhancedErrorBoundary>
        <Component {...props} />
      </EnhancedErrorBoundary>
    );
  };
}
```

---

## 🧩 COMPONENT DEVELOPMENT

### Component Template
```typescript
// components/ExampleComponent.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ExampleComponentProps {
  title: string;
  description?: string;
  className?: string;
  onAction?: () => void;
}

export function ExampleComponent({
  title,
  description,
  className,
  onAction,
}: ExampleComponentProps) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Side effects here
  }, []);

  const handleClick = () => {
    setIsActive(!isActive);
    onAction?.();
  };

  return (
    <motion.div
      className={cn(
        'rounded-lg border p-4',
        isActive && 'bg-primary text-primary-foreground',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={handleClick}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </motion.div>
  );
}
```

### Component Best Practices

#### 1. TypeScript Props
```typescript
// Always define prop types
interface ComponentProps {
  required: string;
  optional?: number;
  callback?: (value: string) => void;
  children?: React.ReactNode;
}
```

#### 2. Default Props
```typescript
// Use default parameters
export function Component({
  variant = 'default',
  size = 'md',
  disabled = false,
}: ComponentProps) {
  // ...
}
```

#### 3. Conditional Rendering
```typescript
// Use early returns for cleaner code
if (loading) return <Skeleton />;
if (error) return <ErrorMessage error={error} />;
if (!data) return null;

return <Content data={data} />;
```

#### 4. Event Handlers
```typescript
// Memoize event handlers
const handleClick = useCallback(() => {
  // Handler logic
}, [dependencies]);
```

#### 5. Accessibility
```typescript
// Always include ARIA attributes
<button
  aria-label="Close dialog"
  aria-pressed={isPressed}
  role="button"
  tabIndex={0}
>
  Close
</button>
```

---

## 🔄 STATE MANAGEMENT

### Local State (useState)
```typescript
// For component-specific state
const [count, setCount] = useState(0);
const [isOpen, setIsOpen] = useState(false);
```

### Context API
```typescript
// For shared state across components
// contexts/ThemeContext.tsx
import { createContext, useContext, useState } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
```

### Custom Hooks for State
```typescript
// hooks/useLocalStorage.ts
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}
```

---

## 🔌 API INTEGRATION

### Data Fetching
```typescript
// lib/api.ts
export async function fetchReleases(): Promise<Release[]> {
  try {
    const response = await fetch('/api/releases');
    if (!response.ok) {
      throw new Error('Failed to fetch releases');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching releases:', error);
    throw error;
  }
}

export async function fetchRelease(slug: string): Promise<Release> {
  try {
    const response = await fetch(`/api/releases/${slug}`);
    if (!response.ok) {
      throw new Error('Failed to fetch release');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching release:', error);
    throw error;
  }
}
```

### Server Components (Next.js 14)
```typescript
// app/releases/page.tsx
import { fetchReleases } from '@/lib/api';

export default async function ReleasesPage() {
  const releases = await fetchReleases();

  return (
    <div>
      {releases.map((release) => (
        <ReleaseCard key={release.id} release={release} />
      ))}
    </div>
  );
}
```

### Client Components
```typescript
// components/ReleaseList.tsx
'use client';

import { useState, useEffect } from 'react';
import { fetchReleases } from '@/lib/api';

export function ReleaseList() {
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReleases()
      .then(setReleases)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Skeleton />;

  return (
    <div>
      {releases.map((release) => (
        <ReleaseCard key={release.id} release={release} />
      ))}
    </div>
  );
}
```

---

## 🧪 TESTING

### Unit Tests (Jest)
```typescript
// __tests__/components/ReleaseCard.test.tsx
import { render, screen } from '@testing-library/react';
import { ReleaseCard } from '@/components/ReleaseCard';

describe('ReleaseCard', () => {
  const mockRelease = {
    id: 'test-release',
    title: 'Test Release',
    artist: 'Test Artist',
    type: 'Single',
    releaseDate: '2024-01-01',
    coverArt: '/test.jpg',
  };

  it('renders release title', () => {
    render(<ReleaseCard release={mockRelease} />);
    expect(screen.getByText('Test Release')).toBeInTheDocument();
  });

  it('renders release artist', () => {
    render(<ReleaseCard release={mockRelease} />);
    expect(screen.getByText('Test Artist')).toBeInTheDocument();
  });

  it('renders cover art', () => {
    render(<ReleaseCard release={mockRelease} />);
    const img = screen.getByAltText('Test Release cover art');
    expect(img).toHaveAttribute('src', '/test.jpg');
  });
});
```

### Integration Tests
```typescript
// __tests__/integration/search.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { GlobalSearch } from '@/components/ui/GlobalSearch';

describe('GlobalSearch Integration', () => {
  it('searches and displays results', async () => {
    render(<GlobalSearch />);

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'reflections' } });

    await waitFor(() => {
      expect(screen.getByText('Reflections EP')).toBeInTheDocument();
    });
  });
});
```

### E2E Tests (Playwright)
```typescript
// tests/e2e/navigation.spec.ts
import { test, expect } from '@playwright/test';

test('navigate to release page', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  await page.click('text=Releases');
  await expect(page).toHaveURL(/.*releases/);
  
  await page.click('text=Reflections EP');
  await expect(page).toHaveURL(/.*releases\/reflections-ep/);
  
  await expect(page.locator('h1')).toContainText('Reflections');
});
```

---

## ⚡ PERFORMANCE OPTIMIZATION

### Image Optimization
```typescript
// Use Next.js Image component
import Image from 'next/image';

<Image
  src="/images/releases/cover.jpg"
  alt="Album cover"
  width={500}
  height={500}
  priority // For above-the-fold images
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### Code Splitting
```typescript
// Dynamic imports for code splitting
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false, // Disable SSR if not needed
});
```

### Memoization
```typescript
// Memoize expensive computations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

// Memoize components
const MemoizedComponent = memo(Component);
```

### Lazy Loading
```typescript
// Lazy load images
<img
  src="/image.jpg"
  loading="lazy"
  alt="Description"
/>

// Lazy load components
const LazyComponent = lazy(() => import('./Component'));

<Suspense fallback={<Skeleton />}>
  <LazyComponent />
</Suspense>
```

---

## 🚀 DEPLOYMENT

### Build Process
```bash
# Install dependencies
npm install

# Run linting
npm run lint

# Run tests
npm run test

# Build for production
npm run build

# Start production server
npm run start
```

### Cloudflare Pages Deployment
```yaml
# .github/workflows/deploy.yml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: hlpflrecords
          directory: .next
```

### Environment Variables
```bash
# Production environment variables
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://hlpfl.org
```

---

## ✅ BEST PRACTICES

### 1. Code Organization
- Keep components small and focused
- Use meaningful file and variable names
- Group related files together
- Follow consistent naming conventions

### 2. TypeScript Usage
- Always define types for props
- Avoid using `any` type
- Use interfaces for object shapes
- Leverage type inference

### 3. Performance
- Optimize images
- Minimize bundle size
- Use code splitting
- Implement caching
- Monitor Core Web Vitals

### 4. Accessibility
- Use semantic HTML
- Include ARIA attributes
- Ensure keyboard navigation
- Test with screen readers
- Maintain color contrast

### 5. Security
- Sanitize user input
- Use HTTPS
- Implement CSP headers
- Keep dependencies updated
- Follow OWASP guidelines

### 6. Testing
- Write unit tests for utilities
- Test component rendering
- Test user interactions
- Maintain high coverage
- Run tests in CI/CD

---

## 🔍 TROUBLESHOOTING

### Common Issues

#### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

#### TypeScript Errors
```bash
# Check TypeScript configuration
npx tsc --noEmit

# Update types
npm install --save-dev @types/node @types/react
```

#### Styling Issues
```bash
# Rebuild Tailwind
npm run build:css

# Clear Tailwind cache
rm -rf .next/cache
```

#### Performance Issues
- Check bundle size: `npm run analyze`
- Profile with React DevTools
- Monitor Core Web Vitals
- Review network requests

---

## 📚 ADDITIONAL RESOURCES

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Tools
- [VS Code](https://code.visualstudio.com)
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

---

## 🎉 CONCLUSION

This developer guide provides everything needed to work on the HLPFL Records website. Follow best practices, write tests, and optimize for performance.

**Last Updated:** 2024  
**Version:** 2.0.0  
**Framework:** Next.js 14  
**Language:** TypeScript