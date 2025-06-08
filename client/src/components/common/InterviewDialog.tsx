import { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Round } from "@/types";

interface DialogProps {
  isModalOpen: boolean;
  setIsModalOpen: (x: boolean) => void;
  companyName: string;
  candidate: string;
  batch: string;
  yearOfPassingOut: number;
  role: string;
  ctcOffered: number | null;
  allRounds: Round[];
}

const InterviewDialog = ({
  isModalOpen,
  setIsModalOpen,
  companyName,
  candidate,
  batch,
  yearOfPassingOut,
  role,
  ctcOffered,
  allRounds,
}: DialogProps) => {
  // Handle ESC key press
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen, setIsModalOpen]);

  if (!isModalOpen) return null;

  return (
    <div
      onClick={() => setIsModalOpen(false)}
      className="fixed inset-0 z-50 px-2 sm:px-0 bg-black/10 backdrop-blur-sm flex justify-center items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative px-5 py-4 w-full max-w-3xl h-[520px] overflow-auto flex flex-col gap-4 bg-[#171717] border border-[#333333] rounded-md font-mono"
      >
        {/* company name  */}
        <div className="flex justify-between items-center">
          <div className="text-2xl sm:text-4xl">{companyName}</div>
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close dialog"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* candidate details  */}
        <div className="flex flex-col gap-2">
          <div>
            <span className="font-semibold text-lg text-neutral-400">
              Candidate :{" "}
            </span>
            <span className="text-lg">{candidate}</span>
          </div>
          <div>
            <span className="font-mono font-semibold text-lg text-neutral-400">
              Batch :{" "}
            </span>
            <span className="text-lg">
              {batch}-{yearOfPassingOut}
            </span>
          </div>
          <div>
            <span className="font-mono font-semibold text-lg text-neutral-400">
              Role :{" "}
            </span>
            <span className="text-lg">{role}</span>
          </div>
          <div>
            <span className="font-mono font-semibold text-lg text-neutral-400">
              CTC Offered :{" "}
            </span>
            <span className="text-lg">{ctcOffered}</span>
          </div>
        </div>

        {/* Round details  */}
        <div>
          <Accordion type="single" collapsible className="flex flex-col gap-4">
            {allRounds.map((round, index) => {
              return (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-b-neutral-700">
                  <AccordionTrigger className=" text-xl sm:text-2xl underline-offset-8 decoration-[1px] ">
                    {round.roundName} ({round.roundType})
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
                                      <div className="px-2 py-1 bg-[#333333] text-neutral-400 rounded-md">{question.title}</div>
                                    </div>

                                    {question.description ? (
                                      <div className="flex flex-col gap-2">
                                        <p>Description :</p>
                                        <div className="px-2 py-1 bg-[#333333] text-neutral-400 rounded-md">{question.description}</div>
                                      </div>
                                    ) : (
                                      <></>
                                    )}

                                    {question.link ? (
                                      <div className="flex flex-col gap-2">
                                        <p>Link :</p>
                                        <div className="px-2 py-1 bg-[#333333] text-neutral-400 rounded-md">{question.link}</div>
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
    </div>
  );
};

export default InterviewDialog;
