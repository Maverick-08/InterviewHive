import StatsCard from "@/components/common/StatsCard"
import { CgNotes } from "react-icons/cg";
import { GoPeople } from "react-icons/go";
import { AiOutlineStock } from "react-icons/ai";
import { FaStar } from "react-icons/fa6";
import { BsEye } from "react-icons/bs";

const OverallStats = () => {
  return (
      <div className="pt-8">
        <div className="flex items-center flex-wrap gap-4">
            <StatsCard Icon={CgNotes} growthPercentage={12} totalCount={"1,456"} tagline="Total Interviews" tooltipDescription="Total Interviews"/>
            <StatsCard Icon={GoPeople} growthPercentage={23} totalCount={"5,436"} tagline="Active Users" tooltipDescription="Total Users"/>
            <StatsCard Icon={AiOutlineStock} growthPercentage={5} totalCount={"87"} tagline="Placed Percentage" tooltipDescription="Total Interviews"/>
            <StatsCard Icon={FaStar} growthPercentage={2} totalCount={"156"} tagline="Companies" tooltipDescription="Total Interviews"/>
            <StatsCard Icon={BsEye} growthPercentage={12} totalCount={"45.2K"} tagline="Total Visits" tooltipDescription="Total Interviews"/>
            <StatsCard Icon={CgNotes} growthPercentage={12} totalCount={"1456"} tagline="Total Interviews" tooltipDescription="Total Interviews"/>
        </div>
      </div>
  )
}

export default OverallStats
