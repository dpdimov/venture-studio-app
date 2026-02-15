import { Feature } from "@/types/feature";

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { icon, title, paragraph } = feature;
  return (
    <div className="w-full px-4 md:w-1/2 lg:w-1/3">
      <div className="mb-12 text-center lg:mb-0">
        <div className="mx-auto mb-10 flex h-[70px] w-[70px] items-center justify-center rounded-card bg-primary/10 text-primary">
          {icon}
        </div>
        <h3 className="mb-5 font-serif text-xl font-bold text-black sm:text-2xl lg:text-xl xl:text-2xl">
          {title}
        </h3>
        <p className="pr-[10px] text-base font-medium leading-relaxed text-body-color">
          {paragraph}
        </p>
      </div>
    </div>
  );
};

export default SingleFeature;
