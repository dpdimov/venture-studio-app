import { Project } from "@/types/project";
import { formatDate } from "@/lib/format-date";
import Image from "next/image";
import Link from "next/link";

const SingleProject = ({ project }: { project: Project }) => {
  const { id, title, image, shortDescription, createdBy, createdAt } = project;
  return (
    <div className="group relative mt-3 overflow-hidden rounded-card border border-gray-200 bg-white shadow-card transition duration-300 hover:shadow-card-hover">
      <Link
        href={`/venture-detail/${id}`}
        className="relative block aspect-[37/22] w-full"
      >
        {image?.src ? (
          <Image src={image.src} alt="image" fill className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-50">
            <span className="text-body-color">No Image</span>
          </div>
        )}
      </Link>
      <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
        <h3>
          <Link
            href={`/venture-detail/${id}`}
            className="mb-4 block font-serif text-xl font-bold text-black hover:text-primary sm:text-2xl"
          >
            {title}
          </Link>
        </h3>
        <p className="mb-6 line-clamp-3 border-b border-gray-200 pb-6 text-base font-light text-body-color">
          {shortDescription}
        </p>
        <div className="flex items-center">
          <div className="mr-5 flex items-center border-r border-gray-200 pr-5 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
            <div className="w-full">
              <h4 className="mb-1 text-sm font-medium text-black">
                By {createdBy?.name || "Community"}
              </h4>
            </div>
          </div>
          <div className="inline-block">
            <h4 className="mb-1 text-sm font-medium text-black">
              Date
            </h4>
            <p className="text-xs text-body-color">{formatDate(createdAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
