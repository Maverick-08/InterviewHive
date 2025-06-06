import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Accordion,
} from "@/components/ui/accordion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaTrash } from "react-icons/fa6";
import { addQuestion, deleteRound } from "./utils";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { IoIosAddCircleOutline } from "react-icons/io";
import WhiteButton from "@/components/common/WhiteButton";
import Question from "./Question";

const InterviewRound = ({
  roundNumber,
  roundId,
  roundIds,
  setRoundIds,
}: {
  roundNumber: number;
  roundId: string;
  roundIds: string[];
  setRoundIds: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [roundType, setRoundType] = useState<string>("Select Round Type");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [questionIds, setQuestionIds] = useState<string[]>([]);

  return (
    <div className="pt-4 w-full flex gap-4">
      <AccordionItem value={`item-${roundNumber}`} className="flex-1">
        <AccordionTrigger className="text-2xl">{`Round ${roundNumber}`}</AccordionTrigger>
        <AccordionContent>
          <div className="px-4 flex flex-col gap-4">
            {/* select round type  */}
            <Popover onOpenChange={setIsPopoverOpen} open={isPopoverOpen}>
              <PopoverTrigger className="w-full text-left text-lg cursor-pointer">
                <div className="w-full flex flex-col gap-2">
                  <span className="tracking-wide">Select Round Type : </span>
                  <div className="w-full px-4 py-1.5 flex justify-between items-center bg-[#333333] rounded-sm">
                    <span className="text-neutral-400">{roundType}</span>
                    <FaAngleDown className="h-4 w-4" />
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="bg-[#171717] border-1 border-[#333333] text-neutral-400 text-lg">
                <div
                  onClick={() => setIsPopoverOpen(false)}
                  className="flex flex-col gap-2 cursor-pointer"
                >
                  <div
                    onClick={() => setRoundType(" Online Assessment (OA)")}
                    className="hover:bg-[#333333] px-2 rounded-sm"
                  >
                    Online Assessment (OA)
                  </div>
                  <div
                    onClick={() => setRoundType("Technical Round")}
                    className="hover:bg-[#333333] px-2 rounded-sm"
                  >
                    Technical Round{" "}
                  </div>
                  <div
                    onClick={() => setRoundType("Machine Coding Round")}
                    className="hover:bg-[#333333] px-2 rounded-sm"
                  >
                    Machine Coding Round{" "}
                  </div>
                  <div
                    onClick={() => setRoundType("Group Discussion Round (GD)")}
                    className="hover:bg-[#333333] px-2 rounded-sm"
                  >
                    Group Discussion Round (GD)
                  </div>
                  <div
                    onClick={() => setRoundType("HR Round")}
                    className="hover:bg-[#333333] px-2 rounded-sm"
                  >
                    HR Round
                  </div>
                  <div
                    onClick={() => setRoundType("CTO Round")}
                    className="hover:bg-[#333333] px-2 rounded-sm"
                  >
                    CTO Round
                  </div>
                  <div
                    onClick={() => setRoundType("Cultural Fitness Round")}
                    className="hover:bg-[#333333] px-2 rounded-sm"
                  >
                    Cultural Fitness Round
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* add a note  */}
            <div className="flex flex-col gap-2">
              <p className="text-lg tracking-wide">Add Note (optional) : </p>
              <textarea
                name="thoughts"
                placeholder={`Share guidance for this round.`}
                className="bg-[#333333] h-52 w-full text-neutral-400 resize-none px-4 py-4 rounded-md text-lg focus:outline-none"
              ></textarea>
            </div>

            {/* add questions */}
            {questionIds.length > 0 ? (
              <Accordion type="single" collapsible>
                <div className="w-full py-2 flex flex-col gap-4">
                {questionIds.map((question,idx) =>{
                    return(
                        <Question  key={question} questionId={question} questionIds={questionIds} setQuestionIds={setQuestionIds} questionNumber={idx+1} />
                    )
                })}
                </div>
              </Accordion>
            ) : (
              <div className="w-full py-4 text-center text-xl">
                Click 'Add Question' button to add question.
              </div>
            )}

            {/* add question button  */}
            <div className="pt-4">
              <WhiteButton
                onClick={() => {
                  addQuestion({ questionIds, setQuestionIds });
                }}
                text="Add Question"
                Icon={IoIosAddCircleOutline}
                className="font-bold"
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <span
        onClick={() => deleteRound({ roundId, roundIds, setRoundIds })}
        className="pt-4 px-2 flex justify-center text-red-400 cursor-pointer"
      >
        <FaTrash className="w-5 h-6" />
      </span>
    </div>
  );
};

export default InterviewRound;
