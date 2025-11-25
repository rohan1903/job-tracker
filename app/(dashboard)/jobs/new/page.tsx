import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import JobForm from "@/components/jobs/JobForm";
import { createJob } from "@/app/actions/jobs";

export default async function NewJobPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

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

      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Add New Job Application
        </h1>
        <JobForm onSubmit={createJob} />
      </div>
    </div>
  );
}

