import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { tracks } from "./utils";
import { useSelectedTrack } from "@/store/selectedTrackStore";

const SelectTracks = () => {
  const setTrack = useSelectedTrack((state) => state.setSelectedTrack);
  const selectedTrack = useSelectedTrack((state) => state.selectedTrack);
  return (
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1" className="w-[30vw]">
        <AccordionTrigger className="px-2 text-xl text-center border border-[#333333]">
          Tracks
        </AccordionTrigger>
        <AccordionContent className="h-[40vh] overflow-y-scroll px-4">
          <div className="pt-4 flex flex-col gap-4 cursor-pointer">
            {tracks.map((data, idx) => {
              return (
                <div
                  key={idx}
                  onClick={() => setTrack(data.value)}
                  className={`p-2 text-lg   font-mono ${
                    selectedTrack == data.value
                      ? "bg-white/70 text-black"
                      : "bg-neutral-800 text-neutral-500 hover:text-neutral-300"
                  }  rounded-sm`}
                >
                  {data.key}
                </div>
              );
            })}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SelectTracks;
