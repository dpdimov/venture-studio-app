"use client";

import { useState, useEffect } from "react";
import ProjectPlaceholder from "./ProjectPlaceholder";
import SingleProject from "./SingleProject";
import Image from "next/image";
import { Project } from "@/types/project";

const AllProjects = ({
  className = "w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3",
  placeholder = true,
  limit,
}: {
  className?: string;
  placeholder?: boolean;
  limit?: number;
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        let url = "/api/projects";
        if (limit) url += `?limit=${limit}`;
        const response = await fetch(url);
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [limit]);

  if (isLoading && placeholder) {
    return (
      <>
        <ProjectPlaceholder />
        <ProjectPlaceholder />
        <ProjectPlaceholder />
      </>
    );
  } else if (projects.length === 0)
    return (
      <>
        <div></div>
        <div className="flex w-full flex-col items-center">
          <Image
            alt="Not Found"
            src="/not_found.png"
            width={200}
            height={200}
          />
          <p className="mt-3 flex items-center text-base font-light text-body-color">
            Sorry, there are no projects to show.
          </p>
        </div>
        <div></div>
      </>
    );
  return projects.map((project) => (
    <div key={project.id} className={className}>
      <SingleProject project={project} />
    </div>
  ));
};

export default AllProjects;
