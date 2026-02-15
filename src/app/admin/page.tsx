"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ projects: 0, surveys: 0 });

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  return (
    <div>
      <h1 className="mb-8 font-serif text-3xl font-bold text-black">
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-card border border-gray-200 bg-white p-6 shadow-card">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-body-color">
            Total Projects
          </h3>
          <p className="font-serif text-3xl font-bold text-primary">{stats.projects}</p>
          <Link
            href="/admin/projects"
            className="mt-4 inline-block text-sm text-primary hover:underline"
          >
            Manage projects
          </Link>
        </div>
        <div className="rounded-card border border-gray-200 bg-white p-6 shadow-card">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-body-color">
            Survey Responses
          </h3>
          <p className="font-serif text-3xl font-bold text-primary">{stats.surveys}</p>
          <Link
            href="/admin/surveys"
            className="mt-4 inline-block text-sm text-primary hover:underline"
          >
            View responses
          </Link>
        </div>
      </div>
    </div>
  );
}
