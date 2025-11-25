"use server";

import { createClient } from "@/lib/supabase/server";
import { JobFormData } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createJob(data: JobFormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const { error } = await supabase.from("jobs").insert({
    user_id: user.id,
    company: data.company,
    position: data.position,
    status: data.status,
    applied_date: data.applied_date || null,
    notes: data.notes || null,
    job_url: data.job_url || null,
    salary_range: data.salary_range || null,
    location: data.location || null,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/jobs");
  revalidatePath("/dashboard");
  redirect("/jobs");
}

export async function updateJob(jobId: string, data: JobFormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const { error } = await supabase
    .from("jobs")
    .update({
      company: data.company,
      position: data.position,
      status: data.status,
      applied_date: data.applied_date || null,
      notes: data.notes || null,
      job_url: data.job_url || null,
      salary_range: data.salary_range || null,
      location: data.location || null,
    })
    .eq("id", jobId)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/jobs/${jobId}`);
  revalidatePath("/jobs");
  revalidatePath("/dashboard");
  redirect(`/jobs/${jobId}`);
}

