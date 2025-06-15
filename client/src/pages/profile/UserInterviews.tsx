import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ListExperiences from "../dashboard/ListExperiences";
import type { Interview } from "@/types";
import { useInterviewModalStore } from "@/store/interviewModal";

const UserInterviews = ({interviews}:{interviews:Interview[]}) => {
    const isInterviewModalOpen = useInterviewModalStore(state => state.isInterviewModalOpen);
  const setIsInterviewModalOpen = useInterviewModalStore(state => state.setIsInterviewModalOpen)

  return (
    <AccordionItem value="item-1">
      <AccordionTrigger className="px-4 flex items-center rounded-md border border-[#333333] cursor-pointer">
        <p className="text-xl sm:text-4xl font-mono text-white">
          Shared Interviews
        </p>
      </AccordionTrigger>
      <AccordionContent className="pt-8 px-4 text-white">
        <ListExperiences interviewData={interviews} isModalOpen={isInterviewModalOpen} setIsModalOpen={setIsInterviewModalOpen}/>
      </AccordionContent>
    </AccordionItem>
  );
};

export default UserInterviews;
