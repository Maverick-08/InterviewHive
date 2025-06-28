import BlurText from "@/blocks/TextAnimations/BlurText/BlurText";
import TrueFocus from "@/blocks/TextAnimations/TrueFocus/TrueFocus";
import BlackButton from "@/components/common/BlackButton";
import WhiteButton from "@/components/common/WhiteButton";
import { useNavigate } from "react-router-dom";
import HeroSectionImage from "../../assets/heroSection2.png";
import AnimatedSection from "@/components/animations/ComponentEmergeAnimation";
import { CiSearch } from "react-icons/ci";
import { IoIosRefresh } from "react-icons/io";
import { HashLink } from "react-router-hash-link";
import { useAuthStore } from "@/store/authStore";

const HeroSection = () => {
  const navigate = useNavigate();
  const authState = useAuthStore((state) => state.authState);
  return (
    <div
      id="hero"
      className="w-full max-w-6xl pt-32 selection:bg-neutral-300 selection:text-neutral-900 text-white"
    >
      <div className="flex flex-col justify-center items-center text-center gap-6 md:gap-10 ">
        <BlurText
          text="For Developers by a Developer"
          className="text-xl font-mono tracking-wide"
        />

        <div className="text-center space-y-1 md:space-y-2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-b from-neutral-200 to-neutral-400 text-transparent bg-clip-text">
          <p className="font-mono font-bold">Elevate Your Interview</p>
          <p className="font-mono font-bold">Preparation With</p>
        </div>

        <div>
          <TrueFocus
            sentence="Interview Hive"
            borderColor="rgb(14 165 233)"
            textSize={`text-4xl sm:text-4xl md:text-5xl lg:text-7xl`}
          />
        </div>
        <div className="mt-4 font-mono text-lg sm:text-xl md:text-2xl text-center text-neutral-400">
          <p>Built for devs, driven by experience — master your interviews </p>
          <p>with clarity, focus, and real-world questions.</p>
        </div>

        <div className="flex px-2 gap-2 md:gap-8 select-none">
          <BlackButton
            text="Try Interview Hive"
            className="hidden md:block font-mono text-xs md:text-lg hover:scale-110 transition-all duration-300"
            onClick={() => {
              setTimeout(() => {
                if (authState) {
                  navigate("/dashboard");
                } else {
                  navigate("/login");
                }
              }, 250);
            }}
          />

          <HashLink smooth={true} to={"#features"}>
            {" "}
            <WhiteButton
              text="Explore Now"
              className="hidden md:block font-mono text-xs md:text-lg hover:scale-110 transition-all duration-300"
            />
          </HashLink>

          <WhiteButton
            text="Explore Now"
            className="block md:hidden font-mono text-lg"
            onClick={() => navigate("/login")}
          />
        </div>

        {/* Mac experience */}
        <AnimatedSection>
          <div className="w-full py-4 md:py-10 px-2">
            <div className="flex flex-col m-3 md:m-0 ">
              {/* Navbar */}
              <div className="flex bg-[#333333] rounded-t-2xl px-1 py-1 md:px-4 md:py-2">
                {/* Buttons */}
                <div className="flex items-center gap-2 py-2">
                  <span className="bg-red-500 rounded-full md:h-3 md:w-3"></span>
                  <span className="bg-yellow-500 rounded-full md:h-3 md:w-3"></span>
                  <span className="bg-green-500 rounded-full md:h-3 md:w-3"></span>
                </div>

                {/* Search Bar */}
                <div className="w-full flex items-between justify-center ">
                  <div className="flex bg-[#222222] px-1 py-0 rounded-sm items-center">
                    <span>
                      <CiSearch className="size-3 md:size-5" />
                    </span>
                    <div className="px-2 md:px-16">
                      <a href="https://interview-hive-five.vercel.app/">
                        <span className="overflow-hidden font-mono text-xs md:text-md md:text-lg">
                          https://InterviewHive.com
                        </span>
                      </a>
                    </div>
                    <span>
                      <IoIosRefresh className="size-3 md:size-5" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="bg-[#222222] p-1">
                <img
                  src={HeroSectionImage}
                  alt=""
                  className="mt-1 rounded-2xl"
                />
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default HeroSection;
