import Breadcrumb from "@/components/Common/Breadcrumb";
import AllProjects from "@/components/Project/AllProjects";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ventures | Venture Studio",
  description: "Explore all ventures on Venture Studio.",
};

const VenturesPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Explore Ventures"
        description="Discover innovative ventures from our community."
      />
      <section className="pb-[120px] pt-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            <AllProjects />
          </div>
        </div>
      </section>
    </>
  );
};

export default VenturesPage;
