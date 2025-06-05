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
      className="fixed inset-0 z-50 bg-black/10 backdrop-blur-sm flex justify-center items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[80vh] w-full max-w-2xl mx-4 bg-slate-800 text-white p-6 rounded-lg font-mono"
      >
        {/* company name  */}
        <div className="flex justify-between items-center">
          <div className="text-4xl">{companyName}</div>
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
            <span>Candidate : </span>
            <span>{candidate}</span>
          </div>
          <div>
            <span>Batch : </span>
            <span>
              {batch}-{yearOfPassingOut}
            </span>
          </div>
          <div>
            <span>Role : </span>
            <span>{role}</span>
          </div>
          <div>
            <span>CTC Offered : </span>
            <span>{ctcOffered}</span>
          </div>
        </div>

        {/* Round details  */}
        <div>
          <Accordion type="single" collapsible>
            {allRounds.map((round, index) => {
              return (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>
                    {round.roundName}-{round.roundType}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div>
                      <div>{round.note}</div>
                      <div>
                        <Accordion type="single" collapsible>
                          {round.questions.map((question, idx) => {
                            return (
                              <AccordionItem key={idx} value={`item-${index+10}`}>
                                <AccordionTrigger>
                                  Question-{idx+1}
                                </AccordionTrigger>
                                <AccordionContent>
                                  <div>
                                    <div>{question.title}</div>
                                    <div>{question.description}</div>
                                    <div>{question.link}</div>
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
