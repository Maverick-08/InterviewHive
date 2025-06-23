import DateNow from "@/components/common/DateNow";
import { BsLayoutSidebar } from "react-icons/bs";
import { useLocation } from "react-router-dom";

const Topbar = ({
  isSideBarOpen,
  setIsSidebarOpen,
}: {
  isSideBarOpen: boolean;
  setIsSidebarOpen: (x: boolean) => void;
}) => {
  // location.pathname = "/dashboard"
    let location = useLocation().pathname.split("/")[1];
    location = location.slice(0,1).toUpperCase() + location.slice(1);
  return (
    <div className="sm:flex items-center justify-between gap-4 px-4 py-5.5 text-white border-b border-white/30">
      <div className="flex items-center gap-2">
        <div className="px-2 ">
        <BsLayoutSidebar onClick={() => setIsSidebarOpen(!isSideBarOpen)} className="cursor-pointer text-blue-500 size-5" />
      </div>
      <div className="px-4 border-l md:flex items-center gap-4">
        <div className="font-semibold text-lg ">{location}</div>
      </div>
      </div>

      {/* Live Date */}
      <div className="mt-1 sm:mt-0 w-fit px-2 flex gap-2 items-center rounded-full">
        <div className="relative">
          <div className=" h-2 w-2 rounded-full bg-blue-400"></div>
          <div className="absolute inset-0 h-2 w-2 rounded-full bg-blue-400 animate-ping"></div>
        </div>
        {/* Commons */}
        <DateNow />
      </div>
    </div>
  );
};

export default Topbar;
