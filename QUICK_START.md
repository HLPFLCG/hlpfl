# HLPFL Platform - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Node.js 18+
- Cloudflare account
- Wrangler CLI installed

### Installation

```bash
# 1. Navigate to project
cd hlpfl

# 2. Install dependencies
npm install

# 3. Set up environment
cp .env.example .env

# 4. Run migrations (local)
npm run db:migrate:local

# 5. Start dev server
npm run dev
```

### First API Call

```bash
# Test health endpoint
curl http://localhost:8787/health

# Register a user
curl -X POST http://localhost:8787/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User",
    "role": "artist"
  }'
```

## 📚 Key Resources

- **API Docs**: [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
- **Deployment**: [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- **Status**: [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md)

## 🔑 Common Endpoints

### Authentication
```bash
POST /auth/register    # Register user
POST /auth/login       # Login
GET  /auth/me          # Get current user
```

### Posts
```bash
POST   /posts          # Create post
GET    /posts          # List posts
GET    /posts/:id      # Get post
PUT    /posts/:id      # Update post
DELETE /posts/:id      # Delete post
```

### Media
```bash
POST   /media/upload   # Upload media
GET    /media          # List media
DELETE /media/:id      # Delete media
```

### Analytics
```bash
GET /analytics/overview    # Dashboard
GET /analytics/timeline    # Timeline data
GET /analytics/top-posts   # Top posts
```

## 🔐 Authentication Flow

```javascript
// 1. Register
const registerResponse = await fetch('/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123',
    name: 'User Name',
    role: 'artist'
  })
});

const { accessToken, refreshToken } = await registerResponse.json();

// 2. Use token in requests
const response = await fetch('/posts', {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
});
```

## 🛠️ Development Commands

```bash
npm run dev              # Start dev server
npm run deploy           # Deploy to production
npm run db:migrate       # Run migrations (remote)
npm run db:migrate:local # Run migrations (local)
npm run type-check       # Check TypeScript
```

## 📦 Project Structure

```
hlpfl/
├── src/
│   ├── index.ts         # Main app
│   ├── routes/          # API routes
│   ├── middleware/      # Middleware
│   ├── services/        # Business logic
│   └── utils/           # Utilities
├── migrations/          # Database
└── docs/               # Documentation
```

## 🐛 Troubleshooting

### Database not found
```bash
wrangler d1 list
# Update database_id in wrangler.toml
```

### JWT_SECRET not set
```bash
wrangler secret put JWT_SECRET
```

### CORS errors
Update allowed origins in `src/index.ts`

## 📞 Need Help?

- **Docs**: See documentation files
- **Email**: dev@hlpfl.org
- **Issues**: GitHub Issues

---

**Ready to build? Start with the API documentation!**