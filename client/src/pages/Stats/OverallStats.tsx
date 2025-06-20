import StatsCard from "@/components/common/StatsCard"
import { CgNotes } from "react-icons/cg";
import { GoPeople } from "react-icons/go";
import { AiOutlineStock } from "react-icons/ai";
import { FaStar } from "react-icons/fa6";
import { BsEye } from "react-icons/bs";

const OverallStats = () => {
  return (
      <div className="pt-4 select-none">
        <div className="flex flex-col gap-1 mb-6">
          <div className="font-semibold text-4xl">
          Welcome back! 
        </div>
        <div className="text-white/50">Ready to power up your next interview success?</div>
        </div>
        <div className="flex flex-wrap items-center gap-6 ">
            <StatsCard Icon={CgNotes} growthPercentage={12} totalCount={"1,456"} tagline="Total Interviews" />
            <StatsCard Icon={GoPeople} growthPercentage={23} totalCount={"5,436"} tagline="Active Users" />
            <StatsCard Icon={AiOutlineStock} growthPercentage={5} totalCount={"87"} tagline="Placed Percentage" />
            <StatsCard Icon={FaStar} growthPercentage={2} totalCount={"156"} tagline="Companies" />
            <StatsCard Icon={BsEye} growthPercentage={12} totalCount={"45.2K"} tagline="Total Visits" />
            <StatsCard Icon={CgNotes} growthPercentage={12} totalCount={"1456"} tagline="Total Interviews" />
        </div>
      </div>
  )
}

export default OverallStats
