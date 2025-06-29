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
      <DialogContent className="font-mono w-lg bg-[#181818] border border-white/30">
        <div className="flex flex-col gap-8">
          <p className="text-2xl text-white text-center">Edit Profile Details?</p>

          {/* Top Container */}
          <div className="flex flex-col gap-4 text-start">
            <div className="flex flex-col gap-2">
              <p className="text-lg text-white/55">Name</p>
              <input type="text" className="p-2 w-full border border-white/35 rounded-md text-white"/>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-lg text-white/55">Twitter/X</p>
              <input type="text" className="p-2 w-full border border-white/35 rounded-md text-white"/>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-lg text-white/55">LinkedIn</p>
              <input type="text" className="p-2 w-full border border-white/35 rounded-md text-white"/>
            </div>
          </div>

          {/* Bottom Container */}
          <div className="flex items-center gap-8 justify-end">
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
