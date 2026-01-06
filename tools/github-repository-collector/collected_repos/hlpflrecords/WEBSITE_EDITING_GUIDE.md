# HLPFL Records Website Editing Guide

## Table of Contents
1. [Overview](#overview)
2. [File Structure](#file-structure)
3. [Editing Content](#editing-content)
4. [Adding New Content](#adding-new-content)
5. [Common Tasks](#common-tasks)
6. [Deployment](#deployment)

---

## Overview

This guide will help you edit and maintain the HLPFL Records website. The website is built with Next.js 14, React, TypeScript, and Tailwind CSS.

**Important Files:**
- `src/data/mockData.ts` - All website content (artists, releases, team, news)
- `src/components/sections/` - Page sections (Hero, About, etc.)
- `src/app/` - Page routes and layouts

---

## File Structure

```
hlpflrecords/
├── src/
│   ├── app/                    # Page routes
│   │   ├── page.tsx           # Home page
│   │   ├── about/page.tsx     # About page
│   │   ├── artists/page.tsx   # Artists page
│   │   ├── releases/page.tsx  # Releases page
│   │   └── team/page.tsx      # Team page
│   ├── components/
│   │   ├── sections/          # Page sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   └── FeaturedArtistsSection.tsx
│   │   └── ui/                # UI components
│   ├── data/
│   │   └── mockData.ts        # ⭐ MAIN CONTENT FILE
│   └── types/
│       └── index.ts           # TypeScript types
├── public/
│   └── images/
│       ├── team/              # Team member photos
│       └── releases/          # Release cover art
└── README.md
```

---

## Editing Content

### 1. Editing Artists

**File:** `src/data/mockData.ts`

**Location:** `export const mockArtists: Artist[] = [...]`

**Example:**
```typescript
{
  id: '1',
  name: 'Alki',
  slug: 'alki',
  bio: 'Artist biography here...',
  genre: ['Punk', 'Pop', 'Rap'],
  image: '/images/team/alki.jpg',
  socials: {
    spotify: 'https://open.spotify.com/artist/...',
    instagram: 'https://www.instagram.com/...',
    website: 'https://...',
    twitter: 'https://twitter.com/...',
  },
}
```

**To Edit:**
1. Open `src/data/mockData.ts`
2. Find the `mockArtists` array
3. Update the artist's information
4. Save the file

---

### 2. Editing Releases

**File:** `src/data/mockData.ts`

**Location:** `export const mockReleases: Release[] = [...]`

**Example:**
```typescript
{
  id: '1',
  title: '221',
  artist: 'Alki',
  artistId: '1',
  type: 'single',  // 'single', 'album', or 'ep'
  releaseDate: new Date('2025-01-17'),
  coverArt: '/images/releases/221.png',
  description: 'Release description...',
  links: {
    spotify: 'https://open.spotify.com/album/...',
    apple: 'https://music.apple.com/album/...',
    youtube: 'https://www.youtube.com/watch?v=...',
  },
  tracks: [
    { id: '1', title: '221', duration: '1:49' },
  ],
}
```

**To Edit:**
1. Open `src/data/mockData.ts`
2. Find the `mockReleases` array
3. Update the release information
4. Save the file

---

### 3. Editing Team Members

**File:** `src/data/mockData.ts`

**Location:** `export const mockTeam: TeamMember[] = [...]`

**Current Team:**
- James Rockel (Founder & CEO)
- Alki (Co-Founder & Signed Artist)
- Noah Rank (Director of Sales)

**Example:**
```typescript
{
  id: '3',
  name: 'Noah Rank',
  role: 'Director of Sales',
  bio: 'Team member biography...',
  image: '/images/team/noah-rank.jpg',
  socials: {
    linkedin: '#',
    email: 'noah@hlpfl.org',
  },
}
```

**To Edit:**
1. Open `src/data/mockData.ts`
2. Find the `mockTeam` array
3. Update the team member's information
4. Save the file

---

### 4. Editing Stats (Home & About Pages)

**Files:**
- `src/components/sections/AboutSection.tsx` (Home page)
- `src/app/about/page.tsx` (About page)

**Current Stats:**
- **1** Artist
- **10+** Releases
- **5m+** Streams
- **6** Years

**To Update Stats:**

**Home Page (AboutSection.tsx):**
```typescript
<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
  <div className="text-center">
    <div className="text-3xl font-bold text-gold mb-1">1</div>
    <div className="text-sm text-gray-400">Artists</div>
  </div>
  <div className="text-center">
    <div className="text-3xl font-bold text-gold mb-1">10+</div>
    <div className="text-sm text-gray-400">Releases</div>
  </div>
  <div className="text-center">
    <div className="text-3xl font-bold text-gold mb-1">5m+</div>
    <div className="text-sm text-gray-400">Streams</div>
  </div>
  <div className="text-center">
    <div className="text-3xl font-bold text-gold mb-1">6</div>
    <div className="text-sm text-gray-400">Years</div>
  </div>
</div>
```

**About Page (about/page.tsx):**
```typescript
const stats = [
  { number: '1', label: 'Artists' },
  { number: '10+', label: 'Releases' },
  { number: '5m+', label: 'Streams' },
  { number: '6', label: 'Years' }
]
```

**⚠️ Important:** Keep stats consistent across both pages!

---

## Adding New Content

### Adding a New Release

1. **Prepare the cover art:**
   - Save the image to `public/images/releases/`
   - Name it descriptively (e.g., `new-song.jpg`)
   - Recommended size: 1000x1000px

2. **Add to mockData.ts:**
```typescript
{
  id: '11',  // Increment the ID
  title: 'New Song Title',
  artist: 'Alki',
  artistId: '1',
  type: 'single',
  releaseDate: new Date('2025-02-01'),
  coverArt: '/images/releases/new-song.jpg',
  description: 'Description of the new release...',
  links: {
    spotify: 'https://open.spotify.com/album/...',
    apple: 'https://music.apple.com/album/...',
  },
  tracks: [
    { id: '1', title: 'New Song Title', duration: '2:30' },
  ],
}
```

3. **Update stats** if needed (releases count)

---

### Adding a New Team Member

1. **Prepare the photo:**
   - Save to `public/images/team/`
   - Name it descriptively (e.g., `john-doe.jpg`)
   - Recommended size: 800x800px

2. **Add to mockData.ts:**
```typescript
{
  id: '4',  // Increment the ID
  name: 'John Doe',
  role: 'Position Title',
  bio: 'Biography text...',
  image: '/images/team/john-doe.jpg',
  socials: {
    linkedin: 'https://linkedin.com/in/...',
    email: 'john@hlpfl.org',
  },
}
```

---

### Adding a New Artist

1. **Prepare the artist photo:**
   - Save to `public/images/team/`
   - Name it descriptively (e.g., `artist-name.jpg`)

2. **Add to mockData.ts:**
```typescript
{
  id: '2',  // Increment the ID
  name: 'Artist Name',
  slug: 'artist-name',  // URL-friendly version
  bio: 'Artist biography...',
  genre: ['Genre1', 'Genre2'],
  image: '/images/team/artist-name.jpg',
  socials: {
    spotify: 'https://open.spotify.com/artist/...',
    instagram: 'https://www.instagram.com/...',
    website: 'https://...',
  },
}
```

3. **Update stats** (artists count)

---

## Common Tasks

### Task 1: Update Alki's Monthly Listeners

**Files to update:**
- `src/data/mockData.ts` (artist bio)
- `src/components/sections/AboutSection.tsx` (if mentioned)

**Example:**
```typescript
bio: 'With nearly 50,000 monthly listeners...'  // Update this number
```

---

### Task 2: Update Stream Counts

**Files to update:**
- `src/components/sections/AboutSection.tsx`
- `src/app/about/page.tsx`

**Example:**
```typescript
{ number: '6m+', label: 'Streams' }  // Update from 5m+ to 6m+
```

---

### Task 3: Change Company Description

**Files to update:**
- `src/components/sections/AboutSection.tsx`
- `src/app/about/page.tsx`

Look for the text content in the `<p>` tags and update as needed.

---

### Task 4: Update Social Media Links

**File:** `src/data/mockData.ts`

Find the artist or team member and update their `socials` object:
```typescript
socials: {
  spotify: 'NEW_SPOTIFY_URL',
  instagram: 'NEW_INSTAGRAM_URL',
  // etc.
}
```

---

### Task 5: Update Release Links

**File:** `src/data/mockData.ts`

Find the release and update its `links` object:
```typescript
links: {
  spotify: 'NEW_SPOTIFY_URL',
  apple: 'NEW_APPLE_MUSIC_URL',
  youtube: 'NEW_YOUTUBE_URL',
}
```

---

## Deployment

### Local Testing

1. **Install dependencies:**
```bash
npm install
```

2. **Run development server:**
```bash
npm run dev
```

3. **Open browser:**
```
http://localhost:3000
```

---

### Building for Production

1. **Build the project:**
```bash
npm run build
```

2. **Test the build:**
```bash
npm start
```

---

### Deploying to GitHub

1. **Stage your changes:**
```bash
git add .
```

2. **Commit your changes:**
```bash
git commit -m "Update website content"
```

3. **Push to GitHub:**
```bash
git push origin main
```

---

## Quick Reference

### File Paths
- **Content Data:** `src/data/mockData.ts`
- **Team Photos:** `public/images/team/`
- **Release Art:** `public/images/releases/`
- **Home Page:** `src/app/page.tsx`
- **About Page:** `src/app/about/page.tsx`

### Common Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Run production build
git status           # Check what files changed
git add .            # Stage all changes
git commit -m "msg"  # Commit changes
git push             # Push to GitHub
```

### Important Notes
- ✅ Always keep stats consistent across pages
- ✅ Use relative paths for images (e.g., `/images/team/photo.jpg`)
- ✅ Test locally before deploying
- ✅ Increment IDs when adding new items
- ✅ Use descriptive file names for images
- ✅ Keep image sizes reasonable (< 2MB)

---

## Need Help?

If you encounter issues:
1. Check the browser console for errors (F12)
2. Verify file paths are correct
3. Ensure all required fields are filled
4. Test the build with `npm run build`
5. Contact the development team

---

**Last Updated:** December 2024
**Version:** 1.0