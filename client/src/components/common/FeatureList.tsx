import type { IconType } from "react-icons";
import { cn } from "@/lib/utils";

interface FeatureProps {
  title: string;
  tagline: string;
  features: string[];
  icons: IconType[];
  colors: string[];
  image: string;
  contentOrder: string;
  imageOrder: string;
}

const FeatureList = ({
  title,
  tagline,
  features,
  icons,
  image,
  colors,
  contentOrder,
  imageOrder,
  
}: FeatureProps) => {
  return (
    <div className=" w-full max-w-7xl flex flex-col md:flex-row ">
      {/* content  */}
      <div
        className={cn(`lg:pt-6 md:pt-8 px-4 flex-6 ${contentOrder}`)}
      >
        {/* Title  */}
        <div className="border-l-8 border-neutral-600 px-1">
          <p className="font-mono text-neutral-300 text-xl md:text-2xl lg:text-3xl">
            {title}
          </p>
        </div>

        {/* Tagline  */}
        <div className="pt-2">
          <p className="font-mono text-neutral-600 text-md md:text-xl lg:text-2xl">
            {tagline}
          </p>
        </div>

        <div className=" pl-2 md:pl-8 pt-4 flex flex-col gap-4">
          {features.map((feature, index) => {
            const Icon = icons[index];
            return (
              <div key={index} className="flex items-center gap-2">
                <span className={`${colors[index]}`}>
                  <Icon className="h-3 w-3 md:h-6 md:w-6" />
                </span>
                <span className="font-mono text-xs md:text-md lg:text-lg text-neutral-400">
                  {feature}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Image  */}
      <div
        className={cn(
          `mt-10 md:mt-6 lg:mt-0  mx-10 md:mx-6 items-center justify-between flex-4 rounded-lg md:overflow-hidden ${imageOrder}`
        )}
      >
        <img
          src={image}
          alt="Code Image"
          className="h-full w-auto rounded-lg"
        />
      </div>
    </div>
  );
};

export default FeatureList;
