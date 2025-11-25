"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function DeleteJobButton({ jobId }: { jobId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.from("jobs").delete().eq("id", jobId);

    if (error) {
      console.error("Error deleting job:", error);
      setError("Failed to delete job. Please try again.");
      setLoading(false);
    } else {
      router.push("/jobs");
      router.refresh();
    }
  };

  if (showConfirm) {
    return (
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <span className="text-sm text-gray-600">Are you sure?</span>
        {error && (
          <span className="text-sm text-red-600">{error}</span>
        )}
        <div className="flex space-x-2">
          <button
            onClick={handleDelete}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Deleting..." : "Yes, Delete"}
          </button>
          <button
            onClick={() => {
              setShowConfirm(false);
              setError(null);
            }}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
    >
      Delete
    </button>
  );
}

