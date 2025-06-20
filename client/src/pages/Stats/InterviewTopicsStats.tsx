import { Card } from "@/components/ui/card";
import StatsCard from "@/components/common/StatsCard";
import { IoHardwareChip } from "react-icons/io5";
import { FaCode } from "react-icons/fa6";
import { LuNetwork } from "react-icons/lu";
import { FiDatabase } from "react-icons/fi";
import { GoGitPullRequestClosed } from "react-icons/go";
import { GrCopy } from "react-icons/gr";
import { IoIosTrendingUp } from "react-icons/io";


const InterviewTopicsStats = () => {
  return (
      <Card className="bg-[#171717] border border-[#333333] text-white p-4 select-none">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <p className="text-xl sm:text-4xl flex items-center gap-3">
              <IoIosTrendingUp className="size-6 sm:size-7 " />
              Trending Topics</p>
            <p className="text-sm sm:text-md text-neutral-400">Most discussed subjects this week.</p>
          </div>
          <div className="flex flex-wrap gap-4 px-4">
            <StatsCard
              Icon={IoHardwareChip}
              growthPercentage={12}
              totalCount="Opearting System"
              tagline="214 Interviews"
              topicPercentage="56"
            />
            <StatsCard
              Icon={FaCode}
              growthPercentage={12}
              totalCount="DSA"
              tagline="980 Interviews"
              topicPercentage="92"
            />
            <StatsCard
              Icon={LuNetwork}
              growthPercentage={12}
              totalCount="Computer Networks"
              tagline="214 Interviews"
              topicPercentage="48"
            />
            <StatsCard
              Icon={FiDatabase}
              growthPercentage={12}
              totalCount="DBMS"
              tagline="214 Interviews"
              topicPercentage="88"
            />
            <StatsCard
              Icon={GoGitPullRequestClosed}
              growthPercentage={12}
              totalCount="Machine Learning"
              tagline="214 Interviews"
              topicPercentage="15"
            />
            <StatsCard
              Icon={GrCopy}
              growthPercentage={12}
              totalCount="System Design"
              tagline="214 Interviews"
              topicPercentage="12"
            />
          </div>
        </div>
      </Card>
  );
};

export default InterviewTopicsStats;
