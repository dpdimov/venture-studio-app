"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const pitchFields = [
  { key: "shortDescription", label: "Short Description", hint: "A one-liner summarising your venture." },
  { key: "problem", label: "Problem", hint: "What problem are you solving and for whom?" },
  { key: "solution", label: "Solution", hint: "How does your venture solve this problem?" },
  { key: "product", label: "Product", hint: "Describe your product or service." },
  { key: "advantage", label: "Competitive Advantage", hint: "What sets you apart from alternatives?" },
  { key: "market", label: "Market", hint: "Who are your target customers and how large is the opportunity?" },
  { key: "vision", label: "Vision", hint: "Where do you see this venture in 3–5 years?" },
  { key: "team", label: "Team", hint: "Who is on the team and what do they bring?" },
  { key: "funding", label: "Funding", hint: "What funding are you seeking and how will it be used?" },
  { key: "nextMilestone", label: "Next Milestone", hint: "What is the next key milestone you are working towards?" },
] as const;

type ProjectData = {
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
};

export default function EditVenture({ projectId }: { projectId: string }) {
  const searchParams = useSearchParams();
  const editKey = searchParams.get("key");

  const [data, setData] = useState<ProjectData | null>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!editKey) {
      setUnauthorized(true);
      setLoading(false);
      return;
    }

    fetch(`/api/projects/${projectId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((project) => {
        setData({
          title: project.title || "",
          shortDescription: project.shortDescription || "",
          problem: project.problem || "",
          solution: project.solution || "",
          product: project.product || "",
          advantage: project.advantage || "",
          market: project.market || "",
          vision: project.vision || "",
          team: project.team || "",
          funding: project.funding || "",
          nextMilestone: project.nextMilestone || "",
          image: project.image || null,
          video: project.video || null,
        });
        if (project.video) {
          setVideoUrl(
            project.video.source === "youtube"
              ? `https://youtube.com/watch?v=${project.video.id}`
              : `https://vimeo.com/${project.video.id}`,
          );
        }
        setLoading(false);
      })
      .catch(() => {
        setUnauthorized(true);
        setLoading(false);
      });
  }, [projectId, editKey]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Upload failed");
      const { url } = await res.json();
      setData((prev) => prev && { ...prev, image: { src: url } });
    } catch {
      setError("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const parseVideoUrl = (url: string) => {
    setVideoUrl(url);
    if (!url) {
      setData((prev) => prev && { ...prev, video: null });
      return;
    }
    const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (ytMatch) {
      setData((prev) => prev && { ...prev, video: { id: ytMatch[1], source: "youtube" } });
      return;
    }
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
      setData((prev) => prev && { ...prev, video: { id: vimeoMatch[1], source: "vimeo" } });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data?.title.trim()) {
      setError("Title is required");
      return;
    }

    setSaving(true);
    setError("");
    setSaved(false);

    try {
      const res = await fetch(`/api/projects/${projectId}?editKey=${editKey}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.status === 401) {
        setUnauthorized(true);
        return;
      }
      if (!res.ok) throw new Error("Failed to save");
      setSaved(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="pb-16 pt-[150px]">
        <div className="container">
          <div className="mx-auto max-w-[800px] text-center text-body-color">Loading...</div>
        </div>
      </section>
    );
  }

  if (unauthorized || !data) {
    return (
      <section className="pb-16 pt-[150px]">
        <div className="container">
          <div className="mx-auto max-w-[500px] rounded-card border border-gray-200 bg-white p-8 text-center shadow-card sm:p-12">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="m15 9-6 6M9 9l6 6" />
              </svg>
            </div>
            <h2 className="mb-3 font-serif text-2xl font-bold text-black">Invalid Edit Link</h2>
            <p className="mb-6 text-body-color">
              This edit link is invalid or has expired. Please check the link and try again.
            </p>
            <Link href="/" className="text-sm text-primary hover:underline">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10";

  return (
    <section className="pb-16 pt-[150px]">
      <div className="container">
        <div className="mx-auto max-w-[800px]">
          <div className="mb-8">
            <h1 className="mb-2 font-serif text-3xl font-bold text-black">Edit Your Venture</h1>
            <p className="text-body-color">Update your pitch details below.</p>
          </div>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-6 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
            )}
            {saved && (
              <div className="mb-6 rounded-lg bg-green-50 p-3 text-sm text-green-700">
                Changes saved successfully.{" "}
                <Link href={`/venture-detail/${projectId}`} className="font-medium underline">
                  View your venture
                </Link>
              </div>
            )}

            <div className="rounded-card border border-gray-200 bg-white p-6 shadow-card sm:p-8">
              {/* Title */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-black">Venture Title *</label>
                <input
                  type="text"
                  value={data.title}
                  onChange={(e) => setData((prev) => prev && { ...prev, title: e.target.value })}
                  className={inputClass}
                  required
                />
              </div>

              {/* Pitch sections */}
              {pitchFields.map(({ key, label, hint }) => (
                <div key={key} className="mb-6">
                  <label className="mb-1 block text-sm font-medium text-black">{label}</label>
                  <p className="mb-2 text-xs text-body-color">{hint}</p>
                  <textarea
                    value={(data[key as keyof ProjectData] as string) || ""}
                    onChange={(e) => setData((prev) => prev && { ...prev, [key]: e.target.value })}
                    rows={3}
                    className={inputClass}
                  />
                </div>
              ))}

              {/* Image upload */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-black">Project Image</label>
                {data.image?.src && (
                  <div className="mb-3">
                    <img src={data.image.src} alt="preview" className="h-32 rounded-lg object-cover" />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="text-sm text-body-color"
                />
                {uploading && <p className="mt-1 text-sm text-primary">Uploading...</p>}
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
            </div>

            <div className="mt-6 flex gap-4">
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-white shadow-btn transition hover:bg-primary/90 disabled:opacity-70"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <Link
                href={`/venture-detail/${projectId}`}
                className="flex items-center rounded-lg border border-gray-200 px-8 py-3 text-sm font-medium text-body-color transition hover:border-primary hover:text-primary"
              >
                View Venture
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
