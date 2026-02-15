"use client";

import { useEffect, useState } from "react";
import { formatDate } from "@/lib/format-date";

type SurveyProject = {
  id: number;
  title: string;
  _count: { surveyResponses: number };
};

type SurveyResponse = {
  id: number;
  respondentName: string | null;
  respondentEmail: string | null;
  answers: Record<string, unknown>;
  createdAt: string;
};

export default function AdminSurveysPage() {
  const [projects, setProjects] = useState<SurveyProject[]>([]);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/survey-projects")
      .then((r) => r.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const loadResponses = async (projectId: number) => {
    setSelectedProject(projectId);
    const res = await fetch(`/api/surveys/${projectId}`);
    const data = await res.json();
    setResponses(data);
  };

  const exportCsv = () => {
    const url = selectedProject
      ? `/api/surveys/export?projectId=${selectedProject}`
      : `/api/surveys/export`;
    window.open(url, "_blank");
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-black dark:text-white">
          Survey Responses
        </h1>
        <button
          onClick={exportCsv}
          className="rounded-sm bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary/90"
        >
          Export CSV
        </button>
      </div>

      {loading ? (
        <p className="text-body-color">Loading...</p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Project list */}
          <div className="rounded-sm bg-white p-4 shadow-one dark:bg-dark">
            <h3 className="mb-4 text-sm font-medium text-dark dark:text-white">
              Projects
            </h3>
            <div className="space-y-1">
              {projects.length === 0 ? (
                <p className="text-sm text-body-color">
                  No projects with surveys enabled.
                </p>
              ) : (
                projects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => loadResponses(p.id)}
                    className={`flex w-full items-center justify-between rounded px-3 py-2 text-left text-sm transition ${
                      selectedProject === p.id
                        ? "bg-primary text-white"
                        : "text-body-color hover:bg-primary/10"
                    }`}
                  >
                    <span className="truncate">{p.title}</span>
                    <span
                      className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
                        selectedProject === p.id
                          ? "bg-white/20"
                          : "bg-gray-100 dark:bg-gray-800"
                      }`}
                    >
                      {p._count.surveyResponses}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Responses */}
          <div className="lg:col-span-2">
            {selectedProject === null ? (
              <p className="text-body-color">
                Select a project to view responses.
              </p>
            ) : responses.length === 0 ? (
              <p className="text-body-color">No responses yet.</p>
            ) : (
              <div className="space-y-4">
                {responses.map((r) => (
                  <div
                    key={r.id}
                    className="rounded-sm bg-white p-6 shadow-one dark:bg-dark"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-dark dark:text-white">
                          {r.respondentName || "Anonymous"}
                        </p>
                        {r.respondentEmail && (
                          <p className="text-xs text-body-color">
                            {r.respondentEmail}
                          </p>
                        )}
                      </div>
                      <p className="text-xs text-body-color">
                        {formatDate(r.createdAt)}
                      </p>
                    </div>
                    <div className="space-y-2">
                      {Object.entries(r.answers).map(([key, value]) => (
                        <div key={key} className="flex gap-2 text-sm">
                          <span className="font-medium text-dark dark:text-white">
                            {key}:
                          </span>
                          <span className="text-body-color">
                            {typeof value === "number"
                              ? "★".repeat(value) +
                                "☆".repeat(Math.max(0, 5 - value))
                              : String(value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
