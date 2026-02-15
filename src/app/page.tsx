import ScrollUp from "@/components/Common/ScrollUp";
import Hero from "@/components/Hero";
import Project from "@/components/Project";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Venture Studio",
  description: "Present your venture to a community of students, alumni, and professionals — and get the feedback that matters.",
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Project />
    </>
  );
}
