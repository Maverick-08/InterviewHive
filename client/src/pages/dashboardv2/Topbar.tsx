// import { MdKeyboardArrowRight } from "react-icons/md";
import { BsLayoutSidebar } from "react-icons/bs";

const Topbar = ({
  isSideBarOpen,
  setIsSidebarOpen,
  componentTitle
}: {
  isSideBarOpen: boolean;
  setIsSidebarOpen: (x: boolean) => void;
  componentTitle:string
}) => {
  return (
    <div className="flex items-center gap-4 px-4 py-6 text-white border-b border-white/30">
      <div className="px-2 ">
        <BsLayoutSidebar onClick={() => setIsSidebarOpen(!isSideBarOpen)} className="text-blue-500 size-5" />
      </div>
      <div className="px-4 border-l md:flex items-center gap-4">
        <div className="font-semibold text-lg">{componentTitle}</div>
      </div>
    </div>
  );
};

export default Topbar;
