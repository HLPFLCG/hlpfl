# HLPFL Social Media Management Platform

> **Artist-First Social Media Management & Financial Transparency Platform**

[![Status](https://img.shields.io/badge/status-backend%20complete-success)](https://github.com/hlpfl/platform)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Cloudflare](https://img.shields.io/badge/powered%20by-Cloudflare%20Workers-orange)](https://workers.cloudflare.com/)

## 🎯 Overview

HLPFL is a comprehensive social media management platform designed specifically for artists and their management teams. Built on Cloudflare's edge network, it provides real-time analytics, multi-platform posting, team collaboration, and complete financial transparency with an 11% commission model.

### Key Features

- 🎨 **Artist-First Design** - Built for musicians, creators, and their teams
- 📊 **Financial Transparency** - Real-time commission tracking (11% model)
- 🚀 **Multi-Platform Publishing** - Twitter, LinkedIn, Facebook, Instagram
- 🤖 **AI-Powered Content** - Smart content generation and optimization
- 👥 **Team Collaboration** - Role-based access and approval workflows
- 📈 **Advanced Analytics** - Detailed engagement metrics and insights
- 💾 **Edge Computing** - Fast, global performance via Cloudflare Workers

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (Pending)                       │
│  portal.hlpfl.org  │  biobetter.hlpfl.com  │  hlpfl.org    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   API Layer (Complete ✅)                    │
│              Hono v4 on Cloudflare Workers                   │
│  Auth │ Posts │ Social │ Media │ Analytics │ Teams │ AI    │
└─────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
          ┌──────────────┐    ┌──────────────┐
          │ Cloudflare D1│    │ Cloudflare R2│
          │   Database   │    │   Storage    │
          └──────────────┘    └──────────────┘
                    │
                    ▼
          ┌──────────────────────┐
          │  Platform APIs       │
          │  Twitter │ LinkedIn  │
          │  Facebook│ Instagram │
          └──────────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Cloudflare account
- Wrangler CLI

### Installation

```bash
# Clone the repository
git clone https://github.com/hlpfl/platform.git
cd platform/hlpfl

# Install dependencies
npm install

# Set up environment
cp .env.example .env

# Run database migrations
npm run db:migrate:local

# Start development server
npm run dev
```

The API will be available at `http://localhost:8787`

### First API Call

```bash
# Health check
curl http://localhost:8787/health

# Register a user
curl -X POST http://localhost:8787/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "artist@example.com",
    "password": "securepass123",
    "name": "Artist Name",
    "role": "artist"
  }'
```

## 📚 Documentation

- **[API Documentation](API_DOCUMENTATION.md)** - Complete API reference
- **[Deployment Guide](DEPLOYMENT_GUIDE.md)** - Production deployment steps
- **[Implementation Status](IMPLEMENTATION_STATUS.md)** - Feature completion tracking
- **[Project Summary](PROJECT_SUMMARY.md)** - Comprehensive overview

## 🎨 Business Model

### Artist Management (11% Commission)

HLPFL operates on a transparent 11% commission model:

```
Artist Gross Revenue:  $100,000
Approved Expenses:     -$20,000
─────────────────────────────────
Net Revenue:           $80,000
HLPFL Commission (11%): -$8,800
─────────────────────────────────
Artist Earnings (89%):  $71,200
```

**Key Principles:**
- ✅ Artists own 100% of their work
- ✅ Non-exclusive 12-month agreements
- ✅ 30-day artist termination option
- ✅ Real-time financial transparency
- ✅ No power of attorney required

### BioBetter Platform (Subscription)

Independent artists can use BioBetter without management:

- **Free**: Basic link-in-bio and social tools
- **Pro** ($9.99/mo): Advanced scheduling and analytics
- **Business** ($29.99/mo): Team features and white-label

## 🛠️ Technology Stack

### Backend (Complete ✅)
- **Framework**: Hono v4
- **Runtime**: Cloudflare Workers
- **Database**: Cloudflare D1 (SQLite)
- **Storage**: Cloudflare R2
- **Language**: TypeScript
- **Validation**: Zod
- **Authentication**: JWT

### Frontend (Pending)
- **Framework**: Next.js 14
- **UI Library**: React
- **Styling**: Tailwind CSS
- **State**: React Query
- **Forms**: React Hook Form

### Platform Integrations
- Twitter/X API
- LinkedIn API
- Facebook Graph API
- Instagram Graph API
- OpenAI API (optional)

## 📊 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/refresh` - Refresh token
- `GET /auth/me` - Get current user
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password

### Posts
- `POST /posts` - Create post
- `GET /posts` - List posts
- `GET /posts/:id` - Get post
- `PUT /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post
- `POST /posts/:id/publish` - Publish post
- `GET /posts/:id/analytics` - Get analytics

### Social Accounts
- `GET /social/accounts` - List connected accounts
- `POST /social/accounts` - Connect account
- `DELETE /social/accounts/:id` - Disconnect account

### Media
- `POST /media/upload` - Upload media
- `GET /media` - List media
- `GET /media/:id` - Get media
- `DELETE /media/:id` - Delete media

### Analytics
- `GET /analytics/overview` - Dashboard overview
- `GET /analytics/timeline` - Timeline data
- `GET /analytics/top-posts` - Top performing posts
- `GET /analytics/platforms` - Platform breakdown

### Teams
- `POST /teams` - Create team
- `GET /teams` - List teams
- `POST /teams/:id/invite` - Invite member
- `PATCH /teams/:teamId/members/:memberId` - Update role

### Financial
- `GET /financial/dashboard` - Financial dashboard
- `POST /financial/revenue` - Record revenue
- `POST /financial/expenses` - Record expense
- `GET /financial/reports/monthly` - Monthly report

### AI
- `POST /ai/generate` - Generate content
- `POST /ai/hashtags` - Generate hashtags
- `POST /ai/caption` - Generate captions
- `POST /ai/sentiment` - Analyze sentiment

**Total**: 60+ endpoints across 9 route handlers

## 🔐 Security

- **Authentication**: JWT with refresh tokens
- **Password Hashing**: PBKDF2 (100,000 iterations)
- **Rate Limiting**: 100 requests/minute per user
- **Input Validation**: Zod schema validation
- **CORS**: Whitelist-based origin control
- **SQL Injection**: Parameterized queries
- **XSS Protection**: Content sanitization

## 📈 Performance

- **Response Time**: < 200ms average
- **Uptime**: 99.9%+ (Cloudflare SLA)
- **Global CDN**: 300+ edge locations
- **Database**: Edge-optimized D1
- **Scalability**: Auto-scaling Workers

## 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage

# Type checking
npm run type-check
```

## 🚢 Deployment

### Production Deployment

```bash
# Deploy to production
npm run deploy

# Run migrations
npm run db:migrate

# Verify deployment
curl https://api.hlpfl.org/health
```

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions.

## 📦 Project Structure

```
hlpfl/
├── src/
│   ├── index.ts              # Application entry
│   ├── types/                # TypeScript definitions
│   ├── utils/                # Utility functions
│   ├── middleware/           # Middleware components
│   ├── routes/               # API route handlers
│   └── services/             # Business logic services
├── migrations/               # Database migrations
├── docs/                     # Documentation
├── tests/                    # Test files
├── wrangler.toml            # Cloudflare config
├── tsconfig.json            # TypeScript config
└── package.json             # Dependencies
```

## 🎯 Roadmap

### ✅ Phase 1: Backend (Complete)
- [x] Authentication & authorization
- [x] Social media management
- [x] Multi-platform integration
- [x] Media management
- [x] Analytics & reporting
- [x] Team collaboration
- [x] Financial transparency
- [x] AI features

### 🚧 Phase 2: Frontend (In Progress)
- [ ] Portal UI (portal.hlpfl.org)
- [ ] BioBetter UI (biobetter.hlpfl.com)
- [ ] Admin dashboard
- [ ] Mobile responsive design

### 📅 Phase 3: Advanced Features (Planned)
- [ ] Social listening
- [ ] Unified inbox
- [ ] Email notifications
- [ ] Webhook system
- [ ] Mobile apps

### 🔮 Phase 4: Scale (Future)
- [ ] White-label solutions
- [ ] International expansion
- [ ] Advanced automation
- [ ] Competitor analysis

## 💰 Pricing

### For Managed Artists
- **Commission**: 11% of net revenue
- **Setup Fee**: $0
- **Monthly Fee**: $0
- **Contract**: Non-exclusive, 12 months

### For Independent Artists (BioBetter)
- **Free**: Basic features
- **Pro**: $9.99/month
- **Business**: $29.99/month

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) for details.

## 👥 Team

**HLPFL Engineering Team**
- Email: dev@hlpfl.org
- Website: https://hlpfl.org
- Twitter: [@hlpfl](https://twitter.com/hlpfl)

## 🙏 Acknowledgments

- Built with [Hono](https://hono.dev/)
- Powered by [Cloudflare Workers](https://workers.cloudflare.com/)
- Inspired by artist-first principles

## 📞 Support

- **Documentation**: See docs folder
- **Issues**: GitHub Issues
- **Email**: support@hlpfl.org
- **Discord**: [Join our community](https://discord.gg/hlpfl)

## 🌟 Star History

If you find this project useful, please consider giving it a star! ⭐

---

**Built with ❤️ by the HLPFL Team**

*Empowering artists through technology and transparency*