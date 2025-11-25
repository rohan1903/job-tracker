import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import StatsCard from "@/components/dashboard/StatsCard";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch all jobs for the user
  const { data: jobs, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching jobs:", error);
  }

  const jobsList = jobs || [];

  // Calculate statistics
  const totalApplications = jobsList.length;
  const statusCounts = jobsList.reduce(
    (acc, job) => {
      acc[job.status] = (acc[job.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const respondedCount =
    (statusCounts["interviewing"] || 0) +
    (statusCounts["offer"] || 0) +
    (statusCounts["rejected"] || 0);
  const responseRate =
    totalApplications > 0
      ? ((respondedCount / totalApplications) * 100).toFixed(1)
      : "0";

  // Get recent jobs (last 5)
  const recentJobs = jobsList.slice(0, 5);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-700">
            Overview of your job applications
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

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Applications"
          value={totalApplications.toString()}
          description="All time"
        />
        <StatsCard
          title="Interviewing"
          value={(statusCounts["interviewing"] || 0).toString()}
          description="In progress"
        />
        <StatsCard
          title="Offers"
          value={(statusCounts["offer"] || 0).toString()}
          description="Received"
        />
        <StatsCard
          title="Response Rate"
          value={`${responseRate}%`}
          description="Applications with response"
        />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Recent Applications
        </h2>
        {recentJobs.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentJobs.map((job) => (
              <Link
                key={job.id}
                href={`/jobs/${job.id}`}
                className="block bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4 border border-gray-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {job.position}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{job.company}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      job.status === "applied"
                        ? "bg-gray-100 text-gray-800"
                        : job.status === "interviewing"
                        ? "bg-yellow-100 text-yellow-800"
                        : job.status === "offer"
                        ? "bg-green-100 text-green-800"
                        : job.status === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500">No job applications yet.</p>
            <Link
              href="/jobs/new"
              className="mt-4 inline-block text-gray-700 hover:text-gray-900"
            >
              Add your first job application
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

