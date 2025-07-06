import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import SelectTracks from "./SelectTracks";
import WhiteButton from "@/components/common/WhiteButton";
import { useSelectedTrack } from "@/store/selectedTrackStore";
import { toast } from "sonner";

const TrackSelection = ({
  activateInterviewScreen,
}: {
  activateInterviewScreen: (x: string) => void;
}) => {
  const selectedTrack = useSelectedTrack((state) => state.selectedTrack);
  return (
    <div className="w-full max-w-6xl h-full flex flex-col bg-[#333333] rounded-lg">
      {/* Title & Tagline */}
      <div>
        <p className="text-2xl text-center text-white font-mono">
          Prepare for your Next Interview!
        </p>
      </div>

      {/* main container  */}
      <div className="w-full h-full px-2 flex items-center justify-between">
        {/* webcam card  */}
        <div className="w-[45%] h-[60vh] flex flex-col gap-8 items-center justify-center rounded-lg bg-black/80">
          <p className="text-white text-2xl">Webcam</p>
          <div className=" p-12 rounded-full border-4 border-neutral-600 bg-[#333333]">
            <MdOutlinePersonAddAlt1 className="h-16 w-16 text-neutral-600" />
          </div>
        </div>

        {/* tracks card */}
        <div className="w-[45%] h-[60vh] pt-4 flex flex-col justify-between items-center rounded-lg bg-black/80">
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
              className="bg-neutral-800 hover:bg-neutral-800 text-neutral-600 hover:text-neutral-400 hover:scale-110 transition-all duration-300 ease-in-out"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackSelection;
