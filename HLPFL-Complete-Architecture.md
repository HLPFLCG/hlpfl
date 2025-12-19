# HLPFL Complete Architecture - Unified Platform Structure

## 🎯 OVERVIEW

You need to unify multiple standalone tools into one cohesive platform with a main website and an artist portal. Here's the complete architecture:

## 🌐 DOMAIN & SUBDOMAIN STRUCTURE

```
PRIMARY DOMAIN: hlpfl.org
├── Main Website (hlpfl.org)
│   ├── / (Home)
│   ├── /about (Staff)
│   ├── /artists (Artist Roster)
│   ├── /releases (Music Releases)
│   ├── /contact (Contact Form)
│   └── /portal (Portal Login Page)
│
└── Artist Portal (portal.hlpfl.org)
    ├── /dashboard (Main Dashboard)
    ├── /social (Social Media Manager - hlpfl.space integration)
    ├── /links (Link-in-Bio Manager - hlpfl.net integration)
    ├── /forms (Form Builder - hlpfl.com integration)
    ├── /app (OnlyFans-style Platform)
    ├── /analytics (Overall Stats & Analytics)
    ├── /chatbot (White-label Chatbot Manager)
    ├── /ai (Internal LLM Assistant)
    └── /settings (Account Settings)

EXTERNAL TOOLS (Embedded in Portal):
├── hlpfl.space → portal.hlpfl.org/social
├── hlpfl.net → portal.hlpfl.org/links
├── hlpfl.com → portal.hlpfl.org/forms
└── hlpfl.io → Chatbot API (powers white-label chatbots)
```

## 🏗️ TECHNICAL ARCHITECTURE

### Main Website Structure (hlpfl.org)

**Technology:** Next.js (your existing codebase)

```
hlpfl.org/
├── app/
│   ├── page.tsx (Home - company overview, value prop)
│   ├── about/
│   │   └── page.tsx (Staff bios, company story)
│   ├── artists/
│   │   └── page.tsx (Artist roster with profiles)
│   ├── releases/
│   │   └── page.tsx (Music releases catalog)
│   ├── contact/
│   │   └── page.tsx (Contact form)
│   └── portal/
│       └── page.tsx (Portal login/signup page)
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx (Main navigation)
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── ArtistsSection.tsx
│   │   ├── ReleasesSection.tsx
│   │   └── ContactSection.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Logo.tsx
│
└── public/
    ├── images/
    └── assets/
```

### Artist Portal Structure (portal.hlpfl.org)

**Technology:** Next.js with unified authentication

```
portal.hlpfl.org/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── layout.tsx (Auth layout)
│   │
│   ├── (portal)/
│   │   ├── layout.tsx (Portal layout with sidebar)
│   │   ├── dashboard/
│   │   │   └── page.tsx (Main dashboard overview)
│   │   │
│   │   ├── social/
│   │   │   └── page.tsx (Embed hlpfl.space via iframe OR integrate directly)
│   │   │
│   │   ├── links/
│   │   │   └── page.tsx (Embed hlpfl.net via iframe OR integrate directly)
│   │   │
│   │   ├── forms/
│   │   │   └── page.tsx (Form builder interface)
│   │   │
│   │   ├── app/
│   │   │   ├── page.tsx (OnlyFans-style main feed)
│   │   │   ├── posts/
│   │   │   ├── subscribers/
│   │   │   └── earnings/
│   │   │
│   │   ├── analytics/
│   │   │   └── page.tsx (Unified analytics dashboard)
│   │   │
│   │   ├── chatbot/
│   │   │   ├── page.tsx (Chatbot manager)
│   │   │   ├── create/
│   │   │   └── [id]/
│   │   │
│   │   ├── ai/
│   │   │   └── page.tsx (Internal LLM chat interface)
│   │   │
│   │   └── settings/
│   │       └── page.tsx (Account settings)
│   │
│   └── api/
│       ├── auth/
│       ├── social/
│       ├── links/
│       ├── forms/
│       ├── app/
│       ├── analytics/
│       ├── chatbot/
│       └── ai/
│
├── components/
│   ├── portal/
│   │   ├── Sidebar.tsx (Portal navigation)
│   │   ├── TopBar.tsx (User menu, notifications)
│   │   └── DashboardCard.tsx
│   ├── social/
│   │   ├── PostScheduler.tsx
│   │   └── SocialCalendar.tsx
│   ├── links/
│   │   ├── LinkEditor.tsx
│   │   └── LinkPreview.tsx
│   ├── forms/
│   │   ├── FormBuilder.tsx
│   │   └── FormSubmissions.tsx
│   ├── app/
│   │   ├── PostCreator.tsx
│   │   ├── ContentFeed.tsx
│   │   └── SubscriberManager.tsx
│   ├── analytics/
│   │   ├── AnalyticsDashboard.tsx
│   │   └── Charts.tsx
│   ├── chatbot/
│   │   ├── ChatbotBuilder.tsx
│   │   └── ChatbotPreview.tsx
│   └── ai/
│       └── ChatInterface.tsx
│
└── lib/
    ├── auth.ts (Unified authentication)
    ├── api.ts (API client)
    └── integrations/
        ├── social.ts (hlpfl.space integration)
        ├── links.ts (hlpfl.net integration)
        └── forms.ts (hlpfl.com integration)
```

