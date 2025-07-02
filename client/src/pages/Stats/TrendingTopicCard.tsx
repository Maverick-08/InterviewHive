import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { IconType } from "react-icons";

const TrendingTopicCard = ({
  cardStyle,
  Icon,
  iconStyle,
  iconContainerStyle,
  tag,
  tagStyle,
  interviewCount,
  percentage,
}: {
  Icon: IconType;
  tag: string;
  interviewCount: number;
  percentage: number;
  cardStyle?: string;
  iconStyle?: string;
  iconContainerStyle?: string;
  tagStyle?: string;
}) => {
  
  return (
    <div className="group">
      <Card
        className={cn(
          `p-0 text-white rounded-sm border border-[#333333] bg-[#171717] cursor-pointer ${cardStyle}`
        )}
      >
        <div className="p-4 group flex flex-col gap-6">
          <div className="flex items-center gap-4">
            {/* Icon */}
            <div className={cn(` ${iconContainerStyle}`)}>
              <Icon className={cn(`h-6 w-6 ${iconStyle}`)} />
            </div>

            {/* Tag  */}
            <div
              className={cn(
                `group-hover:text-blue-400 transition-all duration-300 ${tagStyle}`
              )}
            >
              {tag}
            </div>
          </div>

          {/* Interview Count & percentage  */}
          <div className="flex items-center justify-between">
            <span>{interviewCount} Interviews</span>
            <span>{percentage}%</span>
          </div>

          {/* percentage bar  */}
          <div className="w-full rounded-lg bg-neutral-500">
            <div
              style={{ width: `${percentage}%` }}
              className="h-1 rounded-lg bg-yellow-500"
            ></div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TrendingTopicCard;
