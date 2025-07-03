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
  // content accessibility for OAuth users
  const setContentAccessibilityState = useContentAccessStore(
    (state) => state.setContentAccessibility
  );

  // User saved details
  const savedName = useUserStore((state) => state.username);
  const savedYearOfPassingOut = useUserStore((state) => state.yearOfPassingOut);
  const savedCourseId = useUserStore((state) => state.courseId);
  const savedXHandle = useUserStore((state) => state.xHandle);
  const savedLinkedIn = useUserStore((state) => state.linkedIn);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [yearOfPassingOut, setYearOfPassingOut] = useState<number | null>(
    savedYearOfPassingOut ?? null
  );
  const [xHandle, setxHandle] = useState(
    useUserStore((state) => state.xHandle) ?? ""
  );
  const [linkedIn, setLinkedIn] = useState(
    useUserStore((state) => state.linkedIn) ?? ""
  );

  const handleUpdate = async () => {
    if (isSubmitting) return;
    // Check 1 : If there's no update
    if (
      savedYearOfPassingOut == yearOfPassingOut &&
      xHandle == savedXHandle &&
      linkedIn == savedLinkedIn
    ) {
      toast.warning("Please make changes for update.");
      return;
    }
    // Check 2 : Year of passing out cannot be null
    else if (!yearOfPassingOut) {
      toast.warning("Empty fields are not allowed");
      return;
    }
    // Check 3 : Invalid year of passing out
    else if (yearOfPassingOut < 2020) {
      toast.warning(
        "Sorry registration is not possible for batches prior to 2020"
      );
      return;
    }
    // Check 4 : year of passing out check
    // For MCA : Maximum 3 year from current year
    // For Btech : Maximum 4 year from current year
    // For Mtech : Maximum 2 year from current year
    // For Dual : Maximum 5 year from current year
    else if (
      (savedCourseId == "MCA" &&
        yearOfPassingOut > new Date().getFullYear() + 3) ||
      ((savedCourseId == "BTECH-CSE" || savedCourseId == "BTECH-EE") &&
        yearOfPassingOut > new Date().getFullYear() + 4) ||
      (savedCourseId == "MDS" &&
        yearOfPassingOut > new Date().getFullYear() + 3)
    ) {
      toast.warning("Invalid year of passing out");
      return;
    } else {
      setIsSubmitting(true);
      console.log({yearOfPassingOut,xHandle,linkedIn});
      const response = await postFunction("/api/profile/update", {
        yearOfPassingOut,
        xHandle: xHandle == "" ? undefined : xHandle,
        linkedIn: linkedIn == "" ? undefined : linkedIn,
      });

      if (response.success) {
        toast.success(`Profile Updated Successfully`);
        setIsSubmitting(false);
        setContentAccessibilityState(response.data.contentAccess as boolean);
        onOpenChange(false);
      } else {
        toast.warning(`${response.errMsg}`);
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        aria-describedby=""
        className="font-mono w-lg h-[70vh] overflow-y-scroll bg-[#181818] border border-white/30"
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
              <div className="p-2 w-full border border-white/35 rounded-md text-neutral-500">
                {savedName}
              </div>
            </div>

            {/* Course  */}
            <div className="flex flex-col gap-2">
              <p className="text-lg text-white/55">Course</p>
              <div className="p-2 w-full border border-white/35 rounded-md text-neutral-500">
                {savedCourseId}
              </div>
            </div>

            {/* Year of passing out  */}
            <div className="flex flex-col gap-2">
              <p className="text-lg text-white/55">Year of passing out</p>
              <input
                type="number"
                value={yearOfPassingOut ?? ""}
                onChange={(e) => setYearOfPassingOut(parseInt(e.target.value))}
                className="p-2 focus:outline-none w-full border border-white/35 rounded-md text-white"
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
                className="p-2 focus:outline-none w-full border border-white/35 rounded-md text-white"
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
                className="p-2 focus:outline-none w-full border border-white/35 rounded-md text-white"
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