## 🔐 UNIFIED AUTHENTICATION SYSTEM

### Single Sign-On (SSO) Architecture

```typescript
// lib/auth.ts
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'artist' | 'admin' | 'staff';
  subscription: 'free' | 'pro' | 'business' | 'managed';
  createdAt: Date;
}

// Authentication flow:
// 1. User logs in at hlpfl.org/portal OR portal.hlpfl.org/login
// 2. JWT token issued with user info
// 3. Token stored in httpOnly cookie
// 4. Token valid across all subdomains (*.hlpfl.org)
// 5. All tools check token for authentication
```

### Session Management

```typescript
// Shared session across:
// - hlpfl.org (main site)
// - portal.hlpfl.org (artist portal)
// - All embedded tools

// Cookie configuration:
{
  domain: '.hlpfl.org', // Works for all subdomains
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
  maxAge: 30 * 24 * 60 * 60 // 30 days
}
```

## 🔗 INTEGRATION STRATEGIES

### Option 1: Iframe Embedding (Quick Solution)

**Pros:** Fast to implement, keeps existing tools separate
**Cons:** Less seamless UX, potential styling issues

```typescript
// portal.hlpfl.org/social/page.tsx
export default function SocialPage() {
  return (
    <div className="h-full">
      <iframe
        src="https://hlpfl.space?token={authToken}"
        className="w-full h-full border-0"
        allow="clipboard-write"
      />
    </div>
  );
}
```

### Option 2: Direct Integration (Better Solution)

**Pros:** Seamless UX, unified styling, better performance
**Cons:** More development work, need to refactor existing tools

```typescript
// portal.hlpfl.org/social/page.tsx
import { SocialMediaManager } from '@/components/social/SocialMediaManager';

export default function SocialPage() {
  return (
    <PortalLayout>
      <SocialMediaManager userId={user.id} />
    </PortalLayout>
  );
}

// Move hlpfl.space code into portal as components
// Share authentication and styling
// Use same database and API
```

### Option 3: Hybrid Approach (Recommended)

**Phase 1:** Use iframes for quick launch
**Phase 2:** Gradually migrate to direct integration

```typescript
// Start with iframe:
<iframe src="https://hlpfl.space?embedded=true&token={token}" />

// Later migrate to:
<SocialMediaManager /> // Native component
```

## 📊 DATABASE ARCHITECTURE

### Unified Database Schema

```sql
-- Users table (shared across all tools)
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE,
  name VARCHAR,
  role VARCHAR,
  subscription VARCHAR,
  created_at TIMESTAMP
);

-- Social media accounts (hlpfl.space data)
CREATE TABLE social_accounts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  platform VARCHAR,
  account_name VARCHAR,
  access_token TEXT,
  created_at TIMESTAMP
);

-- Links (hlpfl.net data)
CREATE TABLE links (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  title VARCHAR,
  url TEXT,
  position INTEGER,
  clicks INTEGER,
  created_at TIMESTAMP
);

-- Forms (hlpfl.com data)
CREATE TABLE forms (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  title VARCHAR,
  fields JSONB,
  submissions INTEGER,
  created_at TIMESTAMP
);

-- App posts (OnlyFans-style content)
CREATE TABLE posts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  content TEXT,
  media_urls TEXT[],
  is_premium BOOLEAN,
  price DECIMAL,
  created_at TIMESTAMP
);

-- Chatbots (white-label chatbots)
CREATE TABLE chatbots (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  name VARCHAR,
  config JSONB,
  embed_code TEXT,
  created_at TIMESTAMP
);

-- Analytics (unified analytics)
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  event_type VARCHAR,
  event_data JSONB,
  created_at TIMESTAMP
);
```

