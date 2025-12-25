# ✏️ HLPFL RECORDS - EDITING GUIDE

## 📋 TABLE OF CONTENTS
1. [Quick Start](#quick-start)
2. [Adding New Releases](#adding-new-releases)
3. [Editing Existing Releases](#editing-existing-releases)
4. [Managing Team Members](#managing-team-members)
5. [Updating Images](#updating-images)
6. [Modifying Text Content](#modifying-text-content)
7. [Managing Easter Eggs](#managing-easter-eggs)
8. [Deployment Process](#deployment-process)
9. [Common Tasks](#common-tasks)
10. [Troubleshooting](#troubleshooting)

---

## 🚀 QUICK START

### Prerequisites
- Access to GitHub repository: `HLPFLCG/hlpflrecords`
- Basic understanding of JSON format
- Image editing software (optional)
- Text editor (VS Code recommended)

### Basic Workflow
1. **Clone repository** (first time only)
2. **Make changes** to data files
3. **Test locally** (optional but recommended)
4. **Commit changes** to GitHub
5. **Automatic deployment** to https://hlpfl.org

---

## 🎵 ADDING NEW RELEASES

### Step-by-Step Process

#### 1. Prepare Your Assets
Before adding a release, gather:
- ✅ Cover art image (1:1 ratio, minimum 1000x1000px)
- ✅ Release information (title, date, type)
- ✅ Track listing with durations
- ✅ Streaming platform links
- ✅ Credits (producers, engineers, etc.)

#### 2. Add Cover Art Image
```bash
# Navigate to images folder
cd public/images/releases/

# Add your image file
# Recommended naming: artist-title.jpg
# Example: alki-new-single.jpg
```

**Image Requirements:**
- Format: JPG or PNG
- Size: 1000x1000px minimum
- Aspect Ratio: 1:1 (square)
- File Size: Under 500KB (optimize if needed)
- Naming: lowercase, hyphens for spaces

#### 3. Edit releases.json
Open `data/releases.json` and add your new release:

```json
{
  "id": "unique-slug-here",
  "title": "Your Release Title",
  "artist": "Alki",
  "type": "Single",
  "releaseDate": "2024-12-15",
  "coverArt": "/images/releases/alki-new-single.jpg",
  "streamingLinks": {
    "spotify": "https://open.spotify.com/track/...",
    "appleMusic": "https://music.apple.com/...",
    "youtube": "https://youtube.com/watch?v=...",
    "soundcloud": "https://soundcloud.com/..."
  },
  "tracks": [
    {
      "number": 1,
      "title": "Track Name",
      "duration": "3:45",
      "explicit": false
    }
  ],
  "description": "A brief description of the release...",
  "credits": {
    "producer": ["Producer Name"],
    "engineer": ["Engineer Name"],
    "mixer": ["Mixer Name"],
    "mastering": ["Mastering Engineer"]
  },
  "tags": ["hip-hop", "emotional", "introspective"],
  "featured": true,
  "hidden": false
}
```

#### 4. Field Explanations

**Required Fields:**
- `id`: Unique identifier (lowercase, hyphens, no spaces)
  - Example: `"new-single-2024"`
- `title`: Release title
- `artist`: Artist name (usually "Alki")
- `type`: One of: `"Single"`, `"EP"`, `"Album"`, `"Mixtape"`
- `releaseDate`: Format: `"YYYY-MM-DD"`
- `coverArt`: Path to image file

**Optional Fields:**
- `streamingLinks`: Object with platform URLs
  - Supported: spotify, appleMusic, youtube, soundcloud, tidal, amazonMusic
- `tracks`: Array of track objects
- `description`: Text description (supports markdown)
- `credits`: Object with credit arrays
- `tags`: Array of genre/mood tags
- `featured`: Boolean - show on homepage (default: false)
- `hidden`: Boolean - hide from public (default: false)

#### 5. Multiple Tracks (EP/Album)
For releases with multiple tracks:

```json
"tracks": [
  {
    "number": 1,
    "title": "First Track",
    "duration": "3:45",
    "explicit": false,
    "featured": ["Artist Name"]
  },
  {
    "number": 2,
    "title": "Second Track",
    "duration": "4:12",
    "explicit": true,
    "featured": ["Artist 1", "Artist 2"]
  },
  {
    "number": 3,
    "title": "Third Track",
    "duration": "3:30",
    "explicit": false
  }
]
```

#### 6. Complete Example
```json
{
  "id": "reflections-ep",
  "title": "Reflections",
  "artist": "Alki",
  "type": "EP",
  "releaseDate": "2024-12-20",
  "coverArt": "/images/releases/alki-reflections.jpg",
  "streamingLinks": {
    "spotify": "https://open.spotify.com/album/abc123",
    "appleMusic": "https://music.apple.com/album/abc123",
    "youtube": "https://youtube.com/playlist?list=abc123",
    "soundcloud": "https://soundcloud.com/alki/sets/reflections"
  },
  "tracks": [
    {
      "number": 1,
      "title": "Intro",
      "duration": "1:30",
      "explicit": false
    },
    {
      "number": 2,
      "title": "Lost in Thought",
      "duration": "3:45",
      "explicit": false
    },
    {
      "number": 3,
      "title": "Midnight Drive",
      "duration": "4:20",
      "explicit": true,
      "featured": ["Guest Artist"]
    },
    {
      "number": 4,
      "title": "Outro",
      "duration": "2:15",
      "explicit": false
    }
  ],
  "description": "A deeply personal EP exploring themes of introspection and growth. Recorded over 6 months, this project represents a new chapter in Alki's artistic journey.",
  "credits": {
    "producer": ["Alki", "Producer Name"],
    "engineer": ["Engineer Name"],
    "mixer": ["Mixer Name"],
    "mastering": ["Mastering Engineer"],
    "artwork": ["Artist Name"]
  },
  "tags": ["hip-hop", "introspective", "emotional", "storytelling"],
  "featured": true,
  "hidden": false
}
```

---

## 📝 EDITING EXISTING RELEASES

### Finding the Release
1. Open `data/releases.json`
2. Search for the release by `id` or `title`
3. Make your changes
4. Save the file

### Common Edits

#### Update Streaming Links
```json
"streamingLinks": {
  "spotify": "NEW_SPOTIFY_URL",
  "appleMusic": "NEW_APPLE_MUSIC_URL"
}
```

#### Change Cover Art
1. Add new image to `public/images/releases/`
2. Update `coverArt` field:
```json
"coverArt": "/images/releases/new-cover.jpg"
```

#### Update Description
```json
"description": "Updated description text here..."
```

#### Mark as Featured
```json
"featured": true
```

#### Hide Release
```json
"hidden": true
```

#### Update Release Date
```json
"releaseDate": "2024-12-25"
```

### Bulk Editing Tips
- Use find/replace for common changes
- Validate JSON syntax before saving
- Test changes locally if possible
- Keep backups of original data

---

## 👥 MANAGING TEAM MEMBERS

### Adding a New Team Member

#### 1. Prepare Assets
- Profile photo (square, 500x500px minimum)
- Bio text
- Social media links
- Role/title

#### 2. Add Profile Photo
```bash
cd public/images/team/
# Add photo: firstname-lastname.jpg
```

#### 3. Edit team.json
Open `data/team.json` and add:

```json
{
  "id": "firstname-lastname",
  "name": "First Last",
  "role": "Position Title",
  "bio": "Biography text here. Can be multiple sentences describing background, experience, and role at HLPFL Records.",
  "image": "/images/team/firstname-lastname.jpg",
  "social": {
    "twitter": "https://twitter.com/username",
    "instagram": "https://instagram.com/username",
    "linkedin": "https://linkedin.com/in/username",
    "website": "https://personalwebsite.com"
  },
  "achievements": [
    "Achievement or credential 1",
    "Achievement or credential 2",
    "Achievement or credential 3"
  ],
  "joinDate": "2024-01-15",
  "featured": true,
  "order": 1
}
```

#### 4. Field Explanations

**Required:**
- `id`: Unique identifier (lowercase, hyphens)
- `name`: Full name
- `role`: Job title/position
- `bio`: Biography text
- `image`: Path to profile photo

**Optional:**
- `social`: Object with social media URLs
- `achievements`: Array of accomplishments
- `joinDate`: Date joined (YYYY-MM-DD)
- `featured`: Show on team page (default: true)
- `order`: Display order (lower numbers first)

### Editing Team Members

#### Update Bio
```json
"bio": "New biography text..."
```

#### Update Role
```json
"role": "New Position Title"
```

#### Add Social Links
```json
"social": {
  "twitter": "https://twitter.com/newhandle",
  "instagram": "https://instagram.com/newhandle"
}
```

#### Update Photo
1. Add new photo to `public/images/team/`
2. Update image path:
```json
"image": "/images/team/new-photo.jpg"
```

#### Change Display Order
```json
"order": 2
```

### Removing a Team Member
1. Set `featured: false` to hide from public view
2. Or delete the entire team member object
3. Keep image file for historical records

---

## 🖼️ UPDATING IMAGES

### Image Guidelines

#### Release Cover Art
- **Dimensions:** 1000x1000px minimum (3000x3000px ideal)
- **Aspect Ratio:** 1:1 (square)
- **Format:** JPG (preferred) or PNG
- **File Size:** Under 500KB
- **Color Space:** sRGB
- **Location:** `public/images/releases/`

#### Team Photos
- **Dimensions:** 500x500px minimum (1000x1000px ideal)
- **Aspect Ratio:** 1:1 (square)
- **Format:** JPG (preferred) or PNG
- **File Size:** Under 300KB
- **Color Space:** sRGB
- **Location:** `public/images/team/`

#### Other Images
- **Hero Images:** 1920x1080px (16:9)
- **Thumbnails:** 400x400px (1:1)
- **Logos:** SVG (preferred) or PNG with transparency

### Image Optimization

#### Using Online Tools
1. **TinyPNG** (https://tinypng.com)
   - Upload image
   - Download optimized version
   - Reduces file size by 50-70%

2. **Squoosh** (https://squoosh.app)
   - More control over compression
   - Compare before/after
   - Multiple format options

#### Using Command Line (Advanced)
```bash
# Install ImageMagick
brew install imagemagick  # macOS
apt-get install imagemagick  # Linux

# Resize and optimize
convert input.jpg -resize 1000x1000 -quality 85 output.jpg

# Batch process
for img in *.jpg; do
  convert "$img" -resize 1000x1000 -quality 85 "optimized-$img"
done
```

### Adding Images to Repository

#### Method 1: GitHub Web Interface
1. Navigate to `public/images/releases/` or `public/images/team/`
2. Click "Add file" → "Upload files"
3. Drag and drop images
4. Commit changes

#### Method 2: Git Command Line
```bash
# Navigate to images folder
cd public/images/releases/

# Copy your image
cp ~/Downloads/new-cover.jpg ./

# Add to git
git add new-cover.jpg

# Commit
git commit -m "Add cover art for new release"

# Push
git push origin main
```

### Image Naming Conventions
- **Lowercase only:** `alki-new-single.jpg` ✅ not `Alki-New-Single.jpg` ❌
- **Hyphens for spaces:** `my-release.jpg` ✅ not `my_release.jpg` ❌
- **Descriptive names:** `alki-reflections-ep.jpg` ✅ not `image1.jpg` ❌
- **No special characters:** Only letters, numbers, hyphens

---

## 📄 MODIFYING TEXT CONTENT

### Homepage Content
File: `app/page.tsx`

#### Hero Section
```typescript
<h1>Welcome to HLPFL Records</h1>
<p>Your tagline or description here</p>
```

#### Featured Releases Section
Automatically pulls from `releases.json` where `featured: true`

### About Section
File: `app/about/page.tsx`

```typescript
<p>
  Your about text here. Can include multiple paragraphs,
  formatting, and links.
</p>
```

### Terms of Service
File: `app/terms/page.tsx`

Update legal text as needed. Consult with legal counsel for changes.

### Privacy Policy
File: `app/privacy/page.tsx`

Update privacy practices. Ensure GDPR compliance.

### Footer Content
File: `components/Footer.tsx`

```typescript
<p>© 2024 HLPFL Records. All rights reserved.</p>
```

### Metadata (SEO)
File: `app/layout.tsx`

```typescript
export const metadata = {
  title: 'HLPFL Records - Your Tagline',
  description: 'Your site description for search engines',
  keywords: ['hip-hop', 'music', 'label'],
}
```

---

## 🥚 MANAGING EASTER EGGS

### Easter Egg Configuration
File: `components/ui/CreativeEasterEggs.tsx`

### Adding Unreleased Tracks

#### 1. Add Audio File
```bash
cd public/audio/unreleased/
# Add your audio file: track-name.mp3
```

#### 2. Update Track List
```typescript
const unreleasedTracks = [
  {
    id: 'track-slug',
    title: 'Track Title',
    artist: 'Alki',
    audioUrl: '/audio/unreleased/track-name.mp3',
    coverUrl: '/images/releases/cover.jpg', // optional
  },
  // ... existing tracks
];
```

### Modifying Triggers

#### Konami Code
```typescript
// Change the code sequence
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
                    'b', 'a'];
```

#### Logo Clicks
```typescript
// Change number of clicks or time window
const requiredClicks = 7;
const timeWindow = 3000; // milliseconds
```

#### Scroll Depth
```typescript
// Change scroll percentage
const targetScrollDepth = 77.7; // percentage
```

#### Time-Based
```typescript
// Change trigger time
const triggerHour = 11;
const triggerMinute = 11;
```

#### Hidden Text
```typescript
// Change trigger phrase
const secretPhrase = 'hlpfl';
```

### Disabling Easter Eggs
```typescript
// In CreativeEasterEggs.tsx
const enabledTriggers = {
  konamiCode: true,
  logoClicks: true,
  scrollDepth: true,
  timeBased: true,
  mousePattern: true,
  hiddenText: true,
  footerClick: true,
};

// Set to false to disable specific triggers
```

### Testing Easter Eggs
1. **Konami Code:** Type ↑↑↓↓←→←→BA on keyboard
2. **Logo Clicks:** Click logo 7 times quickly
3. **Scroll Depth:** Scroll to 77.7% of page
4. **Time-Based:** Visit at 11:11 AM/PM
5. **Mouse Pattern:** Draw a circle with mouse
6. **Hidden Text:** Type "hlpfl" anywhere
7. **Footer Click:** Double-click footer

---

## 🚀 DEPLOYMENT PROCESS

### Automatic Deployment
The site automatically deploys when you push to the `main` branch on GitHub.

### Step-by-Step Deployment

#### 1. Make Your Changes
Edit files locally or on GitHub web interface

#### 2. Commit Changes
```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "Add new release: Reflections EP"

# Push to GitHub
git push origin main
```

#### 3. Monitor Deployment
1. Go to GitHub repository
2. Click "Actions" tab
3. Watch deployment progress
4. Deployment typically takes 2-3 minutes

#### 4. Verify Live Site
1. Visit https://hlpfl.org
2. Check your changes are live
3. Test functionality
4. Clear browser cache if needed (Cmd+Shift+R)

### Deployment Checklist
- [ ] Changes tested locally (if possible)
- [ ] JSON syntax validated
- [ ] Images optimized and uploaded
- [ ] Commit message is descriptive
- [ ] No sensitive information committed
- [ ] Deployment successful in GitHub Actions
- [ ] Live site verified
- [ ] No console errors

### Rollback Procedure
If something goes wrong:

```bash
# View commit history
git log --oneline

# Revert to previous commit
git revert HEAD

# Or reset to specific commit
git reset --hard COMMIT_HASH

# Force push (use with caution)
git push origin main --force
```

---

## 🔧 COMMON TASKS

### Task 1: Add a New Single
```bash
# 1. Add cover art
cp ~/Downloads/cover.jpg public/images/releases/alki-new-single.jpg

# 2. Edit releases.json
# Add new release object (see example above)

# 3. Commit and push
git add .
git commit -m "Add new single: Track Name"
git push origin main
```

### Task 2: Update Streaming Links
```json
// In releases.json, find your release and update:
"streamingLinks": {
  "spotify": "NEW_URL",
  "appleMusic": "NEW_URL"
}
```

### Task 3: Feature a Release on Homepage
```json
// In releases.json, set:
"featured": true
```

### Task 4: Add Team Member
```bash
# 1. Add photo
cp ~/Downloads/photo.jpg public/images/team/john-doe.jpg

# 2. Edit team.json
# Add new team member object

# 3. Commit and push
git add .
git commit -m "Add team member: John Doe"
git push origin main
```

### Task 5: Update Bio
```json
// In team.json, find member and update:
"bio": "New biography text..."
```

### Task 6: Change Homepage Hero Text
```typescript
// In app/page.tsx, update:
<h1>New Headline</h1>
<p>New description</p>
```

### Task 7: Add Social Media Link
```json
// In team.json, add to social object:
"social": {
  "twitter": "https://twitter.com/username",
  "instagram": "https://instagram.com/username",
  "tiktok": "https://tiktok.com/@username"  // new
}
```

### Task 8: Hide a Release Temporarily
```json
// In releases.json, set:
"hidden": true
```

### Task 9: Reorder Team Members
```json
// In team.json, set order field:
"order": 1  // Lower numbers appear first
```

### Task 10: Update Site Metadata
```typescript
// In app/layout.tsx:
export const metadata = {
  title: 'New Title',
  description: 'New description',
}
```

---

## 🔍 TROUBLESHOOTING

### Issue: Changes Not Appearing on Live Site

**Solutions:**
1. **Clear browser cache:** Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
2. **Check deployment status:** GitHub → Actions tab
3. **Wait 2-3 minutes:** Deployment takes time
4. **Verify commit pushed:** Check GitHub repository
5. **Check for errors:** Look at deployment logs

### Issue: JSON Syntax Error

**Symptoms:**
- Deployment fails
- Site shows error
- Build fails in GitHub Actions

**Solutions:**
1. **Validate JSON:** Use https://jsonlint.com
2. **Check for:**
   - Missing commas
   - Extra commas (after last item)
   - Unclosed brackets/braces
   - Unescaped quotes in strings
3. **Common mistakes:**
   ```json
   // ❌ Wrong - extra comma
   {
     "title": "Track",
     "artist": "Alki",
   }
   
   // ✅ Correct
   {
     "title": "Track",
     "artist": "Alki"
   }
   ```

### Issue: Image Not Displaying

**Solutions:**
1. **Check file path:** Must start with `/images/`
2. **Verify file exists:** Look in `public/images/` folder
3. **Check file name:** Must match exactly (case-sensitive)
4. **Optimize image:** Ensure file size under 500KB
5. **Clear cache:** Hard refresh browser

### Issue: Streaming Link Not Working

**Solutions:**
1. **Verify URL:** Copy-paste directly from platform
2. **Check format:** Must be complete URL with `https://`
3. **Test link:** Click link in browser to verify
4. **Update if changed:** Platforms sometimes change URLs

### Issue: Easter Egg Not Triggering

**Solutions:**
1. **Check trigger conditions:** Review Easter Eggs Guide
2. **Verify audio file:** Ensure file exists in `/public/audio/unreleased/`
3. **Test in different browser:** Some features may be browser-specific
4. **Check console:** Look for JavaScript errors
5. **Verify enabled:** Check `enabledTriggers` in code

### Issue: Deployment Failed

**Solutions:**
1. **Check GitHub Actions:** View error logs
2. **Verify JSON syntax:** Use validator
3. **Check file paths:** Ensure all referenced files exist
4. **Review commit:** Look for obvious errors
5. **Revert if needed:** Use git revert

### Issue: Site Performance Slow

**Solutions:**
1. **Optimize images:** Compress large files
2. **Check file sizes:** Keep under recommended limits
3. **Clear cache:** Browser and CDN cache
4. **Review recent changes:** Identify what changed
5. **Check Performance Dashboard:** Ctrl+Shift+P

### Issue: Search Not Finding Content

**Solutions:**
1. **Verify data format:** Check releases.json and team.json
2. **Clear browser cache:** Hard refresh
3. **Check search terms:** Try different keywords
4. **Rebuild search index:** Redeploy site

### Issue: Mobile Display Issues

**Solutions:**
1. **Test on actual device:** Emulators may differ
2. **Check responsive design:** Use browser dev tools
3. **Verify image sizes:** Ensure mobile-optimized
4. **Test different browsers:** Safari, Chrome, Firefox
5. **Check viewport settings:** Verify meta tags

---

## 📚 ADDITIONAL RESOURCES

### JSON Validators
- https://jsonlint.com
- https://jsonformatter.org
- VS Code JSON validation (built-in)

### Image Optimization
- https://tinypng.com
- https://squoosh.app
- https://imageoptim.com

### Git Resources
- https://git-scm.com/doc
- https://github.com/git-guides
- https://learngitbranching.js.org

### Next.js Documentation
- https://nextjs.org/docs
- https://nextjs.org/learn

### Testing Tools
- Chrome DevTools
- Firefox Developer Tools
- Safari Web Inspector

---

## ✅ EDITING CHECKLIST

Before deploying changes:

- [ ] All JSON syntax validated
- [ ] Images optimized (under size limits)
- [ ] File paths correct and verified
- [ ] Streaming links tested
- [ ] Text proofread for typos
- [ ] Changes tested locally (if possible)
- [ ] Commit message is descriptive
- [ ] No sensitive data included
- [ ] Backup of original data saved
- [ ] Team notified of changes (if needed)

---

## 🎉 CONCLUSION

This editing guide covers all common content management tasks for the HLPFL Records website. For technical development tasks, refer to the Developer Guide.

**Remember:**
- Always validate JSON before committing
- Optimize images before uploading
- Test changes when possible
- Keep backups of original data
- Document significant changes

**Need Help?**
- Check the Troubleshooting section
- Review the Complete Site Guide
- Consult the Developer Guide
- Check GitHub Issues

**Last Updated:** 2024
**Version:** 2.0.0