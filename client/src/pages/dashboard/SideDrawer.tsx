import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import logo from "@/assets/logo.png";
import avatar from "@/assets/doodle.png";
import { RiDashboardFill } from "react-icons/ri";
import { FaBookmark } from "react-icons/fa6";
import { MdLibraryAdd } from "react-icons/md";
import { IoIosChatboxes } from "react-icons/io";
import { FaMicrophone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SideDrawer = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (x: boolean) => void;
}) => {
  const navigate = useNavigate();
  return (
    <div className="block sm1:hidden">
      <Drawer direction={`left`} open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="bg-[#171717] border border-[#333333]  max-w-[60%]">
          <DrawerHeader>
            <DrawerTitle className="font-mono text-white">
              <div className="flex gap-2 items-center">
                <img src={logo} alt="Interview Hive Logo" className="size-6" />
                <p className="text-xl">Interview Hive</p>
              </div>
            </DrawerTitle>
            {/* Separator */}
            <p className="mt-2 h-px w-full relative">
              <span className="absolute inset-0 bg-gradient-to-r to-transparent from-white/60" />
            </p>
          </DrawerHeader>
          <div className="px-4 gap-2 flex flex-col  font-mono text-white">
            {/* Dashboard */}
            <div
              onClick={() => {
                navigate("/dashboard");
                onOpenChange(false);
              }}
              className="p-2 flex gap-2 transition-colors duration-300"
            >
              <RiDashboardFill className="size-5" />
              <p>Dashboard</p>
            </div>
            {/* Bookmark */}
            <div
              onClick={() => {
                navigate("/bookmark");
                onOpenChange(false);
              }}
              className="p-2 flex gap-2 transition-colors duration-300"
            >
              <FaBookmark className="size-5" />
              <p>Bookmark</p>
            </div>
            {/* Share */}
            <div
              onClick={() => {
                navigate("/share");
                onOpenChange(false);
              }}
              className="p-2 flex gap-2 transition-colors duration-300"
            >
              <MdLibraryAdd className="size-5" />
              <p>Share</p>
            </div>
            {/* Chatroom */}
            <div
              onClick={() => {
                navigate("/connect");
                onOpenChange(false);
              }}
              className="p-2 flex gap-2 transition-colors duration-300"
            >
              <IoIosChatboxes className="size-5" />
              <p>Connect</p>
            </div>
            {/* Practice */}
            <div
              onClick={() => {
                navigate("/prepare");
                onOpenChange(false);
              }}
              className="p-2 flex gap-2 transition-colors duration-300"
            >
              <FaMicrophone className="size-5" />
              <p>Practice</p>
            </div>
          </div>
          <DrawerFooter className="">
            <div
              onClick={() => {
                navigate("/profile");
                onOpenChange(false);
              }}
              className="p-2 flex justify-between items-center rounded-md font-mono bg-[#333333] text-white"
            >
              <p>Vivek Ojha</p>
              <p className="h-8 w-8 rounded-full object-contain bg-white/30 flex items-center justify-center overflow-hidden">
                <img
                  src={avatar}
                  alt=""
                  className="h-full w-full object-cover rounded-full"
                />
              </p>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default SideDrawer;
