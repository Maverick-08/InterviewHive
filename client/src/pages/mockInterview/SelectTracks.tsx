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
    <Accordion type="single" collapsible className="px-4 w-full" >
      <AccordionItem value="item-1" className="w-full">
        <AccordionTrigger className="px-2 w-full text-xl lg:text-2xl text-center bg-white/20 ">
          Tracks
        </AccordionTrigger>
        <AccordionContent className="h-[35vh] overflow-y-scroll px-4">
          <div className="pt-4 flex flex-col gap-4 cursor-pointer">
            {tracks.map((data, idx) => {
              return (
                <div
                  key={idx}
                  onClick={() => setTrack(data)}
                  className={`p-2 text-md lg:text-lg   font-mono ${
                    selectedTrack?.value == data.value
                      ? "bg-white/90 text-black"
                      : "bg-white/10 text-white/70 hover:text-white"
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