## 🎨 PORTAL NAVIGATION STRUCTURE

### Sidebar Navigation

```typescript
// components/portal/Sidebar.tsx
const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: HomeIcon,
  },
  {
    name: 'Social Media',
    href: '/social',
    icon: ShareIcon,
    badge: 'New Posts',
  },
  {
    name: 'Link-in-Bio',
    href: '/links',
    icon: LinkIcon,
    badge: 'Clicks',
  },
  {
    name: 'Forms',
    href: '/forms',
    icon: DocumentIcon,
  },
  {
    name: 'Content Platform',
    href: '/app',
    icon: VideoIcon,
    badge: 'Subscribers',
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: ChartIcon,
  },
  {
    name: 'Chatbot',
    href: '/chatbot',
    icon: ChatIcon,
  },
  {
    name: 'AI Assistant',
    href: '/ai',
    icon: SparklesIcon,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: CogIcon,
  },
];
```

### Dashboard Overview

```typescript
// portal.hlpfl.org/dashboard/page.tsx
export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Social Media Stats */}
      <DashboardCard
        title="Social Media"
        value="12 scheduled posts"
        change="+3 from last week"
        href="/social"
      />
      
      {/* Link-in-Bio Stats */}
      <DashboardCard
        title="Link Clicks"
        value="1,234 clicks"
        change="+15% from last week"
        href="/links"
      />
      
      {/* Forms Stats */}
      <DashboardCard
        title="Form Submissions"
        value="45 submissions"
        change="+8 new today"
        href="/forms"
      />
      
      {/* Content Platform Stats */}
      <DashboardCard
        title="Subscribers"
        value="89 subscribers"
        change="+12 this month"
        href="/app"
      />
      
      {/* Analytics Overview */}
      <DashboardCard
        title="Total Revenue"
        value="$1,234"
        change="+23% from last month"
        href="/analytics"
      />
      
      {/* Chatbot Stats */}
      <DashboardCard
        title="Chatbot Messages"
        value="456 messages"
        change="+34 today"
        href="/chatbot"
      />
    </div>
  );
}
```

## 🔧 IMPLEMENTATION STEPS

### Step 1: Setup Subdomain (Day 1)

```bash
# DNS Configuration
# Add A record for portal.hlpfl.org pointing to your server IP
# Or CNAME record pointing to your hosting provider

# Vercel/Netlify Configuration
# Add portal.hlpfl.org as custom domain
# SSL certificate will be auto-generated
```

### Step 2: Create Portal Project (Day 1-2)

```bash
# Option A: Separate Next.js project for portal
npx create-next-app@latest hlpfl-portal
cd hlpfl-portal

# Option B: Monorepo with main site
# Use same Next.js project with different routes
# Recommended for easier code sharing
```

### Step 3: Implement Authentication (Day 2-3)

```bash
# Install auth dependencies
npm install next-auth @supabase/supabase-js
npm install @supabase/auth-helpers-nextjs

# Setup authentication
# - Create auth API routes
# - Implement login/signup pages
# - Configure session management
# - Setup JWT tokens with subdomain cookies
```

### Step 4: Build Portal Layout (Day 3-4)

```typescript
// Create portal layout with sidebar
// app/(portal)/layout.tsx
export default function PortalLayout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <TopBar />
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
```

### Step 5: Integrate Existing Tools (Day 5-7)

**Option A: Iframe Embedding (Quick)**
```typescript
// Embed existing tools via iframe
<iframe src="https://hlpfl.space?token={token}" />
<iframe src="https://hlpfl.net?token={token}" />
<iframe src="https://hlpfl.com?token={token}" />
```

**Option B: Direct Integration (Better)**
```typescript
// Move existing tool code into portal
// Import components directly
import { SocialManager } from '@/components/social';
import { LinkManager } from '@/components/links';
import { FormBuilder } from '@/components/forms';
```

### Step 6: Build New Features (Week 2-4)

