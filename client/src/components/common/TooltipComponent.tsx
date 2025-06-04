import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TooltipComponent = ({title,name}:{title:string;name:string}) => {
  return (
    <Tooltip>
        <TooltipTrigger className="font-mono text-lg">{name}</TooltipTrigger>
      <TooltipContent className="">
        <p>{title}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default TooltipComponent;
