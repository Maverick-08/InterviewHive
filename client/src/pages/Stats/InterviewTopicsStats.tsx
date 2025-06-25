import { Card } from "@/components/ui/card";
import StatsCard from "@/components/common/StatsCard";
import { IoHardwareChip } from "react-icons/io5";
// import { FaCode } from "react-icons/fa6";
// import { LuNetwork } from "react-icons/lu";
// import { FiDatabase } from "react-icons/fi";
// import { GoGitPullRequestClosed } from "react-icons/go";
// import { GrCopy } from "react-icons/gr";
import { IoIosTrendingUp } from "react-icons/io";
import { useEffect, useState } from "react";
import { getFunction } from "@/utils/axiosRequest";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

interface TrendingTopic {
  tagInitials: string;
  tagName: string;
  count: number;
  prcentage: number;
}

const InterviewTopicsStats = () => {
  const [payload, setPayload] = useState<TrendingTopic[]>([]);
  const setAuthState = useAuthStore((state) => state.setAuthState);

  useEffect(() => {
    const fetch = async () => {
      const response = await getFunction("/api/stats/trending");
      if (response.success) {
        setPayload(response.data as TrendingTopic[]);
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
    <Card className="bg-[#171717] border border-[#333333] text-white p-4 select-none">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <p className="text-xl sm:text-4xl flex items-center gap-3">
            <IoIosTrendingUp className="size-6 sm:size-7 " />
            Trending Topics
          </p>
          <p className="text-sm sm:text-md text-neutral-400">
            Most discussed subjects this week.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 px-4">
          { payload.length > 0 && payload.map((data, idx) => {
            return (
              <StatsCard
                key={idx}
                Icon={IoHardwareChip}
                growthPercentage={12}
                totalCount={`${data.tagName ?? "Loading"}`}
                tagline="214 Interviews"
                topicPercentage={`${data.prcentage}%`}
              />
            );
          })}

        </div>
      </div>
    </Card>
  );
};

export default InterviewTopicsStats;
