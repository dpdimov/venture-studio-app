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
      <h1 className="mb-8 text-3xl font-bold text-black dark:text-white">
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-sm bg-white p-6 shadow-one dark:bg-dark">
          <h3 className="mb-2 text-sm font-medium text-body-color">
            Total Projects
          </h3>
          <p className="text-3xl font-bold text-primary">{stats.projects}</p>
          <Link
            href="/admin/projects"
            className="mt-4 inline-block text-sm text-primary hover:underline"
          >
            Manage projects
          </Link>
        </div>
        <div className="rounded-sm bg-white p-6 shadow-one dark:bg-dark">
          <h3 className="mb-2 text-sm font-medium text-body-color">
            Survey Responses
          </h3>
          <p className="text-3xl font-bold text-primary">{stats.surveys}</p>
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
