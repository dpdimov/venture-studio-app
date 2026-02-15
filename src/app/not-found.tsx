import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative z-10 pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[530px] text-center">
              <div className="mx-auto mb-9 text-center text-[120px] font-bold text-primary opacity-50">
                404
              </div>
              <h3 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl">
                Sorry, the page can&apos;t be found
              </h3>
              <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                The page you were looking for appears to have been moved,
                deleted or does not exist.
              </p>
              <Link
                href="/"
                className="rounded-md bg-primary px-8 py-3 text-base font-bold text-white shadow-signUp duration-300 hover:bg-white hover:text-primary md:px-9 lg:px-8 xl:px-9"
              >
                Back to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
