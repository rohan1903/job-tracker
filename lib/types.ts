export type JobStatus = "applied" | "interviewing" | "offer" | "rejected" | "withdrawn";

export interface Job {
  id: string;
  user_id: string;
  company: string;
  position: string;
  status: JobStatus;
  applied_date: string | null;
  notes: string | null;
  job_url: string | null;
  salary_range: string | null;
  location: string | null;
  created_at: string;
  updated_at: string;
}

export interface JobFormData {
  company: string;
  position: string;
  status: JobStatus;
  applied_date: string;
  notes: string;
  job_url: string;
  salary_range: string;
  location: string;
}

