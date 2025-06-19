import SidebarIcon from "../../assets/sidebarIcon.png";
import { MdKeyboardArrowRight } from "react-icons/md";

const Topbar = ({
  isSideBarOpen,
  setIsSidebarOpen,
}: {
  isSideBarOpen: boolean;
  setIsSidebarOpen: (x: boolean) => void;
}) => {
  return (
    <div className="flex items-center gap-4 px-4 py-6 text-white border-b">
      <div className="px-4 border-r">
        <img
          onClick={() => setIsSidebarOpen(!isSideBarOpen)}
          src={SidebarIcon}
          alt=""
          className="h-6 w-6 cursor-pointer"
        />
      </div>
      <div className="flex items-center gap-4">
        <div>Interview Hive</div>
        <MdKeyboardArrowRight className="h-6 w-6" />
        <div>Dashboard</div>
      </div>
    </div>
  );
};

export default Topbar;
