import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { IconType } from "react-icons";

const IconComponent = ({
  Icon,
  iconTitle,
}: {
  Icon: IconType;
  iconTitle: string;
}) => {
  return (
    <Tooltip>
      <TooltipTrigger className="hover:scale-150 hover:rotate-6 transition-transform duration-300 ease-in-out cursor-pointer border border-neutral-500 rounded-sm px-2 py-1.5">
        <Icon className="h-6 w-6" />
      </TooltipTrigger>
      <TooltipContent>
        <p>{iconTitle}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default IconComponent;
