import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaTrash } from "react-icons/fa6";
import { deleteQuestion } from "./utils";
import { RxCross2 } from "react-icons/rx";

const Question = ({
  questionId,
  questionNumber,
  questionIds,
  setQuestionIds,
}: {
  questionId: string;
  questionNumber: number;
  questionIds: string[];
  setQuestionIds: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  return (
    <div className="pt-4 w-full flex gap-4">
      <AccordionItem
        value={`item-${questionNumber}`}
        className="w-full border border-neutral-800"
      >
        <AccordionTrigger className="text-lg sm:text-xl px-2">{`Question ${questionNumber}`}</AccordionTrigger>
        <AccordionContent>
          <div className="text-sm sm:text-lg flex flex-col gap-4">
            {/* question title  */}
            <div className="px-2 sm:px-4 flex flex-col gap-2">
              <p>Title</p>

              <input
                type="text"
                name="question title"
                placeholder="Question's Title"
                className="bg-[#333333] w-full text-neutral-400  px-2 py-1 rounded-md focus:outline-none"
              />
            </div>

            {/* question description  */}
            <div className="px-2 sm:px-4 flex flex-col gap-2">
              <p>Description (optional)</p>
              <textarea
                name="question description"
                placeholder={`Any suggestion on how to tackle this question ?`}
                className="bg-[#333333] h-32 sm:h-52 w-full resize-none text-neutral-400  px-2 py-1 rounded-md focus:outline-none"
              />
            </div>

            {/* question Link  */}
            <div className="px-4 flex flex-col gap-2">
              <p>Link (optional)</p>

              <input
                type="text"
                name="question link"
                placeholder="Question's Link (If available)"
                className="bg-[#333333] w-full text-neutral-400  px-2 py-1 rounded-md focus:outline-none"
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <span
        onClick={() =>
          deleteQuestion({ questionId, questionIds, setQuestionIds })
        }
        className="pt-4 sm:px-2 flex justify-center text-red-400 cursor-pointer"
      >
        <FaTrash className="hidden sm:block w-4 h-4" />
        <RxCross2 className="block sm:hidden w-4 h-4" />
      </span>
    </div>
  );
};

export default Question;
