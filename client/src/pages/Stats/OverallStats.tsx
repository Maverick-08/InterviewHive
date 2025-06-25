import StatsCard from "@/components/common/StatsCard";
import { CgNotes } from "react-icons/cg";
import { GoPeople } from "react-icons/go";
import { AiOutlineStock } from "react-icons/ai";
import { FaStar } from "react-icons/fa6";
import { BsEye } from "react-icons/bs";
import { useEffect, useState } from "react";
import { getFunction } from "@/utils/axiosRequest";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";

interface Dashboard {
  totalInterviews: number;
  totalUsers: number;
  successPercentage: number;
  totalCompanies: number;
  totalViews: number;
  activeUsers: number;
}

const OverallStats = () => {
  const [payload, setPayload] = useState<Dashboard>({
    totalInterviews: 0,
    totalUsers: 0,
    successPercentage: 0,
    totalCompanies: 0,
    totalViews: 0,
    activeUsers: 0,
  });
  const setAuthState = useAuthStore((state) => state.setAuthState);

  useEffect(() => {
    const fetch = async () => {
      const response = await getFunction("/api/stats/dashboard");
      if (response.success) {
        setPayload(response.data as Dashboard);
      } else if (!response.isAuthenticated) {
        toast.error(`${response.errMsg}`);
        setTimeout(() => {
          setAuthState(false);
        }, 1000);
      } else {
        toast.warning(`${response.errMsg}`);
      }
    };
    fetch();
  }, [setAuthState]);
  return (
    <div className="pt-4 select-none">
      <div className="flex flex-col gap-1 mb-6">
        <div className="font-semibold text-4xl">Welcome back!</div>
        <div className="text-white/50">
          Ready to power up your next interview success?
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-6 ">
        <StatsCard
          Icon={CgNotes}
          growthPercentage={12}
          totalCount={`${payload.totalInterviews}`}
          tagline="Total Interviews"
        />
        <StatsCard
          Icon={GoPeople}
          growthPercentage={23}
          totalCount={`${payload.totalUsers}`}
          tagline="Total Users"
        />
        <StatsCard
          Icon={AiOutlineStock}
          growthPercentage={5}
          totalCount={`${payload.successPercentage}%`}
          tagline="Placed Percentage"
        />
        <StatsCard
          Icon={FaStar}
          growthPercentage={2}
          totalCount={`${payload.totalCompanies}`}
          tagline="Companies"
        />
        <StatsCard
          Icon={BsEye}
          growthPercentage={12}
          totalCount={`${payload.totalViews}`}
          tagline="Total Visits"
        />
        <StatsCard
          Icon={CgNotes}
          growthPercentage={12}
          totalCount={`${payload.activeUsers}`}
          tagline="Active Users"
        />
      </div>
    </div>
  );
};

export default OverallStats;
