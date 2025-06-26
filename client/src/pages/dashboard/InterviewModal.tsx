import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect } from "react";
import {
  useInterviewModalStore,
  useSelectedInterviewStore,
} from "@/store/interviewModal";

const InterviewModal = () => {
  const setIsInterviewModalOpen = useInterviewModalStore(
    (state) => state.setIsInterviewModalOpen
  );
  const interviewDataFunction = useSelectedInterviewStore(
    (state) => state.getSelectedInterviewData
  );
  const interviewData = interviewDataFunction();

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsInterviewModalOpen(false);
      }
    };

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [setIsInterviewModalOpen]);

  if (!open) return null;

  return (
    <div
      onClick={() => setIsInterviewModalOpen(false)}
      className="absolute z-[999] h-full w-full bg-black/10 backdrop-blur-sm flex justify-center items-center overflow-hidden"
    >
      <div onClick={(e) => e.stopPropagation()} className="p-8">
        <Card className="p-8 h-96 max-h-[400px] w-full md:w-[768px] lg:w-[896px] max-w-4xl overflow-y-scroll bg-[#171717] border-none text-white">
          <div className="flex flex-col justify-between">
            {/* Top conatiner  */}
            <div>
              <p>{interviewData.companyName}</p>
              <div className="flex flex-col gap-2">
                {/* Candidate Name  */}
                <div className="flex items-center gap-2">
                  <span>Candidate : </span>
                  <span>{interviewData.user.username}</span>
                </div>

                {/* Role  */}
                <div className="flex items-center gap-2">
                  <span>Role : </span>
                  <span>{interviewData.role}</span>
                </div>

                {/* Interview Rounds  */}
                <div className="flex items-center gap-2">
                  <span>Interview Rounds : </span>
                  <span>{interviewData.interviewRounds.length}</span>
                </div>

                {/* CTC Offered  */}
                <div className="flex items-center gap-2">
                  <span>CTC Offered : </span>
                  <span>{interviewData.CTCOffered}</span>
                </div>

                {/* Tags  */}
                <div className="flex items-center gap-2">
                  <span>Tags : </span>
                  <div className="flex items-center gap-2">
                    {interviewData.tags.map((tag, idx) => {
                      return (
                        <span key={idx + 100} className="">
                          {tag.tagName}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Interview rounds  */}
            <div>
              <Accordion
                type="single"
                collapsible
                className="flex flex-col gap-4 "
              >
                {interviewData.interviewRounds.map((round, index) => {
                  return (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="border-b border-b-neutral-700"
                    >
                      <AccordionTrigger className=" text-xl sm:text-2xl underline-offset-8 decoration-[1px] ">
                        Round {index + 1} ({round.roundType})
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-6">
                          {round.note ? (
                            <div className="flex flex-col gap-2">
                              <p className="text-sm sm:text-xl">Note :</p>
                              <div className="px-4 py-4 rounded-md text-sm sm:text-lg text-neutral-300 bg-[#333333]">
                                {round.note}
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          <div>
                            <Accordion
                              type="single"
                              collapsible
                              className="flex flex-col gap-4"
                            >
                              {round.questions.map((question, idx) => {
                                return (
                                  <AccordionItem
                                    key={idx}
                                    value={`item-${idx + 1}`}
                                    className="px-2 border border-neutral-800 last:border-b"
                                  >
                                    <AccordionTrigger className="text-lg sm:text-xl px-2">
                                      Question-{idx + 1}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                      <div className="px-2 font-mono text-sm sm:text-lg flex flex-col gap-4">
                                        <div className="flex flex-col gap-2">
                                          <p>Title :</p>
                                          <div className="px-2 py-1 bg-[#333333] text-neutral-400 rounded-md">
                                            {question.title}
                                          </div>
                                        </div>

                                        {question.description ? (
                                          <div className="flex flex-col gap-2">
                                            <p>Description :</p>
                                            <div className="px-2 py-1 bg-[#333333] text-neutral-400 rounded-md">
                                              {question.description}
                                            </div>
                                          </div>
                                        ) : (
                                          <></>
                                        )}

                                        {question.link ? (
                                          <div className="flex flex-col gap-2">
                                            <p>Link :</p>
                                            <div className="px-2 py-1 bg-[#333333] text-neutral-400 rounded-md">
                                              {question.link}
                                            </div>
                                          </div>
                                        ) : (
                                          <></>
                                        )}
                                      </div>
                                    </AccordionContent>
                                  </AccordionItem>
                                );
                              })}
                            </Accordion>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default InterviewModal;
