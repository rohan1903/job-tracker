# 🔧 Vercel "Failed to Fetch" Troubleshooting Guide

If you're seeing "Failed to fetch" errors when trying to sign in or sign up, follow these steps in order:

## ✅ Step 1: Verify Environment Variables in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Verify these two variables exist:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Make sure they're enabled for **Production**, **Preview**, and **Development**
6. **Important:** After adding/updating variables, you MUST redeploy:
   - Go to **Deployments** tab
   - Click the three dots (⋯) on the latest deployment
   - Click **"Redeploy"**

## ✅ Step 2: Configure Supabase Redirect URLs

This is the **most common cause** of "failed to fetch" errors!

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Authentication** → **URL Configuration**
4. Set **Site URL** to your Vercel URL:
   ```
   https://your-app-name.vercel.app
   ```
5. Add to **Redirect URLs** (one per line):
   ```
   https://your-app-name.vercel.app/**
   https://your-app-name.vercel.app/dashboard
   ```
6. Click **"Save"**
7. Try signing in/signing up again

## ✅ Step 3: Verify Supabase Project is Active

1. Go to your Supabase Dashboard
2. Check if your project shows as "Active"
3. If it's paused, click **"Restore project"** and wait a few minutes

## ✅ Step 4: Check Environment Variable Values

Make sure your environment variables are correct:

1. In Vercel, go to Settings → Environment Variables
2. Click on each variable to view its value
3. Verify:
   - `NEXT_PUBLIC_SUPABASE_URL` starts with `https://` and ends with `.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` is a long JWT token (starts with `eyJ...`)
4. Get the correct values from:
   - Supabase Dashboard → Settings → API
   - Copy **Project URL** → use for `NEXT_PUBLIC_SUPABASE_URL`
   - Copy **anon public** key → use for `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## ✅ Step 5: Check Browser Console

1. Open your Vercel deployment in a browser
2. Open Developer Tools (F12 or Right-click → Inspect)
3. Go to **Console** tab
4. Try to sign in/sign up
5. Look for error messages - they will tell you exactly what's wrong

## ✅ Step 6: Check Vercel Function Logs

1. Go to Vercel Dashboard → Your Project → **Deployments**
2. Click on the latest deployment
3. Click **"View Function Logs"** or **"View Build Logs"**
4. Look for any errors related to Supabase or environment variables

## ✅ Step 7: Test Locally First

Before deploying, test that everything works locally:

1. Make sure your `.env.local` file has the correct values
2. Run `npm run dev`
3. Test sign up and sign in locally
4. If it works locally but not on Vercel, the issue is with Vercel configuration

## Common Mistakes

❌ **Don't** include quotes around environment variable values in Vercel
❌ **Don't** forget to redeploy after adding environment variables
❌ **Don't** use the `service_role` key (use `anon` key only)
❌ **Don't** forget to add redirect URLs in Supabase
❌ **Don't** use `localhost` URLs in Supabase redirect URLs for production

## Still Not Working?

If you've tried all the above steps:

1. **Double-check your Supabase credentials:**
   - Go to Supabase Dashboard → Settings → API
   - Copy the values again and update them in Vercel
   - Redeploy

2. **Check Supabase logs:**
   - Go to Supabase Dashboard → Logs
   - Look for authentication errors

3. **Verify your database is set up:**
   - Make sure you've run the migration to create the `jobs` table
   - Check that RLS policies are enabled

4. **Try a fresh deployment:**
   - In Vercel, go to Deployments
   - Click "Redeploy" on the latest deployment
   - Or push a new commit to trigger a fresh build

## Quick Checklist

- [ ] Environment variables set in Vercel (both variables)
- [ ] Variables enabled for all environments (Production, Preview, Development)
- [ ] Redeployed after adding/updating variables
- [ ] Supabase redirect URLs configured with Vercel URL
- [ ] Supabase project is active (not paused)
- [ ] Environment variable values are correct (no typos)
- [ ] Tested locally and it works

If all checkboxes are checked and it still doesn't work, check the browser console and Vercel logs for specific error messages.
