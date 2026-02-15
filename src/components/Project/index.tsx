import Link from "next/link";
import SectionTitle from "../Common/SectionTitle";
import AllProjects from "./AllProjects";

const Project = () => {
  return (
    <section id="projects" className="bg-primary bg-opacity-5 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Latest Ventures"
          paragraph="Explore the latest ventures from our community."
          center
        />
        <div className="-mx-4 flex flex-wrap justify-center">
          <AllProjects limit={3} />
        </div>
        <div className="mt-10 flex justify-center">
          <Link
            href="/ventures"
            className="inline-flex items-center gap-2 rounded-card border border-gray-200 bg-white px-8 py-3 text-sm font-semibold text-primary shadow-card transition hover:border-primary/30 hover:shadow-card-hover"
          >
            See all ventures
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Project;
