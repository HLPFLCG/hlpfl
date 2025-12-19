# HLPFL Frontend - Next.js 14 Application

## Overview

This is the frontend application for the HLPFL Social Media Management Platform, built with Next.js 14, React, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Forms**: React Hook Form
- **HTTP Client**: Axios
- **Charts**: Recharts
- **Icons**: Lucide React

## Project Structure

```
frontend/
├── app/                    # Next.js 14 app directory
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   ├── forgot-password/   # Password reset
│   ├── dashboard/         # Main dashboard
│   ├── posts/             # Post management
│   ├── analytics/         # Analytics views
│   ├── media/             # Media library
│   ├── teams/             # Team management
│   ├── financial/         # Financial dashboard
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # UI components
│   ├── layout/           # Layout components
│   └── dashboard/        # Dashboard components
├── lib/                  # Utilities and helpers
│   ├── api/             # API client
│   ├── hooks/           # Custom hooks
│   ├── store/           # State management
│   └── utils/           # Utility functions
├── types/               # TypeScript types
└── public/              # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Update .env.local with your API URL
NEXT_PUBLIC_API_URL=http://localhost:8787
```

### Development

```bash
# Run development server
npm run dev

# Open http://localhost:3000
```

### Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Features Implemented

### ✅ Landing Page
- Hero section with features
- Call-to-action buttons
- Feature highlights
- Statistics display
- Responsive design

### ✅ Authentication
- Login page with form validation
- Registration page with password strength indicator
- Password visibility toggle
- Error handling
- Token management

### ✅ API Client
- Axios-based HTTP client
- Automatic token refresh
- Request/response interceptors
- Type-safe API methods
- Error handling

### ✅ State Management
- Zustand store for auth state
- User session management
- Loading states

## Pages to Build

### 🚧 Dashboard
- Overview with key metrics
- Recent posts
- Quick actions
- Analytics summary

### 🚧 Posts Management
- Create new posts
- Schedule posts
- Edit/delete posts
- Multi-platform selection
- Media attachments
- Draft management

### 🚧 Analytics
- Engagement metrics
- Timeline charts
- Top performing posts
- Platform breakdown
- Export functionality

### 🚧 Media Library
- Upload media
- Browse media
- Search and filter
- Media details
- Delete media

### 🚧 Team Management
- Team list
- Invite members
- Role assignment
- Member management

### 🚧 Financial Dashboard
- Revenue tracking
- Expense management
- Commission calculations
- Monthly/annual reports
- Transaction history

## API Integration

The frontend connects to the backend API at `NEXT_PUBLIC_API_URL`. All API calls are handled through the `apiClient` in `lib/api/client.ts`.

### Available API Methods

```typescript
// Authentication
apiClient.register(data)
apiClient.login(data)
apiClient.logout()
apiClient.getCurrentUser()

// Posts
apiClient.getPosts(params)
apiClient.createPost(data)
apiClient.updatePost(id, data)
apiClient.deletePost(id)
apiClient.publishPost(id)

// Media
apiClient.uploadMedia(file)
apiClient.getMedia(params)
apiClient.deleteMedia(id)

// Analytics
apiClient.getAnalyticsOverview(params)
apiClient.getAnalyticsTimeline(params)
apiClient.getTopPosts(params)

// Financial
apiClient.getFinancialDashboard(params)
apiClient.getRevenue(params)
apiClient.getExpenses(params)

// Teams
apiClient.getTeams()
apiClient.createTeam(data)

// AI
apiClient.generateContent(data)
apiClient.generateHashtags(data)
apiClient.analyzeSentiment(content)
```

## Styling

### Tailwind Configuration

Custom colors and gradients are defined in `tailwind.config.ts`:

```typescript
colors: {
  hlpfl: {
    purple: '#8B5CF6',
    blue: '#3B82F6',
    pink: '#EC4899',
  }
}
```

### Custom Classes

- `.hlpfl-gradient` - Purple to blue gradient background
- `.hlpfl-gradient-text` - Gradient text effect

## Environment Variables

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8787

# App Configuration
NEXT_PUBLIC_APP_NAME=HLPFL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Development Guidelines

### Component Structure

```typescript
// Use TypeScript for all components
interface ComponentProps {
  // Define props
}

export default function Component({ props }: ComponentProps) {
  // Component logic
  return (
    // JSX
  )
}
```

### API Calls

```typescript
// Use try-catch for error handling
try {
  const data = await apiClient.someMethod();
  // Handle success
} catch (error) {
  // Handle error
}
```

### Forms

```typescript
// Use React Hook Form
const { register, handleSubmit, formState: { errors } } = useForm();

const onSubmit = async (data) => {
  // Handle form submission
};
```

## Next Steps

1. **Complete Dashboard Pages**
   - Build dashboard layout with sidebar
   - Create dashboard overview
   - Add quick actions

2. **Posts Management**
   - Create post form
   - Post list with filters
   - Post editor
   - Scheduling interface

3. **Analytics Views**
   - Charts and graphs
   - Data visualization
   - Export functionality

4. **Media Library**
   - Upload interface
   - Grid/list views
   - Media preview

5. **Team Features**
   - Team dashboard
   - Member management
   - Permissions UI

6. **Financial Dashboard**
   - Revenue charts
   - Expense tracking
   - Reports generation

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables

Set these in your deployment platform:
- `NEXT_PUBLIC_API_URL` - Your production API URL

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## Support

For issues or questions:
- Email: dev@hlpfl.org
- GitHub Issues: https://github.com/HLPFLCG/hlpfl/issues

---

**Status**: 🚧 In Development  
**Version**: 0.1.0  
**Last Updated**: December 19, 2024