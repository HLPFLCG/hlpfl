# HLPFL Social Media Management API Documentation

## Overview

The HLPFL API is a comprehensive social media management platform built on Cloudflare Workers with Hono v4 framework. It provides endpoints for managing social media posts, analytics, team collaboration, and financial transparency for artists.

## Base URL

```
Production: https://api.hlpfl.org
Development: http://localhost:8787
```

## Authentication

All authenticated endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <access_token>
```

### Getting Started

1. **Register**: `POST /auth/register`
2. **Login**: `POST /auth/login`
3. **Use the access token** in subsequent requests

## API Endpoints

### Authentication (`/auth`)

#### Register
```http
POST /auth/register
Content-Type: application/json

{
  "email": "artist@example.com",
  "password": "securepassword123",
  "name": "Artist Name",
  "role": "artist"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "artist@example.com",
  "password": "securepassword123"
}
```

#### Refresh Token
```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "your_refresh_token"
}
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer <access_token>
```

#### Forgot Password
```http
POST /auth/forgot-password
Content-Type: application/json

{
  "email": "artist@example.com"
}
```

#### Reset Password
```http
POST /auth/reset-password
Content-Type: application/json

{
  "token": "reset_token",
  "password": "newpassword123"
}
```

### Users (`/users`)

#### Get User Profile
```http
GET /users/:id
Authorization: Bearer <access_token>
```

#### Update Profile
```http
PUT /users/:id
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "Updated Name",
  "bio": "Artist bio",
  "website": "https://example.com"
}
```

#### List Users (Admin Only)
```http
GET /users?page=1&limit=20&role=artist
Authorization: Bearer <access_token>
```

### Posts (`/posts`)

#### Create Post
```http
POST /posts
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "content": "Post content here",
  "platforms": ["twitter", "linkedin"],
  "scheduled_for": "2024-12-25T10:00:00Z",
  "media_ids": ["media_id_1", "media_id_2"],
  "status": "scheduled"
}
```

#### List Posts
```http
GET /posts?page=1&limit=20&status=published
Authorization: Bearer <access_token>
```

#### Get Post
```http
GET /posts/:id
Authorization: Bearer <access_token>
```

#### Update Post
```http
PUT /posts/:id
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "content": "Updated content",
  "platforms": ["twitter", "linkedin", "facebook"]
}
```

#### Delete Post
```http
DELETE /posts/:id
Authorization: Bearer <access_token>
```

#### Publish Post
```http
POST /posts/:id/publish
Authorization: Bearer <access_token>
```

#### Get Post Analytics
```http
GET /posts/:id/analytics
Authorization: Bearer <access_token>
```

### Social Accounts (`/social`)

#### List Connected Accounts
```http
GET /social/accounts
Authorization: Bearer <access_token>
```

#### Connect Account
```http
POST /social/accounts
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "platform": "twitter",
  "access_token": "platform_access_token",
  "refresh_token": "platform_refresh_token",
  "platform_user_id": "12345",
  "platform_username": "username"
}
```

#### Disconnect Account
```http
DELETE /social/accounts/:id
Authorization: Bearer <access_token>
```

### Media (`/media`)

#### Upload Media
```http
POST /media/upload
Authorization: Bearer <access_token>
Content-Type: multipart/form-data

