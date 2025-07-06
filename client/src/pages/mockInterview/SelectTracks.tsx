import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const tracks = [
  "Operating System (Level-1)",
  "Operating System (Level-2)",
  "Operating System (Level-3)",
  "DBMS (Level-1)",
  "DBMS (Level-2)",
  "DBMS (Level-3)",
  "Computer Networks (Level-1)",
  "Computer Networks (Level-2)",
  "Computer Networks (Level-3)",
  "Object Oriented Programming",
  "Mock Interview",
];

const SelectTracks = () => {
  return (
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1" className="w-[30vw]">
        <AccordionTrigger className="px-2 text-xl text-center border border-[#333333]">Tracks</AccordionTrigger>
        <AccordionContent className="h-[40vh] overflow-y-scroll px-4">
          <div className="pt-4 flex flex-col gap-4 cursor-pointer">
            {tracks.map((data, idx) => {
              return <div key={idx} className="p-2 text-lg text-neutral-500 hover:text-neutral-300 font-mono bg-neutral-800 rounded-sm">{data}</div>;
            })}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SelectTracks;
