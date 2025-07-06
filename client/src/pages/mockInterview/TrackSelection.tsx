import SelectTracks from "./SelectTracks";
import WhiteButton from "@/components/common/WhiteButton";
import { useSelectedTrack } from "@/store/selectedTrackStore";
import { toast } from "sonner";
import ImageForWC from "@/assets/DontMove.png"

const TrackSelection = ({
  activateInterviewScreen,
}: {
  activateInterviewScreen: (x: string) => void;
}) => {
  const selectedTrack = useSelectedTrack((state) => state.selectedTrack);
  return (
    <div className="w-full max-w-6xl h-full flex flex-col rounded-lg">
      {/* Title & Tagline */}
      <div className="flex flex-col gap-2">
        <p className="text-2xl text-center text-white font-mono">
          Prepare for your Next Interview!
        </p>
        <p className="text-center text-white/40">
          Pick any <span className="text-white/80">Tracks</span> from our
          curated list of{" "}
          <span className="text-white/80">Interview Topics</span>
        </p>
      </div>

      {/* main container  */}
      <div className="w-full h-full gap-4 lg:gap-8 px-2 flex items-center ">
        {/* webcam card  */}
        <div className="w-full h-[60vh] flex flex-col gap-8 items-center justify-center rounded-lg border border-white/15 bg-black/80 ">
          <p className="text-white text-2xl">Webcam</p>
          <div className="p-2 rounded-full border-2 border-white/10">
            <img src={ImageForWC} alt="doodle" className="h-32 lg:h-40 w-32 lg:w-40 xl:h-52 xl:w-52 object-cover rounded-full "/>
          </div>
          {/* <div className=" p-12 rounded-full border-4 border-neutral-600 bg-[#333333]">
            <MdOutlinePersonAddAlt1 className="h-16 w-16 text-neutral-600" />
          </div> */}
        </div>

        {/* tracks card */}
        <div className="w-full h-[60vh] flex flex-col justify-between items-center rounded-lg">
          <SelectTracks />
          <div className="w-full p-4 flex justify-end ">
            <WhiteButton
              text="Start Interview"
              onClick={() => {
                if (!selectedTrack) {
                  toast.warning(
                    "Please select a track before procedding to Interview"
                  );
                } else {
                  activateInterviewScreen("Interview");
                }
              }}
              className="bg-neutral-800 text-white hover:scale-105  hover:bg-neutral-800 transition-all duration-300 ease-in-out"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackSelection;
