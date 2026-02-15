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
      </div>
    </section>
  );
};

export default Project;
