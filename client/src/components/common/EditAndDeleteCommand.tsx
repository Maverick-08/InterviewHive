import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "./DeleteDialog";

const EditAndDeleteCommand = ({interviewId}:{interviewId:string}) => {
    const [isDeleteDialogOpen,setIsDialogOpen] = useState(false);
    const navigate = useNavigate();

  return (
    <div className="flex items-center gap-4">
      {/* Edit option  */}
      <Tooltip>
        <TooltipTrigger>
          <div onClick={()=>navigate(`/edit/${interviewId}`)}>
            <CiEdit className="size-5 cursor-pointer " />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <span>Edit Interview</span>
        </TooltipContent>
      </Tooltip>

      {/* Delete option  */}
      <Tooltip>
        <TooltipTrigger>
          <div onClick={()=>setIsDialogOpen(true)}>
            <MdDelete className="size-5 cursor-pointer text-red-500" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <span>Delete Interview</span>
        </TooltipContent>
      </Tooltip>
      <DeleteDialog open={isDeleteDialogOpen} onOpenChange={setIsDialogOpen} interviewId={interviewId}/>
    </div>
  );
};

export default EditAndDeleteCommand;
