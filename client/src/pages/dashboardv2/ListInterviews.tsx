import InterviewExperienceCard from "@/components/common/InterviewExperienceCard";
import { useSidebarStore } from "@/store/SidebarStore";
import type { Interview } from "@/types";

const ListInterviews = ({ interviewData }: { interviewData: Interview[] }) => {
    const isSidebarActive = useSidebarStore(state => state.isSidebarActive);
  return (
    <div className={`grid grid-cols-1 ${isSidebarActive ? 'md:grid-cols-2' : 'md:grid-cols-3'}  gap-8 select-none`}>
      {interviewData.map((data) => {
        return (
          <InterviewExperienceCard
            companyName={data.companyName}
            candidate={data.user.username}
            degree={data.user.courseId}
            yearOfPassingOut={data.user.yearOfPassingOut}
            role={data.role}
            rounds={data.interviewRounds.length}
            CTCOffered={data.CTCOffered}
            tags={data.tags}
          />
        );
      })}
    </div>
  );
};

export default ListInterviews;
