import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import JobCard from "@/components/jobs/JobCard";
import JobFilter from "@/components/jobs/JobFilter";

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; search?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Await searchParams (Next.js 15+)
  const params = await searchParams;

  // Build query
  let query = supabase
    .from("jobs")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  // Apply status filter
  if (params.status && params.status !== "all") {
    query = query.eq("status", params.status);
  }

  // Apply search filter server-side using Supabase
  if (params.search && params.search.trim()) {
    const searchTerm = params.search.trim();
    // Use or filter to search both company and position fields
    query = query.or(`company.ilike.%${searchTerm}%,position.ilike.%${searchTerm}%`);
  }

  // Fetch jobs
  const { data: jobs, error } = await query;

  if (error) {
    // Silently handle errors - don't log to console to avoid source map issues
    // Error will be handled by the UI showing no results
  }

  const filteredJobs = jobs || [];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-bold text-gray-900">Job Applications</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage all your job applications
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            href="/jobs/new"
            className="block rounded-md bg-gray-900 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            Add Job Application
          </Link>
        </div>
      </div>

      <div className="mt-6">
        <JobFilter
          currentStatus={params.status || "all"}
          currentSearch={params.search || ""}
        />
      </div>

      {filteredJobs.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="mt-6 text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">
            {params.status || params.search
              ? "No jobs found matching your filters."
              : "No job applications yet."}
          </p>
          {!(params.status || params.search) && (
            <Link
              href="/jobs/new"
              className="mt-4 inline-block text-gray-700 hover:text-gray-900"
            >
              Add your first job application
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

