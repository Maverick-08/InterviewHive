import BlurText from "@/blocks/TextAnimations/BlurText/BlurText";
import TrueFocus from "@/blocks/TextAnimations/TrueFocus/TrueFocus";
import BlackButton from "@/components/common/BlackButton";
import WhiteButton from "@/components/common/WhiteButton";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className="container h-[200vh] pt-30 sm:pt-36 md:pt-42 selection:bg-neutral-300 selection:text-neutral-900">
      <div className="flex flex-col justify-center items-center text-center gap-6 md:gap-10 ">
        <BlurText
          text="For Developers by a Developer"
          className="text-xl font-mono tracking-wide"
        />

        <div className="text-center space-y-1 md:space-y-2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-b from-neutral-200 to-neutral-400 text-transparent bg-clip-text">
          <p className="font-mono font-bold">Elevate Your Interview</p>
          <p className="font-mono font-bold">Preparation With</p>
        </div>

        <div >
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
          <BlackButton text="Try Interview Hive" className="hidden md:block font-mono text-xs md:text-lg" onClick={()=>navigate("/login")}/>
          <WhiteButton text="Explore Now" className="font-mono text-xs md:text-lg" onClick={()=>navigate("/")}/>
        </div>
      </div>
    </div>
  );
};



export default HeroSection;
