"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "applied", label: "Applied" },
  { value: "interviewing", label: "Interviewing" },
  { value: "offer", label: "Offer" },
  { value: "rejected", label: "Rejected" },
  { value: "withdrawn", label: "Withdrawn" },
];

export default function JobFilter({
  currentStatus,
  currentSearch,
}: {
  currentStatus: string;
  currentSearch: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Local state mirrors the URL/searchParams but is always driven by props
  const [search, setSearch] = useState(currentSearch);
  const [status, setStatus] = useState(currentStatus);

  // Keep local state in sync with incoming props without causing render-time updates
  useEffect(() => {
    setSearch(currentSearch);
    setStatus(currentStatus);
  }, [currentStatus, currentSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (search.trim()) {
      params.set("search", search.trim());
    } else {
      params.delete("search");
    }
    if (status !== "all") {
      params.set("status", status);
    } else {
      params.delete("status");
    }
    router.push(`/jobs?${params.toString()}`);
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    const params = new URLSearchParams(searchParams.toString());
    if (newStatus !== "all") {
      params.set("status", newStatus);
    } else {
      params.delete("status");
    }
    if (search.trim()) {
      params.set("search", search.trim());
    }
    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <div className="mt-6 bg-white p-4 rounded-lg shadow border border-gray-200">
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by company or position..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm px-3 py-2 border bg-white text-gray-900 placeholder-gray-400"
          />
        </div>
        <div className="sm:w-48">
          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm px-3 py-2 border bg-white text-gray-900"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value} className="bg-white text-gray-900">
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Search
        </button>
      </form>
    </div>
  );
}

