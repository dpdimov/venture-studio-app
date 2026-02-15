"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Project } from "@/types/project";

type AdminProject = Project & { editKey?: string };

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    const res = await fetch("/api/projects?admin=1");
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
        <h1 className="font-serif text-3xl font-bold text-black">
          Projects
        </h1>
        <Link
          href="/admin/projects/new"
          className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-btn transition hover:bg-primary/90"
        >
          New Project
        </Link>
      </div>

      {loading ? (
        <p className="text-body-color">Loading...</p>
      ) : projects.length === 0 ? (
        <p className="text-body-color">No projects yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-card border border-gray-200 bg-white shadow-card">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-body-color">
                  Title
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-body-color">
                  Created
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-body-color">
                  Survey
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-body-color">
                  Edit Link
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-body-color">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr
                  key={project.id}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="px-6 py-4 font-medium text-black">
                    {project.title}
                  </td>
                  <td className="px-6 py-4 text-body-color">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        project.surveyEnabled
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {project.surveyEnabled ? "On" : "Off"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {project.editKey && (
                      <button
                        onClick={() => {
                          const url = `${window.location.origin}/venture-detail/${project.id}/edit?key=${project.editKey}`;
                          navigator.clipboard.writeText(url);
                          alert("Edit link copied to clipboard");
                        }}
                        className="text-xs text-primary hover:underline"
                      >
                        Copy link
                      </button>
                    )}
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
