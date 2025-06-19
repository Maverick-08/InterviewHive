import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import type { IconType } from "react-icons";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";

const StatsCard = ({
  cardStyle,
  Icon,
  growthPercentage,
  totalCount,
  tagline,
  tooltipDescription,
  iconContainerStyle,
  topicPercentage,
}: {
  cardStyle?: string;
  Icon: IconType;
  growthPercentage: number;
  totalCount: string;
  tagline: string;
  tooltipDescription: string;
  iconContainerStyle?: string;
  topicPercentage?: string;
}) => {

  return (
    <Card
      className={cn(
        `bg-[#171717] rounded-sm text-white px-4 py-4 w-xs border border-[#333333] ${cardStyle}`
      )}
    >
      <Tooltip>
        <TooltipTrigger className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className={cn(`text-zinc-400 ${iconContainerStyle}`)}>
              <Icon className="h-6 w-6 " />
            </div>
            <div className="text-green-500">+{growthPercentage}%</div>
          </div>
          <div className="text-left text-2xl">{totalCount}</div>
          <div className="flex justify-between items-center text-neutral-400">
            <span>{tagline}</span>
            {topicPercentage && <span>{topicPercentage}</span>}
          </div>
    
         { topicPercentage && <div className="w-full rounded-lg bg-neutral-500">
            <div
              className="h-1 rounded-lg bg-yellow-500"
              style={{
              width: topicPercentage
                ? `${parseFloat(topicPercentage)}%`
                : "0%",
              }}
            ></div>
          </div>}
        </TooltipTrigger>
        <TooltipContent>
          <div>{tooltipDescription}</div>
        </TooltipContent>
      </Tooltip>
    </Card>
  );
};

export default StatsCard;
