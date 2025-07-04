import WhiteButton from "@/components/common/WhiteButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ConfirmationDialog = ({
  onOpenChange,
  open,
  handleSubmit,
}: {
  open: boolean;
  onOpenChange: (x: boolean) => void;
  handleSubmit: () => Promise<void>;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className={`${open ? "z-50 absolute inset-0 h-screen w-screen  bg-black/10 backdrop-blur-sm":"hidden"}`}>
        <DialogContent className="p-2 sm:p-4 w-md flex-col flex font-mono   space-y-2 text-white backdrop-blur-md border border-white/30 bg-black ">
        <DialogHeader>
          <DialogTitle className="text-md text-start">Are you absolutely sure?</DialogTitle>
          <DialogDescription className="text-center sm1:text-start text-white/50">
            Once registered, your username cannot be changed. Please double-check before proceeding.
          </DialogDescription>
        </DialogHeader>
        {/* Buttons */}
        <div className="flex items-center gap-8 justify-end">
          <WhiteButton
            text="Cancel"
            onClick={() => onOpenChange(false)}
            className={`px-2 sm:px-8 py-1.5 rounded-sm bg-blue-500/80 hover:bg-blue-500 text-neutral-200 cursor-pointer`}
          />

          <WhiteButton
            text="Proceed"
            onClick={()=>{
                handleSubmit();
                onOpenChange(false);
            }}
            containerStyle="flex justify-center items-center"
            className={`px-2 sm:px-8 py-1.5 rounded-sm bg-red-500/80 hover:bg-red-500 text-neutral-200 cursor-pointer`}
          />
        </div>
      </DialogContent>
      </div>
    </Dialog>
  );
};

export default ConfirmationDialog;
