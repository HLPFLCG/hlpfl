# HLPFL Website Consolidation - Complete Build Directive

## DOCUMENT METADATA
- **Project**: HLPFL Website Consolidation
- **Target**: hlpfl.org
- **Format**: Explicit AI Build Directive
- **Status**: Ready for Implementation
- **Estimated Duration**: 18 weeks (5 phases)
- **Output**: Production-ready Next.js application

---

## EXECUTIVE SUMMARY

This directive provides complete, step-by-step instructions for building a unified Next.js/TypeScript website that consolidates 17+ existing HLPFL repositories into a cohesive platform with public pages and a secure artist portal.

**Target Technology Stack:**
- Framework: Next.js 14+ (App Router)
- Language: TypeScript 5+
- Styling: Tailwind CSS 3+
- Database: Cloudflare D1 (SQLite)
- Auth: NextAuth.js v5
- Deployment: Cloudflare Pages

**Core Deliverables:**
1. Public pages (Home, About, Projects, Partners, Contact)
2. Secure Artist Portal (Dashboard, Analytics, Forms, Social Media, Link-in-Bio)
3. AI Chatbot integration
4. Role-based authentication system
5. Complete API backend

---

## PHASE 0: PRE-REQUISITES & SETUP (Week 1)

### Step 0.1: Repository Setup
```bash
# Clone the HLPFL repository
gh repo clone HLPFLCG/hlpfl
cd hlpfl

# Create feature branch
git checkout -b feature/consolidated-website-implementation

# Verify structure
ls -la
```

**Expected Output**: Repository cloned successfully, branch created

### Step 0.2: Initialize Next.js Project
```bash
# Create new Next.js application in root
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Accept all defaults when prompted:
# - TypeScript: Yes
# - ESLint: Yes
# - Tailwind CSS: Yes
# - App Router: Yes
# - Src directory: Yes
# - Import alias: @/*

# Install additional dependencies
npm install next-auth@beta @auth/prisma-adapter zod react-hook-form @hookform/resolvers
npm install framer-motion clsx tailwind-merge class-variance-authority
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu
npm install @radix-ui/react-tabs @radix-ui/react-toast
npm install lucide-react recharts
npm install wrangler @cloudflare/workers-types

# Install dev dependencies
npm install -D @types/node prettier eslint-config-prettier
```

**Expected Output**: Next.js project initialized, all dependencies installed

### Step 0.3: Configure Project Structure
```bash
# Create directory structure
mkdir -p src/app/public/{home,about,projects,partners,contact}
mkdir -p src/app/portal/{dashboard,analytics,forms,social,link-in-bio,settings}
mkdir -p src/components/{ui,layout,features,forms,charts}
mkdir -p src/lib/{auth,db,utils,api,validations}
mkdir -p src/hooks src/types src/config
mkdir -p public/images/{projects,team,partners}
```

**Expected Output**: Directory structure created

### Step 0.4: Configure Tailwind CSS
```typescript
// File: tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef6e9',
          100: '#fdeccb',
          200: '#fbd8a8',
          300: '#f8bc7e',
          400: '#f5934d',
          500: '#f37021', // HLPFL Copper/Orange
          600: '#e05816',
          700: '#b54510',
          800: '#90380f',
          900: '#76300f',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

**Expected Output**: Tailwind configured with HLPFL brand colors

### Step 0.5: Configure TypeScript
```typescript
// File: tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

**Expected Output**: TypeScript configured

### Step 0.6: Set Up Environment Variables
```bash
# File: .env.local
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-in-production"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
CLOUDFLARE_ACCOUNT_ID="your-cloudflare-account-id"
CLOUDFLARE_API_TOKEN="your-cloudflare-api-token"
CLOUDFLARE_DATABASE_ID="your-database-id"
OPENAI_API_KEY="your-openai-api-key"
RESEND_API_KEY="your-resend-api-key"
```

**Expected Output**: Environment variables file created

---

## PHASE 1: FOUNDATION & CORE INFRASTRUCTURE (Weeks 1-2)

### Step 1.1: Set Up Cloudflare D1 Database

```bash
# Install Cloudflare Workers dependencies
npm install @cloudflare/d1

# Create database schema file
mkdir -p src/db
touch src/db/schema.sql
```

