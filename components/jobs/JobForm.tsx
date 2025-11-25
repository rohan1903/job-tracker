"use client";

import { useState, useEffect } from "react";
import { Job, JobFormData, JobStatus } from "@/lib/types";

interface JobFormProps {
  job?: Job;
  onSubmit: (data: JobFormData) => Promise<void>;
  onCancel?: () => void;
}

const statusOptions: JobStatus[] = [
  "applied",
  "interviewing",
  "offer",
  "rejected",
  "withdrawn",
];

// Helper functions for date conversion (yyyy-mm-dd <-> dd/mm/yyyy)
const formatDateForDisplay = (dateString: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString + "T00:00:00");
  if (isNaN(date.getTime())) return "";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const formatDateForInput = (dateString: string): string => {
  if (!dateString) return "";
  // If already in yyyy-mm-dd format, return as is
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return dateString;
  // If in dd/mm/yyyy format, convert to yyyy-mm-dd
  const parts = dateString.split("/");
  if (parts.length === 3) {
    const [day, month, year] = parts;
    return `${year}-${month}-${day}`;
  }
  return dateString;
};

export default function JobForm({ job, onSubmit, onCancel }: JobFormProps) {
  const [formData, setFormData] = useState<JobFormData>({
    company: job?.company || "",
    position: job?.position || "",
    status: job?.status || "applied",
    applied_date: job?.applied_date || "",
    notes: job?.notes || "",
    job_url: job?.job_url || "",
    salary_range: job?.salary_range || "",
    location: job?.location || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dateDisplay, setDateDisplay] = useState<string>(
    formatDateForDisplay(job?.applied_date || "")
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.company.trim() || !formData.position.trim()) {
      setError("Company and Position are required");
      return;
    }

    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (job) {
      setFormData({
        company: job.company || "",
        position: job.position || "",
        status: job.status || "applied",
        applied_date: job.applied_date || "",
        notes: job.notes || "",
        job_url: job.job_url || "",
        salary_range: job.salary_range || "",
        location: job.location || "",
      });
      setDateDisplay(formatDateForDisplay(job.applied_date || ""));
    }
  }, [job]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "applied_date") {
      // The date input always returns yyyy-mm-dd format
      setFormData((prev) => ({ ...prev, [name]: value }));
      setDateDisplay(formatDateForDisplay(value));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDateDisplayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDateDisplay(value);
    // Try to parse dd/mm/yyyy format
    const formatted = formatDateForInput(value);
    if (formatted) {
      setFormData((prev) => ({ ...prev, applied_date: formatted }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700"
          >
            Company *
          </label>
          <input
            type="text"
            name="company"
            id="company"
            required
            value={formData.company}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm px-3 py-2 border bg-white text-gray-900 placeholder-gray-400"
            placeholder="Google"
          />
        </div>

        <div>
          <label
            htmlFor="position"
            className="block text-sm font-medium text-gray-700"
          >
            Position *
          </label>
          <input
            type="text"
            name="position"
            id="position"
            required
            value={formData.position}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm px-3 py-2 border bg-white text-gray-900 placeholder-gray-400"
            placeholder="COO"
          />
        </div>

        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status *
          </label>
          <select
            name="status"
            id="status"
            required
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm px-3 py-2 border bg-white text-gray-900"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status} className="bg-white text-gray-900">
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="applied_date"
            className="block text-sm font-medium text-gray-700"
          >
            Applied Date
          </label>
          <div className="mt-1 relative">
            <input
              type="date"
              name="applied_date"
              id="applied_date"
              value={formData.applied_date}
              onChange={handleChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <input
              type="text"
              value={dateDisplay}
              onChange={handleDateDisplayChange}
              onFocus={(e) => {
                // When text input is focused, trigger the date picker
                const dateInput = document.getElementById("applied_date");
                if (dateInput) {
                  const input = dateInput as HTMLInputElement;
                  if (input.showPicker) {
                    input.showPicker();
                  } else {
                    // Fallback for browsers that don't support showPicker
                    input.focus();
                    input.click();
                  }
                }
              }}
              placeholder="dd/mm/yyyy"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm px-3 py-2 pr-10 border bg-white text-gray-900 placeholder-gray-400 cursor-pointer"
            />
            <button
              type="button"
              onClick={() => {
                const dateInput = document.getElementById("applied_date");
                if (dateInput) {
                  const input = dateInput as HTMLInputElement;
                  if (input.showPicker) {
                    input.showPicker();
                  } else {
                    // Fallback for browsers that don't support showPicker
                    input.focus();
                    input.click();
                  }
                }
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer z-20"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g., San Francisco, CA"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm px-3 py-2 border bg-white text-gray-900 placeholder-gray-400"
          />
        </div>

        <div>
          <label
            htmlFor="salary_range"
            className="block text-sm font-medium text-gray-700"
          >
            Salary Range
          </label>
          <input
            type="text"
            name="salary_range"
            id="salary_range"
            value={formData.salary_range}
            onChange={handleChange}
            placeholder="e.g., $100k - $150k"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm px-3 py-2 border bg-white text-gray-900 placeholder-gray-400"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="job_url"
          className="block text-sm font-medium text-gray-700"
        >
          Job URL
        </label>
        <input
          type="url"
          name="job_url"
          id="job_url"
          value={formData.job_url}
          onChange={handleChange}
          placeholder="https://..."
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm px-3 py-2 border bg-white text-gray-900 placeholder-gray-400"
        />
      </div>

      <div>
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-gray-700"
        >
          Notes
        </label>
        <textarea
          name="notes"
          id="notes"
          rows={4}
          value={formData.notes}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm px-3 py-2 border bg-white text-gray-900 placeholder-gray-400"
          placeholder="Add any notes about this application..."
        />
      </div>

      <div className="flex justify-end space-x-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : job ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
}

