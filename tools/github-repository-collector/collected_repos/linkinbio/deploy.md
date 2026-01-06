# Deploy Your Link-in-Bio with Cloudflare Pages

## Step 1: Push to GitHub

1. Create a new repository on GitHub
2. Push your code to the repository:

```bash
git init
git add .
git commit -m "Initial commit - Link-in-Bio"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

## Step 2: Deploy to Cloudflare Pages

1. **Sign up/login to Cloudflare Dashboard** (https://dash.cloudflare.com)
2. **Navigate to Pages** in the sidebar
3. **Click "Create a project"**
4. **Connect to Git**
    - Select GitHub
    - Authorize Cloudflare to access your repos
    - Select your repository
5. **Configure Build Settings**:
    - **Framework preset**: None
    - **Build command**: Leave empty (static site)
    - **Build output directory**: /
    - **Root directory**: /
6. **Environment Variables** (optional):
    - Add any API keys or configuration needed
7. **Click "Save and Deploy"**

## Step 3: Custom Domain (Optional)

1. Go to your Pages project settings
2. Click "Custom domains"
3. Add your domain (e.g., links.yourdomain.com)
4. Update your DNS records:
    ```
    CNAME links.yourdomain.com -> your-project.pages.dev
    ```

## Step 4: Enable Analytics (Optional)

Cloudflare Pages includes built-in analytics. To enable:

1. Go to your project dashboard
2. Click "Analytics" tab
3. View visitor statistics, popular pages, and more

## Step 5: Custom URL Shortener (Optional)

To create branded short links:

1. Register a domain for short links
2. Create worker script to redirect
3. Configure DNS to point to Cloudflare Workers

## Automatic Deployments

Your site will automatically redeploy when you:

- Push to main branch
- Open/merge pull requests
- Make changes in the Cloudflare dashboard

## Environment-Specific Configurations

For different environments, you can use:

- Environment variables in Cloudflare Pages
- Multiple branches (dev, staging, production)
- Preview deployments for pull requests

## Performance Optimization

Cloudflare Pages automatically:

- Minifies HTML, CSS, and JavaScript
- Optimizes images
- Enables HTTP/3
- Provides DDoS protection
- Serves from global CDN

## Custom 404 Page

Create a `404.html` file in your root directory to customize the error page.