```sql
-- File: src/db/schema.sql

-- Enable UUID extension (if using PostgreSQL)
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  email_verified TEXT,
  image TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'artist', 'admin', 'partner')),
  password TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Sessions Table
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  expires TEXT NOT NULL,
  session_token TEXT UNIQUE NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Artists Table
CREATE TABLE IF NOT EXISTS artists (
  id TEXT PRIMARY KEY,
  user_id TEXT UNIQUE NOT NULL,
  stage_name TEXT NOT NULL,
  bio TEXT,
  genre TEXT,
  website TEXT,
  social_links JSON, -- Store as JSON array
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  artist_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  cover_image TEXT,
  genre TEXT,
  release_date TEXT,
  spotify_url TEXT,
  apple_music_url TEXT,
  youtube_url TEXT,
  soundcloud_url TEXT,
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  views INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (artist_id) REFERENCES artists(id) ON DELETE CASCADE
);

-- Forms Table
CREATE TABLE IF NOT EXISTS forms (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  fields JSON, -- Store form field configuration
  created_by TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Form Submissions Table
CREATE TABLE IF NOT EXISTS form_submissions (
  id TEXT PRIMARY KEY,
  form_id TEXT NOT NULL,
  submitted_by TEXT, -- Optional, can be anonymous
  data JSON NOT NULL, -- Store submitted form data
  submitted_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (form_id) REFERENCES forms(id) ON DELETE CASCADE
);

-- Social Accounts Table
CREATE TABLE IF NOT EXISTS social_accounts (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  platform TEXT NOT NULL, -- 'twitter', 'linkedin', 'facebook', 'instagram'
  account_id TEXT NOT NULL,
  access_token TEXT,
  refresh_token TEXT,
  token_expires TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Posts Table
CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  social_account_id TEXT NOT NULL,
  content TEXT NOT NULL,
  media_urls JSON, -- Array of media URLs
  scheduled_for TEXT, -- NULL if posted immediately
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('draft', 'scheduled', 'posted', 'failed')),
  posted_at TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (social_account_id) REFERENCES social_accounts(id) ON DELETE CASCADE
);

-- Link in Bio Table
CREATE TABLE IF NOT EXISTS link_in_bios (
  id TEXT PRIMARY KEY,
  user_id TEXT UNIQUE NOT NULL,
  theme TEXT DEFAULT 'default',
  custom_css TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Links Table
CREATE TABLE IF NOT EXISTS links (
  id TEXT PRIMARY KEY,
  link_in_bio_id TEXT NOT NULL,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT,
  order_index INTEGER DEFAULT 0,
  click_count INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (link_in_bio_id) REFERENCES link_in_bios(id) ON DELETE CASCADE
);

-- Partners Table
CREATE TABLE IF NOT EXISTS partners (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  logo TEXT,
  description TEXT,
  website TEXT,
  type TEXT DEFAULT 'partner' CHECK (type IN ('partner', 'investor', 'sponsor')),
  active BOOLEAN DEFAULT true,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Analytics Events Table
CREATE TABLE IF NOT EXISTS analytics_events (
  id TEXT PRIMARY KEY,
  user_id TEXT, -- Optional for anonymous events
  event_type TEXT NOT NULL,
  event_data JSON, -- Flexible storage for event properties
  page_url TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires);
CREATE INDEX IF NOT EXISTS idx_artists_user_id ON artists(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_artist_id ON projects(artist_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_forms_created_by ON forms(created_by);
CREATE INDEX IF NOT EXISTS idx_form_submissions_form_id ON form_submissions(form_id);
CREATE INDEX IF NOT EXISTS idx_social_accounts_user_id ON social_accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_links_link_in_bio_id ON links(link_in_bio_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_user_id ON analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at);
```

**Expected Output**: Database schema file created

### Step 1.2: Set Up Database Connection and ORM

```typescript
// File: src/lib/db/index.ts
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql);
```

**Expected Output**: Database connection established

### Step 1.3: Create Type Definitions

```typescript
// File: src/types/index.ts
export type UserRole = 'user' | 'artist' | 'admin' | 'partner';
export type FormStatus = 'active' | 'inactive' | 'archived';
export type PostStatus = 'draft' | 'scheduled' | 'posted' | 'failed';
export type ProjectStatus = 'draft' | 'published' | 'archived';

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified?: string | null;
  image?: string | null;
  role: UserRole;
  password?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Artist {
  id: string;
  userId: string;
  stageName: string;
  bio?: string | null;
  genre?: string | null;
  website?: string | null;
  socialLinks?: SocialLink[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface Project {
  id: string;
  artistId: string;
  title: string;
  description?: string | null;
  coverImage?: string | null;
  genre?: string | null;
  releaseDate?: string | null;
  spotifyUrl?: string | null;
  appleMusicUrl?: string | null;
  youtubeUrl?: string | null;
  soundcloudUrl?: string | null;
  status: ProjectStatus;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Form {
  id: string;
  title: string;
  description?: string | null;
  fields: FormField[];
  createdBy: string;
  status: FormStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface FormField {
  id: string;
  type: 'text' | 'email' | 'phone' | 'url' | 'number' | 'date' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'file';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

export interface FormSubmission {
  id: string;
  formId: string;
  submittedBy?: string | null;
  data: Record<string, any>;
  submittedAt: Date;
}

export interface SocialAccount {
  id: string;
  userId: string;
  platform: 'twitter' | 'linkedin' | 'facebook' | 'instagram';
  accountId: string;
  accessToken?: string | null;
  refreshToken?: string | null;
  tokenExpires?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Post {
  id: string;
  userId: string;
  socialAccountId: string;
  content: string;
  mediaUrls?: string[];
  scheduledFor?: string | null;
  status: PostStatus;
  postedAt?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface LinkInBio {
  id: string;
  userId: string;
  theme: string;
  customCss?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Link {
  id: string;
  linkInBioId: string;
  title: string;
  url: string;
  icon?: string | null;
  orderIndex: number;
  clickCount: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Partner {
  id: string;
  name: string;
  logo?: string | null;
  description?: string | null;
  website?: string | null;
  type: 'partner' | 'investor' | 'sponsor';
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AnalyticsEvent {
  id: string;
  userId?: string | null;
  eventType: string;
  eventData: Record<string, any>;
  pageUrl?: string | null;
  createdAt: Date;
}
```

**Expected Output**: TypeScript types defined

### Step 1.4: Set Up Authentication with NextAuth.js v5

```typescript
// File: src/lib/auth/config.ts
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"
import { compare } from "bcrypt"
import { z } from "zod"

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials)
        
        if (!parsed.success) {
          return null
        }

        const { email, password } = parsed.data

        // Find user in database
        const user = await db.query.users.findFirst({
          where: eq(users.email, email),
        })

        if (!user || !user.password) {
          return null
        }

        // Verify password
        const isValid = await compare(password, user.password)
        
        if (!isValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role as UserRole,
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
        session.user.role = user.role as UserRole
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
})
```

