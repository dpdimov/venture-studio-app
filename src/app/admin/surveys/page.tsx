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
        <h1 className="font-serif text-3xl font-bold text-black">
          Survey Responses
        </h1>
        <button
          onClick={exportCsv}
          className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-btn transition hover:bg-primary/90"
        >
          Export CSV
        </button>
      </div>

      {loading ? (
        <p className="text-body-color">Loading...</p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Project list */}
          <div className="rounded-card border border-gray-200 bg-white p-4 shadow-card">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-body-color">
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
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition ${
                      selectedProject === p.id
                        ? "bg-primary text-white"
                        : "text-black hover:bg-primary/10"
                    }`}
                  >
                    <span className="truncate">{p.title}</span>
                    <span
                      className={`ml-2 rounded-full px-2 py-0.5 text-xs font-medium ${
                        selectedProject === p.id
                          ? "bg-white/20 text-white"
                          : "bg-gray-100 text-body-color"
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
                    className="rounded-card border border-gray-200 bg-white p-6 shadow-card"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-black">
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
                          <span className="font-medium text-black">
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
