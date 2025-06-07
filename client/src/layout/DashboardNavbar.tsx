import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import WhiteButton from "@/components/common/WhiteButton";

const DashboardNavbar = () => {
  const navigate = useNavigate()
  return (
    <div className="w-full max-w-7xl px-4 sm:px-8 lg:px-20 flex justify-between items-center text-white">

        {/* Title and logo  */}
        <div className="flex items-center gap-2">
            <img src={Logo} alt="Logo" className="h-6 w-6 md:h-8 md:w-8"/>
            <span className="text-lg sm:text-2xl md:text-4xl font-mono font-bold bg-gradient-to-b from-blue-300 to-blue-500 bg-clip-text text-transparent">Interview Hive</span>
        </div>

        {/* Account Info & Logout */}
        <div>
            <WhiteButton onClick={()=>navigate("/profile")} text="Account" className="bg-blue-500 text-white font-mono hover:bg-blue-500/80 text-sm sm:text-lg"/>
        </div>
      
    </div>
  )
}

export default DashboardNavbar