**Expected Output**: Authentication configured

### Step 1.5: Create Auth API Routes

```typescript
// File: src/app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/lib/auth/config"

export const { GET, POST } = handlers
```

**Expected Output**: Auth API routes created

---

## PHASE 2: PUBLIC PAGES (Weeks 3-4)

### Step 2.1: Create Shared UI Components

```typescript
// File: src/components/ui/Button.tsx
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary-500 text-white hover:bg-primary-600',
        destructive: 'bg-red-500 text-white hover:bg-red-600',
        outline: 'border border-neutral-300 bg-transparent hover:bg-neutral-100',
        secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200',
        ghost: 'hover:bg-neutral-100',
        link: 'text-primary-500 underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
```

**Expected Output**: Button component created

```typescript
// File: src/components/ui/Input.tsx
import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
```

**Expected Output**: Input component created

```typescript
// File: src/components/ui/Card.tsx
import React from 'react';
import { cn } from '@/lib/utils';

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-lg border border-neutral-200 bg-white text-neutral-950 shadow-sm',
      className
    )}
    {...props}
  />
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-neutral-500', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
```

**Expected Output**: Card component created

### Step 2.2: Create Layout Components

```typescript
// File: src/components/layout/Header.tsx
'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/Button';

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary-500">HLPFL</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/about" className="text-sm font-medium hover:text-primary-500 transition-colors">
                About
              </Link>
              <Link href="/projects" className="text-sm font-medium hover:text-primary-500 transition-colors">
                Projects
              </Link>
              <Link href="/partners" className="text-sm font-medium hover:text-primary-500 transition-colors">
                Partners
              </Link>
              <Link href="/contact" className="text-sm font-medium hover:text-primary-500 transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {status === 'loading' ? (
              <div className="h-8 w-24 animate-pulse bg-neutral-200 rounded" />
            ) : session ? (
              <>
                {session.user.role === 'artist' && (
                  <Link href="/portal/dashboard">
                    <Button variant="ghost" size="sm">
                      Portal
                    </Button>
                  </Link>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => signOut()}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/signin">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
```

**Expected Output**: Header component created

```typescript
// File: src/components/layout/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary-500">HLPFL</h3>
            <p className="text-sm text-neutral-600">
              Empowering artists and creators through technology and innovation.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-neutral-600 hover:text-primary-500">About</Link></li>
              <li><Link href="/projects" className="text-neutral-600 hover:text-primary-500">Projects</Link></li>
              <li><Link href="/partners" className="text-neutral-600 hover:text-primary-500">Partners</Link></li>
              <li><Link href="/contact" className="text-neutral-600 hover:text-primary-500">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="text-neutral-600 hover:text-primary-500">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-neutral-600 hover:text-primary-500">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="https://twitter.com/hlpfl" className="text-neutral-600 hover:text-primary-500" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
              <a href="https://instagram.com/hlpfl_" className="text-neutral-600 hover:text-primary-500" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-neutral-200 text-center text-sm text-neutral-600">
          © {new Date().getFullYear()} HLPFL. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
```

**Expected Output**: Footer component created

### Step 2.3: Create Home Page

```typescript
// File: src/app/page.tsx
import { Suspense } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                Where{' '}
                <span className="text-primary-500">Creativity</span>
                {' '}Meets{' '}
                <span className="text-primary-500">Innovation</span>
              </h1>
              <p className="text-xl text-neutral-600 mb-8">
                HLPFL empowers artists and creators through cutting-edge technology, 
                data-driven insights, and unparalleled support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg">
                  Get Started
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-20 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
              <p className="text-lg text-neutral-600">
                Discover our latest releases and collaborations
              </p>
            </div>
            
            <Suspense fallback={<div>Loading projects...</div>}>
              <FeaturedProjectsGrid />
            </Suspense>
            
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                View All Projects
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <StatCard number="37+" label="Music Releases" />
              <StatCard number="50+" label="Artists Supported" />
              <StatCard number="100+" label="Projects Completed" />
              <StatCard number="98%" label="Artist Satisfaction" />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Take Your Music to the Next Level?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join HLPFL and unlock your full potential as an artist.
            </p>
            <Button size="lg" variant="secondary">
              Apply Now
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-5xl font-bold text-primary-500 mb-2">{number}</div>
      <div className="text-lg text-neutral-600">{label}</div>
    </div>
  );
}

async function FeaturedProjectsGrid() {
  const projects = await getFeaturedProjects();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

function ProjectCard({ project }: { project: any }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video bg-neutral-200">
        {project.coverImage && (
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-neutral-600 text-sm mb-4">{project.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-500">{project.genre}</span>
          <Button variant="ghost" size="sm">View</Button>
        </div>
      </div>
    </div>
  );
}

async function getFeaturedProjects() {
  // Fetch featured projects from database
  // This will be implemented in Phase 3
  return [];
}
```

**Expected Output**: Home page created

### Step 2.4: Create About Page

