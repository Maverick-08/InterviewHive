import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import type { IconType } from "react-icons";
import { motion } from "framer-motion";

const StatsCard = ({
  cardStyle,
  Icon,
  totalCount,
  tagline,
  iconContainerStyle,
  topicPercentage,
}: {
  cardStyle?: string;
  Icon: IconType;
  growthPercentage: number;
  totalCount: string;
  tagline: string;
  iconContainerStyle?: string;
  topicPercentage?: string;
}) => {
  return (
    <motion.div
      className="hover:bg-gray-900/70 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-neutral-500/15 group"
    >
      <Card
        className={cn(
          `bg-[#171717] rounded-sm text-white group-hover:text-blue-400 transition-all px-4 py-4 w-xs border border-[#333333] ${cardStyle}`
        )}
      >
          <div className="flex flex-col gap-4">
            {/* <div className="flex justify-between items-center"> */}
              <div className={cn(`text-zinc-400 group-hover:text-white transition-all ${iconContainerStyle}`)}>
                <Icon className="h-6 w-6 " />
              </div>
            {/* </div> */}
            <div className="text-left text-2xl">{totalCount}</div>
            <div className="flex justify-between items-center text-neutral-400">
              <span className="group-hover:text-neutral-300 transition-all">{tagline}</span>
              {topicPercentage && <span>{topicPercentage}</span>}
            </div>

            {topicPercentage && (
              <div className="w-full rounded-lg bg-neutral-500">
                <div
                  className="h-1 rounded-lg bg-yellow-500"
                  style={{
                    width: topicPercentage
                      ? `${parseFloat(topicPercentage)}%`
                      : "0%",
                  }}
                ></div>
              </div>
            )}
          </div>
      </Card>
    </motion.div>
  );
};

export default StatsCard;
