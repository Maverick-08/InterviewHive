import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  question: string;
  answer: string;
}

interface Faq1Props {
  heading?: string;
  items?: FaqItem[];
}

const Faq1 = ({
  heading = "Got Questions? We got you...",
  items = [
    {
      question: "What is Interview Hive?",
      answer:
        "Interview Hive is a student-driven platform where college students can share and explore real interview experiences to prepare for campus placements.",
    },
    {
      question: "Who can contribute to Interview Hive?",
      answer:
        "Final-year students who have attended placement interviews can contribute by sharing detailed accounts of their interview experiences.",
    },
    {
      question: "How does Interview Hive help juniors?",
      answer:
        "Juniors can read shared experiences to understand what to expect in interviews-including questions asked, company-specific rounds,and preparation stratergies.",
    },
    {
      question: "Can I save an Interview experience for later?",
      answer:
        "Yes! You can bookmark any experirence so it's easy to find and review during your placement preparation",
    },
    {
      question: "Is there a way to get help while using the platform?",
      answer:
        "Definitely. IH include a built-in chatbot assistant that helps you explore resources, find relevant interviews, and suggest preparation materials like mock questions and coding problems",
    }
  ],
}: Faq1Props) => {
  return (
    <section className="mt-20 sm:mt-52 p-4 container max-w-6xl font-mono  border-white/15 rounded-md select-none">
      <div className="flex flex-col md:flex-row justify-between gap-8">
        <div className="flex flex-col col-span-2">
          <p className="py-2 text-start text-xs text-white/65">
            COMMON QUESTIONS
          </p>
          <h1 className="mb-4 text-3xl font-semibold md:mb-11 md:text-4xl text-white/80 text-start max-w-xs text-balance">
            {heading}
          </h1>
        </div>

        <div>
          <Accordion type="single" collapsible className="">
          {items.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-b-white/15"
            >
              <AccordionTrigger className="sm:font-semibold hover:no-underline text-lg sm:text-xl text-white
               hover:text-blue-400 transition-all duration-300 delay-100">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="max-w-lg text-sm sm:text-md transiion-all text-white/70">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        </div>
      </div>
    </section>
  );
};

export { Faq1 };
