import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import JobForm from "@/components/jobs/JobForm";
import { updateJob } from "@/app/actions/jobs";
import { JobFormData } from "@/lib/types";

export default async function EditJobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
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
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error || !job) {
    notFound();
  }

  // Create a bound server action that captures the jobId
  async function updateJobWithId(data: JobFormData) {
    "use server";
    await updateJob(id, data);
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link
          href={`/jobs/${id}`}
          className="text-sm text-gray-700 hover:text-gray-900"
        >
          ← Back to Job Details
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Edit Job Application
        </h1>
        <JobForm job={job} onSubmit={updateJobWithId} />
      </div>
    </div>
  );
}

