import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useEffect } from "react";
import {
  useInterviewModalStore,
  useSelectedInterviewStore,
} from "@/store/interviewModal";
import { useState } from "react";

const InterviewModal = () => {
  const tagColorClass = [
    {
      bg: "bg-teal-500/20",
      border: "border-teal-500 text-teal-300",
    },
    {
      bg: "bg-fuchsia-500/20",
      border: "border-fuchsia-500 text-fuchsia-300",
    },
    {
      bg: "bg-green-600/20",
      border: "border-green-600 text-green-300",
    },
  ];
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 300);
    return () => clearTimeout(timeout);
  }, []);

  const setIsInterviewModalOpen = useInterviewModalStore(
    (state) => state.setIsInterviewModalOpen
  );
  const isModalOpen =  useInterviewModalStore(
    (state) => state.isInterviewModalOpen
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
    <Dialog open={isModalOpen} onOpenChange={setIsInterviewModalOpen}>
      <DialogContent className="p-8 h-120 max-h-[600px] w-full md:w-[768px] lg:w-[896px] max-w-4xl overflow-y-scroll bg-[#171717] border border-white/20 text-white">
        <div className="flex flex-col justify-between">
          {/* Top conatiner  */}
          <div>
            <RoughNotationGroup show={show}>
              <p className="text-3xl relative">
                <RoughNotation
                  type="box"
                  color="yellow"
                  animationDuration={900}
                  padding={8}
                >
                  {interviewData.companyName}
                </RoughNotation>
              </p>
            </RoughNotationGroup>
            <div className="flex flex-col my-4 text-neutral-400">
              {/* Candidate Name  */}
              <div className="flex items-center gap-2">
                <span>Candidate: </span>
                <span className="text-white/90">
                  {interviewData.user.username}
                </span>
              </div>

              {/* Role  */}
              <div className="flex items-center gap-2">
                <span>Role: </span>
                <span className="text-white/90">{interviewData.role}</span>
              </div>

              {/* Interview Rounds  */}
              <div className="flex items-center gap-2">
                <span>Interview Rounds: </span>
                <span className="text-white/90">
                  {interviewData.interviewRounds.length}
                </span>
              </div>

              {/* CTC Offered  */}
              <div className="flex items-center gap-2">
                <span>CTC Offered: </span>
                <span className="text-white/90">
                  {interviewData.CTCOffered}
                </span>
              </div>

              {/* Tags  */}
              <div className="flex items-center gap-2">
                <span>Tags: </span>
                <div className="flex items-center gap-2">
                  {interviewData.tags.slice(0, 3).map((tag, idx) => {
                    const color = tagColorClass[idx % tagColorClass.length];
                    return (
                      <span
                        key={idx + 100}
                        className={`px-3 py-0.5 text-xs rounded-full ${color.bg}  ${color.border} `}
                      >
                        {tag.tagName}
                      </span>
                    );
                  })}
                  {interviewData.tags.length > 3 && (
                    <div className="text-start">
                      <span className="text-[10px] rounded-full text-neutral-300">
                        {" "}
                        +{interviewData.tags.length - 3} more{" "}
                      </span>
                    </div>
                  )}
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
                    <AccordionTrigger className="group text-xl sm:text-2xl underline-offset-8 decoration-[1px] text-neutral-400 hover:text-neutral-100 trasition-all duration-300">
                      Round {index + 1} ({round.roundType})
                    </AccordionTrigger>
                    <AccordionContent className="border border-white/15 p-4 rounded-md">
                      <div className="flex flex-col gap-6">
                        {round.note ? (
                          <div className="flex flex-col gap-2">
                            <p className="text-sm sm:text-xl">Note:</p>
                            <div className="px-4 py-4 rounded-md text-sm sm:text-lg text-neutral-200  bg-[#333333] italic">
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
                                  className="px-2 rounded-md border border-white/10 last:border-b hover:border-white/30 transition-all duration-300"
                                >
                                  <AccordionTrigger className="text-lg sm:text-xl px-2">
                                    Question-{idx + 1}
                                  </AccordionTrigger>
                                  <AccordionContent className="">
                                    <div className="px-2 font-mono text-sm sm:text-lg flex flex-col gap-4">
                                      <div className="flex flex-col gap-2">
                                        <p className="text-neutral-100">
                                          Title:
                                        </p>
                                        <div className="px-2 py-1 bg-white/20 text-neutral-100 rounded-md italic">
                                          {question.title}
                                        </div>
                                      </div>

                                      {question.description ? (
                                        <div className="flex flex-col gap-2">
                                          <p>Description :</p>
                                          <div className="px-2 py-1 bg-white/20  text-neutral-100 rounded-md italic">
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
      </DialogContent>
    </Dialog>
  );
};

export default InterviewModal;
