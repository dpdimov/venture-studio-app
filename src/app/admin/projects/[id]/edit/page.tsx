"use client";

import { useEffect, useState } from "react";
import ProjectForm from "@/components/Admin/ProjectForm";

export default function EditProjectPage({
  params,
}: {
  params: { id: string };
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [project, setProject] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/projects/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return <p className="text-body-color">Loading...</p>;
  }

  if (!project) {
    return <p className="text-body-color">Project not found.</p>;
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold text-black dark:text-white">
        Edit Project
      </h1>
      <ProjectForm initialData={project as Parameters<typeof ProjectForm>[0]["initialData"]} />
    </div>
  );
}
