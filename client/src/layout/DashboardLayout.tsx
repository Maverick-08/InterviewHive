import { Outlet } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar";
import LowerNavbar from "./LowerNavbar";
// import SideNavbar from "./SideNavbar";

const DashboardLayout = () => {
  return (
    <div className="relative min-h-screen bg-[#111111]">
      {/* Top Navbar  */}
      <div className="fixed top-0 w-full flex justify-center items-center py-4 border-b-[1px] border-neutral-500/90 backdrop-blur-lg">
        <DashboardNavbar />
      </div>

      {/* Side Navbar  */}
      {/* <div className="hidden lg:block fixed z-50 left-0 h-screen">
        <SideNavbar />
      </div> */}

      {/* Lower Navbar  */}
      <div className="lg:hidden fixed bottom-0 w-full py-4 flex justify-center items-center bg-[#111111]">
        <LowerNavbar />
      </div>

      {/* Content  */}
      <div className="pt-20 flex justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
