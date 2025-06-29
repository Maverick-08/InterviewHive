import InterviewExperienceCard from "@/components/common/InterviewExperienceCard";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/SidebarStore";
import type { Interview } from "@/types";

const ListInterviews = ({ interviewData }: { interviewData: Interview[] }) => {
  const isSidebarActive = useSidebarStore((state) => state.isSidebarActive);

  return (
    <div
      className={cn(
        `grid  ${
          isSidebarActive ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
        }  gap-8 select-none`
      )}
    >
      {interviewData.map((data, idx) => {
        return (
          <InterviewExperienceCard
            key={idx}
            companyName={data.companyName}
            candidate={data.user.username}
            degree={data.user.courseId}
            yearOfPassingOut={data.user.yearOfPassingOut}
            role={data.role}
            rounds={data.interviewRounds.length}
            CTCOffered={data.CTCOffered}
            tags={data.tags}
            interviewDetails={data}
            interviewId={data.id}
            userId={data.authorId}
            viewCount={data.viewCount}
            difficultyLevel={data.difficultyLevel}
          />
        );
      })}
    </div>
  );
};

export default ListInterviews;
