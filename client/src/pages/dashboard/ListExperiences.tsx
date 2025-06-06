import InterviewDialog from "@/components/common/InterviewDialog";
import { useState } from "react";
import { FaBookmark } from "react-icons/fa6";
import type { Interview } from "@/types";


const ListExperiences = ({interviewData}:{interviewData:Interview[]}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="py-16 grid grid-cols-1 md:grid-cols-2  gap-8  select-none">
      {interviewData.map((data, index) => {
        return (
          <div
            key={index}
            onClick={() => setIsModalOpen((prev) => !prev)}
            className="px-4 py-2 flex flex-col bg-[#171717] border-2 border-[#333333] rounded-md  cursor-pointer"
          >
            {/* Company Name and save icon  */}
            <div className="pb-1 flex justify-between items-center text-neutral-400 border-b border-neutral-500/90">
              <span className="text-3xl font-mono font-semibold ">
                {data.companyName}
              </span>
              <span
                className={`${
                  index % 4 == 0 ? "text-yellow-500" : "text-slate-500"
                }`}
              >
                <FaBookmark className="h-6 w-6" />
              </span>
            </div>

            {/* Candidate name and batch  */}
            <div className="pt-2 flex gap-4">
              <div>
                <span className="font-mono font-semibold text-lg text-neutral-400">
                  Candidate :{" "}
                </span>
                <span className="font-mono text-lg">{data.candidate}</span>
              </div>
              <div className="flex justify-center items-center text-sm px-2 bg-[#111111] text-neutral-200 border border-gray-400 rounded-md  font-mono">
                <span>{data.batch}</span>
                <span className="hidden md:block">
                  -{data.yearOfPassingOut}
                </span>
              </div>
            </div>

            {/* Offer Details  */}
            <div className="flex flex-col border-b border-neutral-500/90 pb-1">
              <div className="flex gap-2">
                <span className="font-mono font-semibold text-lg text-neutral-400">
                  Role :{" "}
                </span>
                <span className="font-mono text-lg">{data.role}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-mono font-semibold text-lg text-neutral-400">
                  Number of Rounds :{" "}
                </span>
                <span className="font-mono text-lg">{data.numberOfRounds}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-mono font-semibold text-lg text-neutral-400">
                  CTC Offered :{" "}
                </span>
                <span className="font-mono text-lg">{data.ctcOffered}</span>
              </div>
            </div>

            {/* Tags  */}
            <div className="pt-2 h-full flex items-center gap-4">
              {data.tags.map((tag, idx) => {
                return (
                  <span
                    key={idx}
                    className="bg-[#111111] text-neutral-200 border border-gray-400 px-2 rounded-sm"
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
            {isModalOpen && (
              <InterviewDialog
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                candidate={`${data.candidate}`}
                batch={`${data.batch}`}
                yearOfPassingOut={data.yearOfPassingOut}
                role={`${data.role}`}
                ctcOffered={data.ctcOffered}
                companyName={`${data.companyName}`}
                allRounds={data.allRounds}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ListExperiences;
