import Card from "@/components/common/Card";
import WhiteButton from "@/components/common/WhiteButton";
import { useInterviewStore } from "@/store/interview";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { handleError } from "./utils";
import { useNavigate } from "react-router-dom";
import { ImSpinner8 } from "react-icons/im";
const BASE_URL = import.meta.env.VITE_API_ENDPOINT

const list = [
  { tagName: "DSA" },
  { tagName: "Operating System (OS)" },
  { tagName: "OOPS" },
  { tagName: "DBMS" },
  { tagName: "Computer Networks" },
  { tagName: "Projects" },
  { tagName: "Java" },
  { tagName: "C++" },
  { tagName: "Python" },
  { tagName: "System Design" },
  { tagName: "HLD" },
  { tagName: "LLD" },
  { tagName: "Design Patterns" },
  { tagName: "API" },
  { tagName: "JWTs" },
  { tagName: "Backend" },
  { tagName: "Frontend" },
  { tagName: "JavaScript" },
  { tagName: "React" },
  { tagName: "NextJs" },
  { tagName: "NodeJs" },
  { tagName: "Cloud" },
  { tagName: "AWS" },
  { tagName: "DevOps" },
  { tagName: "SDLC" },
  { tagName: "Software Engineering" },
  { tagName: "UML" },
];

const InterviewTag = ({
  setComponentActive,
}: {
  setComponentActive: (x: number) => void;
}) => {
  const selectedTags = useInterviewStore((state) => state.tags);
  const addInterviewTag = useInterviewStore((state) => state.addInterviewTag);
  const getPayload = useInterviewStore((state) => state.getInterviewPayload);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const payload = getPayload();
    try {
      setIsSubmitting(true);
      const response = await axios.post(
        `${BASE_URL}/api/interview/add`,
        payload,
        { withCredentials: true }
      );

      setIsSubmitting(false);

      toast.success(`${response.data.msg}`, {
        description: "Check Dashboard",
      });
      localStorage.removeItem("InterviewDetails");
    } catch (err) {
      setIsSubmitting(false);
      const response = handleError(err);
      if (!response.isAuthenticated) {
        toast.warning("Session Expired", {
          description: "Please login again",
        });
        setTimeout(() => navigate("/login"), 1000);
      } else {
        toast.error(`${response.errMsg}`);
      }
    }
  };

  return (
    <Card componentStyle="px-4 py-4 sm:py-8 bg-[#171717] border-1 border-[#333333] rounded-md select-none">
      <div>
        {/* title  */}
        <h3 className="text-xl sm:text-2xl md:text-4xl">Add Interview Tags</h3>

        <div className="pt-12 flex flex-col gap-8">
          <p className="text-lg text-neutral-400">
            Select the major topic tags around which your interview was
            centered.
          </p>

          <div className="flex flex-wrap gap-4">
            {list.map((tag) => {
              return (
                <span
                  onClick={() => addInterviewTag(tag)}
                  className="px-2 py-1 rounded-md border-amber-600 bg-yellow-500/70 text-black font-bold"
                >
                  {tag.tagName}
                </span>
              );
            })}
          </div>

          <div>
            <p>Selected tags</p>
            <div className="flex flex-wrap gap-4">
              {selectedTags.map((tag) => {
                return (
                  <span className="bg-sky-400 px-2 py-1 rounded-md text-black">
                    {tag.tagName}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="pt-12 w-full flex justify-center">
            <div className="flex flex-row gap-8">
              <WhiteButton
                text="Previous Section"
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
                onClick={handleSubmit}
                Icon={isSubmitting ? ImSpinner8 : undefined}
                iconSize={`animate-spin`}
                text={`${isSubmitting ? 'Submitting...':'Share Interview Experience'}`}
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
