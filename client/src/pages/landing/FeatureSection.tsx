import FeatureList from "@/components/common/FeatureList";
import profileSectionImage from "@/assets/LandingFeatureSection/pofileSection.png";
import bookmarkSection from "@/assets/LandingFeatureSection/bookmarkSection.png";
import shareSectionImage from "@/assets/LandingFeatureSection/shareSection.png";
import { FaRegSave } from "react-icons/fa";
import { FaUniversalAccess } from "react-icons/fa6";
import { GiClick } from "react-icons/gi";
import { FaFireFlameCurved } from "react-icons/fa6";
import { TiGroup } from "react-icons/ti";
import { LuDatabaseZap } from "react-icons/lu";
import { FaFileCode, FaCode } from "react-icons/fa";
import AnimatedSection from "@/components/animations/ComponentEmergeAnimation";

const FeatureSection = () => {
  return (
    <div id="features" className="w-full max-w-6xl pt-24 flex flex-col justify-center items-center gap-32 md:gap-32 lg:gap-42">
      <AnimatedSection>
        <FeatureList
          title="Add an Experience, Empower a Peer"
          tagline="Your journey can light the way for someone else. Build a helpful placement community together."
          features={[
            "Upload your interview experience",
            "Prepare stratagies that work",
            "Stay ahead of the Curve",
          ]}
          icons={[LuDatabaseZap, FaFileCode, FaCode]}
          colors={["text-violet-400", "text-red-400", "text-green-400"]}
          image={shareSectionImage}
          contentOrder={`order-1`}
          imageOrder={`order-2`}
        />
      </AnimatedSection>

      <AnimatedSection>
        <FeatureList
          title="Improve Now, Prepare Better."
          tagline="Share and explore real interview experiences from seniors."
          features={[
            "Latest campus interview trends",
            "Technical and HR rounds insights",
            "Help the Hive thrive",
          ]}
          icons={[FaFireFlameCurved, TiGroup, FaRegSave]}
          colors={["text-orange-400", "text-red-400", "text-green-400"]}
          image={profileSectionImage}
          contentOrder={`order-1 md:order-2`}
          imageOrder={`order-2 md:order-1`}
        />
      </AnimatedSection>

      <AnimatedSection>
        <FeatureList
          title="Save for Later, Win Sooner"
          tagline="No more endless scrolling. Bookmark experiences that matter."
          features={[
            "Save any experience with one click",
            "Access it whenever you need a prep boost.",
          ]}
          icons={[GiClick, FaUniversalAccess]}
          colors={["text-green-400", "text-yellow-400", "text-red-400"]}
          image={bookmarkSection}
          contentOrder={`order-1`}
          imageOrder={`order-2`}
        />
      </AnimatedSection>

    </div>
  );
};

export default FeatureSection;
