# Vercel Deployment Guide

## Steps to Deploy

### 1. Deploy to Vercel
```bash
# Make sure you're in the api directory
cd D:\Projects\REACT\Blogify\api

# Deploy to Vercel
vercel --prod
```

### 2. Set Environment Variables
In your Vercel dashboard, add these environment variables:

- `MONGODB_CONN` = Your MongoDB connection string
- `JWT_SECRET` = Your JWT secret (same as in .env file)
- `FRONTEND_URL` = Your frontend URL (e.g., https://your-frontend.vercel.app)
- `NODE_ENV` = production
- `VERCEL` = 1

### 3. Test the Deployment
After deployment:
1. Test the health endpoint: `https://your-api-url.vercel.app/health`
2. Test login with your frontend
3. Test commenting functionality

## Cookie Configuration
The app now automatically detects Vercel environment and sets proper cookie settings:
- `secure: true` (HTTPS required)
- `sameSite: "none"` (for cross-origin requests)
- `httpOnly: true` (security)

## Troubleshooting

### If commenting still doesn't work:
1. Check browser Network tab for 403 errors
2. Verify all environment variables are set in Vercel
3. Make sure frontend URL is in CORS allowed origins
4. Test login/logout to get fresh tokens

### CORS Issues:
Add your frontend URL to the `allowedOrigins` array in `index.js` if needed.
