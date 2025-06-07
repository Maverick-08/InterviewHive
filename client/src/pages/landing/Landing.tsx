import FeatureSection from "./FeatureSection";
import HeroSection from "./HeroSection";
import Navbar from "./Navbar";
import OrbitalSection from "./OrbitalSection";

const Landing = () => {
  return (
    <div className="w-full h-full bg-gradient-to-r from-[#161616] to-black">
      <div className="relative w-full flex flex-col justify-center items-center">
        <Navbar />
        <HeroSection />
        <FeatureSection />
        <OrbitalSection />
      </div>
    </div>
  );
};

export default Landing;
