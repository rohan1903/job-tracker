# 📋 Job Application Tracker

A full-stack web application for tracking job applications. Built with Next.js 16, TypeScript, and Supabase.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat-square&logo=typescript)
![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react)
![Supabase](https://img.shields.io/badge/Supabase-2.39-3ECF8E?style=flat-square&logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

- **Authentication** - Email/password signup and login with Supabase Auth
- **Job Management** - Create, read, update, and delete job applications
- **Tracking Fields** - Company, position, status, date, URL, salary, location, notes
- **Filtering & Search** - Filter by status and search jobs
- **Dashboard** - Statistics and analytics for your job search

## 🛠️ Tech Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Supabase** (PostgreSQL, Auth, RLS)
- **Tailwind CSS**

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Supabase account ([Sign up](https://supabase.com))

### Installation

1. **Clone and install:**
   ```bash
   git clone https://github.com/yourusername/job-tracker.git
   cd job-tracker
   npm install
   ```

2. **Set up environment variables:**
   - Create `.env.local` in the root directory
   - Add your Supabase credentials (see [ENV_SETUP.md](./ENV_SETUP.md))
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Set up database:**
   - Create a Supabase project
   - Run `supabase/migrations/001_create_jobs_table.sql` in SQL Editor

4. **Run development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
job-tracker/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Authentication routes
│   ├── (dashboard)/         # Protected dashboard routes
│   └── actions/             # Server actions
├── components/              # React components
├── lib/                     # Utilities and types
├── supabase/migrations/     # Database migrations
└── middleware.ts            # Auth middleware
```

## 🔧 Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run start` - Production server
- `npm run lint` - Run ESLint

## 📖 Documentation

- [SETUP.md](./SETUP.md) - Platform-specific setup instructions
- [ENV_SETUP.md](./ENV_SETUP.md) - Environment variables guide

## 🔒 Security

- Row Level Security (RLS) for data isolation
- Protected routes via middleware
- Secure authentication with Supabase
