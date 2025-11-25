import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import JobForm from "@/components/jobs/JobForm";
import { updateJob } from "@/app/actions/jobs";

export default async function EditJobPage({
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

  const handleUpdate = async (data: Parameters<typeof updateJob>[1]) => {
    "use server";
    await updateJob(params.id, data);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link
          href={`/jobs/${params.id}`}
          className="text-sm text-gray-700 hover:text-gray-900"
        >
          ← Back to Job Details
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Edit Job Application
        </h1>
        <JobForm job={job} onSubmit={handleUpdate} />
      </div>
    </div>
  );
}

