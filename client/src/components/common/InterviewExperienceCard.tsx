import { Card } from "../ui/card";
import { GoBookmarkFill } from "react-icons/go";
import { RxLightningBolt } from "react-icons/rx";
import { LuEye } from "react-icons/lu";
import WhiteButton from "./WhiteButton";
import { useSidebarStore } from "@/store/SidebarStore";

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
}: {
  companyName: string;
  candidate: string;
  degree: string;
  yearOfPassingOut: number;
  role: string;
  rounds: number;
  CTCOffered?: number;
  tags: { tagName: string }[];
  viewCount?: number;
  difficultyLevel?: string;
}) => {
  const isSidebarActive = useSidebarStore((state) => state.isSidebarActive);
  return (
    <Card className={`bg-[#171717] rounded-sm text-white p-6 ${isSidebarActive ? 'w-full':'w-full lg:max-w-lg'}  border border-[#333333] font-sans`}>
        {/* companyName & Bookmark  */}
      <div className="flex justify-between items-center">
        <span className="text-3xl font-mono tracking-wide">{companyName}</span>
        <GoBookmarkFill className="size-5" />
      </div>

      
      {/* offere details  */}
      <div className="flex flex-col gap-4 font-mono">
        {/* candidate name  */}
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <span className="text-neutral-500">Candidate :</span>
            <span>{candidate}</span>
          </div>
          <div className="flex gap-2 px-3 py-1 text-sm rounded-md bg-blue-500 border border-blue-700">
            <span >{degree}</span>
            <span>{yearOfPassingOut}</span>
          </div>
        </div>
        {/* role  */}
        <div className="flex gap-2">
          <span className="text-neutral-500">Role :</span>
          <span>{role}</span>
        </div>
        {/* number of rounds  */}
        <div className="flex gap-2">
          <span className="text-neutral-500">Number of rounds :</span>
          <span>{rounds}</span>
        </div>
        {/* ctc offered  */}
        <div className="flex gap-2">
          <span className="text-neutral-500">CTC Offered :</span>
          <span>{CTCOffered ?? "Not Disclosed"}</span>
        </div>
        {/* tags  */}
        <div className="flex gap-4">
          {tags.map((tag, idx) => (
            <span key={idx} className="bg-[#333333] px-3 py-1 rounded-md text-neutral-400">{tag.tagName}</span>
          ))}
        </div>
      </div>

      {/* analytics and view details button  */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <LuEye className="size-4" />
            <span>{viewCount ?? 234}</span>
          </div>
          <div className="flex items-center gap-2">
            <RxLightningBolt className="size-4" />
            <span>{difficultyLevel ?? "Medium"}</span>
          </div>
        </div>
        <WhiteButton text="View Details" />
      </div>
    </Card>
  );
};

export default InterviewExperienceCard;
