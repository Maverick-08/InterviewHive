import { Card } from "../ui/card";
import { GoBookmarkFill } from "react-icons/go";
import { RxLightningBolt } from "react-icons/rx";
import { LuEye } from "react-icons/lu";
import WhiteButton from "./WhiteButton";
import { useState } from "react";
import { useSidebarStore } from "@/store/SidebarStore";
import type { Interview } from "@/types";
import {
  useInterviewModalStore,
  useSelectedInterviewStore,
} from "@/store/interviewModal";
import EditAndDeleteCommand from "./EditAndDeleteCommand";
import { useLocation, useNavigate } from "react-router-dom";
import { getFunction } from "@/utils/axiosRequest";
import { toast } from "sonner";

const InterviewExperienceCard = ({
  companyName,
  candidate,
  degree,
  yearOfPassingOut,
  role,
  rounds,
  CTCOffered,
  tags,
  viewCount,
  difficultyLevel,
  interviewDetails,
  interviewId,
  userId,
}: {
  interviewId: string;
  companyName: string;
  candidate: string;
  degree: string;
  yearOfPassingOut: number;
  role: string;
  rounds: number;
  CTCOffered?: number;
  tags: { tagName: string; tagInitials: string }[];
  viewCount?: number;
  difficultyLevel?: string;
  interviewDetails: Interview;
  userId?: string;
}) => {
  const isSidebarActive = useSidebarStore((state) => state.isSidebarActive);
  const pathname = useLocation().pathname;
  const [bookmarked, setBookmarked] = useState(pathname.includes("bookmark"));

  const setIsInterviewModalOpen = useInterviewModalStore(
    (state) => state.setIsInterviewModalOpen
  );
  const setSelectedInterview = useSelectedInterviewStore(
    (state) => state.setSelectedInterview
  );
  const isUserProfile = pathname.length - pathname.indexOf("profile") > 10;
  const navigate = useNavigate();

  const handleBookmark = async () => {
    const response = await getFunction(
      `/api/interview/save?interviewId=${interviewId}`
    );

    if (!bookmarked) {
      if (response.success) {
        setBookmarked(true);
        toast.success("Interview Saved Successfully !", {
          description: "Check Bookmarks",
        });
      } else {
        toast.warning(`${response.errMsg}`);
      }
    } else {
      if (response.success) {
        setBookmarked(false);
        toast.info("Interview Removed Successfully !", {
          description: "Check Bookmarks",
        });
      } else {
        toast.warning(`${response.errMsg}`);
      }
    }
  };

  const handleViewCountUpdate = async () => {
    await getFunction(`/api/interview/viewCount?interviewId=${interviewId}`);
  };

  const [tagClicked, setTagClicked] = useState(false);

  return (
    <Card
      className={`bg-[#171717] rounded-sm text-white p-4 group w-full ${
        isSidebarActive ? "w-full" : "w-full "
      }  border border-[#333333] transition-all duration-300 ease-in-out delay-300 hover:border-neutral-600  font-mono gap-4`}
    >
      {/* companyName & Bookmark  */}
      <div className="flex justify-between items-center">
        <span className="text-xl sm:text-2xl md:text-3xl  font-mono tracking-wide transition-color duration-300 ease-in-out delay-300 group-hover:text-blue-400">
          {companyName}
        </span>
        {pathname.includes("profile") && !isUserProfile ? (
          <EditAndDeleteCommand interviewId={interviewId as string} />
        ) : (
          <GoBookmarkFill
            className={`size-5 cursor-pointer transition-colors duration-300
          ${bookmarked ? "text-yellow-400" : "text-white/50"}
          `}
            onClick={handleBookmark}
          />
        )}
      </div>

      {/* offere details  */}
      <div className="flex flex-col gap-1 font-mono">
        {/* candidate name  */}
        <div className="flex items-center gap-4">
          <div
            onClick={() => {
              navigate(`/profile/${userId}`);
            }}
            className="flex gap-2 cursor-pointer"
          >
            <span className="text-neutral-500">Candidate:</span>
            <span>{candidate}</span>
          </div>
        </div>
        {/* role  */}
        <div className="flex gap-2">
          <span className="text-neutral-500">Role:</span>
          <span>{role}</span>
        </div>
        {/* number of rounds  */}
        <div className="flex gap-2">
          <span className="text-neutral-500">Number of rounds:</span>
          <span>{rounds}</span>
        </div>
        {/* ctc offered  */}
        <div className="flex gap-2">
          <span className="text-neutral-500">CTC Offered:</span>
          <span>{CTCOffered ?? "Not Disclosed"}</span>
        </div>
        {/* tags  */}
        <div className="flex gap-2 flex-wrap relative ">
          <div className="flex gap-1 px-2 text-sm rounded-full bg-blue-500/20 border border-blue-700/10 text-blue-500">
            <span className="">{degree}</span>
            <span>{yearOfPassingOut}</span>
          </div>
          {tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="bg-neutral-500/20 px-3 py-0.5 rounded-full text-[12px] text-neutral-300"
            >
              {tag.tagName}
            </span>
          ))}
          <div className="">
            {tags.length > 3 && (
            <div className="absolute">
              <button
                onClick={() => setTagClicked((prev) => !prev)}
                className="bg-neutral-500/20 px-3 py-0.5 rounded-full text-[8px] sm:text-[12px] text-neutral-400  cursor-pointer "
              >
                +{tags.length - 3} more
              </button>
              {tagClicked && (
                <div className="w-56 left-0 mt-1 bg-neutral-800 text-white text-xs rounded-md px-3 py-2 z-100 shadow-lg">
                  {tags.slice(3).map((tag, idx) => (
                    <div key={idx} className="text-neutral-300">
                      <span>{tag.tagName}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          </div>
        </div>
      </div>
      <p className="h-px w-full relative">
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      </p>

      {/* analytics and view details button  */}
      <div className=" mt-2 flex justify-between items-end font-mono">
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <LuEye className="size-4 text-green-400/60" />
            <span>{viewCount ?? 234}</span>
          </div>
          <div className="flex items-center gap-1">
            <RxLightningBolt className="size-4 text-amber-400" />
            <span>{difficultyLevel ?? "Medium"}</span>
          </div>
        </div>
        <WhiteButton
          onClick={() => {
            setIsInterviewModalOpen(true);
            setSelectedInterview(interviewDetails);
            handleViewCountUpdate();
          }}
          text="View Details "
          className="bg-[#333333] hover:bg-[#333333] group-hover:text-white border border-[#17171717] text-md text-white/60  transition-colors delay-300"
        />
      </div>
    </Card>
  );
};

export default InterviewExperienceCard;
