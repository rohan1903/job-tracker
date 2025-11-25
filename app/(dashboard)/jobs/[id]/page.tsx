import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import DeleteJobButton from "@/components/jobs/DeleteJobButton";

export default async function JobDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: job, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", params.id)
    .eq("user_id", user.id)
    .single();

  if (error || !job) {
    notFound();
  }

  const statusColors: Record<string, string> = {
    applied: "bg-gray-100 text-gray-800",
    interviewing: "bg-yellow-100 text-yellow-800",
    offer: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    withdrawn: "bg-gray-100 text-gray-800",
  };

  const statusColor = statusColors[job.status] || statusColors.applied;

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link
          href="/jobs"
          className="text-sm text-gray-700 hover:text-gray-900"
        >
          ← Back to Jobs
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {job.position}
              </h1>
              <p className="text-xl text-gray-600 mt-1">{job.company}</p>
            </div>
            <span
              className={`px-4 py-2 rounded-full text-sm font-medium ${statusColor}`}
            >
              {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {job.location && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Location</h3>
                <p className="mt-1 text-sm text-gray-900">{job.location}</p>
              </div>
            )}

            {job.applied_date && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Applied Date
                </h3>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(job.applied_date).toLocaleDateString()}
                </p>
              </div>
            )}

            {job.salary_range && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Salary Range
                </h3>
                <p className="mt-1 text-sm text-gray-900">{job.salary_range}</p>
              </div>
            )}

            {job.job_url && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Job URL</h3>
                <a
                  href={job.job_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 text-sm text-gray-700 hover:text-gray-900 underline"
                >
                  View Job Posting →
                </a>
              </div>
            )}

            <div>
              <h3 className="text-sm font-medium text-gray-500">Created</h3>
              <p className="mt-1 text-sm text-gray-900">
                {new Date(job.created_at).toLocaleDateString()}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
              <p className="mt-1 text-sm text-gray-900">
                {new Date(job.updated_at).toLocaleDateString()}
              </p>
            </div>
          </div>

          {job.notes && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Notes</h3>
              <div className="bg-gray-50 rounded-md p-4">
                <p className="text-sm text-gray-900 whitespace-pre-wrap">
                  {job.notes}
                </p>
              </div>
            </div>
          )}

          <div className="mt-8 flex space-x-3">
            <Link
              href={`/jobs/${job.id}/edit`}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Edit
            </Link>
            <DeleteJobButton jobId={job.id} />
          </div>
        </div>
      </div>
    </div>
  );
}

