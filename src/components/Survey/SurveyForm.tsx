"use client";

import { useState, useEffect } from "react";
import { surveyQuestions } from "@/lib/survey-questions";

const StarRating = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className={`text-2xl transition ${
            star <= value
              ? "text-yellow"
              : "text-gray-300"
          }`}
        >
          &#9733;
        </button>
      ))}
    </div>
  );
};

export default function SurveyForm({ projectId }: { projectId: string }) {
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [projectTitle, setProjectTitle] = useState("");

  useEffect(() => {
    fetch(`/api/projects/${projectId}`)
      .then((r) => r.json())
      .then((p) => setProjectTitle(p.title || ""))
      .catch(() => {});
  }, [projectId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/surveys/${projectId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          respondentName: name || undefined,
          respondentEmail: email || undefined,
          answers,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section className="pb-[120px] pt-[150px]">
        <div className="container">
          <div className="mx-auto max-w-[600px] text-center">
            <div className="mb-8 text-6xl text-primary">&#10003;</div>
            <h2 className="mb-4 font-serif text-3xl font-bold text-black">
              Thank You!
            </h2>
            <p className="text-base text-body-color">
              Your evaluation has been submitted successfully.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10";

  return (
    <section className="pb-[120px] pt-[150px]">
      <div className="container">
        <div className="mx-auto max-w-[700px]">
          <div className="rounded-card border border-gray-200 bg-white p-8 shadow-card sm:p-12">
            <h2 className="mb-2 font-serif text-2xl font-bold text-black sm:text-3xl">
              Evaluate Venture
            </h2>
            {projectTitle && (
              <p className="mb-8 text-lg text-primary">{projectTitle}</p>
            )}

            {error && (
              <div className="mb-6 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-8 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-black">
                    Your Name (optional)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-black">
                    Your Email (optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="space-y-8">
                {surveyQuestions.map((q) => (
                  <div key={q.id}>
                    <label className="mb-3 block text-base font-medium text-black">
                      {q.text}
                    </label>
                    {q.type === "rating" ? (
                      <StarRating
                        value={(answers[q.id] as number) || 0}
                        onChange={(v) =>
                          setAnswers((prev) => ({ ...prev, [q.id]: v }))
                        }
                      />
                    ) : (
                      <textarea
                        value={(answers[q.id] as string) || ""}
                        onChange={(e) =>
                          setAnswers((prev) => ({
                            ...prev,
                            [q.id]: e.target.value,
                          }))
                        }
                        rows={4}
                        className={inputClass}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-lg bg-primary px-8 py-4 text-base font-semibold text-white shadow-btn transition duration-300 hover:bg-primary/90 disabled:opacity-70"
                >
                  {loading ? "Submitting..." : "Submit Evaluation"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