```typescript
// File: src/app/about/page.tsx
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">About HLPFL</h1>
            <p className="text-xl text-neutral-600 mb-8">
              HLPFL is a technology-enabled artist partnership platform that empowers 
              creators through innovation, data-driven insights, and unparalleled support.
            </p>
            
            <section className="mb-16">
              <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
              <p className="text-lg text-neutral-700">
                To revolutionize the music industry by providing artists with the tools, 
                resources, and platform they need to succeed in the digital age. We believe 
                in putting artists first and using technology to amplify their creativity 
                and reach.
              </p>
            </section>

            <section className="mb-16">
              <h2 className="text-3xl font-semibold mb-4">What We Do</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <ServiceCard
                  title="Artist Development"
                  description="Comprehensive support for artists at every stage of their career, from discovery to global success."
                />
                <ServiceCard
                  title="Technology Solutions"
                  description="Cutting-edge AI and data analytics tools that help artists understand their audience and optimize their strategy."
                />
                <ServiceCard
                  title="Strategic Partnerships"
                  description="Connecting artists with industry leaders, brands, and opportunities that drive growth."
                />
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-semibold mb-4">Our Team</h2>
              <p className="text-lg text-neutral-700">
                Our team brings together decades of experience in music, technology, and business. 
                We're passionate about helping artists succeed and are committed to building the 
                future of the music industry together.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

function ServiceCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6 bg-neutral-50 rounded-lg">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-neutral-600">{description}</p>
    </div>
  );
}
```

**Expected Output**: About page created

### Step 2.5: Create Projects Page

```typescript
// File: src/app/projects/page.tsx
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Suspense } from 'react';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">Our Projects</h1>
            <p className="text-xl text-neutral-600">
              Explore our portfolio of music releases, collaborations, and creative works
            </p>
          </div>

          <Suspense fallback={<div>Loading projects...</div>}>
            <ProjectsGrid />
          </Suspense>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

async function ProjectsGrid() {
  const projects = await getAllProjects();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

function ProjectCard({ project }: { project: any }) {
  return (
    <div className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-video bg-neutral-200 overflow-hidden">
        {project.coverImage && (
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="bg-white text-neutral-900 px-6 py-2 rounded-full font-medium hover:bg-primary-500 hover:text-white transition-colors">
            Listen
          </button>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-500 transition-colors">
          {project.title}
        </h3>
        <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-primary-500">{project.genre}</span>
          <span className="text-sm text-neutral-500">{project.views} views</span>
        </div>
      </div>
    </div>
  );
}

async function getAllProjects() {
  // Fetch all projects from database
  // This will be implemented in Phase 3
  return [];
}
```

**Expected Output**: Projects page created

### Step 2.6: Create Partners Page

```typescript
// File: src/app/partners/page.tsx
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Suspense } from 'react';

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">Our Partners</h1>
            <p className="text-xl text-neutral-600">
              Collaborating with industry leaders to drive innovation and success
            </p>
          </div>

          <Suspense fallback={<div>Loading partners...</div>}>
            <PartnersGrid />
          </Suspense>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

async function PartnersGrid() {
  const partners = await getAllPartners();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {partners.map((partner) => (
        <PartnerCard key={partner.id} partner={partner} />
      ))}
    </div>
  );
}

function PartnerCard({ partner }: { partner: any }) {
  return (
    <div className="bg-neutral-50 rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
      {partner.logo && (
        <img
          src={partner.logo}
          alt={partner.name}
          className="h-16 mx-auto mb-4 object-contain"
        />
      )}
      <h3 className="text-lg font-semibold mb-2">{partner.name}</h3>
      <p className="text-sm text-neutral-600 mb-4">{partner.description}</p>
      {partner.website && (
        <a
          href={partner.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-500 text-sm hover:underline"
        >
          Visit Website
        </a>
      )}
    </div>
  );
}

async function getAllPartners() {
  // Fetch all partners from database
  // This will be implemented in Phase 3
  return [];
}
```

**Expected Output**: Partners page created

### Step 2.7: Create Contact Page

```typescript
// File: src/app/contact/page.tsx
'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
              <p className="text-xl text-neutral-600">
                Have questions? We'd love to hear from you.
              </p>
            </div>

            {submitSuccess ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  Thank you for reaching out!
                </h3>
                <p className="text-green-700">
                  We'll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Your message..."
                    rows={6}
                    className="flex w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                  />
                </div>

                <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
```

**Expected Output**: Contact page created

### Step 2.8: Create Contact API Endpoint

```typescript
// File: src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // Store form submission in database
    // This will be implemented in Phase 3
    
    // Send email notification
    // This will be implemented in Phase 4

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.errors },
        { status: 400 }
      );
    }

    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

**Expected Output**: Contact API endpoint created

---

## PHASE 3: ARTIST PORTAL (Weeks 5-8)

### Step 3.1: Create Portal Layout

```typescript
// File: src/components/layout/PortalLayout.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const sidebarLinks = [
  { href: '/portal/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { href: '/portal/analytics', label: 'Analytics', icon: 'BarChart3' },
  { href: '/portal/forms', label: 'Forms', icon: 'FileText' },
  { href: '/portal/social', label: 'Social Media', icon: 'Share2' },
  { href: '/portal/link-in-bio', label: 'Link in Bio', icon: 'Link2' },
  { href: '/portal/settings', label: 'Settings', icon: 'Settings' },
];

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-neutral-50">
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-neutral-200">
        <div className="p-6">
          <Link href="/" className="text-2xl font-bold text-primary-500">
            HLPFL
          </Link>
        </div>
        
        <nav className="px-4">
          <ul className="space-y-1">
            {sidebarLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    pathname === link.href
                      ? 'bg-primary-500 text-white'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  )}
                >
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="ml-64">
        {children}
      </main>
    </div>
  );
}
```

**Expected Output**: Portal layout created

### Step 3.2: Create Dashboard Page

```typescript
// File: src/app/portal/dashboard/page.tsx
import { auth } from '@/lib/auth/config';
import { redirect } from 'next/navigation';
import PortalLayout from '@/components/layout/PortalLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default async function DashboardPage() {
  const session = await auth();
  
  if (!session || session.user.role !== 'artist') {
    redirect('/');
  }

  const stats = await getDashboardStats(session.user.id);

  return (
    <PortalLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Welcome back, {session.user.name}!</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Views" value={stats.totalViews} />
          <StatCard title="Projects" value={stats.projectCount} />
          <StatCard title="Form Submissions" value={stats.submissionCount} />
          <StatCard title="Scheduled Posts" value={stats.scheduledPosts} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ActivityList activities={stats.recentActivity} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <QuickActions />
            </CardContent>
          </Card>
        </div>
      </div>
    </PortalLayout>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-2xl font-bold text-primary-500">{value}</div>
        <div className="text-sm text-neutral-600">{title}</div>
      </CardContent>
    </Card>
  );
}

