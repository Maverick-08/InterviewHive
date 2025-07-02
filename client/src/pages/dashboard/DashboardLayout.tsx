import { motion, AnimatePresence, type Variants } from "framer-motion";
import { easeInOut } from "framer-motion";
import Topbar from "./Topbar";
import Logo from "../../assets/logo.png";
import { RiDashboardFill } from "react-icons/ri";
import { FaBookmark } from "react-icons/fa6";
import { MdLibraryAdd } from "react-icons/md";
import { IoIosChatboxes } from "react-icons/io";
import { FaMicrophone } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { useSidebarStore } from "@/store/SidebarStore";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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

const DashboardLayout = () => {
  const isSidebarActive = useSidebarStore((state) => state.isSidebarActive);
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
  const navigate = useNavigate();
  const [authState, setAuthState] = useState(true);
  const isAuthenticated = useAuthStore((state) => state.authState);
  const pathname = useLocation().pathname;

  useEffect(() => {
    if (isAuthenticated == false) {
      toast.error("Session Expired");
      setTimeout(() => {
        setAuthState(false);
      }, 1000);
    }
  }, [isAuthenticated]);

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
                <div
                  onClick={() => navigate("/")}
                  className="pt-2 flex items-center gap-4 pb-4 cursor-pointer"
                >
                  <img
                    src={Logo}
                    alt="Interview Hive Logo"
                    className="hidden lg:block h-4 lg:h-6 xl:h-8 w-4 lg:w-6 xl:w-8"
                  />
                  <span className="text-sm  lg:text-xl xl:text-2xl pb-1 xl:pb-0">
                    Interview Hive
                  </span>
                </div>

                {/* central container */}
                <div className="h-full border-t border-white/20 pt-4">
                  <div className="h-full flex flex-col justify-between">
                    <div className="flex flex-col gap-4 cursor-pointer">
                      {/* dashboard  */}
                      <div
                        onClick={() => navigate("/dashboard")}
                        className={cn(
                          `p-2 flex items-center md:gap-2 lg:gap-4 rounded-md  ${
                            pathname.includes("dashboard")
                              ? "text-blue-500 bg-white/10"
                              : "hover:text-blue-500 transition-colors delay-10  hover:bg-white/10"
                          }`
                        )}
                      >
                        <RiDashboardFill className="hidden md:block size-4 shrink-0" />
                        <span className="text-sm lg:text-xl">Dashboard</span>
                      </div>

                      {/* bookmark  */}
                      <div
                        onClick={() => navigate("/bookmark")}
                        className={cn(
                          `p-2 flex items-center md:gap-2 lg:gap-4 rounded-md  ${
                            pathname.includes("bookmark")
                              ? "text-blue-500 bg-white/10"
                              : "hover:text-blue-500 transition-colors delay-10  hover:bg-white/10"
                          }`
                        )}
                      >
                        <FaBookmark className="hidden md:block size-4" />
                        <span className="text-sm lg:text-xl">Bookmark</span>
                      </div>

                      {/* share  */}
                      <div
                        onClick={() => navigate("/share")}
                        className={cn(
                          `p-2 flex items-center md:gap-2 lg:gap-4 rounded-md  ${
                            pathname.includes("share")
                              ? "text-blue-500 bg-white/10"
                              : "hover:text-blue-500 transition-colors delay-10  hover:bg-white/10"
                          }`
                        )}
                      >
                        <MdLibraryAdd className="hidden md:block size-4" />
                        <span className="text-sm lg:text-xl">Share</span>
                      </div>

                      {/* connect  */}
                      <div
                        onClick={() => navigate("/connect")}
                        className={cn(
                          `p-2 flex items-center md:gap-2 lg:gap-4 rounded-md  ${
                            pathname.includes("connect")
                              ? "text-blue-500 bg-white/10"
                              : "hover:text-blue-500 transition-colors delay-10  hover:bg-white/10"
                          }`
                        )}
                      >
                        <IoIosChatboxes className="hidden md:block size-4" />
                        <span className="text-sm lg:text-xl">Connect</span>
                      </div>

                      {/* prepare  */}
                      <div
                        onClick={() => navigate("/prepare")}
                        className={cn(
                          `p-2 flex items-center md:gap-2 lg:gap-4rounded-md  ${
                            pathname.includes("prepare")
                              ? "text-blue-500 bg-white/10"
                              : "hover:text-blue-500 transition-colors delay-10  hover:bg-white/10"
                          }`
                        )}
                      >
                        <FaMicrophone className="hidden md:block size-4" />
                        <span className="text-sm lg:text-xl">Prepare</span>
                      </div>
                    </div>

                    {/* profile  */}
                    <div
                      onClick={() => navigate("/profile")}
                      className={cn(
                          `p-2 flex items-center md:gap-2 lg:gap-4 rounded-md border border-[#333333]  ${
                            pathname.includes("profile")
                              ? "text-blue-500 bg-white/10"
                              : "hover:text-blue-500 transition-colors delay-10  hover:bg-white/10 "
                          }`
                        )}
                    >
                      <IoPersonSharp className="hidden md:block size-4" />
                      <div className="text-end text-sm lg:text-xl">
                        {"Profile"}
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
            <div className="h-full overflow-y-scroll">
              <Topbar
                isSideBarOpen={isSidebarActive}
                setIsSidebarOpen={toggleSidebar}
              />
              <div className="px-4 pb-8">
                {authState && isAuthenticated ? (
                  <Outlet />
                ) : (
                  <Navigate to={"/login"} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
