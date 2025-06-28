import { Dialog, DialogContent } from "@/components/ui/dialog";

const ProfileUpdateModal = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (x: boolean) => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="font-mono bg-[#171717] text-neutral-500 border-none">
        <div className="flex flex-col">
          <p>All Good Bhai ?</p>
          <div className="flex items-center gap-8">
            <span className="px-8 py-1.5 rounded-sm bg-blue-500/80 hover:bg-blue-500 text-neutral-200 cursor-pointer">
              Cancel
            </span>
            <span className="px-8 py-1.5 rounded-sm bg-red-500/80 hover:bg-red-500 text-neutral-200 cursor-pointer">
              Delete
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileUpdateModal;
