# 🔐 Environment Variables Setup

Configure Supabase credentials for the Job Application Tracker.

## Required Variables

- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous/public API key

> ⚠️ **Important:** Only use the `anon` key, never the `service_role` key (it's exposed to the browser).

## Quick Start

1. **Create `.env.local` in project root:**
   ```bash
   # Windows PowerShell
   New-Item -Path .env.local -ItemType File
   
   # macOS/Linux
   touch .env.local
   ```

2. **Add Supabase credentials:**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## Getting Supabase Credentials

1. **Create a Supabase project:**
   - Go to [supabase.com](https://supabase.com)
   - Sign up/login and click "New Project"
   - Fill in details (name, password, region)
   - Select "Free" plan
   - Wait for provisioning (1-2 minutes)

2. **Get API credentials:**
   - In Supabase dashboard, go to **Settings** → **API**
   - Copy **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - Copy **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. **Add to `.env.local`:**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
   
   > 💡 No spaces around `=` and no quotes needed.

## Example .env.local

```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Security

**DO:**
- Use `anon` key only (safe for client-side)
- Keep `.env.local` in `.gitignore`
- Use separate projects for dev/production

**DON'T:**
- Commit `.env.local` to git
- Use `service_role` key in client code
- Share API keys publicly
- Hardcode credentials

## Troubleshooting

### Variables Not Loading
- Restart dev server (Next.js loads env vars on startup)
- Ensure `.env.local` is in project root
- Check file name is exactly `.env.local`
- No spaces around `=`, no quotes

### Invalid Credentials
- Verify values copied correctly from Supabase
- Check for typos/extra spaces
- Ensure project is active in Supabase dashboard
- Use `anon` key, not `service_role`

### Module Errors
- Ensure `.env.local` exists
- Restart dev server
- Clear Next.js cache: `rm -rf .next` (macOS/Linux) or `rmdir /s .next` (Windows)

## Verification

1. Check file exists: `ls -la .env.local` (macOS/Linux) or `dir .env.local` (Windows)
2. Test in browser console: `console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)`
3. Test authentication: Start server, try signup/login

## Production

- Add env vars in hosting platform (Vercel/Netlify settings)
- Use separate Supabase project for production
- Never use dev credentials in production

## Resources

- [Supabase Docs](https://supabase.com/docs)
- [Next.js Env Vars](https://nextjs.org/docs/basic-features/environment-variables)