```typescript
// OnlyFans-style platform
// - Post creation interface
// - Content feed
// - Subscription management
// - Payment processing

// White-label chatbot
// - Chatbot builder interface
// - Embed code generator
// - Chat analytics

// Internal LLM
// - Chat interface
// - Learning system integration
// - Context management

// Unified analytics
// - Data aggregation from all tools
// - Custom dashboards
// - Export functionality
```

## 🎯 RECOMMENDED APPROACH

### Phase 1: Quick Launch (Week 1)

1. **Deploy portal.hlpfl.org** with basic layout
2. **Implement authentication** with JWT tokens
3. **Embed existing tools** via iframes:
   - Social Media (hlpfl.space)
   - Link-in-Bio (hlpfl.net)
   - Forms (hlpfl.com)
4. **Create dashboard** with overview stats
5. **Launch to first users**

### Phase 2: Integration (Week 2-4)

1. **Migrate tools to direct integration**
   - Move hlpfl.space code into portal/social
   - Move hlpfl.net code into portal/links
   - Move hlpfl.com code into portal/forms
2. **Unified styling** with shared components
3. **Shared authentication** and session management
4. **Unified database** for all tools

### Phase 3: New Features (Week 5-8)

1. **Build OnlyFans-style platform**
   - Content creation
   - Subscription management
   - Payment processing
2. **Build white-label chatbot**
   - Chatbot builder
   - Embed code generation
3. **Integrate internal LLM**
   - Chat interface
   - Learning system
4. **Build unified analytics**
   - Data aggregation
   - Custom dashboards

## 📁 FILE STRUCTURE EXAMPLE

```
hlpfl-platform/
├── apps/
│   ├── main/                    # hlpfl.org (main website)
│   │   ├── app/
│   │   │   ├── page.tsx        # Home
│   │   │   ├── about/
│   │   │   ├── artists/
│   │   │   ├── releases/
│   │   │   ├── contact/
│   │   │   └── portal/         # Portal login page
│   │   └── components/
│   │
│   └── portal/                  # portal.hlpfl.org
│       ├── app/
│       │   ├── (auth)/
│       │   │   ├── login/
│       │   │   └── signup/
│       │   ├── (portal)/
│       │   │   ├── dashboard/
│       │   │   ├── social/
│       │   │   ├── links/
│       │   │   ├── forms/
│       │   │   ├── app/
│       │   │   ├── analytics/
│       │   │   ├── chatbot/
│       │   │   ├── ai/
│       │   │   └── settings/
│       │   └── api/
│       └── components/
│
├── packages/
│   ├── ui/                      # Shared UI components
│   ├── auth/                    # Shared auth logic
│   ├── database/                # Shared database schemas
│   └── api/                     # Shared API clients
│
└── package.json
```

## 🔐 AUTHENTICATION FLOW

```
User Journey:
1. User visits hlpfl.org/portal
2. Clicks "Login" → redirects to portal.hlpfl.org/login
3. Enters credentials
4. JWT token issued and stored in cookie (domain: .hlpfl.org)
5. Redirects to portal.hlpfl.org/dashboard
6. All tools check token for authentication
7. Token valid across all subdomains

Token Structure:
{
  userId: "uuid",
  email: "artist@example.com",
  role: "artist",
  subscription: "pro",
  exp: 1234567890
}

Cookie Configuration:
- Name: hlpfl_session
- Domain: .hlpfl.org (works for all subdomains)
- HttpOnly: true
- Secure: true
- SameSite: Lax
- MaxAge: 30 days
```

## 🎨 STYLING CONSISTENCY

```typescript
// Shared Tailwind config
// packages/ui/tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          // ... HLPFL gradient colors
          900: '#1e3a8a',
        },
      },
    },
  },
};

// Import in both main site and portal
// Ensures consistent branding across all pages
```

## 📊 ANALYTICS INTEGRATION

```typescript
// Unified analytics tracking
// Track events from all tools in one place

// Social media events
trackEvent('social_post_scheduled', { platform, postId });

// Link clicks
trackEvent('link_clicked', { linkId, destination });

// Form submissions
trackEvent('form_submitted', { formId, submissionId });

// Content platform events
trackEvent('post_created', { postId, isPremium });

// Chatbot events
trackEvent('chatbot_message', { chatbotId, messageId });

// Display in unified analytics dashboard
// portal.hlpfl.org/analytics
```

This architecture gives you a unified platform where artists log in once and access all tools through a single portal, while maintaining your existing standalone tools during the transition.