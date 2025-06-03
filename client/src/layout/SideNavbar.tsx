import { RiDashboardFill } from "react-icons/ri";
import { FaBookmark } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { MdLibraryAdd } from "react-icons/md";
import { useState } from "react";

const SideNavbar = () => {
  const [isTabOpen, setIsTabOpen] = useState(false);
  return (
    <div
      className={`h-full flex flex-col px-4 ${
        isTabOpen ? "w-82" : "w-16"
      } bg-[#111111] text-white border-r-[1px] border-neutral-500/90 select-none transition-all duration-300 ease-in-out overflow-hidden`}
    >
      <div className="flex-1 pb-0.5 flex items-center gap-4 border-neutral-500/90 transition-all duration-300 ease-in">
        {isTabOpen ? (
          <span onClick={()=>setIsTabOpen(prev=>!prev)}>
            <FaArrowLeft className="h-6 w-6 cursor-pointer" />
          </span>
        ) : (
          <span onClick={()=>setIsTabOpen(prev=>!prev)}>
            <FaArrowRight className="h-6 w-6 cursor-pointer" />
          </span>
        )}
        <span className={`${isTabOpen ? "block" : "hidden"} text-2xl font-mono font-semibold`}>Menu</span>
      </div>

      <div className="flex-9 pt-8 flex flex-col text-xl font-mono  gap-16">
        <div className="flex items-center gap-4">
          <span>
            <RiDashboardFill className="h-6 w-6" />
          </span>
          <span className={`${isTabOpen ? "block" : "hidden"}`}>All Interviews</span>
        </div>
        <div className="flex items-center gap-4">
          <span>
            <MdLibraryAdd className="h-6 w-6" />
          </span>
          <span className={`${isTabOpen ? "block" : "hidden"}`}>Add Interview Experience</span>
        </div>
        <div className="flex items-center gap-4">
          <span>
            <FaBookmark className="h-6 w-6" />
          </span>
          <span className={`${isTabOpen ? "block" : "hidden"}`}>Saved Items</span>
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