file: <binary_file>
```

#### List Media
```http
GET /media?page=1&limit=20&type=image
Authorization: Bearer <access_token>
```

#### Get Media
```http
GET /media/:id
Authorization: Bearer <access_token>
```

#### Update Media Metadata
```http
PATCH /media/:id
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "alt_text": "Description of image",
  "tags": ["tag1", "tag2"]
}
```

#### Delete Media
```http
DELETE /media/:id
Authorization: Bearer <access_token>
```

#### Search Media
```http
GET /media/search?q=keyword&page=1&limit=20
Authorization: Bearer <access_token>
```

### Analytics (`/analytics`)

#### Get Overview
```http
GET /analytics/overview?days=30
Authorization: Bearer <access_token>
```

#### Get Timeline
```http
GET /analytics/timeline?days=30&platform=twitter
Authorization: Bearer <access_token>
```

#### Get Top Posts
```http
GET /analytics/top-posts?limit=10&metric=engagement
Authorization: Bearer <access_token>
```

#### Get Platform Analytics
```http
GET /analytics/platforms?days=30
Authorization: Bearer <access_token>
```

#### Get Best Times to Post
```http
GET /analytics/best-times?platform=twitter
Authorization: Bearer <access_token>
```

### Teams (`/teams`)

#### Create Team
```http
POST /teams
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "Marketing Team",
  "description": "Team description"
}
```

#### List Teams
```http
GET /teams
Authorization: Bearer <access_token>
```

#### Get Team
```http
GET /teams/:id
Authorization: Bearer <access_token>
```

#### Invite Member
```http
POST /teams/:id/invite
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "email": "member@example.com",
  "role": "editor"
}
```

#### Update Member Role
```http
PATCH /teams/:teamId/members/:memberId
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "role": "admin"
}
```

### Financial (`/financial`)

#### Get Dashboard
```http
GET /financial/dashboard?year=2024&month=12
Authorization: Bearer <access_token>
```

#### Record Revenue (Manager Only)
```http
POST /financial/revenue
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "artist_id": "artist_uuid",
  "amount": 5000.00,
  "source": "Streaming",
  "date": "2024-12-01T00:00:00Z",
  "description": "Spotify royalties"
}
```

#### List Revenue
```http
GET /financial/revenue?page=1&limit=20
Authorization: Bearer <access_token>
```

#### Record Expense
```http
POST /financial/expenses
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "artist_id": "artist_uuid",
  "amount": 500.00,
  "category": "Marketing",
  "date": "2024-12-01T00:00:00Z",
  "description": "Facebook ads"
}
```

#### List Expenses
```http
GET /financial/expenses?page=1&limit=20&approved=true
Authorization: Bearer <access_token>
```

#### Approve Expense (Manager Only)
```http
PATCH /financial/expenses/:id/approve
Authorization: Bearer <access_token>
```

#### Get Monthly Report
```http
GET /financial/reports/monthly?year=2024&artist_id=uuid
Authorization: Bearer <access_token>
```

#### Get Annual Report
```http
GET /financial/reports/annual?artist_id=uuid
Authorization: Bearer <access_token>
```

### AI Features (`/ai`)

#### Generate Content
```http
POST /ai/generate
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "prompt": "Write a post about new music release",
  "platform": "twitter",
  "tone": "casual",
  "maxLength": 280
}
```

#### Generate Hashtags
```http
POST /ai/hashtags
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "content": "Just released my new single!",
  "platform": "instagram",
  "count": 10
}
```

#### Generate Caption
```http
POST /ai/caption
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "imageDescription": "Artist performing on stage",
  "platform": "instagram",
  "tone": "energetic"
}
```

#### Optimize Posting Time
```http
POST /ai/optimize-time
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "platform": "twitter"
}
```

#### Analyze Sentiment
```http
POST /ai/sentiment
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "content": "Post content to analyze"
}
```

## Error Responses

All errors follow this format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message"
  }
}
```

### Common Error Codes

- `VALIDATION_ERROR` (400): Invalid request data
- `AUTHENTICATION_ERROR` (401): Missing or invalid token
- `AUTHORIZATION_ERROR` (403): Insufficient permissions
- `NOT_FOUND` (404): Resource not found
- `CONFLICT` (409): Resource already exists
- `RATE_LIMIT_EXCEEDED` (429): Too many requests
- `INTERNAL_SERVER_ERROR` (500): Server error

## Rate Limiting

- **Limit**: 100 requests per minute per IP/user
- **Headers**: 
  - `X-RateLimit-Limit`: Maximum requests allowed
  - `X-RateLimit-Remaining`: Requests remaining
  - `X-RateLimit-Reset`: Unix timestamp when limit resets

## Pagination

List endpoints support pagination:

```
?page=1&limit=20
```

Response format:
```json
{
  "data": [...],
  "total": 100,
  "page": 1,
  "totalPages": 5
}
```

## Webhooks (Coming Soon)

Webhook events for:
- Post published
- Analytics updated
- Team member added
- Revenue recorded

## Support

For API support, contact: dev@hlpfl.org