# Job Application Tracker

A full-stack CRUD application for tracking job applications built with Next.js and Supabase.

## Features

- User authentication (login/signup)
- CRUD operations for job applications
- Filter jobs by status
- Search functionality
- Notes and date tracking
- Statistics dashboard

## Tech Stack

- Next.js 16+ (App Router)
- TypeScript
- Tailwind CSS
- Supabase (PostgreSQL, Authentication)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Fill in your Supabase credentials in `.env.local`.

3. Set up the database:
- Create a Supabase project
- Run the SQL migration to create the `jobs` table (see `supabase/migrations/`)

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

