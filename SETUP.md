# Setup Instructions

## Prerequisites

You need to have Node.js installed (version 18 or higher recommended).

### Install Node.js

**Option 1: Using nvm (Recommended)**
```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart your terminal or run:
source ~/.bashrc

# Install Node.js LTS
nvm install --lts
nvm use --lts
```

**Option 2: Using package manager (Ubuntu/Debian)**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Option 3: Download from official website**
Visit https://nodejs.org/ and download the LTS version.

## Running the Development Server

Once Node.js is installed:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables (optional for now):**
   ```bash
   cp .env.local.example .env.local
   ```
   You can add your Supabase credentials later.

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to http://localhost:3000

## Note

Without Supabase credentials, the app will show errors when trying to authenticate or access the database. However, you can still see the UI structure and styling. To fully test the application, you'll need to:

1. Create a Supabase project at https://supabase.com
2. Run the SQL migration from `supabase/migrations/001_create_jobs_table.sql` in your Supabase SQL editor
3. Add your Supabase URL and anon key to `.env.local`

