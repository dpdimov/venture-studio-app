"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ProjectData = {
  id?: number;
  title: string;
  shortDescription: string;
  problem: string;
  solution: string;
  product: string;
  advantage: string;
  market: string;
  vision: string;
  team: string;
  funding: string;
  nextMilestone: string;
  image: { src: string } | null;
  video: { id: string; source: string } | null;
  isVisible: boolean;
  surveyEnabled: boolean;
  editKey?: string | null;
};

const defaultData: ProjectData = {
  title: "",
  shortDescription: "",
  problem: "",
  solution: "",
  product: "",
  advantage: "",
  market: "",
  vision: "",
  team: "",
  funding: "",
  nextMilestone: "",
  image: null,
  video: null,
  isVisible: true,
  surveyEnabled: false,
};

const pitchFields = [
  { key: "shortDescription", label: "Short Description" },
  { key: "problem", label: "Problem" },
  { key: "solution", label: "Solution" },
  { key: "product", label: "Product" },
  { key: "advantage", label: "Competitive Advantage" },
  { key: "market", label: "Market" },
  { key: "vision", label: "Vision" },
  { key: "team", label: "Team" },
  { key: "funding", label: "Funding" },
  { key: "nextMilestone", label: "Next Milestone" },
] as const;

export default function ProjectForm({
  initialData,
}: {
  initialData?: ProjectData;
}) {
  const [data, setData] = useState<ProjectData>(initialData || defaultData);
  const [videoUrl, setVideoUrl] = useState(
    initialData?.video
      ? initialData.video.source === "youtube"
        ? `https://youtube.com/watch?v=${initialData.video.id}`
        : `https://vimeo.com/${initialData.video.id}`
      : "",
  );
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const isEditing = !!initialData?.id;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const { url } = await res.json();
      setData((prev) => ({ ...prev, image: { src: url } }));
    } catch {
      setError("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const parseVideoUrl = (url: string) => {
    setVideoUrl(url);
    if (!url) {
      setData((prev) => ({ ...prev, video: null }));
      return;
    }

    const ytMatch = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/,
    );
    if (ytMatch) {
      setData((prev) => ({
        ...prev,
        video: { id: ytMatch[1], source: "youtube" },
      }));
      return;
    }

    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
      setData((prev) => ({
        ...prev,
        video: { id: vimeoMatch[1], source: "vimeo" },
      }));
      return;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.title.trim()) {
      setError("Title is required");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const url = isEditing ? `/api/projects/${initialData!.id}` : "/api/projects";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to save project");

      router.push("/admin/projects");
      router.refresh();
    } catch {
      setError("Failed to save project");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10";

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="rounded-card border border-gray-200 bg-white p-6 shadow-card sm:p-8">
        {/* Title */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-black">
            Title *
          </label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => setData((prev) => ({ ...prev, title: e.target.value }))}
            className={inputClass}
            required
          />
        </div>

        {/* Pitch sections */}
        {pitchFields.map(({ key, label }) => (
          <div key={key} className="mb-6">
            <label className="mb-2 block text-sm font-medium text-black">
              {label}
            </label>
            <textarea
              value={(data[key] as string) || ""}
              onChange={(e) =>
                setData((prev) => ({ ...prev, [key]: e.target.value }))
              }
              rows={3}
              className={inputClass}
            />
          </div>
        ))}

        {/* Image upload */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-black">
            Project Image
          </label>
          {data.image?.src && (
            <div className="mb-3">
              <img
                src={data.image.src}
                alt="preview"
                className="h-32 rounded-lg object-cover"
              />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="text-sm text-body-color"
          />
          {uploading && (
            <p className="mt-1 text-sm text-primary">Uploading...</p>
          )}
        </div>

        {/* Video URL */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-black">
            Video URL (YouTube or Vimeo)
          </label>
          <input
            type="url"
            value={videoUrl}
            onChange={(e) => parseVideoUrl(e.target.value)}
            placeholder="https://youtube.com/watch?v=..."
            className={inputClass}
          />
          {data.video && (
            <p className="mt-1 text-xs text-body-color">
              Detected: {data.video.source} ({data.video.id})
            </p>
          )}
        </div>

        {/* Toggles */}
        <div className="mb-6 flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-sm text-black">
            <input
              type="checkbox"
              checked={data.isVisible}
              onChange={(e) =>
                setData((prev) => ({ ...prev, isVisible: e.target.checked }))
              }
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            Visible in public listing
          </label>
          <label className="flex items-center gap-2 text-sm text-black">
            <input
              type="checkbox"
              checked={data.surveyEnabled}
              onChange={(e) =>
                setData((prev) => ({ ...prev, surveyEnabled: e.target.checked }))
              }
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            Enable survey/evaluation
          </label>
        </div>

        {/* Edit link info */}
        {isEditing && initialData?.editKey && (
          <div className="mb-6 rounded-lg bg-primary/5 p-4">
            <p className="mb-1 text-sm font-medium text-black">
              Edit Link (share with project creator):
            </p>
            <code className="break-all text-xs text-primary">
              {typeof window !== "undefined"
                ? `${window.location.origin}/venture-detail/${initialData.id}/edit?key=${initialData.editKey}`
                : ""}
            </code>
          </div>
        )}
      </div>

      <div className="mt-6 flex gap-4">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-white shadow-btn transition hover:bg-primary/90 disabled:opacity-70"
        >
          {saving ? "Saving..." : isEditing ? "Update Project" : "Create Project"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-gray-200 px-8 py-3 text-sm font-medium text-body-color transition hover:border-primary hover:text-primary"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
