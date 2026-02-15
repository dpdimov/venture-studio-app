"use client";

import { useState } from "react";

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

type FormData = Record<string, string>;

export default function SubmitForm() {
  const [data, setData] = useState<FormData>({ title: "" });
  const [videoUrl, setVideoUrl] = useState("");
  const [image, setImage] = useState<{ src: string } | null>(null);
  const [video, setVideo] = useState<{ id: string; source: string } | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ id: number; editKey: string } | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const { url } = await res.json();
      setImage({ src: url });
    } catch {
      setError("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const parseVideoUrl = (url: string) => {
    setVideoUrl(url);
    if (!url) { setVideo(null); return; }
    const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (ytMatch) { setVideo({ id: ytMatch[1], source: "youtube" }); return; }
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) { setVideo({ id: vimeoMatch[1], source: "vimeo" }); return; }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.title.trim()) { setError("Title is required"); return; }

    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, image, video }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      const json = await res.json();
      setResult(json);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (result) {
    const editUrl = `${window.location.origin}/venture-detail/${result.id}/edit?key=${result.editKey}`;
    return (
      <div className="rounded-card border border-gray-200 bg-white p-8 text-center shadow-card sm:p-12">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h2 className="mb-3 font-serif text-2xl font-bold text-black">
          Venture Submitted
        </h2>
        <p className="mb-6 text-body-color">
          Your venture has been submitted and will be visible once reviewed. Save the link below to edit your pitch anytime.
        </p>
        <div className="mx-auto max-w-[500px] rounded-lg bg-primary/5 p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-body-color">
            Your Edit Link
          </p>
          <code className="block break-all text-sm text-primary">{editUrl}</code>
          <button
            onClick={() => navigator.clipboard.writeText(editUrl)}
            className="mt-3 rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
          >
            Copy Link
          </button>
        </div>
        <p className="mt-6 text-xs text-body-color">
          Bookmark this link — it&apos;s the only way to edit your submission.
        </p>
      </div>
    );
  }

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
            Venture Title *
          </label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => setData((prev) => ({ ...prev, title: e.target.value }))}
            className={inputClass}
            placeholder="e.g. EcoTrack"
            required
          />
        </div>

        {/* Pitch sections */}
        {pitchFields.map(({ key, label, hint }) => (
          <div key={key} className="mb-6">
            <label className="mb-1 block text-sm font-medium text-black">
              {label}
            </label>
            <p className="mb-2 text-xs text-body-color">{hint}</p>
            <textarea
              value={data[key] || ""}
              onChange={(e) => setData((prev) => ({ ...prev, [key]: e.target.value }))}
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
          {image?.src && (
            <div className="mb-3">
              <img src={image.src} alt="preview" className="h-32 rounded-lg object-cover" />
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
          {video && (
            <p className="mt-1 text-xs text-body-color">
              Detected: {video.source} ({video.id})
            </p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-white shadow-btn transition hover:bg-primary/90 disabled:opacity-70"
        >
          {saving ? "Submitting..." : "Submit Venture"}
        </button>
      </div>
    </form>
  );
}
