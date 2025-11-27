# 📋 Job Application Tracker

A modern, full-stack web application for tracking job applications throughout your job search journey. Built with Next.js 16, TypeScript, and Supabase, this application provides a clean and intuitive interface to manage all your job applications in one place.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat-square&logo=typescript)
![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react)
![Supabase](https://img.shields.io/badge/Supabase-2.39-3ECF8E?style=flat-square&logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

### 🔐 Authentication
- Secure user authentication with Supabase Auth
- Email/password signup and login
- Protected routes with middleware
- Session management

### 📊 Job Management
- **Create** new job applications with detailed information
- **Read** and view all your job applications in a clean interface
- **Update** existing job applications
- **Delete** job applications
- Track multiple fields:
  - Company name
  - Position title
  - Application status (Applied, Interviewing, Offer, Rejected, Withdrawn)
  - Application date
  - Job posting URL
  - Salary range
  - Location
  - Personal notes

### 🔍 Filtering & Search
- Filter jobs by status (Applied, Interviewing, Offer, Rejected, Withdrawn)
- Search functionality to quickly find specific jobs
- Real-time filtering and search results

### 📈 Dashboard & Analytics
- Statistics dashboard showing:
  - Total applications
  - Applications by status
  - Recent activity
- Visual representation of your job search progress

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework

### Backend & Database
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Authentication service
  - Row Level Security (RLS) for data protection
- **Server Actions** - Next.js server-side data mutations

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.0 or higher ([Download](https://nodejs.org/))
- **npm** (comes with Node.js) or **yarn**
- A **Supabase account** (free tier works perfectly) - [Sign up](https://supabase.com)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/job-tracker.git
cd job-tracker
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Windows
copy .env.local.example .env.local

# macOS/Linux
cp .env.local.example .env.local
```

Then add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> 📖 **Need help getting your Supabase credentials?** See [ENV_SETUP.md](./ENV_SETUP.md) for detailed instructions.

### 4. Set Up the Database

1. Create a new project at [Supabase](https://supabase.com)
2. Go to the SQL Editor in your Supabase dashboard
3. Run the migration file located at `supabase/migrations/001_create_jobs_table.sql`

This will create:
- The `jobs` table with all necessary fields
- Indexes for optimized queries
- Row Level Security policies
- Automatic timestamp triggers

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### 6. Create Your First Account

1. Navigate to the signup page
2. Create an account with your email and password
3. Start tracking your job applications!

## 📁 Project Structure

```
job-tracker/
├── app/                      # Next.js App Router pages
│   ├── (auth)/              # Authentication routes
│   │   ├── login/
│   │   └── signup/
│   ├── (dashboard)/         # Protected dashboard routes
│   │   ├── dashboard/       # Main dashboard page
│   │   └── jobs/            # Job management pages
│   │       ├── [id]/        # Individual job view/edit
│   │       └── new/         # Create new job
│   ├── actions/             # Server actions
│   │   └── jobs.ts          # Job CRUD operations
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Landing page
├── components/              # React components
│   ├── dashboard/           # Dashboard components
│   ├── jobs/                # Job-related components
│   └── ui/                  # UI components
├── lib/                     # Utility libraries
│   ├── supabase/            # Supabase client configuration
│   └── types.ts             # TypeScript type definitions
├── supabase/
│   └── migrations/          # Database migrations
│       └── 001_create_jobs_table.sql
├── middleware.ts            # Next.js middleware for auth
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

## 🔧 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check for code issues

## 🔒 Security Features

- **Row Level Security (RLS)** - Users can only access their own job applications
- **Protected Routes** - Middleware ensures only authenticated users can access the dashboard
- **Secure Authentication** - Supabase handles password hashing and session management
- **Environment Variables** - Sensitive credentials are stored securely

## 🌐 Cross-Platform Support

This application works seamlessly on:
- ✅ Windows 10/11
- ✅ macOS
- ✅ Linux (Ubuntu, Debian, etc.)

All npm commands work identically across platforms. See [SETUP.md](./SETUP.md) for platform-specific installation instructions.

## 📖 Additional Documentation

- **[SETUP.md](./SETUP.md)** - Detailed setup instructions for different operating systems
- **[ENV_SETUP.md](./ENV_SETUP.md)** - Comprehensive guide for environment variable configuration

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Backend powered by [Supabase](https://supabase.com/)
- Icons and UI inspiration from the open-source community

## 📧 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

Made with ❤️ for job seekers everywhere
