import WhiteButton from "@/components/common/WhiteButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { postFunction } from "@/utils/axiosRequest";
import { useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { toast } from "sonner";

const Feedback = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (x: boolean) => void;
}) => {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const response = await postFunction("/api/review", { message });

    if (response.success) {
      toast.success(`${response.data.data}`);
    } else {
      toast.warning(`${response.errMsg}`);
    }
    onOpenChange(false);
    setIsSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-xl font-mono border border-white/15 text-white bg-black backdrop-blur-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">Feedback</DialogTitle>
          <DialogDescription className="text-white/60">
            Have any feedbacks or improvements for Interview Hive?
          </DialogDescription>
        </DialogHeader>
        <div className=" flex flex-col">
          <div className="py-2">
            {/* Feedback text area */}
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="h-24 w-full text-start align-top rounded-sm border border-white/25 bg-white/30 p-2 focus:outline-none focus:border-white/25 "
              style={{ resize: "vertical" }}
            />
          </div>

          {/* Button */}
          <div className="mt-4 flex items-center gap-8 justify-end">
            <WhiteButton
              text="Cancel"
              onClick={() => onOpenChange(false)}
              containerStyle="flex justify-center items-center"
              className={`px-2 sm:px-8 py-1.5 rounded-sm bg-blue-500/80 hover:bg-blue-500 text-neutral-200 cursor-pointer`}
            />

            <WhiteButton
              text="Submit"
              disabled={isSubmitting}
              onClick={handleSubmit}
              Icon={isSubmitting ? ImSpinner8 : undefined}
              iconSize={`animate-spin`}
              containerStyle=" flex justify-center items-center"
              className={`px-2 sm:px-8 py-1.5 rounded-sm bg-red-500/80 hover:bg-red-500 text-neutral-200 cursor-pointer`}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Feedback;
