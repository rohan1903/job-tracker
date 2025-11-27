# 🔐 Environment Variables Setup Guide

Complete guide to configuring environment variables for the Job Application Tracker application. This document covers everything you need to know about setting up your Supabase credentials and environment configuration.

## 📋 Overview

The application requires two environment variables to connect to your Supabase backend:

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous/public API key

> ⚠️ **Important:** The `NEXT_PUBLIC_` prefix means these variables are exposed to the browser. Never use your service role key here - only the anon/public key is safe for client-side use.

## 🚀 Quick Start

### Step 1: Create the Environment File

Create a `.env.local` file in the root directory of your project (same level as `package.json`).

**Windows (PowerShell):**
```powershell
New-Item -Path .env.local -ItemType File
```

**Windows (Command Prompt):**
```cmd
type nul > .env.local
```

**macOS/Linux:**
```bash
touch .env.local
```

Or simply create the file using any text editor.

### Step 2: Add Your Supabase Credentials

Open `.env.local` and add the following:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace the placeholder values with your actual Supabase credentials (see below for how to get them).

## 🔑 Getting Your Supabase Credentials

### Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up for a free account (or log in if you already have one)
3. Click **"New Project"**
4. Fill in the project details:
   - **Name:** Choose a name for your project (e.g., "job-tracker")
   - **Database Password:** Create a strong password (save this securely!)
   - **Region:** Choose the region closest to you
   - **Pricing Plan:** Select "Free" (perfect for development)
5. Click **"Create new project"**
6. Wait 1-2 minutes for your project to be provisioned

### Step 2: Get Your API Credentials

1. In your Supabase dashboard, click on your project
2. Navigate to **Settings** (gear icon in the left sidebar)
3. Click on **API** in the settings menu
4. You'll see two important values:

   **Project URL:**
   ```
   https://xxxxxxxxxxxxx.supabase.co
   ```
   Copy this value - this is your `NEXT_PUBLIC_SUPABASE_URL`

   **anon public key:**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHh4eHh4eHh4eHh4eHh4eHgiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0NTk5ODk5OSwiZXhwIjoxOTYxNTc0OTk5fQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
   Copy this value - this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Step 3: Add Credentials to .env.local

Open your `.env.local` file and paste the credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHh4eHh4eHh4eHh4eHh4eHgiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0NTk5ODk5OSwiZXhwIjoxOTYxNTc0OTk5fQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

> 💡 **Tip:** Make sure there are no spaces around the `=` sign and no quotes around the values (unless the value itself contains spaces, which shouldn't be the case here).

## 📝 Complete .env.local Example

Here's what a complete `.env.local` file should look like:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0NTk5ODk5OSwiZXhwIjoxOTYxNTc0OTk5fQ.example_signature_here
```

## 🔒 Security Best Practices

### ✅ DO:

- ✅ Use the **anon/public key** (safe for client-side)
- ✅ Keep `.env.local` in your `.gitignore` (already configured)
- ✅ Use different Supabase projects for development and production
- ✅ Rotate your keys if they're ever exposed
- ✅ Use environment-specific files (`.env.local`, `.env.production`)

### ❌ DON'T:

- ❌ **Never** commit `.env.local` to version control
- ❌ **Never** use the `service_role` key in client-side code
- ❌ **Never** share your API keys publicly
- ❌ **Never** hardcode credentials in your source code
- ❌ **Never** use production keys in development

## 🧪 Testing Without Real Credentials

If you want to explore the UI without setting up Supabase immediately, the application includes placeholder defaults. However, you'll need real credentials for full functionality.

**With placeholder values:**
- ✅ UI will load and display
- ✅ Navigation will work
- ❌ Authentication won't work
- ❌ Database operations will fail
- ❌ Forms will show errors

**To use placeholders temporarily:**

```env
NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder_key
```

> ⚠️ **Note:** While the app will run with placeholders, you'll need real Supabase credentials to use authentication and database features.

## 🔄 Environment Files in Next.js

Next.js supports multiple environment files with different priorities:

1. `.env.local` - **Local overrides** (highest priority, not committed to git)
2. `.env.development` - Development environment
3. `.env.production` - Production environment
4. `.env` - Default values (lowest priority)

For this project, `.env.local` is sufficient for local development.

## 🐛 Troubleshooting

### Environment Variables Not Loading

**Problem:** Changes to `.env.local` aren't being picked up.

**Solutions:**
1. **Restart the development server** - Next.js only loads env vars on startup
   ```bash
   # Stop the server (Ctrl+C) and restart
   npm run dev
   ```

2. **Check file location** - Ensure `.env.local` is in the project root (same directory as `package.json`)

3. **Check file name** - Must be exactly `.env.local` (not `env.local` or `.env.local.txt`)

4. **Check syntax** - No spaces around `=`, no quotes unless needed:
   ```env
   # ✅ Correct
   NEXT_PUBLIC_SUPABASE_URL=https://example.supabase.co
   
   # ❌ Wrong
   NEXT_PUBLIC_SUPABASE_URL = https://example.supabase.co
   NEXT_PUBLIC_SUPABASE_URL="https://example.supabase.co"
   ```

### Invalid Credentials Error

**Problem:** Getting authentication or connection errors.

**Solutions:**
1. **Verify credentials** - Double-check you copied the correct values from Supabase
2. **Check for typos** - Ensure no extra spaces or characters
3. **Verify project is active** - Check your Supabase dashboard
4. **Check API key type** - Make sure you're using the `anon` key, not `service_role`

### Cannot Find Module Errors

**Problem:** Getting module not found errors related to environment variables.

**Solutions:**
1. Ensure `.env.local` exists in the project root
2. Restart your development server
3. Clear Next.js cache:
   ```bash
   rm -rf .next  # macOS/Linux
   rmdir /s .next  # Windows
   npm run dev
   ```

## 📊 Verifying Your Setup

After configuring your environment variables, verify everything works:

1. **Check the file exists:**
   ```bash
   # macOS/Linux
   ls -la .env.local
   
   # Windows
   dir .env.local
   ```

2. **Verify variables are loaded** (in your browser console after starting the app):
   ```javascript
   console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)
   ```

3. **Test authentication:**
   - Start the dev server: `npm run dev`
   - Navigate to the signup page
   - Try creating an account
   - If successful, your credentials are working!

## 🌍 Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. **Add environment variables in your hosting platform:**
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Environment Variables
   - Other platforms: Check their documentation

2. **Use production Supabase project:**
   - Create a separate Supabase project for production
   - Use production credentials in your hosting platform
   - Never use development credentials in production

3. **Set environment-specific values:**
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-prod-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-prod-anon-key
   ```

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Supabase API Keys Guide](https://supabase.com/docs/guides/api/api-keys)

## ✅ Checklist

Before proceeding, ensure you have:

- [ ] Created a Supabase account
- [ ] Created a Supabase project
- [ ] Run the database migration (see [SETUP.md](./SETUP.md))
- [ ] Created `.env.local` file
- [ ] Added `NEXT_PUBLIC_SUPABASE_URL`
- [ ] Added `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Verified `.env.local` is in `.gitignore`
- [ ] Restarted your development server
- [ ] Tested authentication (signup/login)

---

Once your environment variables are configured, you're ready to start using the application! 🎉

For general setup instructions, see [SETUP.md](./SETUP.md).
