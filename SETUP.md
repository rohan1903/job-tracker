# 🚀 Setup Instructions

Platform-specific setup guide for Windows, macOS, and Linux.

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account ([Sign up](https://supabase.com))

## 🪟 Windows

### Install Node.js

**Option A: Official Installer**
1. Download LTS from [nodejs.org](https://nodejs.org/)
2. Run installer
3. Verify: `node --version` and `npm --version`

**Option B: Package Managers**
```powershell
# Chocolatey
choco install nodejs-lts

# winget
winget install OpenJS.NodeJS.LTS
```

### Setup Project

```powershell
git clone https://github.com/yourusername/job-tracker.git
cd job-tracker
npm install

# Create .env.local (or use text editor)
New-Item -Path .env.local -ItemType File

# Add Supabase credentials (see ENV_SETUP.md)
# Then start dev server
npm run dev
```

## 🍎 macOS

### Install Node.js

**Option A: Official Installer**
1. Download from [nodejs.org](https://nodejs.org/)
2. Run installer
3. Verify: `node --version` and `npm --version`

**Option B: Homebrew**
```bash
brew install node
```

**Option C: nvm**
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.zshrc  # or ~/.bash_profile
nvm install --lts
nvm use --lts
```

### Setup Project

```bash
git clone https://github.com/yourusername/job-tracker.git
cd job-tracker
npm install

# Create .env.local
cp .env.local.example .env.local
# Or: touch .env.local

# Add Supabase credentials (see ENV_SETUP.md)
# Then start dev server
npm run dev
```

## 🐧 Linux (Ubuntu/Debian)

### Install Node.js

**Option A: NodeSource Repository**
```bash
sudo apt update
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Option B: nvm**
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install --lts
nvm use --lts
```

**Option C: Snap**
```bash
sudo snap install node --classic
```

### Setup Project

```bash
# Install Git if needed
sudo apt update && sudo apt install git

git clone https://github.com/yourusername/job-tracker.git
cd job-tracker
npm install

# Create .env.local
cp .env.local.example .env.local
# Or: touch .env.local

# Add Supabase credentials (see ENV_SETUP.md)
# Then start dev server
npm run dev
```

## 🗄️ Database Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run migration in SQL Editor:
   - Copy contents of `supabase/migrations/001_create_jobs_table.sql`
   - Paste and run in SQL Editor
3. Get API credentials:
   - Go to **Project Settings** → **API**
   - Copy **Project URL** and **anon public** key
   - Add to `.env.local` (see [ENV_SETUP.md](./ENV_SETUP.md))

## ✅ Verification

```bash
node --version  # Should be v18.0.0+
npm --version
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and test signup/login.

## 🐛 Troubleshooting

### Port 3000 Already in Use

**Windows:**
```powershell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**macOS/Linux:**
```bash
kill -9 $(lsof -ti:3000)
# Or use different port: npm run dev -- -p 3001
```

### npm Install Fails

```bash
npm cache clean --force
rm -rf node_modules package-lock.json  # macOS/Linux
# Windows: rmdir /s node_modules & del package-lock.json
npm install
```

### Environment Variables Not Loading

- Ensure `.env.local` is in project root
- No spaces around `=` sign
- Restart dev server after changes

### Database Connection Issues

- Verify Supabase credentials in `.env.local`
- Ensure migration has been run
- Check Supabase project is active




