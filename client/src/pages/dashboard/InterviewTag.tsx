import Card from "@/components/common/Card";
import WhiteButton from "@/components/common/WhiteButton";
import { useInterviewStore } from "@/store/interview";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { ImSpinner8 } from "react-icons/im";
const BASE_URL = import.meta.env.VITE_API_ENDPOINT;

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
}: {
  setComponentActive: (x: number) => void;
}) => {
  const selectedTags = useInterviewStore((state) => state.tags);
  const addInterviewTag = useInterviewStore((state) => state.addInterviewTag);
  const getPayload = useInterviewStore((state) => state.getInterviewPayload);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    const payload = getPayload();
    console.log(payload)
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
      console.log(err)
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
                  className="px-2 py-1 rounded-md border-amber-600 bg-yellow-500/70 hover:bg-yellow-500/80 cursor-pointer text-black font-bold"
                >
                  {tag.tagName}
                </span>
              );
            })}
          </div>

          <div className="flex flex-col gap-2">
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
                text={`${
                  isSubmitting ? "Submitting..." : "Share Interview Experience"
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
