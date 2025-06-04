import FeatureSection from "./FeatureSection"
import HeroSection from "./HeroSection"
import Navbar from "./Navbar"

const Landing = () => {
  return (
    <div className="bg-[#111111] relative text-white/90">
        <div className="container mx-auto overflow-hidden">
            <Navbar />
            <HeroSection />
            <FeatureSection />
        </div>
    </div>
  )
}

export default Landing

