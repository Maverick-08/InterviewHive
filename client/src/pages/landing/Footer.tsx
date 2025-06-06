import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import AnimatedSection from "@/components/animations/ComponentEmergeAnimation";

const Footer = () => {
  return (
    <AnimatedSection>
      <footer className="pt-10 lg:mt-14 mx-2 px-4 py-5 border-t-2 border-neutral-700">
        {/* //Upper Section of the div */}
        <div className="flex justify-center md:justify-between animate-fade-in-up">
          <div className="hidden pt-1 md:flex gap-4">
            
            <div className="flex gap-2 items-center">
              <a
              href="https://x.com/Maverick_0_8?t=EV5tvrrqFmYBjdkWnK7hsQ&s=09"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              >
              <FaXTwitter className="h-6 w-7 transition-transform duration-300 hover:scale-110 hover:text-blue-600" />
              </a>
              <a
              href="http://www.linkedin.com/in/nitb-vivek-ojha"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              >
              <FaLinkedin className="h-6 w-7 transition-transform duration-300 hover:scale-110 hover:text-blue-600" />
              </a>
              <a
              href="https://github.com/Maverick-08"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              >
              <FaGithubSquare className="h-7 w-8 transition-transform duration-300 hover:scale-110 hover:text-blue-600" />
              </a>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-mono font-bold text-xl bg-gradient-to-b from-neutral-400 via-neutral-500 to-neutral-700 bg-clip-text text-transparent">
              Developed with
            </p>
            <div className="relative">
              <FaHeart className="h-7 w-5 text-red-500 animate-pulse" />
            </div>
            <p className="font-mono font-bold text-xl bg-gradient-to-b from-neutral-400 via-neutral-500 to-neutral-700 bg-clip-text text-transparent">
              by Vivek.
            </p>
          </div>
        </div>
      </footer>
    </AnimatedSection>
  );
};

export default Footer;
