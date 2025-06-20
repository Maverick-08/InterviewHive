import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import type { Interview } from "@/types";
import ListInterviews from "../dashboard/ListInterviews";

const UserInterviews = ({ interviews }: { interviews: Interview[] }) => {
  return (
    <AccordionItem value="item-1">
      <AccordionTrigger className="px-4 flex items-center rounded-md border border-[#333333] cursor-pointer">
        <p className="text-xl sm:text-4xl font-mono text-white">
          Shared Interviews
        </p>
      </AccordionTrigger>
      <AccordionContent className="pt-8 px-4 text-white">
        <ListInterviews interviewData={interviews} />
      </AccordionContent>
    </AccordionItem>
  );
};

export default UserInterviews;
