# 🔍 Debug Checklist: "Failed to Fetch" Still Not Working

Follow these steps to identify the exact issue:

## Step 1: Check Browser Console (MOST IMPORTANT)

1. Open your Vercel deployment in a browser
2. Open Developer Tools:
   - **Chrome/Edge:** Press `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
   - **Firefox:** Press `F12` or `Ctrl+Shift+K` (Windows) / `Cmd+Option+K` (Mac)
3. Go to the **Console** tab
4. Try to sign in or sign up
5. **Look for error messages** - they will tell you exactly what's wrong

**What to look for:**
- Red error messages
- Messages about "CORS"
- Messages about "network"
- Messages about environment variables
- The console.log messages we added (should show Supabase URL)

**Share the exact error message you see!**

## Step 2: Verify Environment Variables Are Actually Loaded

After opening the browser console, you should see:
```
Supabase URL: https://xxxxx.supabase.co...
Supabase Key: eyJ...
```

**If you see "NOT SET":**
- Environment variables are not being loaded
- Go to Vercel → Settings → Environment Variables
- Make sure they're set for **Production** environment
- **Redeploy** after adding/updating

## Step 3: Double-Check Vercel Environment Variables

1. Go to Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. Verify both variables exist:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Click on each variable to see its value
4. Verify:
   - URL starts with `https://` and ends with `.supabase.co`
   - Key is a long JWT token (starts with `eyJ...`)
   - No extra spaces or quotes
5. Make sure they're enabled for **Production** (and Preview/Development if needed)

## Step 4: Verify You Redeployed

**CRITICAL:** After adding environment variables, you MUST redeploy:

1. Go to Vercel Dashboard → **Deployments** tab
2. Find the latest deployment
3. Click the **three dots (⋯)** menu
4. Click **"Redeploy"**
5. Wait for it to finish

**If you didn't redeploy, the variables won't be available!**

## Step 5: Check Supabase Redirect URLs

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Authentication** → **URL Configuration**
4. Set **Site URL** to: `https://your-app.vercel.app`
5. Add to **Redirect URLs**:
   ```
   https://your-app.vercel.app/**
   https://your-app.vercel.app/dashboard
   ```
6. Click **Save**

## Step 6: Check Vercel Function Logs

1. Go to Vercel Dashboard → Your Project → **Deployments**
2. Click on the latest deployment
3. Click **"View Function Logs"** or **"View Build Logs"**
4. Look for errors related to:
   - Environment variables
   - Supabase
   - Build failures

## Step 7: Test the Supabase URL Directly

1. Copy your Supabase URL from Vercel environment variables
2. Open it in a browser: `https://your-project.supabase.co`
3. You should see a Supabase page (not an error)
4. If you get an error, your Supabase project might be paused

## Step 8: Verify Supabase Project is Active

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Check if your project shows as **"Active"**
3. If it says **"Paused"**, click **"Restore project"**
4. Wait a few minutes for it to become active

## Common Issues Found in Console

### "CORS policy" error
- **Fix:** Add your Vercel URL to Supabase redirect URLs (Step 5)

### "Environment variable not set"
- **Fix:** Add variables in Vercel and redeploy (Steps 3-4)

### "Network error" or "Failed to fetch"
- Could be CORS, redirect URLs, or Supabase project paused
- Check Steps 5 and 8

### "Invalid API key"
- **Fix:** Double-check the anon key in Vercel matches Supabase Dashboard → Settings → API

## What to Share for Help

If it's still not working, share:

1. **Browser console error** (exact message)
2. **Console.log output** (what Supabase URL shows)
3. **Vercel function logs** (any errors there)
4. **Screenshot** of Vercel environment variables (hide the actual values)

This will help identify the exact issue!
