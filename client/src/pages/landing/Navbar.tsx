import BlackButton from "@/components/common/BlackButton";
import Logo from "../../assets/logo.png";
import WhiteButton from "@/components/common/WhiteButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { HashLink } from "react-router-hash-link";
import { FiMenu } from "react-icons/fi";
import AnimatedSection from "@/components/animations/ComponentEmergeAnimation";
import { useAuthStore } from "@/store/authStore";
import { useUserStore } from "@/store/userStore";
import Doodle from "@/assets/doodle.png";

const avatarMap = new Map();
avatarMap.set("Doodle", Doodle);

const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavigationMenuOpen, setIsNavigationMenuOpen] = useState(false);
  const authState = useAuthStore((state) => state.authState);
  const username = useUserStore((state) => state.username);
  const avatar = useUserStore((state) => state.avatar);

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
        className={`w-full max-w-7xl px-4 fixed top-4 z-50  flex justify-center text-white transition-all duration-500 ease-in-out font-mono`}
      >
        <div
          className={`w-full px-1 py-1 sm:px-4 sm:py-4 {${
            isNavigationMenuOpen ? "" : ""
          }} border-[1px] border-neutral-800 rounded-sm lg:rounded-xl backdrop-blur-lg flex items-center justify-between transition-all duration-500 ease-in-out ${
            isScrolled
              ? "my-4 max-w-4xl lg:max-w-5xl xl:max-w-6xl "
              : "my-2 max-w-7xl "
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
                className={`${
                  isScrolled ? "h-6 w-6 sm:h-8 sm:w-8" : "h-6 w-6"
                }`}
              />
            </HashLink>
            <span
              className={`text-xl sm:text-2xl ${
                isScrolled ? "lg:hidden" : "block"
              }`}
            >
              Interview Hive
            </span>
          </div>

          <div className="flex-4 xl:flex-6 hidden lg:flex justify-center gap-8 text-lg">
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

          <div className="flex-2 hidden lg:block">
            {authState ? (
              <div onClick={()=>navigate("/profile")} className="flex items-center gap-4 cursor-pointer">
                <img
                  src={avatarMap.get(avatar) ? avatarMap.get(avatar) : Doodle}
                  alt="Avatar"
                  className="rounded-full h-12 w-12 border-2 border-sky-500"
                ></img>
                <span className="text-lg">{username}</span>
              </div>
            ) : (
              <div className="flex gap-4">
                <BlackButton onClick={() => navigate("/login")} text="Login" />
                <WhiteButton
                  onClick={() => navigate("/register")}
                  text="Register"
                />
              </div>
            )}
          </div>

          <div
            onClick={() => setIsNavigationMenuOpen((prev) => !prev)}
            className="relative block lg:hidden"
          >
            <span>
              <FiMenu
                className={`h-6 w-6 ${
                  isNavigationMenuOpen ? "opacity-80" : "opacity-100"
                }`}
              />
            </span>
          </div>
        </div>
      </nav>
      {isNavigationMenuOpen && (
        <div
          className={`fixed block lg:hidden w-full max-w-4xl  ${
            isScrolled ? "mt-20 sm:mt-[104px]" : "mt-16 sm:mt-24"
          } z-50 transition-all ease-in duration-500 text-neutral-400 bg-black/10 backdrop-blur-lg font-mono`}
        >
          <div className="pt-4 pb-8 w-full flex flex-col items-center justify-center gap-4">
            <div onClick={() => setIsNavigationMenuOpen(false)}>
              <HashLink smooth to="#features">
                <p>Features</p>
              </HashLink>
            </div>

            <div onClick={() => setIsNavigationMenuOpen(false)}>
              <HashLink smooth to="#companies">
                <p>Companies</p>
              </HashLink>
            </div>

            <div onClick={() => setIsNavigationMenuOpen(false)}>
              <HashLink smooth to="#reviews">
                <p>Reviews</p>
              </HashLink>
            </div>

            <div className="w-full px-4 flex flex-col sm:flex-row items-center gap-4">
              <BlackButton
                onClick={() => navigate("/login")}
                text="Login"
                className="w-full"
              />
              <WhiteButton
                onClick={() => navigate("/register")}
                text="Register"
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}
    </AnimatedSection>
  );
};

export default Navbar;
