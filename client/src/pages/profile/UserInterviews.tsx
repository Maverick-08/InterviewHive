import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { tempData } from "../dashboard/temp";
import ListExperiences from "../dashboard/ListExperiences";

const UserInterviews = () => {
  return (
    <AccordionItem value="item-1">
      <AccordionTrigger className="px-4 flex items-center rounded-md border border-[#333333] cursor-pointer">
        <p className="text-xl sm:text-4xl font-mono text-white">
          Shared Interviews
        </p>
      </AccordionTrigger>
      <AccordionContent className="pt-8 text-white">
        <ListExperiences interviewData={tempData} />
      </AccordionContent>
    </AccordionItem>
  );
};

export default UserInterviews;
