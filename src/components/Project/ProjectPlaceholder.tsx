const ProjectPlaceholder = () => {
  return (
    <div className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3">
      <div className="group relative mt-3 overflow-hidden rounded-sm bg-white shadow-one dark:bg-dark">
        <div className="relative block aspect-[37/22] w-full animate-pulse bg-gray-200 dark:bg-gray-700"></div>
        <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
          <div className="mb-4 h-6 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
          <div className="mb-6 space-y-2 border-b border-body-color border-opacity-10 pb-6 dark:border-white dark:border-opacity-10">
            <div className="h-4 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div className="flex items-center">
            <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="ml-4 h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPlaceholder;
