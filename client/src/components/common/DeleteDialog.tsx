import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getFunction } from "@/utils/axiosRequest";
import { useState } from "react";
import { toast } from "sonner";

const DeleteDialog = ({
  open,
  onOpenChange,
  interviewId,
}: {
  open: boolean;
  onOpenChange: (x: boolean) => void;
  interviewId: string;
}) => {
  const [isdeleting, setIsdeleting] = useState(false);
  const handleDelete = async () => {
    setIsdeleting(true);
    const response = await getFunction(
      `/api/interview/delete?interviewId=${interviewId}`
    );

    if (response.success) {
      toast.success("Interview Deleted Successfully !");
      setIsdeleting(false);
      setTimeout(() => {
        onOpenChange(false);
      }, 1000);
    } else {
      toast.warning("Failed to delete the interview");
      setIsdeleting(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#171717] text-neutral-500 border-none">
        <DialogHeader>
          <DialogTitle className="text-neutral-300">
            Are you absolutely sure?
          </DialogTitle>
          <DialogDescription className="leading-8">
            This action cannot be undone. This will permanently delete your
            <span className="text-neutral-300"> Interview Record</span> and it's
            associated data.
          </DialogDescription>
        </DialogHeader>
        <div className="pt-4 flex justify-end">
          <div className="flex items-center gap-6">
            {/* Cancel button  */}
            <div
              onClick={() => onOpenChange(false)}
              className="px-8 py-1.5 rounded-sm bg-blue-500/80 text-neutral-200 cursor-pointer"
            >
              Cancel
            </div>

            {/* Delete button  */}
            <div
              onClick={handleDelete}
              className="px-8 py-1.5 rounded-sm bg-red-500/80 text-neutral-200 cursor-pointer"
            >
              {isdeleting ? (
                <div className="flex items-center gap-2">
                  <span className="h-4 w-4 border-dotted animate-spin"></span>
                  <span>Deleting</span>
                </div>
              ) : (
                "Delete"
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
