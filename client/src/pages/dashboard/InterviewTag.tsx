import Card from "@/components/common/Card";
import WhiteButton from "@/components/common/WhiteButton";
import { useInterviewStore } from "@/store/interview";
import { useState } from "react";
import { toast } from "sonner";
import { ImSpinner8 } from "react-icons/im";
import { postFunction } from "@/utils/axiosRequest";
import { useAuthStore } from "@/store/authStore";
import { useLocation } from "react-router-dom";
import { useUserStore } from "@/store/userStore";
import BlackButton from "@/components/common/BlackButton";

const list = [
  { tagInitials: "DSA", tagName: "DSA" },
  { tagInitials: "OS", tagName: "Operating System" },
  { tagInitials: "OOP", tagName: "Object Oriented Programming" },
  { tagInitials: "DBMS", tagName: "DBMS" },
  { tagInitials: "CN", tagName: "Computer Networks" },
  { tagInitials: "PROJECT", tagName: "Project" },
  { tagInitials: "JAVA", tagName: "Java" },
  { tagInitials: "C++", tagName: "C++" },
  { tagInitials: "PYTHON", tagName: "Python" },
  { tagInitials: "SD", tagName: "System Design" },
  { tagInitials: "HLD", tagName: "HLD" },
  { tagInitials: "LLD", tagName: "LLD" },
  { tagInitials: "SDP", tagName: "System Design Patterns" },
  { tagInitials: "API", tagName: "API" },
  { tagInitials: "JWT", tagName: "JWTs" },
  { tagInitials: "JS", tagName: "JavaScript" },
  { tagInitials: "REACT", tagName: "React" },
  { tagInitials: "NEXT JS", tagName: "Next Js" },
  { tagInitials: "NODE", tagName: "Node Js" },
  { tagInitials: "CLOUD", tagName: "Cloud" },
  { tagInitials: "AWS", tagName: "AWS" },
  { tagInitials: "DSA", tagName: "DevOps" },
  { tagInitials: "SE", tagName: "Software Engineering" },
  { tagInitials: "UML", tagName: "UML" },
];

const InterviewTag = ({
  setComponentActive,
  interviewId,
}: {
  setComponentActive: (x: number) => void;
  interviewId?: string;
}) => {
  const selectedTags = useInterviewStore((state) => state.tags);
  const addInterviewTag = useInterviewStore((state) => state.addInterviewTag);
  const getPayload = useInterviewStore((state) => state.getInterviewPayload);
  const setAuthState = useAuthStore((state) => state.setAuthState);
  const userId = useUserStore((state) => state.id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pathname = useLocation().pathname;

  const handleSubmit = async () => {
    const payload = getPayload();
    setIsSubmitting(true);
    const response = await postFunction("/api/interview/add", payload);

    if (response.success) {
      toast.success(`${response.data.msg}`, {
        description: "Check Dashboard",
      });
      localStorage.removeItem("InterviewDetails");
    } else if (!response.isAuthenticated) {
      toast.warning("Session Expired");
      setAuthState(false);
    } else {
      toast.warning(`${response.errMsg}`);
    }

    setIsSubmitting(false);
  };

  const handleUpdate = async () => {
    const interviewData = getPayload();
    const payload = { interviewData, userId, interviewId };
    setIsSubmitting(true);
    const response = await postFunction("/api/interview/update", payload);

    if (response.success) {
      toast.success("Interview Updated Successfully !", {
        description: "Check Dashboard",
      });
      setIsSubmitting(false);
    } else {
      toast.error(`${response.errMsg}`);
      setIsSubmitting(false);
    }
  };

  return (
    <Card componentStyle="px-4 py-4 sm:p-6 bg-[#171717] border-1 border-[#333333] rounded-md select-none">
      <div>
        {/* title  */}
        <h3 className="text-xl font-bold sm:text-2xl md:text-4xl">
          {pathname.includes("share")
            ? "Add Interview Tags"
            : "Edit Interview Tags"}
        </h3>

        <div className="pt-4 flex flex-col gap-2">
          <p className="text-lg text-white/80">
            Select the major topic tags around which your interview was
            centered.
          </p>

          <div className="flex flex-wrap gap-2">
            {list.map((tag, idx) => {
              return (
                <span
                  key={idx}
                  onClick={() => addInterviewTag(tag)}
                  className="px-2 py-1 rounded-md border-amber-600 bg-yellow-500/90 hover:bg-yellow-500 cursor-pointer text-black font-medium"
                >
                  {tag.tagName}
                </span>
              );
            })}
          </div>

          <div className="mt-4 flex flex-col gap-2 text-white/80">
            <p className="text-lg">Selected tags</p>
            <div className="flex flex-wrap gap-2">
              {selectedTags.map((tag) => {
                return (
                  <span className="bg-sky-500 px-2 py-1 rounded-md text-black">
                    {tag.tagName}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="mt-4 flex flex-col font-mono">
            <p className="text-lg text-white/80">Select difficulty level:</p>
            <div className="py-2 flex gap-2 items-center justify-start">
                <div className="px-3 py-1 rounded-sm text-green-500 bg-gradient-to-b  to-green-500/30 border border-green-400/70 hover:bg-green-500/10 cursor-pointer transition-all duration-300">EASY</div>
                <div className="px-3 py-1 rounded-sm text-yellow-500 bg-gradient-to-b  to-yellow-500/30 border border-yellow-400/70 hover:bg-yellow-500/10 cursor-pointer transition-all duration-300">MEDIUM</div>
                <div className="px-3 py-1 rounded-sm text-red-500 bg-gradient-to-b  to-red-500/30 border border-red-400/70 hover:bg-red-500/10 cursor-pointer transition-all duration-300">HARD</div>
            </div>
          </div>

          <div className="pt-4 w-full flex justify-center">
            <div className="flex flex-row gap-8">
              <BlackButton
                text="Previous Section"
                disabled={isSubmitting}
                onClick={() => setComponentActive(2)}
                className={`px-2 sm:px-4 py-1.5 text-xs sm:text-xl rounded-sm sm:rounded-lg`}
              />

              {/* <WhiteButton
              onClick={()=>{}}
              text="Share Interview Experience"
              className={`px-2 sm:px-4 py-1.5 text-xs sm:text-xl rounded-sm sm:rounded-lg ${selectedTags.length > 0 ? '':''}`}
            /> */}
              <WhiteButton
                disabled={isSubmitting}
                onClick={
                  pathname.includes("share") ? handleSubmit : handleUpdate
                }
                Icon={isSubmitting ? ImSpinner8 : undefined}
                iconSize={`animate-spin`}
                text={`${
                  isSubmitting
                    ? "Submitting..."
                    : pathname.includes("share")
                    ? "Share Interview Experience"
                    : "Update Interview Experience"
                }`}
                containerStyle="flex justify-center items-center"
                className={`px-2 sm:px-4 py-1.5 text-xs sm:text-xl rounded-sm sm:rounded-lg ${
                  selectedTags.length > 0 ? "" : ""
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default InterviewTag;
