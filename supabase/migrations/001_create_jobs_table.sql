-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('applied', 'interviewing', 'offer', 'rejected', 'withdrawn')),
  applied_date DATE,
  notes TEXT,
  job_url TEXT,
  salary_range TEXT,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS jobs_user_id_idx ON jobs(user_id);
CREATE INDEX IF NOT EXISTS jobs_status_idx ON jobs(status);
CREATE INDEX IF NOT EXISTS jobs_applied_date_idx ON jobs(applied_date);

-- Enable Row Level Security
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Create policy: Users can only see their own jobs
CREATE POLICY "Users can view their own jobs"
  ON jobs
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy: Users can insert their own jobs
CREATE POLICY "Users can insert their own jobs"
  ON jobs
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policy: Users can update their own jobs
CREATE POLICY "Users can update their own jobs"
  ON jobs
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create policy: Users can delete their own jobs
CREATE POLICY "Users can delete their own jobs"
  ON jobs
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_jobs_updated_at
  BEFORE UPDATE ON jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

