import Link from "next/link";
import { Job } from "@/lib/types";

interface JobCardProps {
  job: Job;
}

const statusColors: Record<Job["status"], string> = {
  applied: "bg-gray-100 text-gray-800",
  interviewing: "bg-yellow-100 text-yellow-800",
  offer: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  withdrawn: "bg-gray-100 text-gray-800",
};

export default function JobCard({ job }: JobCardProps) {
  const statusColor = statusColors[job.status] || statusColors.applied;

  return (
    <Link
      href={`/jobs/${job.id}`}
      className="block bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6 border border-gray-200"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">
            {job.position}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{job.company}</p>
          {job.location && (
            <p className="text-sm text-gray-500 mt-1">{job.location}</p>
          )}
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}
        >
          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
        </span>
      </div>
      {job.applied_date && (
        <p className="text-sm text-gray-500 mt-3">
          Applied: {new Date(job.applied_date).toLocaleDateString()}
        </p>
      )}
      {job.notes && (
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{job.notes}</p>
      )}
    </Link>
  );
}

