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
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { IoIosAddCircleOutline } from "react-icons/io";
import WhiteButton from "@/components/common/WhiteButton";
import Question from "./Question";
import { useInterviewStore } from "@/store/interview";
import { toast } from "sonner";

const InterviewRound = ({
  roundNumber,
  interviewRoundId,
}: {
  roundNumber: number;
  interviewRoundId: string;
}) => {
  const [isSelectRoundTypePopoverOpen, setIsSelectRoundTypePopoverOpen] =
    useState(false);
  const interviewQuestions = useInterviewStore(
    (state) =>
      state.interviewRounds.find((round) => round.id == interviewRoundId)
        ?.questions
  );
  const getInterviewRoundInfo = useInterviewStore(
    (state) => state.getInterviewRoundInfo
  );
  const updateInterviewRound = useInterviewStore(
    (state) => state.updateInterviewRound
  );
  const addQuestion = useInterviewStore((state) => state.addInterviewQuestion);
  const deleteInterviewRound = useInterviewStore(
    (state) => state.deleteInterviewRound
  );
  const { roundType, roundNote } = getInterviewRoundInfo(interviewRoundId);

  const handleAddQuestion = (interviewRoundId:string) => {
    if(interviewQuestions && interviewQuestions.length > 0){
      const lastQuestion = interviewQuestions.at(interviewQuestions.length-1);
      if(lastQuestion && lastQuestion.title == ""){
        toast.warning("Empty Question !", {
          description: "Each question must have a Title.",
        });
        return;
      }
      else addQuestion(interviewRoundId);
    }
    else{
      addQuestion(interviewRoundId);
    }
  }

  return (
    <div className="pt-4 w-full flex gap-4">
      <AccordionItem value={`item-${roundNumber}`} className="flex-1">
        <AccordionTrigger className="text-xl sm:text-2xl">{`Round ${roundNumber}`}</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-6 sm:gap-4 ">
            {/* select round type  */}
            <Popover
              onOpenChange={setIsSelectRoundTypePopoverOpen}
              open={isSelectRoundTypePopoverOpen}
            >
              <PopoverTrigger className="w-full text-left text-sm sm:text-xl cursor-pointer">
                <div className="w-full flex flex-col gap-2">
                  <span className="">Select Round Type : </span>

                  <div className="w-full px-4 py-3 flex justify-between items-center bg-[#333333] rounded-sm">
                    <span className="text-neutral-400 text-sm sm:text-lg">
                      {roundType}
                    </span>
                    <FaAngleDown className="h-4 w-4" />
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="bg-[#171717] border-1 border-[#333333] text-neutral-400 text-sm sm:text-lg">
                <div
                  onClick={() => setIsSelectRoundTypePopoverOpen(false)}
                  className="flex flex-col gap-3 sm:gap-2 cursor-pointer"
                >
                  <div
                    onClick={() =>
                      updateInterviewRound(interviewRoundId, {
                        roundType: "Online Assessment (OA)",
                      })
                    }
                    className="hover:bg-[#333333] px-2 rounded-sm"
                  >
                    Online Assessment (OA)
                  </div>
                  <div
                    onClick={() =>
                      updateInterviewRound(interviewRoundId, {
                        roundType: "Technical Round",
                      })
                    }
                    className="hover:bg-[#333333] px-2 rounded-sm"
                  >
                    Technical Round{" "}
                  </div>
                  <div
                    onClick={() =>
                      updateInterviewRound(interviewRoundId, {
                        roundType: "Machine Coding Round",
                      })
                    }
                    className="hover:bg-[#333333] px-2 rounded-sm"
                  >
                    Machine Coding Round{" "}
                  </div>
                  <div
                    onClick={() =>
                      updateInterviewRound(interviewRoundId, {
                        roundType: "Group Discussion Round (GD)",
                      })
                    }
                    className="hover:bg-[#333333] px-2 rounded-sm"
                  >
                    Group Discussion Round (GD)
                  </div>
                  <div
                    onClick={() =>
                      updateInterviewRound(interviewRoundId, {
                        roundType: "HR Round",
                      })
                    }
                    className="hover:bg-[#333333] px-2 rounded-sm"
                  >
                    HR Round
                  </div>
                  <div
                    onClick={() =>
                      updateInterviewRound(interviewRoundId, {
                        roundType: "CTO Round",
                      })
                    }
                    className="hover:bg-[#333333] px-2 rounded-sm"
                  >
                    CTO Round
                  </div>
                  <div
                    onClick={() =>
                      updateInterviewRound(interviewRoundId, {
                        roundType: "Cultural Fitness Round",
                      })
                    }
                    className="hover:bg-[#333333] px-2 rounded-sm"
                  >
                    Cultural Fitness Round
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* add a note  */}
            <div className="flex flex-col gap-2">
              <p className="text-sm sm:text-xl">Add Note (optional) : </p>
              <textarea
                name="thoughts"
                value={roundNote ? roundNote : ""}
                onChange={(e) =>
                  updateInterviewRound(interviewRoundId, {
                    note: e.target.value,
                  })
                }
                placeholder={`Share guidance for this round.`}
                className="bg-[#333333] h-32 w-full text-neutral-400 resize-none px-4 py-4 rounded-md text-sm sm:text-lg focus:outline-none placeholder:text-neutral-400 placeholder:text-lg"
              ></textarea>
            </div>

            {/* add questions */}
            {interviewQuestions && interviewQuestions.length > 0 ? (
              <Accordion type="single" collapsible>
                <div className="w-full py-2 flex flex-col gap-4">
                  {interviewQuestions.map((question, idx) => {
                    return (
                      <Question
                        key={question.id}
                        questionNumber={idx + 1}
                        interviewRoundId={interviewRoundId}
                        questionId={question.id}
                      />
                    );
                  })}
                </div>
              </Accordion>
            ) : (
              <div className="w-full py-4 text-center text-lg sm:text-xl">
                Click 'Add Question' button to add question.
              </div>
            )}

            {/* add question button  */}
            <div className="pt-4">
              <WhiteButton
                onClick={() => {
                  handleAddQuestion(interviewRoundId);
                }}
                text="Add Question"
                Icon={IoIosAddCircleOutline}
                className="bg-transparent text-neutral-400 hover:text-black"
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <span
        onClick={() => deleteInterviewRound(interviewRoundId)}
        className="pt-4 px-2 flex justify-center text-red-400 cursor-pointer"
      >
        <FaTrash className="w-4 h-4 sm:w-6 sm:h-6" />
      </span>
    </div>
  );
};

export default InterviewRound;
