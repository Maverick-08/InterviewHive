import AnimatedSection from "@/components/animations/ComponentEmergeAnimation";
import OrbitalAnimation from "@/components/animations/OrbitalAnimation";

const OrbitalSection = () => {
  return (
    <div id="companies" className="w-full max-w-6xl px-8 my-20 lg:pt-24">
      <AnimatedSection>
        <div className="flex flex-row md:gap-3">
          <div className="bg-[#333333 lg:pl-4">
            <OrbitalAnimation />
          </div>

          <div className="p-4 rounded-md items-center lg:pl-20 lg:pt-26 md:pt-32 font-mono font-bold">
            <div className=" text-xl lg:text-2xl text-neutral-200 hover:text-zinc-400 rounded-md lg:mt-16">
              Wanna get placed?
            </div>
            <div className="sm:text-md text-3xl text-neutral-200 hover:text-zinc-400">
              Give{" "}
              <span className="sm:text-md text-yellow-300 hover:text-yellow-400 font-comic ">
                Interview Hive
              </span>{" "}
              a shot!
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default OrbitalSection;
