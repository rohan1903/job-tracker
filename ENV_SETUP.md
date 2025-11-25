# Environment Variables Setup

To run the application, you need to create a `.env.local` file in the root directory with your Supabase credentials.

## Quick Setup

1. Create a `.env.local` file in the root directory:
   ```bash
   touch .env.local
   ```

2. Add the following content (replace with your actual Supabase credentials):
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder_key_replace_with_your_actual_key
   ```

3. To get your actual Supabase credentials:
   - Go to https://supabase.com and create a project (or use an existing one)
   - Navigate to Project Settings > API
   - Copy the "Project URL" and "anon public" key
   - Replace the placeholder values in `.env.local`

## For Development/Preview (Without Real Credentials)

If you just want to see the UI without setting up Supabase, you can use placeholder values. The app will:
- Show the login/signup pages
- Allow navigation but authentication won't work
- Display errors when trying to submit forms

The placeholder values are already set as defaults in the code, so the app should run even without `.env.local`, but it's better to create the file to avoid warnings.