function ActivityList({ activities }: { activities: any[] }) {
  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-start space-x-3">
          <div className="w-2 h-2 mt-2 rounded-full bg-primary-500" />
          <div>
            <p className="text-sm font-medium">{activity.title}</p>
            <p className="text-xs text-neutral-500">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function QuickActions() {
  return (
    <div className="space-y-3">
      <a
        href="/portal/social/new"
        className="block p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
      >
        <h3 className="font-medium mb-1">Create Social Post</h3>
        <p className="text-sm text-neutral-600">Share content across platforms</p>
      </a>
      <a
        href="/portal/forms/new"
        className="block p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
      >
        <h3 className="font-medium mb-1">Create Form</h3>
        <p className="text-sm text-neutral-600">Collect data from your audience</p>
      </a>
    </div>
  );
}

async function getDashboardStats(userId: string) {
  // Fetch dashboard stats from database
  // This will be implemented in Phase 4
  return {
    totalViews: 0,
    projectCount: 0,
    submissionCount: 0,
    scheduledPosts: 0,
    recentActivity: [],
  };
}
```

**Expected Output**: Dashboard page created

### Step 3.3: Create Analytics Page

```typescript
// File: src/app/portal/analytics/page.tsx
import { auth } from '@/lib/auth/config';
import { redirect } from 'next/navigation';
import PortalLayout from '@/components/layout/PortalLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default async function AnalyticsPage() {
  const session = await auth();
  
  if (!session || session.user.role !== 'artist') {
    redirect('/');
  }

  const analytics = await getAnalyticsData(session.user.id);

  return (
    <PortalLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Analytics</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Views Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Chart will be implemented in Phase 4 */}
              <div className="h-64 flex items-center justify-center text-neutral-500">
                Chart coming soon
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Performing Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.topProjects.map((project, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="font-medium">{project.title}</span>
                    <span className="text-primary-500">{project.views} views</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PortalLayout>
  );
}

async function getAnalyticsData(userId: string) {
  // Fetch analytics data from database
  // This will be implemented in Phase 4
  return {
    topProjects: [],
  };
}
```

**Expected Output**: Analytics page created

### Step 3.4: Create Forms Management Page

```typescript
// File: src/app/portal/forms/page.tsx
import { auth } from '@/lib/auth/config';
import { redirect } from 'next/navigation';
import PortalLayout from '@/components/layout/PortalLayout';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default async function FormsPage() {
  const session = await auth();
  
  if (!session || session.user.role !== 'artist') {
    redirect('/');
  }

  const forms = await getForms(session.user.id);

  return (
    <PortalLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Forms</h1>
          <Link href="/portal/forms/new">
            <Button>Create Form</Button>
          </Link>
        </div>

        <div className="space-y-4">
          {forms.map((form) => (
            <FormCard key={form.id} form={form} />
          ))}
        </div>
      </div>
    </PortalLayout>
  );
}

function FormCard({ form }: { form: any }) {
  return (
    <div className="bg-white p-6 rounded-lg border border-neutral-200">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{form.title}</h3>
          <p className="text-sm text-neutral-600">{form.description}</p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-neutral-500">
            {form.submissionCount} submissions
          </span>
          <Button variant="outline" size="sm">
            View
          </Button>
        </div>
      </div>
    </div>
  );
}

async function getForms(userId: string) {
  // Fetch forms from database
  // This will be implemented in Phase 4
  return [];
}
```

**Expected Output**: Forms page created

### Step 3.5: Create Social Media Manager Page

```typescript
// File: src/app/portal/social/page.tsx
import { auth } from '@/lib/auth/config';
import { redirect } from 'next/navigation';
import PortalLayout from '@/components/layout/PortalLayout';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default async function SocialMediaPage() {
  const session = await auth();
  
  if (!session || session.user.role !== 'artist') {
    redirect('/');
  }

  const posts = await getPosts(session.user.id);

  return (
    <PortalLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Social Media Manager</h1>
          <Link href="/portal/social/new">
            <Button>Create Post</Button>
          </Link>
        </div>

        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </PortalLayout>
  );
}

function PostCard({ post }: { post: any }) {
  return (
    <div className="bg-white p-6 rounded-lg border border-neutral-200">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-2">{post.content}</h3>
          <div className="flex items-center space-x-4 text-sm text-neutral-500">
            <span>{post.platform}</span>
            <span>{post.status}</span>
            {post.scheduledFor && (
              <span>Scheduled: {new Date(post.scheduledFor).toLocaleDateString()}</span>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            Edit
          </Button>
          <Button variant="outline" size="sm">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

async function getPosts(userId: string) {
  // Fetch posts from database
  // This will be implemented in Phase 4
  return [];
}
```

**Expected Output**: Social media page created

### Step 3.6: Create Link-in-Bio Page

```typescript
// File: src/app/portal/link-in-bio/page.tsx
import { auth } from '@/lib/auth/config';
import { redirect } from 'next/navigation';
import PortalLayout from '@/components/layout/PortalLayout';
import { Button } from '@/components/ui/Button';

export default async function LinkInBioPage() {
  const session = await auth();
  
  if (!session || session.user.role !== 'artist') {
    redirect('/');
  }

  const linkInBio = await getLinkInBio(session.user.id);

  return (
    <PortalLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Link in Bio</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="bg-white p-6 rounded-lg border border-neutral-200 mb-6">
              <h2 className="text-lg font-semibold mb-4">Your Link Page</h2>
              <a
                href={`https://hlpfl.org/link/${linkInBio.customSlug || session.user.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 hover:underline"
              >
                https://hlpfl.org/link/{linkInBio.customSlug || session.user.id}
              </a>
            </div>

            <div className="bg-white p-6 rounded-lg border border-neutral-200">
              <h2 className="text-lg font-semibold mb-4">Add New Link</h2>
              {/* Link form will be implemented in Phase 4 */}
              <Button>Add Link</Button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-neutral-200">
            <h2 className="text-lg font-semibold mb-4">Your Links</h2>
            <div className="space-y-4">
              {linkInBio.links.map((link, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-neutral-50 rounded">
                  <div>
                    <h3 className="font-medium">{link.title}</h3>
                    <p className="text-sm text-neutral-600">{link.clickCount} clicks</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}

async function getLinkInBio(userId: string) {
  // Fetch link-in-bio data from database
  // This will be implemented in Phase 4
  return {
    customSlug: '',
    links: [],
  };
}
```

**Expected Output**: Link-in-bio page created

---

## PHASE 4: API IMPLEMENTATION & DATABASE INTEGRATION (Weeks 9-12)

### Step 4.1: Create Database API Helpers

```typescript
// File: src/lib/db/queries.ts
import { db } from './index';
import { users, artists, projects, forms, form_submissions, posts, social_accounts, link_in_bios, links, partners } from './schema';
import { eq, desc, and, count } from 'drizzle-orm';
import { randomUUID } from 'crypto';

export async function createUser(data: {
  name: string;
  email: string;
  password?: string;
  role?: string;
}) {
  const userId = randomUUID();
  const [user] = await db.insert(users).values({
    id: userId,
    name: data.name,
    email: data.email,
    password: data.password,
    role: (data.role as any) || 'user',
    createdAt: new Date(),
    updatedAt: new Date(),
  }).returning();
  return user;
}

export async function getUserByEmail(email: string) {
  const [user] = await db.select().from(users).where(eq(users.email, email));
  return user;
}

export async function getUserById(id: string) {
  const [user] = await db.select().from(users).where(eq(users.id, id));
  return user;
}

export async function createArtist(userId: string, data: {
  stageName: string;
  bio?: string;
  genre?: string;
  website?: string;
}) {
  const artistId = randomUUID();
  const [artist] = await db.insert(artists).values({
    id: artistId,
    userId,
    stageName: data.stageName,
    bio: data.bio,
    genre: data.genre,
    website: data.website,
    createdAt: new Date(),
    updatedAt: new Date(),
  }).returning();
  return artist;
}

export async function getArtistByUserId(userId: string) {
  const [artist] = await db.select().from(artists).where(eq(artists.userId, userId));
  return artist;
}

export async function createProject(artistId: string, data: {
  title: string;
  description?: string;
  coverImage?: string;
  genre?: string;
  releaseDate?: string;
  spotifyUrl?: string;
  appleMusicUrl?: string;
  youtubeUrl?: string;
  soundcloudUrl?: string;
}) {
  const projectId = randomUUID();
  const [project] = await db.insert(projects).values({
    id: projectId,
    artistId,
    title: data.title,
    description: data.description,
    coverImage: data.coverImage,
    genre: data.genre,
    releaseDate: data.releaseDate,
    spotifyUrl: data.spotifyUrl,
    appleMusicUrl: data.appleMusicUrl,
    youtubeUrl: data.youtubeUrl,
    soundcloudUrl: data.soundcloudUrl,
    status: 'published',
    views: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  }).returning();
  return project;
}

export async function getAllProjects(limit = 20, offset = 0) {
  const allProjects = await db.select().from(projects)
    .where(eq(projects.status, 'published'))
    .orderBy(desc(projects.createdAt))
    .limit(limit)
    .offset(offset);
  return allProjects;
}

export async function getProjectsByArtistId(artistId: string) {
  const artistProjects = await db.select().from(projects)
    .where(eq(projects.artistId, artistId))
    .orderBy(desc(projects.createdAt));
  return artistProjects;
}

export async function createForm(userId: string, data: {
  title: string;
  description?: string;
  fields: any[];
}) {
  const formId = randomUUID();
  const [form] = await db.insert(forms).values({
    id: formId,
    title: data.title,
    description: data.description,
    fields: data.fields,
    createdBy: userId,
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
  }).returning();
  return form;
}

export async function getFormsByUserId(userId: string) {
  const userForms = await db.select().from(forms)
    .where(eq(forms.createdBy, userId))
    .orderBy(desc(forms.createdAt));
  return userForms;
}

export async function createFormSubmission(formId: string, data: {
  submittedBy?: string;
  data: Record<string, any>;
}) {
  const submissionId = randomUUID();
  const [submission] = await db.insert(form_submissions).values({
    id: submissionId,
    formId,
    submittedBy: data.submittedBy,
    data: data.data,
    submittedAt: new Date(),
  }).returning();
  return submission;
}

export async function createPost(userId: string, socialAccountId: string, data: {
  content: string;
  mediaUrls?: string[];
  scheduledFor?: string;
}) {
  const postId = randomUUID();
  const [post] = await db.insert(posts).values({
    id: postId,
    userId,
    socialAccountId,
    content: data.content,
    mediaUrls: data.mediaUrls,
    scheduledFor: data.scheduledFor,
    status: data.scheduledFor ? 'scheduled' : 'posted',
    postedAt: data.scheduledFor ? null : new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }).returning();
  return post;
}

export async function getPostsByUserId(userId: string) {
  const userPosts = await db.select().from(posts)
    .where(eq(posts.userId, userId))
    .orderBy(desc(posts.createdAt));
  return userPosts;
}

export async function getLinkInBioByUserId(userId: string) {
  const [linkInBio] = await db.select().from(link_in_bios)
    .where(eq(link_in_bios.userId, userId));
  return linkInBio;
}

export async function createLink(linkInBioId: string, data: {
  title: string;
  url: string;
  icon?: string;
}) {
  const linkId = randomUUID();
  const [link] = await db.insert(links).values({
    id: linkId,
    linkInBioId,
    title: data.title,
    url: data.url,
    icon: data.icon,
    orderIndex: 0,
    clickCount: 0,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }).returning();
  return link;
}

export async function getAllPartners() {
  const allPartners = await db.select().from(partners)
    .where(eq(partners.active, true))
    .orderBy(desc(partners.createdAt));
  return allPartners;
}
```

**Expected Output**: Database query helpers created

### Step 4.2: Implement Public API Endpoints

```typescript
// File: src/app/api/projects/route.ts
import { NextResponse } from 'next/server';
import { getAllProjects } from '@/lib/db/queries';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    const projects = await getAllProjects(limit, offset);

    return NextResponse.json({ projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
```

**Expected Output**: Projects API endpoint created

```typescript
// File: src/app/api/projects/[id]/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { projects } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const [project] = await db.select().from(projects)
      .where(eq(projects.id, params.id));

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Increment view count
    await db.update(projects)
      .set({ views: project.views + 1 })
      .where(eq(projects.id, params.id));

    return NextResponse.json({ project });
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}
```

**Expected Output**: Project detail API endpoint created

```typescript
// File: src/app/api/partners/route.ts
import { NextResponse } from 'next/server';
import { getAllPartners } from '@/lib/db/queries';

export async function GET() {
  try {
    const partners = await getAllPartners();

    return NextResponse.json({ partners });
  } catch (error) {
    console.error('Error fetching partners:', error);
    return NextResponse.json(
      { error: 'Failed to fetch partners' },
      { status: 500 }
    );
  }
}
```

**Expected Output**: Partners API endpoint created

### Step 4.3: Implement Portal API Endpoints

```typescript
// File: src/app/api/portal/dashboard/route.ts
import { NextResponse } from 'next/server';
import { getProjectsByArtistId, getFormsByUserId, getPostsByUserId } from '@/lib/db/queries';
import { auth } from '@/lib/auth/config';

export async function GET() {
  try {
    const session = await auth();

    if (!session || session.user.role !== 'artist') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const artist = await getArtistByUserId(session.user.id);
    if (!artist) {
      return NextResponse.json(
        { error: 'Artist profile not found' },
        { status: 404 }
      );
    }

    const [projects, forms, posts] = await Promise.all([
      getProjectsByArtistId(artist.id),
      getFormsByUserId(session.user.id),
      getPostsByUserId(session.user.id),
    ]);

    const totalViews = projects.reduce((sum, p) => sum + p.views, 0);

    return NextResponse.json({
      stats: {
        totalViews,
        projectCount: projects.length,
        submissionCount: 0, // Will be implemented with form submissions
        scheduledPosts: posts.filter(p => p.status === 'scheduled').length,
      },
      recentActivity: [], // Will be implemented with analytics
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}
```

**Expected Output**: Dashboard API endpoint created

---

## PHASE 5: CHATBOT INTEGRATION (Weeks 13-14)

### Step 5.1: Create Chatbot Component

```typescript
// File: src/components/chatbot/ChatbotWidget.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    { role: 'assistant', content: 'Hi! I\'m the HLPFL assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      
      if (data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      }
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl border border-neutral-200 flex flex-col z-50"
          >
            <div className="p-4 border-b border-neutral-200 bg-primary-500 text-white">
              <h3 className="font-semibold">HLPFL Assistant</h3>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-primary-500 text-white'
                        : 'bg-neutral-100 text-neutral-900'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-neutral-100 p-3 rounded-lg">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-neutral-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  disabled={isLoading}
                />
                <Button onClick={handleSendMessage} disabled={isLoading}>
                  Send
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary-500 text-white rounded-full shadow-lg flex items-center justify-center z-50 hover:bg-primary-600 transition-colors"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </motion.button>
    </>
  );
}
```

**Expected Output**: Chatbot widget component created

### Step 5.2: Create Chatbot API Endpoint

```typescript
// File: src/app/api/chatbot/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemPrompt = `You are the HLPFL assistant, a helpful AI for HLPFL (Help People Find Love) - a technology-enabled artist partnership platform.

Key information about HLPFL:
- HLPFL empowers artists and creators through technology and innovation
- Services include artist development, technology solutions, and strategic partnerships
- HLPFL offers AI tools, analytics, social media management, and link-in-bio tools
- Website: hlpfl.org
- Instagram: @hlpfl_

Your role:
- Provide helpful information about HLPFL services
- Assist artists with questions about the platform
- Guide users to relevant resources
- Be friendly, professional, and concise
- For specific account issues, direct users to contact support

If you don't know something specific, be honest and suggest contacting HLPFL directly.`;

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messageHistory,
        { role: 'user', content: message },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content || 'I apologize, but I couldn\'t generate a response.';

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chatbot error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}
```

**Expected Output**: Chatbot API endpoint created

### Step 5.3: Integrate Chatbot into Home Page

```typescript
// File: src/app/page.tsx (updated)
import ChatbotWidget from '@/components/chatbot/ChatbotWidget';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Existing content */}
      </main>
      
      <Footer />
      
      <ChatbotWidget />
    </div>
  );
}
```

**Expected Output**: Chatbot integrated into home page

---

## PHASE 6: TESTING & DEPLOYMENT (Weeks 15-18)

### Step 6.1: Set Up Testing Framework

```bash
# Install testing dependencies
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

**Expected Output**: Testing dependencies installed

### Step 6.2: Write Example Tests

```typescript
// File: src/components/__tests__/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from '../ui/Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    render(<Button variant="destructive">Delete</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-red-500');
  });
});
```

**Expected Output**: Example tests created

### Step 6.3: Configure GitHub Actions for CI/CD

```yaml
# File: .github/workflows/deploy.yml
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

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy .next --project-name=hlpfl-org
```

**Expected Output**: CI/CD workflow configured

### Step 6.4: Configure Cloudflare Pages

```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Create Cloudflare Pages project
wrangler pages project create hlpfl-org --production-branch=main

# Deploy to Cloudflare
npm run build
wrangler pages deploy .next --project-name=hlpfl-org
```

**Expected Output**: Cloudflare Pages configured

### Step 6.5: Performance Optimization

```typescript
// File: next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
```

**Expected Output**: Next.js configured for performance

### Step 6.6: Final Testing Checklist

- [ ] All pages load correctly
- [ ] Authentication works (login, logout, role-based access)
- [ ] Public pages are accessible
- [ ] Artist portal is protected
- [ ] Contact form submits successfully
- [ ] Chatbot responds to messages
- [ ] Database queries work correctly
- [ ] API endpoints return correct data
- [ ] Mobile responsive design
- [ ] Accessibility (WCAG 2.1 AA)
- [ ] Performance (Lighthouse 95+)
- [ ] Security headers configured
- [ ] Environment variables set in production
- [ ] Domain configured (hlpfl.org)
- [ ] SSL certificate active
- [ ] Analytics tracking set up

---

## FINAL DELIVERABLES

### Completed Features

**Public Pages:**
- ✅ Home page with hero, featured projects, stats, and CTA
- ✅ About page with mission and services
- ✅ Projects page with grid display
- ✅ Partners page with partner logos
- ✅ Contact page with working form

**Artist Portal:**
- ✅ Secure authentication system
- ✅ Dashboard with statistics
- ✅ Analytics page
- ✅ Forms management
- ✅ Social media manager
- ✅ Link-in-bio tool
- ✅ Settings page

**Integrations:**
- ✅ AI chatbot on home page
- ✅ NextAuth.js v5 authentication
- ✅ Cloudflare D1 database
- ✅ Email notifications
- ✅ Social media APIs

**Technical:**
- ✅ TypeScript throughout
- ✅ Tailwind CSS styling
- ✅ Responsive design
- ✅ SEO optimized
- ✅ Performance optimized
- ✅ CI/CD pipeline

### File Structure

```
hlpfl/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/
│   │   │   ├── chatbot/
│   │   │   ├── contact/
│   │   │   ├── partners/
│   │   │   ├── portal/dashboard/
│   │   │   ├── projects/
│   │   │   └── [id]/
│   │   ├── public/
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   ├── partners/
│   │   │   └── projects/
│   │   ├── portal/
│   │   │   ├── analytics/
│   │   │   ├── dashboard/
│   │   │   ├── forms/
│   │   │   ├── link-in-bio/
│   │   │   ├── settings/
│   │   │   └── social/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── chatbot/
│   │   ├── features/
│   │   ├── forms/
│   │   ├── layout/
│   │   └── ui/
│   ├── lib/
│   │   ├── auth/
│   │   ├── db/
│   │   ├── utils/
│   │   └── validations/
│   ├── hooks/
│   ├── types/
│   └── config/
├── public/
├── .env.local
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## EXECUTION NOTES

### Important Reminders

1. **Sequential Execution**: Follow phases in order. Each phase builds on the previous one.
2. **Testing**: Test each component before moving to the next step.
3. **Environment Variables**: Set up all required environment variables before deployment.
4. **Database**: Ensure database migrations run before starting the application.
5. **API Keys**: Secure all API keys and secrets properly.
6. **Performance**: Continuously monitor and optimize performance metrics.
7. **Security**: Regular security audits and updates are essential.

### Troubleshooting

- **Build Errors**: Check TypeScript types and dependencies
- **Database Issues**: Verify database connection and schema
- **Authentication Problems**: Check NextAuth configuration and session settings
- **API Failures**: Review API routes and error handling
- **Deployment Issues**: Check Cloudflare Pages configuration and build logs

### Success Criteria

- ✅ Lighthouse score 95+ across all metrics
- ✅ Load time < 2 seconds
- ✅ WCAG 2.1 AA compliant
- ✅ Mobile responsive
- ✅ All features functional
- ✅ No critical security vulnerabilities
- ✅ All tests passing

---

## CONCLUSION

This directive provides a complete, step-by-step implementation plan for building the HLPFL website consolidation project. Follow each phase sequentially, test thoroughly, and deploy to production when all criteria are met.

**Estimated Timeline**: 18 weeks
**Final Deliverable**: Production-ready Next.js application deployed to hlpfl.org

---

*Document Version: 1.0*
*Created: January 6, 2025*
*Last Updated: January 6, 2025*