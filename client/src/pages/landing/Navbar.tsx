import BlackButton from "@/components/common/BlackButton";
import Logo from "../../assets/logo.png";
import WhiteButton from "@/components/common/WhiteButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { HashLink } from "react-router-hash-link";
import AnimatedSection from "@/components/animations/ComponentEmergeAnimation";

const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatedSection>
      <nav
        className={`w-full max-w-7xl fixed top-4 z-50  flex justify-center text-white transition-all duration-300 ease-in-out font-mono`}
      >
        <div
          className={`w-full py-4 px-4 border-[1px] border-neutral-800 rounded-xl backdrop-blur-lg flex items-center justify-between transition-all duration-300 ease-in-out ${
            isScrolled ? "my-4 max-w-6xl " : "my-2 max-w-7xl "
          }`}
        >
          <div
            onClick={() => navigate("/")}
            className="flex-2 flex items-center gap-2"
          >
            <HashLink smooth to={"#hero"}>
              <img
                src={Logo}
                alt=""
                className={`${isScrolled ? "h-8 w-8" : "h-6 w-6"}`}
              />
            </HashLink>
            <span className={`text-2xl ${isScrolled ? "hidden" : "block"}`}>
              Interview Hive
            </span>
          </div>

          <div className="flex-6 flex justify-center gap-8 text-lg">
            <div className="cursor-pointer hover:scale-125 duration-400">
              <HashLink smooth to="#features">
                Features
              </HashLink>
            </div>
            <div className="cursor-pointer hover:scale-125 duration-400">
              <HashLink smooth to="#companies">
                Companies
              </HashLink>
            </div>
            <div className="cursor-pointer hover:scale-125 duration-400">
              <span>Reviews</span>
            </div>
          </div>

          <div className="flex-2">
            <div className="flex gap-4">
              <BlackButton onClick={() => navigate("/login")} text="Login" />
              <WhiteButton text="Register" />
            </div>
          </div>
        </div>
      </nav>
    </AnimatedSection>
  );
};

export default Navbar;
