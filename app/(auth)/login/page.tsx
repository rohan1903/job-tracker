"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [configError, setConfigError] = useState<string | null>(null);

  // Check if Supabase is configured on mount
  useEffect(() => {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      // Debug: Log environment variables (URL will be visible, key will be truncated)
      console.log("Supabase URL:", supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : "NOT SET");
      console.log("Supabase Key:", supabaseKey ? `${supabaseKey.substring(0, 20)}...` : "NOT SET");
      
      if (!supabaseUrl || !supabaseKey) {
        setConfigError(
          "Environment variables not set. Check Vercel settings and redeploy."
        );
        return;
      }
      
      createClient();
    } catch (err) {
      setConfigError(
        err instanceof Error ? err.message : "Supabase is not configured"
      );
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabase = createClient();
      
      // Log the Supabase URL being used (for debugging)
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      console.log("Attempting login with Supabase URL:", supabaseUrl);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Supabase auth error:", error);
        setError(error.message);
        setLoading(false);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      
      // Check if it's a network/fetch error
      if (errorMessage.includes("fetch") || errorMessage.includes("network") || errorMessage.includes("Failed to fetch")) {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        setError(
          `Failed to connect to Supabase. Details:\n` +
          `- Supabase URL: ${supabaseUrl || "NOT SET"}\n` +
          `- Check: 1) Environment variables in Vercel\n` +
          `- Check: 2) Supabase redirect URLs configured\n` +
          `- Check: 3) Browser console for CORS errors\n` +
          `- Check: 4) Vercel function logs`
        );
      } else if (errorMessage.includes("not configured") || errorMessage.includes("Invalid")) {
        setError(
          `Configuration Error: ${errorMessage}\n` +
          `Make sure environment variables are set in Vercel and you've redeployed.`
        );
      } else {
        setError(errorMessage);
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              href="/signup"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              create a new account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {configError && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded mb-4">
              <p className="font-semibold">Configuration Required</p>
              <p className="text-sm mt-1">{configError}</p>
              <p className="text-xs mt-2">
                See <code className="bg-yellow-100 px-1 rounded">ENV_SETUP.md</code> for setup instructions.
              </p>
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                suppressHydrationWarning
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                suppressHydrationWarning
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

