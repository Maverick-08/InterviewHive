import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import AnimatedSection from "@/components/animations/ComponentEmergeAnimation";
import SocialLink from "@/components/common/SocialLink";

const Footer = () => {
  return (
    <AnimatedSection>
      <div className="w-full flex justify-center border-t-[1px] border-neutral-700 py-8">
        <footer className="w-full max-w-7xl flex justify-between items-center  text-white ">
          {/* Socials  */}
          <div className="flex gap-6">
            <SocialLink
              className="flex"
              Icon={FaXTwitter}
              iconStyle="md:h-8 md:w-8"
              link="https://x.com/Maverick_0_8?t=EV5tvrrqFmYBjdkWnK7hsQ&s=09"
              linkName="Handle"
              linkStyle="hidden"
            />

            <SocialLink
              className="flex"
              Icon={FaLinkedin}
              iconStyle="md:h-8 md:w-8"
              link="http://www.linkedin.com/in/nitb-vivek-ojha"
              linkName="LinkedIn"
              linkStyle="hidden"
            />

            <SocialLink
              className="flex"
              Icon={FaGithubSquare}
              iconStyle="md:h-8 md:w-8"
              link="https://github.com/Maverick-08"
              linkName="GitHub"
              linkStyle="hidden"
            />
          </div>

          {/* Developers  */}
          <div>
            <div className="flex items-center gap-4 font-mono text-xl">
              <span>Developed with </span>
              <span className="text-red-600">
                <FaHeart className="h-8 w-8 animate-pulse" />
              </span>
              <span>by Vivek Ojha</span>
            </div>
          </div>
        </footer>
      </div>
    </AnimatedSection>
  );
};

export default Footer;
