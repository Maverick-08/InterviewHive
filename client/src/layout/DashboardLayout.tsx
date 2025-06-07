import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";

const DashboardLayout = () => {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-r from-[#161616] to-black">
      {/* Navbar  */}
      <div className="absolute w-full flex justify-center items-center">
        <Navbar />
      </div>

      <div className="pt-8 w-full flex justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
