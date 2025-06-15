import InterviewDialog from "@/components/common/InterviewDialog";
import { useState } from "react";
import { FaBookmark } from "react-icons/fa6";
import type { Interview } from "@/types";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import SmoothScrollProvider from "@/components/common/SmoothScrollProvider";
import { cn } from "@/lib/utils";

const ListExperiences = ({
  interviewData,
  page,
  setPage,
  totalCount,
  isLoading,
}: {
  interviewData: Interview[];
  page?: number;
  setPage?: (x: number) => void;
  totalCount?: number;
  isLoading?: boolean;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePageIncrement = () => {
    if (
      !isLoading &&
      page &&
      setPage &&
      totalCount &&
      page + 1 <= totalCount / 10 + 1
    ) {
      setPage(page + 1);
    }
  };

  const handlePageDecrement = () => {
    if (!isLoading && page && setPage && page - 1 > 0) {
      setPage(page - 1);
    }
  };

  return (
    <div className="flex flex-col gap-12">
      {/* no iterviews present */}
      {interviewData.length == 0 && (
        <div className="pt-20 px-2 w-full flex justify-center items-center">
          <div className="w-full max-w-2xl py-8 px-2 flex flex-col justify-center items-center gap-4 bg-[#171717] border-1 border-[#333333] rounded-md select-none">
            <p className="text-xl md:text-3xl text-center">Oops...! No Interviews Available.</p>
            <p className="text-xs md:text-sm text-neutral-400 text-center">Try searching with different keywords or filter tags.</p>
          </div>
        </div>
      )}

      {/* list experience  */}
      {interviewData && interviewData.length > 0 && (
        <div className={`grid grid-cols-1 md:grid-cols-2  gap-8  select-none`}>
          {!isModalOpen && <SmoothScrollProvider />}
          {interviewData.map((data, index) => {
            return (
              <div
                key={data.id}
                onClick={() => setIsModalOpen((prev) => !prev)}
                className={cn(
                  `px-4 py-2 flex flex-col bg-[#171717] border-1 border-[#333333] rounded-md  cursor-pointer ${
                    isModalOpen ? "" : "hover:scale-105 ease-in duration-200"
                  }`
                )}
              >
                {/* Company Name and save icon  */}
                <div className="pb-1 flex justify-between items-center text-neutral-400 border-b-[1px] border-[#333333]">
                  <span className="text-3xl font-mono text-white ">
                    {data.companyName}
                  </span>
                  <span
                    className={`${
                      index % 4 == 0 ? "text-yellow-500" : "text-neutral-500"
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
                    <span className="font-mono text-lg">
                      {data.user.username}
                    </span>
                  </div>
                  <div className="hidden sm:flex justify-center items-center text-sm px-2 bg-neutral-500 text-neutral-300 border border-[#333333] rounded-md  font-semibold">
                    <span>{data.user.courseId}</span>
                    <span className="">-{data.user.yearOfPassingOut}</span>
                  </div>
                </div>

                {/* Offer Details  */}
                <div className="flex flex-col border-b-[1px] border-[#333333] pb-1">
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
                    <span className="font-mono text-lg">
                      {data.interviewRounds.length}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-mono font-semibold text-lg text-neutral-400">
                      CTC Offered :{" "}
                    </span>
                    <span className="font-mono text-lg">{data.CTCOffered}</span>
                  </div>
                </div>

                {/* Tags  */}
                <div className="pt-2 h-full flex items-center gap-4">
                  {data.tags.map((tag) => {
                    return (
                      <span
                        key={tag.tagId}
                        className="bg-neutral-500  text-neutral-300 border-[1px] border-[#333333] px-2 rounded-sm"
                      >
                        {tag.tagName}
                      </span>
                    );
                  })}
                </div>
                {isModalOpen && (
                  <InterviewDialog
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    candidate={`${data.user.username}`}
                    batch={`${data.user.courseId}`}
                    yearOfPassingOut={data.user.yearOfPassingOut}
                    role={`${data.role}`}
                    ctcOffered={data.CTCOffered ? data.CTCOffered : null}
                    companyName={`${data.companyName}`}
                    allRounds={data.interviewRounds}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* pagination  */}
      {interviewData.length > 0 && (
        <div className="flex justify-center">
          {page && setPage && totalCount && (
            <div className="flex gap-12 items-center">
              {/* previous page  */}
              <div
                onClick={handlePageDecrement}
                className={cn(
                  `flex items-center gap-2 ${
                    !isLoading && !(page - 1 > 0)
                      ? "text-neutral-500"
                      : "text-zinc-300 hover:scale-115"
                  }  cursor-pointer select-none ease-in duration-300`
                )}
              >
                <MdKeyboardDoubleArrowLeft className="h-6 w-6" />
                <span className="text-lg">Previous</span>
              </div>

              {/* next page  */}
              <div
                onClick={handlePageIncrement}
                className={cn(
                  `flex items-center gap-2 ${
                    !isLoading && !(page + 1 <= totalCount / 10 + 1)
                      ? "text-neutral-500"
                      : "text-zinc-300 hover:scale-115"
                  }  cursor-pointer select-none ease-in duration-300`
                )}
              >
                <span className="text-lg ">Next</span>
                <MdKeyboardDoubleArrowRight className="h-6 w-6" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ListExperiences;
