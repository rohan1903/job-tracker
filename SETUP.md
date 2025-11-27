# 🚀 Setup Instructions

Complete guide to setting up the Job Application Tracker on your local machine. This guide covers installation for Windows, macOS, and Linux.

## 📋 Prerequisites

Before you begin, you'll need:

- **Node.js** version 18.0 or higher (LTS version recommended)
- **npm** (comes bundled with Node.js) or **yarn**
- A code editor (VS Code, WebStorm, etc.)
- A **Supabase account** (free tier is sufficient) - [Sign up here](https://supabase.com)

## 🪟 Windows Setup

### Step 1: Install Node.js

**Option A: Official Installer (Recommended)**
1. Visit [nodejs.org](https://nodejs.org/)
2. Download the LTS (Long Term Support) version
3. Run the installer and follow the setup wizard
4. Verify installation by opening PowerShell or Command Prompt:
   ```powershell
   node --version
   npm --version
   ```

**Option B: Using Chocolatey**
```powershell
choco install nodejs-lts
```

**Option C: Using winget**
```powershell
winget install OpenJS.NodeJS.LTS
```

### Step 2: Clone and Setup Project

1. **Clone the repository:**
   ```powershell
   git clone https://github.com/yourusername/job-tracker.git
   cd job-tracker
   ```

2. **Install dependencies:**
   ```powershell
   npm install
   ```

3. **Create environment file:**
   ```powershell
   # Create .env.local file
   New-Item -Path .env.local -ItemType File
   ```
   
   Or use any text editor to create `.env.local` in the project root.

4. **Add Supabase credentials** (see [ENV_SETUP.md](./ENV_SETUP.md) for details):
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Start the development server:**
   ```powershell
   npm run dev
   ```

6. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🍎 macOS Setup

### Step 1: Install Node.js

**Option A: Official Installer (Recommended)**
1. Visit [nodejs.org](https://nodejs.org/)
2. Download the macOS installer (.pkg file)
3. Run the installer and follow the instructions
4. Verify installation:
   ```bash
   node --version
   npm --version
   ```

**Option B: Using Homebrew (Recommended for developers)**
```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node
```

**Option C: Using nvm (Node Version Manager)**
```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart terminal or run:
source ~/.zshrc  # or ~/.bash_profile

# Install Node.js LTS
nvm install --lts
nvm use --lts
```

### Step 2: Clone and Setup Project

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/job-tracker.git
   cd job-tracker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.local.example .env.local
   # Or create manually:
   touch .env.local
   ```

4. **Add Supabase credentials** (see [ENV_SETUP.md](./ENV_SETUP.md) for details):
   ```bash
   nano .env.local
   # or use your preferred editor (VS Code, vim, etc.)
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🐧 Linux (Ubuntu/Debian) Setup

### Step 1: Install Node.js

**Option A: Using NodeSource Repository (Recommended)**
```bash
# Update package index
sudo apt update

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

**Option B: Using nvm (Node Version Manager)**
```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart terminal or run:
source ~/.bashrc

# Install Node.js LTS
nvm install --lts
nvm use --lts

# Verify installation
node --version
npm --version
```

**Option C: Using Snap**
```bash
sudo snap install node --classic
```

### Step 2: Install Git (if not already installed)
```bash
sudo apt update
sudo apt install git
```

### Step 3: Clone and Setup Project

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/job-tracker.git
   cd job-tracker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.local.example .env.local
   # Or create manually:
   touch .env.local
   ```

4. **Add Supabase credentials** (see [ENV_SETUP.md](./ENV_SETUP.md) for details):
   ```bash
   nano .env.local
   # or use your preferred editor
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Setup

After setting up Node.js and installing dependencies, you need to configure your Supabase database:

1. **Create a Supabase project:**
   - Go to [supabase.com](https://supabase.com)
   - Sign up or log in
   - Click "New Project"
   - Fill in project details and wait for provisioning

2. **Run the database migration:**
   - In your Supabase dashboard, go to **SQL Editor**
   - Click **New Query**
   - Copy the contents of `supabase/migrations/001_create_jobs_table.sql`
   - Paste into the SQL editor
   - Click **Run** (or press `Ctrl+Enter` / `Cmd+Enter`)

3. **Get your API credentials:**
   - Go to **Project Settings** → **API**
   - Copy the **Project URL** and **anon public** key
   - Add them to your `.env.local` file

> 📖 For detailed environment variable setup, see [ENV_SETUP.md](./ENV_SETUP.md)

## ✅ Verification

After completing the setup, verify everything is working:

1. **Check Node.js installation:**
   ```bash
   node --version  # Should show v18.0.0 or higher
   npm --version   # Should show 9.0.0 or higher
   ```

2. **Check project dependencies:**
   ```bash
   npm list --depth=0
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Verify the application:**
   - Open [http://localhost:3000](http://localhost:3000)
   - You should see the landing page
   - Try signing up for a new account
   - Create your first job application

## 🐛 Troubleshooting

### Port 3000 Already in Use

If you get an error that port 3000 is already in use:

**Windows:**
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

**macOS/Linux:**
```bash
# Find process using port 3000
lsof -ti:3000

# Kill the process
kill -9 $(lsof -ti:3000)

# Or use a different port
npm run dev -- -p 3001
```

### npm Install Fails

If `npm install` fails:

1. **Clear npm cache:**
   ```bash
   npm cache clean --force
   ```

2. **Delete node_modules and package-lock.json:**
   ```bash
   rm -rf node_modules package-lock.json  # macOS/Linux
   # or
   rmdir /s node_modules & del package-lock.json  # Windows
   ```

3. **Reinstall:**
   ```bash
   npm install
   ```

### Module Not Found Errors

If you encounter module not found errors:

1. Ensure you're in the project root directory
2. Run `npm install` again
3. Check that `node_modules` folder exists
4. Restart your development server

### Environment Variables Not Loading

1. Ensure `.env.local` is in the root directory (same level as `package.json`)
2. Check for typos in variable names
3. Restart the development server after changing `.env.local`
4. Ensure there are no spaces around the `=` sign in `.env.local`

### Database Connection Issues

1. Verify your Supabase credentials in `.env.local`
2. Check that your Supabase project is active
3. Ensure the database migration has been run
4. Check Supabase dashboard for any service issues

## 📚 Next Steps

Once your setup is complete:

1. ✅ Read the [README.md](./README.md) for project overview
2. ✅ Check [ENV_SETUP.md](./ENV_SETUP.md) for environment configuration details
3. ✅ Start building and customizing the application
4. ✅ Explore the codebase structure

## 💡 Tips

- **Use VS Code** with the recommended extensions for the best development experience
- **Keep your dependencies updated** by running `npm outdated` periodically
- **Use Git** to track your changes and create branches for new features
- **Check the browser console** for any runtime errors
- **Use React DevTools** browser extension for debugging

## 🆘 Need Help?

If you're still experiencing issues:

1. Check the [GitHub Issues](https://github.com/yourusername/job-tracker/issues)
2. Review the [Supabase Documentation](https://supabase.com/docs)
3. Check the [Next.js Documentation](https://nextjs.org/docs)
4. Open a new issue with details about your problem

---

Happy coding! 🎉
