import BlackButton from "@/components/common/BlackButton";
import Logo from "../../assets/logo.png";
import WhiteButton from "@/components/common/WhiteButton";

const Navbar = () => {
  return (
    <nav className="container flex justify-center px-2 md:px-8 pt-4 md:pt-6 fixed z-10 select-none">
      <div className="w-full md:max-w-6xl py-4 px-4 rounded-lg flex justify-between border border-gray-400/50 backdrop-blur-sm">
        
        <div className="flex items-center gap-2 sm:gap-4">
          <img src={Logo} alt="" className="h-8 w-8" />
          <span className="text-2xl font-mono font-bold">Interview-Hive</span>
        </div>

        <div className="hidden sm:flex gap-4 sm:gap-6 font-mono">
          <BlackButton text="Log In"/>
          <WhiteButton text="Sign Up"/>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
