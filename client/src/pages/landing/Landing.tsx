import FeatureSection from "./FeatureSection"
import Footer from "./Footer"
import HeroSection from "./HeroSection"
import Navbar from "./Navbar"
import OrbitalSection from "./OrbitalSection"

const Landing = () => {
  return (
    <div className="bg-[#111111] relative text-white/90">
        <div className="container mx-auto overflow-hidden">
            <Navbar />
            <HeroSection />
            <FeatureSection />
            <OrbitalSection />
            <Footer />
         </div>
    </div>
  )
}

export default Landing

