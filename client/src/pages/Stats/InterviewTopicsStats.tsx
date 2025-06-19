import { Card } from "@/components/ui/card";
import StatsCard from "@/components/common/StatsCard";
import { IoHardwareChip } from "react-icons/io5";
import { FaCode } from "react-icons/fa6";
import { LuNetwork } from "react-icons/lu";
import { FiDatabase } from "react-icons/fi";
import { GoGitPullRequestClosed } from "react-icons/go";
import { GrCopy } from "react-icons/gr";

const InterviewTopicsStats = () => {
  return (
      <Card className="bg-[#171717] border border-[#333333] text-white p-4">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <p className="text-4xl">🔥&nbsp;Trending Topics</p>
            <p className="text-neutral-400">Most companies ask from these core topics.</p>
          </div>
          <div className="flex flex-wrap gap-4 px-4">
            <StatsCard
              Icon={IoHardwareChip}
              growthPercentage={12}
              totalCount="Opearting System"
              tagline="214 Interviews"
              topicPercentage="56"
              tooltipDescription="OS has been most frequently asked."
            />
            <StatsCard
              Icon={FaCode}
              growthPercentage={12}
              totalCount="DSA"
              tagline="980 Interviews"
              topicPercentage="92"
              tooltipDescription="OS has been most frequently asked."
            />
            <StatsCard
              Icon={LuNetwork}
              growthPercentage={12}
              totalCount="Computer Networks"
              tagline="214 Interviews"
              topicPercentage="48"
              tooltipDescription="OS has been most frequently asked."
            />
            <StatsCard
              Icon={FiDatabase}
              growthPercentage={12}
              totalCount="DBMS"
              tagline="214 Interviews"
              topicPercentage="88"
              tooltipDescription="OS has been most frequently asked."
            />
            <StatsCard
              Icon={GoGitPullRequestClosed}
              growthPercentage={12}
              totalCount="Machine Learning"
              tagline="214 Interviews"
              topicPercentage="15"
              tooltipDescription="OS has been most frequently asked."
            />
            <StatsCard
              Icon={GrCopy}
              growthPercentage={12}
              totalCount="System Design"
              tagline="214 Interviews"
              topicPercentage="12"
              tooltipDescription="OS has been most frequently asked."
            />
          </div>
        </div>
      </Card>
  );
};

export default InterviewTopicsStats;
