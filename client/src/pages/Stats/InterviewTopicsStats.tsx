import { Card } from "@/components/ui/card";
import StatsCard from "@/components/common/StatsCard";
import { IoHardwareChip } from "react-icons/io5";
import { FaCode } from "react-icons/fa6";
import { LuNetwork } from "react-icons/lu";
import { FiDatabase } from "react-icons/fi";
import { GoGitPullRequestClosed } from "react-icons/go";
import { BsBraces } from "react-icons/bs";
import { FaReact } from "react-icons/fa6";
import { SiPostgresql } from "react-icons/si";
import { SlNote } from "react-icons/sl";
import { SiMongodb } from "react-icons/si";
import { FaNodeJs } from "react-icons/fa6";
import { FaJs } from "react-icons/fa6";
import { TbTargetArrow } from "react-icons/tb";
import { IoIosTrendingUp } from "react-icons/io";
import { useEffect, useState } from "react";
import { getFunction } from "@/utils/axiosRequest";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

const iconsMap = new Map();
iconsMap.set("DSA",{icon:FaCode,iconColor:"text-red-500"});
iconsMap.set("OS",{icon:IoHardwareChip,iconColor:"text-gray-500"});
iconsMap.set("CN",{icon:LuNetwork,iconColor:"text-red-500"});
iconsMap.set("DBMS",{icon:FiDatabase,iconColor:"text-violet-500"});
iconsMap.set("PROJECT",{icon:GoGitPullRequestClosed,iconColor:"text-red-500"});
iconsMap.set("OOP",{icon:BsBraces,iconColor:"text-red-500"});
iconsMap.set("REACT",{icon:FaReact,iconColor:"text-red-500"});
iconsMap.set("POSTGRESQL",{icon:SiPostgresql,iconColor:"text-red-500"});
iconsMap.set("MONGODB",{icon:SiMongodb,iconColor:"text-green-700"});
iconsMap.set("NODE",{icon:FaNodeJs,iconColor:"text-green-500"});
iconsMap.set("JS",{icon:FaJs,iconColor:"text-yellow-500"});
iconsMap.set("HLD",{icon:SlNote,iconColor:"text-blue-500"});
iconsMap.set("LLD",{icon:SlNote,iconColor:"text-blue-500"});
iconsMap.set("SD",{icon:SlNote,iconColor:"text-blue-500"});

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
                Icon={iconsMap.get(`${data.tagInitials}`) ? iconsMap.get(`${data.tagInitials}`).icon : TbTargetArrow}
                iconContainerStyle={`${iconsMap.get(`${data.tagInitials}`) ? iconsMap.get(`${data.tagInitials}`).iconColor : "text-amber-500"}`}
                growthPercentage={12}
                totalCount={`${data.tagName ?? "Loading"}`}
                tagline={`${data.count} Interviews`}
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
