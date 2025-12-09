"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/login");
      router.refresh();
    } catch (err) {
      // If Supabase is not configured, just redirect
      router.push("/login");
      router.refresh();
    }
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link
              href="/dashboard"
              className="flex items-center px-2 py-2 text-xl font-bold text-gray-900"
            >
              Job Tracker
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/dashboard"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                  isActive("/dashboard")
                    ? "text-gray-900 border-gray-900"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300 border-transparent"
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/jobs"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                  isActive("/jobs") || pathname?.startsWith("/jobs/")
                    ? "text-gray-900 border-gray-900"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300 border-transparent"
                }`}
              >
                All Jobs
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-gray-500 hover:text-gray-700 px-3 py-2"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

