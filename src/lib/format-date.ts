export function formatDate(date: string | Date, style: "long" | "short" = "long") {
  const d = new Date(date);
  if (style === "short") {
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
