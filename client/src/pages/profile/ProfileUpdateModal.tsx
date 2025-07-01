import SelectCourse from "@/components/common/SelectCourse";
import WhiteButton from "@/components/common/WhiteButton";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useContentAccessStore } from "@/store/contentAccessStore";
import { useUserStore } from "@/store/userStore";
import { postFunction } from "@/utils/axiosRequest";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { toast } from "sonner";

const ProfileUpdateModal = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (x: boolean) => void;
}) => {
  const setContentAccessibilityState = useContentAccessStore(state => state.setContentAccessibility);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const savedName = useUserStore((state) => state.username);
  const savedYearOfPassingOut = useUserStore((state) => state.yearOfPassingOut);

  const [userName, setUsername] = useState(
    useUserStore((state) => state.username) ?? ""
  );
  const [selectedCourse, setSelectedCourse] = useState("");
  const [yearOfPassingOut, setYearOfPassingOut] = useState<number | null>(
    useUserStore((state) => state.yearOfPassingOut) ?? null
  );
  const [xHandle, setxHandle] = useState(
    useUserStore((state) => state.xHandle) ?? ""
  );
  const [linkedIn, setLinkedIn] = useState(
    useUserStore((state) => state.linkedIn) ?? ""
  );

  const handleUpdate = async () => {
    if (isSubmitting) return;

    if (
      savedName == userName &&
      selectedCourse == "" &&
      savedYearOfPassingOut == yearOfPassingOut &&
      xHandle == "" &&
      linkedIn == ""
    ) {
      toast.warning(`Please make changes for updation.`);
    }
    else if(yearOfPassingOut && yearOfPassingOut > (new Date().getFullYear()) + 5){
      toast.warning("Invalid year of passing out");
    } 
    else {
      setIsSubmitting(true);
      const response = await postFunction("/api/profile/update", {
        userName: savedName == userName ? undefined : userName,
        courseId: selectedCourse,
        yearOfPassingOut,
        xHandle: xHandle == "" ? undefined : xHandle,
        linkedIn: linkedIn == "" ? undefined : linkedIn,
      });

      if(response.success){
        toast.success(`Profile Updated Successfully`);
        setIsSubmitting(false);
        setContentAccessibilityState(response.data.contentAccess as boolean);
        onOpenChange(false);
      }
      else{
        toast.warning(`${response.errMsg}`)
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        aria-describedby=""
        className="font-mono w-lg bg-[#181818] border border-white/30"
      >
        <DialogTitle className="text-2xl text-white text-center">
          Edit Profile Details
        </DialogTitle>

        <div className="flex flex-col gap-8">
          {/* Top Container */}
          <div className="flex flex-col gap-4 text-start">
            {/* Username  */}
            <div className="flex flex-col gap-2">
              <p className="text-lg text-white/55">Username</p>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
                className="p-2 w-full border border-white/35 rounded-md text-white"
              />
            </div>

            {/* Course  */}
            <div className="flex flex-col gap-2">
              <p className="text-lg text-white/55">Course</p>
              <SelectCourse
                selectedCourse={selectedCourse}
                setSelectedCourse={setSelectedCourse}
              />
            </div>

            {/* Year of passing out  */}
            <div className="flex flex-col gap-2">
              <p className="text-lg text-white/55">Year of passing out</p>
              <input
                type="number"
                value={yearOfPassingOut ?? ""}
                onChange={(e) => setYearOfPassingOut(parseInt(e.target.value))}
                className="p-2 w-full border border-white/35 rounded-md text-white"
              />
            </div>

            {/* XHandle  */}
            <div className="flex flex-col gap-2">
              <div className="text-lg text-white/55">
                Twitter/X{" "}
                <span className="text-xs text-blue-500">(optional)</span>
              </div>
              <input
                type="text"
                value={xHandle}
                onChange={(e) => setxHandle(e.target.value)}
                className="p-2 w-full border border-white/35 rounded-md text-white"
              />
            </div>

            {/* LinkedIn  */}
            <div className="flex flex-col gap-2">
              <div className="text-lg text-white/55">
                LinkedIn{" "}
                <span className="text-xs text-blue-500">(optional)</span>
              </div>

              <input
                type="text"
                value={linkedIn}
                onChange={(e) => setLinkedIn(e.target.value)}
                className="p-2 w-full border border-white/35 rounded-md text-white"
              />
            </div>
          </div>

          {/* Bottom Container */}
          <div className="flex items-center gap-8 justify-end">
            <WhiteButton
              text="Cancel"
              onClick={() => onOpenChange(false)}
              className={`px-8 py-1.5 rounded-sm bg-blue-500/80 hover:bg-blue-500 text-neutral-200 cursor-pointer`}
            />

            <WhiteButton
              text="Update"
              disabled={isSubmitting}
              Icon={isSubmitting ? ImSpinner8 : undefined}
              iconSize={`animate-spin`}
              onClick={handleUpdate}
              containerStyle="flex justify-center items-center"
              className={`px-8 py-1.5 rounded-sm bg-red-500/80 hover:bg-red-500 text-neutral-200 cursor-pointer`}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileUpdateModal;
