import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaTrash } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { useInterviewStore } from "@/store/interview";

const Question = ({
  questionNumber,
  interviewRoundId,
  questionId,
}: {
  questionNumber: number;
  interviewRoundId: string;
  questionId: string;
}) => {
  const getQuestionInfo = useInterviewStore(state => state.getInterviewQuestionInfo);
  const updateInterviewQuestion = useInterviewStore(state => state.updateInterviewQuestion);
  const deleteQuestion = useInterviewStore(state => state.deleteInterviewQuestion);
  
  const {title,description,link} = getQuestionInfo(interviewRoundId,questionId);

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
                value={title ?? ""}
                onChange={e => updateInterviewQuestion(interviewRoundId,questionId,{title:e.target.value})}
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
                value={description ?? ""}
               onChange={e => updateInterviewQuestion(interviewRoundId,questionId,{description:e.target.value})}
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
                value={link ?? ""}
                 onChange={e => updateInterviewQuestion(interviewRoundId,questionId,{link:e.target.value})}
                placeholder="Question's Link (If available)"
                className="bg-[#333333] w-full text-neutral-400  px-2 py-1 rounded-md focus:outline-none"
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <span
        onClick={() =>
          deleteQuestion(interviewRoundId,questionId)
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
