import AnimatedSection from "@/components/animations/ComponentEmergeAnimation";
import Logo from "../../assets/logo.png";
import SocialLink from "@/components/common/SocialLink";
import { FaGithubSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFunction } from "@/utils/axiosRequest";
import Feedback from "./Feedback";
// import { useState } from "react";

const Footer = () => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)
  const navigate = useNavigate();
  useEffect(()=> {
    const systemsCheck = async () => {
      await getFunction("/api/");
    } 
    systemsCheck();
  },[])
  // const [isFeedbackFormOpen, setisFeedbackFormOpen] = useState(false);
  return (
    <AnimatedSection>
      <div className={`sm:flex w-full justify-between border-t-[1px] border-neutral-700 py-8 font-mono select-none ${isFeedbackOpen?"backdrop-blur-sm": "" }`}>
        <footer className="p-2 sm:p-0 w-full max-w-6xl mx-auto flex flex-col text-white gap-24">
          {/* Footer 1 */}
          <div className="flex flex-col md:flex-row justify-between">
            {/* Left */}
            <div className="justify-start flex flex-col gap-4">
              <div className="flex gap-1 text-2xl items-center italic bg-gradient-to-b from-gray-500 to-white bg-clip-text text-transparent">
                <img src={Logo} alt="footer" className="size-5" />
                <span>Interview Hive.</span>
              </div>
              <div>
                <p className="text-white/70 text-md max-w-md leading-6">
                  <span className="pr-1 inline-flex font-bold">
                    Interview Hive
                  </span>
                  is a web app designed to help college students prepare for
                  college placements. Recognise the trends, read the market,
                  skim through the interviews, prepare hard and smash that offer
                  Champ!
                </p>

                {/* Socials */}
                <div className="flex gap-4 p-2 mt-2 ml-0">
                  <SocialLink
                    className="flex"
                    Icon={FaXTwitter}
                    iconStyle="size-5 hover:text-blue-500"
                    link="https://x.com/Maverick_0_8?t=EV5tvrrqFmYBjdkWnK7hsQ&s=09"
                    linkName="Handle"
                    linkStyle="hidden"
                  />

                  <SocialLink
                    className="flex"
                    Icon={FaLinkedin}
                    iconStyle="size-5 hover:text-blue-500"
                    link="http://www.linkedin.com/in/nitb-vivek-ojha"
                    linkName="LinkedIn"
                    linkStyle="hidden"
                  />

                  <SocialLink
                    className="flex"
                    Icon={FaGithubSquare}
                    iconStyle="size-5 hover:text-blue-500"
                    link="https://github.com/Maverick-08"
                    linkName="GitHub"
                    linkStyle="hidden"
                  />
                </div>

                {/* All System Online and Copyright */}
                <div className="mt-4 gap-2 flex flex-col ">
                  <div className="w-fit flex rounded-full px-2 bg-[#333333] items-center gap-2">
                    <div className="relative">
                      <div className="bg-green-500 rounded-full h-2 w-2"></div>
                      <div className="absolute inset-0 bg-green-500 rounded-full h-2 w-2 animate-ping"></div>
                    </div>
                    <p className="text-sm  text-white/70">
                      All Systems Online.
                    </p>
                  </div>

                  <p className="text-xs text-white/30">
                    2025 Interview Hive. All rights reserved.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex p-4 gap-12">
              <div className="flex flex-col gap-2">
                <h1 className="text-lg md:text-2xl">Brewing.</h1>
                <a
                  
                  className="cursor-pointer text-sm md:text-md text-white/70"
                >
                  {" "}
                  Alumni Connect
                </a>
                <a
                  
                  className="cursor-pointer text-sm md:text-md text-white/70"
                >
                  {" "}
                  AI Analysis
                </a>
                <a
                  
                  className="cursor-pointer text-sm md:text-md text-white/70"
                >
                  {" "}
                  All Streams
                </a>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-lg md:text-2xl">Pages.</h1>
                <a
                  href="#features"
                  className="cursor-pointer text-sm md:text-md text-white/70"
                >
                  {" "}
                  Features
                </a>
                <a
                  onClick={() => navigate("/login")}
                  className="cursor-pointer text-sm md:text-md text-white/70"
                >
                  {" "}
                  Login
                </a>
                <a
                  onClick={() => navigate("/register")}
                  className="cursor-pointer text-sm md:text-md text-white/70"
                >
                  {" "}
                  Create Account
                </a>
                <a
                  // onClick={()=> setisFeedbackFormOpen(true)}
                  className="cursor-pointer text-sm md:text-md text-white/70"
                  onClick={()=>setIsFeedbackOpen(true)}
                >
                  {" "}
                  Contact Support
                </a>
                <Feedback open={isFeedbackOpen} onOpenChange={setIsFeedbackOpen} />
              </div>
            </div>
          </div>

          {/* Footer 2 */}
          <div className="hidden sm:block text-center">
            <p className="font-bold text-9xl bg-gradient-to-b from-transparent  to-teal-500/50 bg-clip-text text-transparent opacity-95 tracking-tight ">
              Interview Hive
            </p>
          </div>

        </footer>
      </div>
    </AnimatedSection>
  );
};

export default Footer;

