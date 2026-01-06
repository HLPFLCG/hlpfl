# HLPFL Website Consolidation - Architecture Document

## Executive Summary

This document outlines the architecture for a consolidated Next.js/TypeScript website for hlpfl.org that integrates functionality from 17+ existing repositories into a cohesive platform. The new architecture unifies public-facing pages with a secure artist portal, leveraging modern web technologies and proven components from existing HLPFL projects.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture Diagram](#architecture-diagram)
4. [Site Structure](#site-structure)
5. [Component Integration Strategy](#component-integration-strategy)
6. [Database Schema](#database-schema)
7. [API Architecture](#api-architecture)
8. [Authentication & Security](#authentication--security)
9. [Deployment Architecture](#deployment-architecture)
10. [Performance & Scalability](#performance--scalability)

---

## Project Overview

### Primary Goals

1. **Consolidation**: Merge 17+ repositories into a unified Next.js application
2. **Public Portal**: Create engaging public pages with unique portfolio display
3. **Artist Portal**: Build secure, role-based dashboard for artists
4. **Integration**: Incorporate chatbot, forms, social media, and link-in-bio tools
5. **Performance**: Maintain 95+ Lighthouse scores and sub-2s load times

### Key Requirements

- **Framework**: Next.js 14+ with TypeScript (.tsx)
- **Domain**: hlpfl.org (primary)
- **Authentication**: Secure, role-based access control
- **Contact Form**: Fully functional with backend
- **Chatbot**: AI-powered integration on home page
- **Artist Portal**: Dashboard, analytics, forms management, social tools

---

## Technology Stack

### Core Framework

```
Frontend:  Next.js 14 (App Router)
Language:  TypeScript 5+
Styling:   Tailwind CSS 3+
State:     React Query / Zustand
Forms:     React Hook Form + Zod
```

### Backend & Infrastructure

```
API:        Next.js API Routes / Hono v4 (for edge functions)
Database:   Cloudflare D1 (SQLite) / PostgreSQL (supabase)
Storage:    Cloudflare R2 / Supabase Storage
Auth:       NextAuth.js v5 (auth.js) + JWT
Edge:       Cloudflare Workers
```

### Third-Party Integrations

```
Chatbot:    Custom AI + OpenAI API
Analytics:  Google Analytics 4 / Plausible
Email:      Resend / SendGrid
Payments:   Stripe (if needed)
Social:     Twitter/X, LinkedIn, Facebook, Instagram APIs
```

### Development Tools

```
Linting:    ESLint + TypeScript ESLint
Formatting: Prettier
Testing:    Vitest + Playwright
CI/CD:      GitHub Actions
Deployment: Cloudflare Pages / Vercel
```

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         USER LAYER                            │
├─────────────────────────────────────────────────────────────┤
│  Public Visitors  │  Artists  │  Admins  │  Partners        │
└──────────┬────────┴───────────┴─────────┴──────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────┐
│                    NEXT.JS APPLICATION                        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐                  │
│  │  PUBLIC PAGES   │  │  ARTIST PORTAL  │                  │
│  │  - Home         │  │  - Dashboard    │                  │
│  │  - About        │  │  - Analytics    │                  │
│  │  - Projects     │  │  - Forms        │                  │
│  │  - Partners     │  │  - Social Mgr   │                  │
│  │  - Contact      │  │  - Link-in-bio  │                  │
│  └────────┬────────┘  └────────┬────────┘                  │
│           │                    │                             │
│           └─────────┬──────────┘                             │
│                     │                                        │
│           ┌─────────▼──────────┐                            │
│           │  SHARED COMPONENTS│                            │
│           │  - UI Components  │                            │
│           │  - Layout System  │                            │
│           │  - Utilities      │                            │
│           └─────────┬──────────┘                            │
│                     │                                        │
│           ┌─────────▼──────────┐                            │
│           │   API LAYER       │                            │
│           │  - Route Handlers │                            │
│           │  - Middleware     │                            │
│           └─────────┬──────────┘                            │
└─────────────────────┼──────────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        │             │             │
        ▼             ▼             ▼
┌──────────────┐ ┌──────────┐ ┌─────────────┐
│ AUTH SERVICE│ │  APIs    │ │ EXTERNAL    │
│ NextAuth.js │ │ Hono v4  │ │ INTEGRATIONS│
└──────┬───────┘ └─────┬────┘ └──────┬──────┘
       │               │              │
       └───────────────┼──────────────┘
                       │
         ┌─────────────┼─────────────┐
         │             │             │
         ▼             ▼             ▼
┌──────────────┐ ┌──────────┐ ┌─────────────┐
│ DATABASE     │ │ STORAGE  │ │ SERVICES    │
│ D1 / Postgres│ │ R2 / S3  │ │ Email, Chat │
└──────────────┘ └──────────┘ └─────────────┘
```

---

## Site Structure

### Public Pages (Static/ISR)

```
hlpfl.org/
├── /                          # Home page
│   ├── Hero section
│   ├── AI Chatbot integration
│   └── Featured projects preview
├── /about                     # Company information
│   ├── Mission & values
│   ├── History
│   └── Team
├── /projects                  # Portfolio/Showcase (creative display)
│   ├── Grid/Masonry layout
│   ├── Filter by type/genre
│   └── Detail views
├── /partners                  # Partner organizations
│   ├── Logo grid
│   ├── Partnership details
│   └── Integration stories
└── /contact                   # Contact form
    ├── Form with validation
    ├── FAQ section
    └── Map/locations
```

### Artist Portal (Dynamic/RBAC)

```
portal.hlpfl.org/
├── /dashboard                 # Main dashboard
│   ├── Overview stats
│   ├── Recent activity
│   └── Quick actions
├── /analytics                 # Detailed analytics
│   ├── Performance metrics
│   ├── Revenue tracking
│   └── Exportable reports
├── /forms                     # Forms management
│   ├── Available forms
│   ├── Submissions history
│   └── Form builder (admin)
├── /social                    # Social media manager
│   ├── Post composer
│   ├── Scheduling calendar
│   └── Multi-platform posting
├── /link-in-bio               # Link-in-bio tool
│   ├── Link management
│   ├── Analytics
│   └── Theme customization
├── /settings                  # Account settings
│   ├── Profile
│   ├── Security
│   └── Notifications
└── /support                   # Help & support
    ├── Documentation
    ├── Ticket system
    └── Contact support
```

---

## Component Integration Strategy

### Repository-to-Component Mapping

| Repository | Key Features | Integration Target |
|------------|--------------|-------------------|
| **hlpflrecords** | Music releases, team, easter eggs | Projects catalog, team section |
| **hlpflchatbot** | AI chatbot, knowledge base | Home page chatbot integration |
| **linkinbio** | Link-in-bio tool | Artist portal link-in-bio feature |
| **hlpflforms** | Form builder, analytics | Contact form, forms management |
| **socialmediamanager** | Social posting, analytics | Social media manager portal |
| **hlpfldev.tsx** | Next.js/React components | Base components, layout system |
| **HLPFL-LABEL** | Investor content, styling | About page, design patterns |
| **hlpfl** | API layer, authentication | Backend services, auth |
| **whitelabellinkinbio** | White-label features | Customizable link-in-bio |
| **googletagmanager** | Analytics integration | Analytics implementation |
| **openvape-commerce** | E-commerce patterns | Future e-commerce features |
| **zhc** | Corporate site patterns | Partner/investor sections |
| **alki.info** | Content platform | Content management patterns |
| **chatbot-blank** | Chatbot template | Custom chatbot development |
| **whitelabel2** | White-label system | White-label options |

### Integration Approach

#### Phase 1: Core Foundation

1. **Base Application Setup**
   - Initialize Next.js 14 with TypeScript
   - Configure Tailwind CSS with HLPFL branding
   - Set up project structure and routing
   - Integrate hlpfldev.tsx components as base

2. **Authentication System**
   - Integrate NextAuth.js v5
   - Configure role-based access control (RBAC)
   - Set up session management
   - Implement protected routes

3. **Design System**
   - Create shared UI components
   - Define design tokens (colors, typography, spacing)
   - Build layout components (Header, Footer, Sidebar)
   - Implement responsive design patterns

#### Phase 2: Public Pages

1. **Home Page**
   - Hero section with animations
   - Integrate AI chatbot from hlpflchatbot
   - Featured projects showcase
   - Call-to-action sections

2. **About Page**
   - Company mission and values
   - Team section from hlpflrecords
   - History and milestones
   - Corporate structure

3. **Projects/Portfolio**
   - Creative grid layout (non-traditional)
   - Filter and search functionality
   - Project detail pages
   - Easter egg integration (optional)

4. **Partners Page**
   - Partner logo grid
   - Partnership stories
   - Integration case studies
   - Partner contact information

5. **Contact Page**
   - Integrate hlpflforms for contact form
   - Form validation and submission
   - FAQ section
   - Contact information and map

#### Phase 3: Artist Portal

1. **Dashboard**
   - Overview statistics
   - Recent activity feed
   - Quick action buttons
   - Performance charts

2. **Analytics**
   - Detailed performance metrics
   - Revenue tracking
   - Engagement analytics
   - Exportable reports (CSV/PDF)

3. **Forms Management**
   - Available forms list
   - Submission history
   - Form analytics
   - Form builder (admin only)

4. **Social Media Manager**
   - Post composer
   - Multi-platform integration
   - Scheduling calendar
   - Analytics integration

5. **Link-in-Bio Tool**
   - Link management interface
   - Customization options
   - Analytics dashboard
   - Theme editor

#### Phase 4: Advanced Features

1. **AI Features**
   - Enhanced chatbot with artist-specific training
   - Content generation tools
   - Analytics insights
   - Recommendation engine

2. **Collaboration**
   - Team management
   - Approval workflows
   - Comments and feedback
   - Version control for content

3. **Integrations**
   - Platform API connections
   - Webhook support
   - Third-party integrations
   - Custom integrations

---

## Database Schema

### Core Tables

```sql
-- Users & Authentication
users
  - id (UUID, primary key)
  - email (unique, indexed)
  - password_hash
  - name
  - role (enum: admin, artist, partner, user)
  - avatar_url
  - created_at
  - updated_at
  - last_login

sessions
  - id (UUID, primary key)
  - user_id (foreign key)
  - token
  - expires_at
  - created_at

-- Artists & Projects
artists
  - id (UUID, primary key)
  - user_id (foreign key)
  - stage_name
  - bio
  - genres (array)
  - social_links (JSON)
  - created_at
  - updated_at

projects
  - id (UUID, primary key)
  - artist_id (foreign key)
  - title
  - description
  - type (enum: album, single, ep, collaboration)
  - release_date
  - cover_art_url
  - streaming_links (JSON)
  - created_at
  - updated_at

-- Forms & Submissions
forms
  - id (UUID, primary key)
  - name
  - description
  - fields (JSON schema)
  - created_by (foreign key)
  - created_at
  - updated_at

form_submissions
  - id (UUID, primary key)
  - form_id (foreign key)
  - user_id (foreign key, nullable)
  - data (JSON)
  - submitted_at
  - ip_address

-- Social Media
social_accounts
  - id (UUID, primary key)
  - user_id (foreign key)
  - platform (enum: twitter, linkedin, facebook, instagram)
  - account_id
  - username
  - access_token (encrypted)
  - connected_at
  - updated_at

posts
  - id (UUID, primary key)
  - user_id (foreign key)
  - content
  - platforms (array)
  - media_urls (array)
  - scheduled_at
  - published_at
  - status (enum: draft, scheduled, published, failed)
  - created_at
  - updated_at

-- Link-in-Bio
link_in_bios
  - id (UUID, primary key)
  - user_id (foreign key)
  - username (unique)
  - theme (JSON)
  - custom_domain (nullable)
  - created_at
  - updated_at

links
  - id (UUID, primary key)
  - link_in_bio_id (foreign key)
  - title
  - url
  - order_index
  - is_enabled
  - clicks (counter)
  - created_at
  - updated_at

-- Analytics
analytics_events
  - id (UUID, primary key)
  - user_id (foreign key, nullable)
  - event_type (string)
  - event_data (JSON)
  - timestamp
  - ip_address

-- Partners
partners
  - id (UUID, primary key)
  - name
  - description
  - logo_url
  - website_url
  - partnership_type (enum: investor, sponsor, collaborator)
  - created_at
  - updated_at
```

---

## API Architecture

### API Routes Structure

```
/api/
├── /auth/
│   ├── POST /register
│   ├── POST /login
│   ├── POST /logout
│   ├── POST /refresh
│   └── GET  /me
├── /users/
│   ├── GET    /
│   ├── GET    /:id
│   ├── PATCH  /:id
│   └── DELETE /:id
├── /artists/
│   ├── GET    /
│   ├── GET    /:id
│   ├── POST   /          (admin only)
│   ├── PATCH  /:id
│   └── DELETE /:id
├── /projects/
│   ├── GET    /
│   ├── GET    /:id
│   ├── POST   /          (admin/artist)
│   ├── PATCH  /:id
│   └── DELETE /:id
├── /forms/
│   ├── GET    /
│   ├── GET    /:id
│   ├── POST   /          (admin)
│   ├── PATCH  /:id
│   └── DELETE /:id
├── /submissions/
│   ├── GET    /          (admin/artist)
│   ├── GET    /:id
│   ├── POST   /          (public/forms)
│   └── DELETE /:id       (admin)
├── /social/
│   ├── GET    /accounts
│   ├── POST   /accounts
│   ├── DELETE /accounts/:id
│   ├── GET    /posts
│   ├── POST   /posts
│   ├── PATCH  /posts/:id
│   └── DELETE /posts/:id
├── /link-in-bio/
│   ├── GET    /
│   ├── GET    /:username
│   ├── PATCH  /:id
│   └── GET    /:id/analytics
├── /analytics/
│   ├── GET    /dashboard
│   ├── GET    /events
│   └── POST   /events
├── /partners/
│   ├── GET    /
│   ├── GET    /:id
│   ├── POST   /          (admin)
│   ├── PATCH  /:id
│   └── DELETE /:id
├── /chatbot/
│   ├── POST   /chat
│   └── GET    /health
└── /webhooks/
    └── POST   /:provider
```

### API Design Principles

1. **RESTful**: Follow REST conventions where possible
2. **Versioned**: Use `/api/v1/` for versioning
3. **Authenticated**: Require JWT for protected routes
4. **Validated**: Use Zod for request/response validation
5. **Rate Limited**: Implement rate limiting per endpoint
6. **CORS**: Configure CORS for cross-origin requests
7. **Error Handling**: Consistent error response format

---

## Authentication & Security

### Authentication Flow

```
┌─────────────┐
│   USER      │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│  LOGIN PAGE     │
│  (email/pass)   │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│  API: /auth/    │
│  /login         │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│  NextAuth.js    │
│  - Validate     │
│  - Generate JWT │
│  - Create       │
│    session      │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│  SESSION        │
│  - Set cookie   │
│  - Redirect     │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│  PROTECTED      │
│  ROUTES         │
│  - Verify JWT   │
│  - Load user    │
│  - Check role   │
└─────────────────┘
```

### Security Measures

1. **Authentication**
   - JWT with short expiration (15 minutes)
   - Refresh tokens with longer expiration (7 days)
   - Secure cookie settings (httpOnly, secure, sameSite)
   - Password hashing with bcrypt (10 rounds)

2. **Authorization**
   - Role-based access control (RBAC)
   - Route-level protection
   - Component-level authorization
   - API endpoint protection

3. **Data Protection**
   - Input validation with Zod
   - SQL injection prevention (parameterized queries)
   - XSS protection (sanitization)
   - CSRF protection (tokens)

4. **Infrastructure Security**
   - HTTPS enforcement
   - Security headers (CSP, HSTS, X-Frame-Options)
   - Rate limiting
   - IP blocking for abuse

5. **Compliance**
   - GDPR compliance
   - Data privacy policies
   - Cookie consent
   - User data deletion

---

## Deployment Architecture

### Environment Setup

```
Development (localhost)
  - Next.js dev server
  - Local D1 database
  - Mock services

Staging (staging.hlpfl.org)
  - Cloudflare Pages
  - Staging D1 database
  - Test APIs

Production (hlpfl.org)
  - Cloudflare Pages
  - Production D1 database
  - Production APIs
  - CDN caching
```

### CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml

name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    - Run linters
    - Run tests
    - Type check

  build:
    - Build Next.js application
    - Generate static assets
    - Optimize images

  deploy:
    - Deploy to Cloudflare Pages
    - Run database migrations
    - Clear cache
    - Verify deployment
```

### Monitoring & Logging

1. **Application Monitoring**
   - Error tracking (Sentry)
   - Performance monitoring (Vercel Analytics)
   - Uptime monitoring (UptimeRobot)

2. **Logging**
   - Structured logging (JSON format)
   - Log levels (error, warn, info, debug)
   - Log aggregation (Cloudflare Logs)

3. **Alerting**
   - Error rate alerts
   - Performance degradation alerts
   - Deployment failure alerts

---

## Performance & Scalability

### Performance Targets

- **Lighthouse Score**: 95+ across all metrics
- **Load Time**: < 2 seconds (first contentful paint)
- **Time to Interactive**: < 3 seconds
- **API Response**: < 200ms average
- **Uptime**: 99.9%+

### Optimization Strategies

1. **Frontend Optimization**
   - Image optimization (Next/Image)
   - Code splitting (dynamic imports)
   - Lazy loading (components, images)
   - Font optimization (next/font)
   - Memoization (React.memo, useMemo)

2. **Backend Optimization**
   - Edge functions (Cloudflare Workers)
   - Database indexing
   - Query optimization
   - Caching strategies (Redis, CDN)
   - API response caching

3. **CDN & Caching**
   - Static asset caching (Cloudflare CDN)
   - API response caching (5-15 minutes)
   - Page caching (ISR for public pages)
   - Browser caching headers

4. **Database Optimization**
   - Connection pooling
   - Query indexing
   - Read replicas (if needed)
   - Database caching

### Scalability Plan

1. **Vertical Scaling**
   - Increase server resources
   - Optimize database queries
   - Implement caching

2. **Horizontal Scaling**
   - Add more edge locations
   - Load balancing
   - Database sharding (if needed)

3. **Architecture Scaling**
   - Microservices (for specific features)
   - Event-driven architecture
   - Queue-based processing

---

## Next Steps

1. **Phase 1 Setup** (Weeks 1-2)
   - Initialize Next.js project
   - Set up authentication
   - Create design system

2. **Phase 2 Development** (Weeks 3-6)
   - Build public pages
   - Integrate chatbot
   - Implement contact form

3. **Phase 3 Portal** (Weeks 7-10)
   - Build artist portal
   - Integrate social media manager
   - Implement link-in-bio tool

4. **Phase 4 Testing** (Weeks 11-12)
   - Testing and QA
   - Performance optimization
   - Security audit

5. **Phase 5 Launch** (Week 13)
   - Deployment
   - Monitoring setup
   - Documentation

---

## Appendix

### A. Repository Analysis Summary

[BRIEF OVERVIEW OF EACH REPOSITORY]
[See repository-analysis-summary.md]

### B. Feature Prioritization

[PHASED IMPLEMENTATION PLAN]
[See feature-prioritization.md]

### C. Unique Design Suggestions

[CREATIVE PORTFOLIO DISPLAY IDEAS]
[See design-suggestions.md]

### D. Technical Recommendations

[DETAILED TECHNICAL RECOMMENDATIONS]
[See technical-recommendations.md]