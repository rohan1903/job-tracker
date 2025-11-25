import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Job Application Tracker",
  description: "Track your job applications efficiently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

