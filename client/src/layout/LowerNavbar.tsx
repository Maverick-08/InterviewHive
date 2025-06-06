import { RiDashboardFill } from "react-icons/ri";
import { FaBookmark } from "react-icons/fa6";
import { MdLibraryAdd } from "react-icons/md";
import NavigationLink from "@/components/common/NavigationLink";
import { useLocation, useNavigate } from "react-router-dom";

const LowerNavbar = () => {
  const location = useLocation().pathname;
  const navigate = useNavigate();
  return (
    <div className="w-full max-w-7xl px-4 flex justify-around md:justify-between items-center font-mono text-white sm:text-sm md:text-xl tracking-wide gap-2">
      
      {/* Dashboard Icon  */}
      <NavigationLink
        onClick={() => navigate("/dashboard")}
        className={`flex items-center gap-4 ${
          location.includes("dashboard")
            ? "text-[#3B82F6] bg-[#0F1831]"
            : "text-white"
        } hover:text-[#3B82F6] hover:bg-[#0F1831] rounded-sm p-3 cursor-pointer`}
        Icon={RiDashboardFill}
        iconStyle="h-8 sm:h-6 w-8 sm:w-6"
        linkName="All Interviews"
        linkStyle="hidden md:block"
      />

      {/* Add Interview Icon  */}
      <NavigationLink
        onClick={() => navigate("/share")}
        className={`flex items-center gap-4 ${
          location.includes("share")
            ? "text-[#3B82F6] bg-[#0F1831]"
            : "text-white"
        } hover:text-[#3B82F6] hover:bg-[#0F1831] rounded-sm p-3 cursor-pointer`}
        Icon={MdLibraryAdd}
        iconStyle="h-8 sm:h-6 w-8 sm:w-6"
        linkName="Add Interview Experience"
        linkStyle="hidden md:block"
      />

      {/* Save Interview Icon  */}
      <NavigationLink
        onClick={() => navigate("/save")}
        className={`flex items-center gap-4 ${
          location.includes("save")
            ? "text-[#3B82F6] bg-[#0F1831]"
            : "text-white"
        } hover:text-[#3B82F6] hover:bg-[#0F1831] rounded-sm p-3 cursor-pointer`}
        Icon={FaBookmark}
        iconStyle="h-8 sm:h-6 w-8 sm:w-6"
        linkName="Saved Items"
        linkStyle="hidden md:block"
      />
    </div>
  );
};

export default LowerNavbar;
