import { motion, AnimatePresence, type Variants } from "framer-motion";
import { easeInOut } from "framer-motion"; // ✅ Import the correct easing function
import Topbar from "./Topbar";
import Logo from "../../assets/logo.png";
import { RiDashboardFill } from "react-icons/ri";
import { FaBookmark } from "react-icons/fa6";
import { MdLibraryAdd } from "react-icons/md";
import { IoIosChatboxes } from "react-icons/io";
import { FaMicrophone } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { useSidebarStore } from "@/store/SidebarStore";

const sidebarVariants: Variants = {
  open: {
    width: "25%",
    transition: { duration: 0.5, ease: easeInOut },
  },
  closed: {
    width: 0,
    transition: { duration: 0.5, ease: easeInOut }, 
  },
};

const contentVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay: 0.5, duration: 0.4 },
  },
};

const DashboardLayout = ({ children, componentTitle }: { children: React.ReactNode; componentTitle:string }) => {
  const isSidebarActive = useSidebarStore(state => state.isSidebarActive);
  const toggleSidebar = useSidebarStore(state => state.toggleSidebar);

  return (
    <div className="w-full h-full bg-[#171717] text-white font-mono select-none">
      <div className="h-screen flex overflow-hidden">
        {/* Sidebar */}
        <motion.div
          className="h-full overflow-hidden"
          variants={sidebarVariants}
          initial={false}
          animate={isSidebarActive ? "open" : "closed"}
        >
          <AnimatePresence>
            {isSidebarActive && (
              <motion.div
                className="h-full flex flex-col p-4 pt-10"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={contentVariants}
              >
                {/* Top container */}
                <div className="flex items-center gap-4 pb-4">
                  <img
                    src={Logo}
                    alt="Interview Hive Logo"
                    className="h-6 xl:h-8 w-6 xl:w-8"
                  />
                  <span className="text-xl xl:text-2xl pb-1 xl:pb-0">Interview Hive.</span>
                </div>

                {/* central container */}
                <div className="h-full border-t border-white/20 pt-4">
                  <div className="h-full flex flex-col justify-between">
                    <div className="flex flex-col gap-4 ">
                      {/* dashboard  */}
                      <div className="p-2 hover:text-blue-500 transition-colors delay-10 flex items-center gap-4 rounded-md hover:bg-white/10">
                        <RiDashboardFill className="size-4" />
                        <span className="text-xl">Dashboard</span>
                      </div>
                      {/* bookmark  */}
                      <div className="p-2 hover:text-blue-500 transition-colors delay-10 flex items-center gap-4 rounded-md hover:bg-white/10">
                        <FaBookmark className="size-4" />
                        <span className="text-xl">Bookmark</span>
                      </div>
                      {/* chat  */}
                      <div className="p-2 hover:text-blue-500 transition-colors delay-10 flex items-center gap-4 rounded-md hover:bg-white/10">
                        <IoIosChatboxes className="size-4" />
                        <span className="text-xl">Connect</span>
                      </div>
                      {/* add  */}
                      <div className="p-2 hover:text-blue-500 transition-colors delay-10 flex items-center gap-4 rounded-md hover:bg-white/10">
                        <MdLibraryAdd className="size-4" />
                        <span className="text-xl">Share</span>
                      </div>
                      {/* practice  */}
                      <div className="p-2 hover:text-blue-500 transition-colors delay-10 flex items-center gap-4 rounded-md hover:bg-white/10">
                        <FaMicrophone className="size-4" />
                        <span className="text-xl">Prepare</span>
                      </div>
                    </div>
                    <div>
                      <div className="p-2 border border-neutral-600 hover:border-neutral-700 hover:text-blue-500 transition-colors delay-10 flex items-center gap-4 rounded-md hover:bg-white/10 ">
                        <IoPersonSharp className="size-4" />
                        <div className="text-end text-xl">Vivek Ojha</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Main content */}
        <div
          className={`sm:pt-4 transition-all duration-500 ease-in-out flex-1`}
        >
          <div className="h-full rounded-xl bg-[#0A0A0A]">
            <div className="h-full overflow-scroll">
              <Topbar
                isSideBarOpen={isSidebarActive}
                setIsSidebarOpen={toggleSidebar}
                componentTitle={componentTitle}
              />
              <div className="px-4 pb-8">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
