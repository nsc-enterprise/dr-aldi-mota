# Netlify Deployment Guide

## Quick Deploy Steps

### 1. Prerequisites
- GitHub account (to push your code)
- Netlify account (free at [netlify.com](https://netlify.com))

### 2. Push Code to GitHub
```bash
git init
git add .
git commit -m "Initial commit for Netlify deployment"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 3. Deploy on Netlify

#### Option A: Via Netlify Dashboard (Recommended)
1. Go to [app.netlify.com](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub account
4. Select the `doctor-aldimir-mota` repository
5. Configure build settings:
   - **Base directory**: `doctor-aldimir-mota` (if monorepo) or leave empty
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
6. Add environment variables (click "Advanced" → "New variable"):
   - `GEMINI_API_KEY` = your_google_ai_key (optional - fallback mode works without it)
   - `NEXTAUTH_SECRET` = generate with: `openssl rand -base64 32`
   - `NEXTAUTH_URL` = https://your-site-name.netlify.app
   - Any other env vars from your `.env.local`
7. Click "Deploy site"

#### Option B: Via Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize
netlify init

# Deploy
netlify deploy --prod
```

### 4. Environment Variables Needed
Create these in Netlify Dashboard → Site Settings → Environment Variables:

```env
GEMINI_API_KEY=your_google_gemini_api_key
NEXTAUTH_SECRET=your_generated_secret
NEXTAUTH_URL=https://your-app.netlify.app
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
```

### 5. Important Notes

⚠️ **File-based Storage Limitation**
- The current JSON file storage (`src/data/citas.json`) won't persist on Netlify
- Netlify uses immutable deployments - files reset on each deploy
- **You need to migrate to a database** (Supabase, Firebase, MongoDB, etc.)

**Recommended Migration Path:**
1. **Quick Fix**: Use Netlify Blobs/KV storage
2. **Better Solution**: Migrate to Supabase (already configured in the project)
3. **Alternative**: Use Firebase Firestore or MongoDB Atlas

### 6. Domain Setup (Optional)
1. In Netlify Dashboard → Domain Settings
2. Add your custom domain (e.g., `dr-aldimir-mota.com`)
3. Configure DNS records as shown
4. SSL certificate is automatic

### 7. Continuous Deployment
Once connected to GitHub:
- Every push to `main` branch auto-deploys
- Pull requests get preview deployments
- Rollback available in Netlify dashboard

## Troubleshooting

### Build Fails
- Check Node version (needs 18+)
- Run `npm install --legacy-peer-deps` locally first
- Check build logs in Netlify dashboard

### Data Not Persisting
- Migrate from JSON file to database (see above)
- Consider Netlify Functions for serverless API

### Environment Variables Not Working
- Redeploy after adding variables
- Variable names are case-sensitive
- No quotes needed in Netlify UI

## Next Steps After Deployment
1. Test all features on production URL
2. Set up custom domain
3. Configure Google OAuth redirect URLs to include Netlify domain
4. **Migrate to database storage** (critical for production)
5. Set up analytics and monitoring
