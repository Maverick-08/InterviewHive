import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import logo from "@/assets/logo.png";
import { RiDashboardFill } from "react-icons/ri";
import { FaBookmark } from "react-icons/fa6";
import { MdLibraryAdd } from "react-icons/md";
import { IoIosChatboxes } from "react-icons/io";
import { FaMicrophone } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/userStore";
import { IoPersonSharp } from "react-icons/io5";
import { cn } from "@/lib/utils";

const SideDrawer = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (x: boolean) => void;
}) => {
  const navigate = useNavigate();
  const username = useUserStore((state) => state.username);
  const pathname = useLocation().pathname;
  return (
    <div className="block sm1:hidden">
      <Drawer direction={`left`} open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="bg-[#171717] border border-[#333333]  max-w-[75%]">
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
          <div className="px-2 gap-4 flex flex-col  font-mono text-white">
            {/* Dashboard */}
            <div
              onClick={() => {
                navigate("/dashboard");
                onOpenChange(false);
              }}
              className={
                cn(`px-2 py-1 font-mono flex items-center gap-2 rounded-md  text-white  ${
                  pathname.includes("dashboard")
                    ? "text-blue-500 bg-white/10"
                    : "hover:text-blue-500 transition-colors delay-10  hover:bg-white/10 "
                }`)
              }
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
              className={
                cn(`px-2 py-1 font-mono flex items-center gap-2 rounded-md  text-white  ${
                  pathname.includes("bookmark")
                    ? "text-blue-500 bg-white/10"
                    : "hover:text-blue-500 transition-colors delay-10  hover:bg-white/10 "
                }`)
              }
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
              className={
                cn(`px-2 py-1 font-mono flex items-center gap-2 rounded-md  text-white  ${
                  pathname.includes("share")
                    ? "text-blue-500 bg-white/10"
                    : "hover:text-blue-500 transition-colors delay-10  hover:bg-white/10 "
                }`)
              }
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
              className={
                cn(`px-2 py-1 font-mono flex items-center gap-2 rounded-md  text-white  ${
                  pathname.includes("connect")
                    ? "text-blue-500 bg-white/10"
                    : "hover:text-blue-500 transition-colors delay-10  hover:bg-white/10 "
                }`)
              }
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
              className={
                cn(`px-2 py-1 font-mono flex items-center gap-2 rounded-md  text-white  ${
                  pathname.includes("prepare")
                    ? "text-blue-500 bg-white/10"
                    : "hover:text-blue-500 transition-colors delay-10  hover:bg-white/10 "
                }`)
              }
            >
              <FaMicrophone className="size-5" />
              <p>Practice</p>
            </div>
          </div>
          <DrawerFooter className="p-2">
            <div
              onClick={() => navigate("/profile")}
              className={
                cn(`px-2 py-1 font-mono flex items-center gap-2 rounded-md border border-[#333333] text-white  ${
                  pathname.includes("profile")
                    ? "text-blue-500 bg-white/10"
                    : "hover:text-blue-500 transition-colors delay-10  hover:bg-white/10 "
                }`)
              }
            >
              <IoPersonSharp className="h-4 w-4" />
              <div className="truncate whitespace-nowrap overflow-hidden flex-1 text-left text-lg">
                {username ?? "Profile"}
              </div>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default SideDrawer;
