# ⚡ Quick Fix: Add Environment Variables to Vercel

## The Problem
Vercel says "no environment variables set" - this causes the "failed to fetch" error.

## The Solution (3 Steps)

### Step 1: Get Your Supabase Credentials

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click **Settings** (gear icon) → **API**
4. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long token starting with `eyJ...`)

### Step 2: Add to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click **Settings** → **Environment Variables**
4. Click **"Add New"** button

**Add Variable 1:**
- **Key:** `NEXT_PUBLIC_SUPABASE_URL`
- **Value:** Paste your Supabase Project URL
- **Environments:** ✅ Production ✅ Preview ✅ Development
- Click **Save**

**Add Variable 2:**
- **Key:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value:** Paste your Supabase anon public key
- **Environments:** ✅ Production ✅ Preview ✅ Development
- Click **Save**

### Step 3: Redeploy (CRITICAL!)

1. Go to **Deployments** tab
2. Find the latest deployment
3. Click the **three dots (⋯)** menu
4. Click **"Redeploy"**
5. Wait for deployment to finish

## ✅ Done!

After redeployment, try signing in/signing up again. The error should be fixed!

## Still Not Working?

- Make sure you selected all 3 environments (Production, Preview, Development)
- Make sure you clicked "Redeploy" after adding variables
- Check that values don't have extra spaces or quotes
- Verify values are correct in Supabase Dashboard → Settings → API
