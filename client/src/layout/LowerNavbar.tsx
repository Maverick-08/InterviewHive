import { RiDashboardFill } from "react-icons/ri";
import { FaBookmark } from "react-icons/fa6";
import { MdLibraryAdd } from "react-icons/md";


const LowerNavbar = () => {
  return (
    <div className="w-full max-w-7xl px-4 flex justify-around md:justify-between items-center font-mono text-white sm:text-sm md:text-xl tracking-wide gap-2">
      <div className="flex items-center gap-4">
        <span><RiDashboardFill className="h-8 w-8"/></span>
        <span className="hidden md:block">All Interviews</span>
      </div>
      <div className="flex items-center gap-4">
        <span><MdLibraryAdd className="h-8 w-8 "/></span>
        <span className="hidden md:block">Add Interview Experience</span>
      </div>
      <div className="flex items-center gap-4">
        <span><FaBookmark className="h-8 w-8 "/></span>
        <span className="hidden md:block">Saved Items</span>
      </div>
    </div>
  )
}

export default LowerNavbar
