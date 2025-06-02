import { Outlet } from "react-router-dom";
import { RiDashboardFill } from "react-icons/ri";
import { LuNotebookPen } from "react-icons/lu";
import { FaBookmark } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import IconComponent from "@/components/common/IconComponent";

const DashboardLayout = () => {
  return (
    <div className="relative w-screen h-screen bg-[#111111]">
      <div className="container mx-auto">
        <Outlet />
      </div>
      <div className="fixed bottom-8 w-full flex justify-center items-center ">
        <div className="flex gap-16 px-8 py-4 text-white rounded-md border border-neutral-500">
            <IconComponent Icon={RiDashboardFill} iconTitle="Dashboard"/>
            <IconComponent Icon={LuNotebookPen} iconTitle="Share Interview Experience"/>
            <IconComponent Icon={FaBookmark} iconTitle="Saved Interviews"/>
            <IconComponent Icon={CgProfile} iconTitle="Profile"/>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
