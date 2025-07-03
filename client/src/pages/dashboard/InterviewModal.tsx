import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
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
      bg: "bg-blue-600/20",
      border: "border-blue-600 text-blue-300",
    },
    {
      bg: "bg-sky-600/20",
      border: "border-sky-600 text-sky-300",
    },
    {
      bg: "bg-red-500/20",
      border: "border-red-600 text-red-300",
    },
    {
      bg: "bg-slate-600/20",
      border: "border-slate-600 text-slate-300",
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
  const isModalOpen = useInterviewModalStore(
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
      <DialogTitle />
      <DialogContent aria-describedby="" className="px-4 py-6 sm:px-0 sm:py-0 sm:p-4 w-4xl max-h-160 sm:max-h-120 font-mono overflow-y-scroll bg-[#171717] border border-white/20 text-white">
        <div className="flex flex-col w-full overflow-hidden">
          {/* Top conatiner  */}
          <div>
            <div className="m-4 ">
              <RoughNotationGroup show={show}>
                <span className="text-3xl relative">
                  <RoughNotation
                    type="box"
                    color="yellow"
                    padding={8}
                    animationDuration={1200}
                  >
                    {interviewData.companyName}
                  </RoughNotation>
                </span>
              </RoughNotationGroup>
            </div>
            <div className="flex flex-col my-4 text-neutral-400">
              {/* Candidate Name  */}
              <div className="flex items-center gap-2">
                <span>Candidate: </span>
                <span className="truncate whitespace-nowrap overflow-hidden text-white/90">
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
                <span className="hidden sm:block">Tags: </span>
                <div className="mt-2 sm:mt-0 flex flex-wrap sm:no-wrap items-center gap-2">
                  {interviewData.tags.map((tag, idx) => {
                    const color = tagColorClass[idx % tagColorClass.length];
                    return (
                      <span
                        key={idx + 100}
                        className={`px-3 py-0.5 text-[8px] sm:text-xs rounded-full ${color.bg}  ${color.border} `}
                      >
                        {tag.tagName.length > 20
                          ? tag.tagInitials
                          : tag.tagName}
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
