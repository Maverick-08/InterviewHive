import { RiDashboardFill } from "react-icons/ri";
import { FaBookmark } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { MdLibraryAdd } from "react-icons/md";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavigationLink from "@/components/common/NavigationLink";

const SideNavbar = () => {
  const [isTabOpen, setIsTabOpen] = useState(false);
  const location = useLocation().pathname;
  const navigate = useNavigate();

  return (
    <div
      className={`h-full flex flex-col ${
        isTabOpen ? "w-[370px]" : "w-16"
      } bg-[#111111] text-white border-r-[1px] border-neutral-500/90 select-none transition-all duration-300 ease-in-out overflow-hidden`}
    >
       {/* Menu Icon  */}
      <NavigationLink
        onClick={() => setIsTabOpen((prev) => !prev)}
        className={`w-full px-2 flex-1 flex items-center gap-4 cursor-pointer`}
        Icon={isTabOpen ? FaArrowLeft : FaArrowRight}
        iconContainerStyle={`hover:text-[#3B82F6] hover:bg-[#0F1831] rounded-sm p-2`}
        linkName="Menue"
        linkStyle={`${
          isTabOpen ? "block" : "hidden"
        } text-2xl font-mono font-semibold`}
      />

      <div
        className={`w-full flex-9 pt-8 px-2 flex flex-col ${
          isTabOpen ? "items-start" : "items-center"
        } text-xl font-mono gap-16`}
      >
        {/* Dashboard Icon  */}
        <NavigationLink
          onClick={() => navigate("/dashboard")}
          className={`relative w-full flex items-center gap-4 ${
            location.includes("dashboard")
              ? "text-[#3B82F6] bg-[#0F1831]"
              : "text-white"
          } hover:text-[#3B82F6] hover:bg-[#0F1831] rounded-sm p-3 cursor-pointer`}
          Icon={RiDashboardFill}
          linkName="All Interviews"
          linkStyle={`pl-10 fixed z-[60] ${isTabOpen ? "block" : "hidden"}`}
        />

        {/* Add Interview Icon  */}
        <NavigationLink
          onClick={() => navigate("/share")}
          className={`relative w-full flex items-center gap-4 ${
            location.includes("share")
              ? "text-[#3B82F6] bg-[#0F1831]"
              : "text-white"
          } hover:text-[#3B82F6] hover:bg-[#0F1831] rounded-sm p-3 cursor-pointer`}
          Icon={MdLibraryAdd}
          linkName="Add Interview Experience"
          linkStyle={`pl-10 fixed z-[60] ${isTabOpen ? "block" : "hidden"}`}
        />

        {/* Save Interview Icon  */}
        <NavigationLink
          onClick={() => navigate("/save")}
          className={`relative w-full flex items-center gap-4 ${
            location.includes("save")
              ? "text-[#3B82F6] bg-[#0F1831]"
              : "text-white"
          } hover:text-[#3B82F6] hover:bg-[#0F1831] rounded-sm p-3 cursor-pointer`}
          Icon={FaBookmark}
          linkName="Saved Items"
          linkStyle={`pl-10 fixed z-[60] ${isTabOpen ? "block" : "hidden"}`}
        />
      </div>
    </div>
  );
};

export default SideNavbar;
