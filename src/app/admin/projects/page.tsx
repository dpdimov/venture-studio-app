"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Project } from "@/types/project";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-black dark:text-white">
          Projects
        </h1>
        <Link
          href="/admin/projects/new"
          className="rounded-sm bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary/90"
        >
          New Project
        </Link>
      </div>

      {loading ? (
        <p className="text-body-color">Loading...</p>
      ) : projects.length === 0 ? (
        <p className="text-body-color">No projects yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-sm bg-white shadow-one dark:bg-dark">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-body-color/10 dark:border-white/10">
              <tr>
                <th className="px-6 py-4 font-medium text-dark dark:text-white">
                  Title
                </th>
                <th className="px-6 py-4 font-medium text-dark dark:text-white">
                  Created
                </th>
                <th className="px-6 py-4 font-medium text-dark dark:text-white">
                  Survey
                </th>
                <th className="px-6 py-4 font-medium text-dark dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr
                  key={project.id}
                  className="border-b border-body-color/10 dark:border-white/10"
                >
                  <td className="px-6 py-4 text-dark dark:text-white">
                    {project.title}
                  </td>
                  <td className="px-6 py-4 text-body-color">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded px-2 py-1 text-xs ${
                        project.surveyEnabled
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                      }`}
                    >
                      {project.surveyEnabled ? "On" : "Off"}
                    </span>
                  </td>
                  <td className="space-x-3 px-6 py-4">
                    <Link
                      href={`/venture-detail/${project.id}`}
                      className="text-primary hover:underline"
                    >
                      View
                    </Link>
                    <Link
                      href={`/admin/projects/${project.id}/edit`}
                      className="text-primary hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
