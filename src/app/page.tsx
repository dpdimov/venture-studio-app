import ScrollUp from "@/components/Common/ScrollUp";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Project from "@/components/Project";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Venture Studio",
  description: "Unleash Innovation — Bring your venture ideas to life.",
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      <Project />
    </>
  );
}
