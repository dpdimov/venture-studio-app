"use client";

import { useState, useEffect } from "react";
import { Project } from "@/types/project";
import { formatDate } from "@/lib/format-date";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const ProjectDetailPage = ({ project_id }: { project_id: string }) => {
  const searchParams = useSearchParams();
  const [project, setProject] = useState<Project>();
  const [isLoading, setIsLoading] = useState(true);
  const privateKey = searchParams.get("private_key");

  useEffect(() => {
    const fetchProject = async () => {
      if (!project_id) {
        window.location.href = "/";
        return;
      }
      try {
        let url = `/api/projects/${project_id}`;
        if (privateKey) url += `?private_key=${privateKey}`;
        const response = await fetch(url);
        if (!response.ok) {
          window.location.href = "/";
          return;
        }
        const data = await response.json();
        setProject(data);
      } catch {
        window.location.href = "/";
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [project_id, privateKey]);

  const pitchSections = project
    ? [
        { title: "Problem", content: project.problem },
        { title: "Solution", content: project.solution },
        { title: "Product", content: project.product },
        { title: "Competitive Advantage", content: project.advantage },
        { title: "Market", content: project.market },
        { title: "Vision", content: project.vision },
        { title: "Team", content: project.team },
        { title: "Funding", content: project.funding },
        { title: "Next Milestone", content: project.nextMilestone },
      ].filter((s) => s.content)
    : [];

  return (
    <>
      <section className="pb-[120px] pt-[150px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            {isLoading ? (
              <div className="loader-container">
                <div className="loader">
                  <div>
                    <ul>
                      {[...Array(6)].map((_, i) => (
                        <li key={i}>
                          <svg fill="currentColor" viewBox="0 0 90 120">
                            <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
                          </svg>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <span>Loading</span>
                </div>
              </div>
            ) : (
              project && (
                <div className="w-full px-4 lg:w-8/12">
                  <div>
                    <h2 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight">
                      {project.title}
                    </h2>
                    <div className="mb-10 flex flex-wrap items-center justify-between border-b border-body-color border-opacity-10 pb-4 dark:border-white dark:border-opacity-10">
                      <div className="flex flex-wrap items-center">
                        <div className="mb-5 mr-10 flex items-center">
                          <div className="w-full">
                            <span className="mb-1 text-base font-medium text-body-color">
                              By <span>{project.createdBy?.name}</span>
                            </span>
                          </div>
                        </div>
                        <div className="mb-5 flex items-center">
                          <p className="mr-5 flex items-center text-base font-medium text-body-color">
                            <span className="mr-3">
                              <svg width="15" height="15" viewBox="0 0 15 15" className="fill-current">
                                <path d="M3.89531 8.67529H3.10666C2.96327 8.67529 2.86768 8.77089 2.86768 8.91428V9.67904C2.86768 9.82243 2.96327 9.91802 3.10666 9.91802H3.89531C4.03871 9.91802 4.1343 9.82243 4.1343 9.67904V8.91428C4.1343 8.77089 4.03871 8.67529 3.89531 8.67529Z" />
                                <path d="M13.2637 3.3697H7.64754V2.58105C8.19721 2.43765 8.62738 1.91189 8.62738 1.31442C8.62738 0.597464 8.02992 0 7.28906 0C6.54821 0 5.95074 0.597464 5.95074 1.31442C5.95074 1.91189 6.35702 2.41376 6.93058 2.58105V3.3697H1.31442C0.597464 3.3697 0 3.96716 0 4.68412V13.2637C0 13.9807 0.597464 14.5781 1.31442 14.5781H13.2637C13.9807 14.5781 14.5781 13.9807 14.5781 13.2637V4.68412C14.5781 3.96716 13.9807 3.3697 13.2637 3.3697ZM6.6677 1.31442C6.6677 0.979841 6.93058 0.716957 7.28906 0.716957C7.62364 0.716957 7.91042 0.979841 7.91042 1.31442C7.91042 1.649 7.64754 1.91189 7.28906 1.91189C6.95448 1.91189 6.6677 1.6251 6.6677 1.31442ZM1.31442 4.08665H13.2637C13.5983 4.08665 13.8612 4.34954 13.8612 4.68412V6.45261H0.716957V4.68412C0.716957 4.34954 0.979841 4.08665 1.31442 4.08665ZM13.2637 13.8612H1.31442C0.979841 13.8612 0.716957 13.5983 0.716957 13.2637V7.16957H13.8612V13.2637C13.8612 13.5983 13.5983 13.8612 13.2637 13.8612Z" />
                              </svg>
                            </span>
                            {formatDate(project.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="mb-10 w-full overflow-hidden rounded">
                        {project.video?.id ? (
                          <>
                            {project.video.source === "youtube" && (
                              <iframe
                                src={`https://www.youtube.com/embed/${project.video.id}`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                className="aspect-video w-full"
                              />
                            )}
                            {project.video.source === "vimeo" && (
                              <iframe
                                src={`https://player.vimeo.com/video/${project.video.id}`}
                                allow="autoplay; fullscreen; picture-in-picture"
                                className="aspect-video w-full"
                              />
                            )}
                          </>
                        ) : (
                          <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                            {project.image?.src ? (
                              <Image
                                src={project.image.src}
                                alt="image"
                                fill
                                className="object-cover object-center"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-700">
                                <span className="text-body-color">No Image</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      {project.shortDescription && (
                        <div className="mb-4 text-base !leading-relaxed text-body-color">
                          {project.shortDescription}
                        </div>
                      )}
                      {pitchSections.map(({ title, content }) => (
                        <div key={title}>
                          <h3 className="mb-2 mt-4 text-xl font-bold capitalize text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                            {title}
                          </h3>
                          <p className="text-base !leading-relaxed text-body-color">
                            {content}
                          </p>
                        </div>
                      ))}
                      {project.attachments && project.attachments.length > 0 && (
                        <>
                          <h3 className="mb-2 mt-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                            Project Attachments
                          </h3>
                          {project.attachments.map((attachment, idx) => (
                            <a key={idx} href={attachment.src} target="_blank" rel="noopener noreferrer">
                              <p className="text-base italic text-body-color underline dark:text-white">
                                {attachment.title || `Attachment #${idx + 1}`}
                              </p>
                            </a>
                          ))}
                        </>
                      )}
                      {project.surveyEnabled && (
                        <div className="mt-6 py-4">
                          <Link
                            href={`/venture-detail/${project.id}/survey${privateKey ? "?private_key=" + privateKey : ""}`}
                            className="rounded-sm bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
                          >
                            Evaluate
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectDetailPage;
