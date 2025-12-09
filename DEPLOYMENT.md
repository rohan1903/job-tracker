# 🚀 Vercel Deployment Guide

This guide will help you deploy the Job Tracker application to Vercel.

## Prerequisites

- A Vercel account ([Sign up](https://vercel.com))
- A Supabase project with the database set up
- Your Supabase credentials ready

## Step 1: Push Your Code to GitHub

1. Create a new repository on GitHub (if you haven't already)
2. Push your code:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

## Step 2: Deploy to Vercel

1. **Import your project:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

2. **Configure environment variables:**
   - In the "Configure Project" step, go to **Environment Variables**
   - Add the following variables:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

   > ⚠️ **Critical:** Make sure to add these for **Production**, **Preview**, and **Development** environments.

3. **Deploy:**
   - Click "Deploy"
   - Wait for the build to complete

## Step 3: Verify Deployment

After deployment, check:

1. **Environment variables are set:**
   - Go to your project settings → Environment Variables
   - Verify both variables are present

2. **Test the application:**
   - Visit your Vercel deployment URL
   - Try signing up/logging in
   - Create a test job application

## Common Issues & Solutions

> 💡 **Having issues?** See [VERCEL_TROUBLESHOOTING.md](./VERCEL_TROUBLESHOOTING.md) for a detailed step-by-step troubleshooting guide.

### ❌ "Failed to fetch" Error

This is the most common deployment issue. It can have several causes:

**Cause 1: Missing or incorrect environment variables in Vercel**

**Solution:**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Verify both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
3. Make sure they're added for **all environments** (Production, Preview, Development)
4. **Redeploy** after adding variables:
   - Go to Deployments tab
   - Click the three dots (⋯) on the latest deployment
   - Click "Redeploy"

**Cause 2: Supabase Redirect URLs not configured**

**Solution:**
1. Go to your Supabase Dashboard → Authentication → URL Configuration
2. Add your Vercel URL to **Site URL**: `https://your-app.vercel.app`
3. Add your Vercel URL to **Redirect URLs**: `https://your-app.vercel.app/**`
4. Click "Save"
5. Try signing in/signing up again

**Cause 3: Supabase project is paused or inactive**

**Solution:**
1. Check your Supabase Dashboard
2. If the project is paused, click "Restore project"
3. Wait for it to become active (may take a few minutes)

**Cause 4: CORS or network issues**

**Solution:**
1. Check browser console for detailed error messages
2. Verify your Supabase project URL is correct (should start with `https://`)
3. Check Vercel function logs for server-side errors

### ❌ Build Fails

**Possible causes:**
- TypeScript errors
- Missing dependencies
- Environment variable validation errors

**Solution:**
1. Check build logs in Vercel dashboard
2. Test build locally: `npm run build`
3. Fix any errors before deploying

### ❌ Authentication Not Working

**Cause:** Supabase URL or key is incorrect.

**Solution:**
1. Double-check your Supabase credentials:
   - Go to Supabase Dashboard → Settings → API
   - Copy the exact values
2. Update environment variables in Vercel
3. Redeploy

### ❌ Database Connection Issues

**Cause:** Database not set up or RLS policies blocking access.

**Solution:**
1. Verify your Supabase database has the `jobs` table
2. Check Row Level Security (RLS) policies are enabled
3. Ensure RLS policies allow authenticated users to access their own data

## Environment Variables Checklist

Before deploying, ensure you have:

- [ ] `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key
- [ ] Both variables added for Production, Preview, and Development
- [ ] No typos or extra spaces in the values
- [ ] Values don't include quotes

## Post-Deployment

1. **Update your Supabase project settings:**
   - Go to Supabase Dashboard → Authentication → URL Configuration
   - Add your Vercel URL to "Site URL"
   - Add your Vercel URL to "Redirect URLs"

2. **Test all features:**
   - Sign up / Login
   - Create, edit, delete jobs
   - Filter and search
   - Dashboard statistics

## Continuous Deployment

Vercel automatically deploys when you push to your main branch. Each push creates a new deployment.

- **Production:** Deploys from `main` branch
- **Preview:** Deploys from pull requests and other branches

## Need Help?

- Check Vercel logs: Dashboard → Your Project → Deployments → Click on deployment → View Function Logs
- Check Supabase logs: Dashboard → Logs
- Review [Vercel Documentation](https://vercel.com/docs)
- Review [Supabase Documentation](https://supabase.com/docs)
