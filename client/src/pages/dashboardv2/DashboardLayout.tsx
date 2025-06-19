import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Topbar from "./Topbar";
import Logo from "../../assets/logo.png";

const sidebarVariants = {
  open: {
    width: "25%", // Or your desired width
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  closed: {
    width: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
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

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSideBarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="w-full h-full bg-[#171717] text-white font-mono">
      <div className="h-screen flex overflow-hidden">
        {/* Sidebar */}
        <motion.div
          className="h-full overflow-hidden"
          variants={sidebarVariants}
          initial={false}
          animate={isSideBarOpen ? "open" : "closed"}
        >
          <AnimatePresence>
            {isSideBarOpen && (
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
                    className="h-8 w-8"
                  />
                  <span className="text-2xl font-semibold">
                    Interview Hive.
                  </span>
                </div>

                {/* Bottom or additional content */}
                <div className="border-t border-white/20 pt-4">
                  <p className="text-sm text-gray-400">
                    Sidebar content here...
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Main content */}
        <motion.div
          className={`pt-4 transition-all duration-500 ease-in-out`}
          style={{
            flex: isSideBarOpen ? "1 " : "1",
          }}
        >
          <div className="h-full rounded-xl bg-[#0A0A0A]">
            <ScrollArea className="h-full">
              <Topbar
                isSideBarOpen={isSideBarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
              />
              <div className="px-4">{children}</div>
            </ScrollArea>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardLayout;
