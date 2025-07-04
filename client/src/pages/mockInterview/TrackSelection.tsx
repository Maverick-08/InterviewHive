import TypingText from "@/components/animata/text/TypingText";
import WhiteButton from "@/components/common/WhiteButton";
import { IoPersonAddSharp } from "react-icons/io5";
import { IoHardwareChip } from "react-icons/io5";
import { FiDatabase } from "react-icons/fi";
import { LuNetwork } from "react-icons/lu";
import { BsBraces } from "react-icons/bs";
import { MdPeople } from "react-icons/md";
import type { IconType } from "react-icons";

const Tracks = [
  { trackName: "Operating System", icon: IoHardwareChip, color: "bg-red-500" },
  { trackName: "DBMS", icon: FiDatabase, color: "bg-purple-500" },
  { trackName: "Computer Network", icon: LuNetwork, color: "bg-green-500" },
  { trackName: "OOPS", icon: BsBraces, color: "bg-slate-500" },
  { trackName: "Mock Interview", icon: MdPeople, color: "bg-blue-500" },
];

const TrackSelection = ({
  activateInterviewScreen,
}: {
  activateInterviewScreen: (x: string) => void;
}) => {
  return (
    <div className="w-full max-w-4xl h-full pt-4 flex flex-col gap-6">
      {/* Title + Tagline  */}
      <div className="flex flex-col gap-4 text-center">
        {/* Title  */}
        <TypingText
          text="Ready For Your Interview ?"
          repeat={false}
          delay={100}
          className="text-4xl text-white/80"
          hideCursorOnComplete={true}
        />

        {/* Tagline  */}
        <div className="text-neutral-600 text-lg">
          Pick any <span className="text-neutral-400">Track</span> from our
          curated list of{" "}
          <span className="text-neutral-400">Interview Topics</span>
        </div>
      </div>

      {/* central content  */}
      <div className="w-full flex flex-col justify-center">
        <div className="px-4 flex justify-between items-center">
          {/* Web cam  */}
          <div className="w-[45%] h-full p-4 bg-[#171717] rounded-sm group border border-[#333333] hover:border-neutral-600 transition-all duration-300 ease-in-out delay-300 font-mono">
            {/* Title  */}
            <p className="text-center text-2xl">Web Cam</p>
            {/* content  */}
            <div className="w-full h-full flex justify-center items-center">
              <div className="p-12 rounded-full bg-[#333333] border-2 border-neutral-600">
                <IoPersonAddSharp className="h-12 w-12 text-neutral-500" />
              </div>
            </div>
          </div>

          {/* Tracks  */}
          <div className="w-[45%] p-4 bg-[#171717] rounded-sm group border border-[#333333] hover:border-neutral-600 transition-all duration-300 ease-in-out delay-300 font-mono">
            {/* Title  */}
            <p className="text-center text-2xl">Tracks</p>
            {/* content  */}
            <div className="w-full h-[40vh] overflow-y-scroll pt-4 flex flex-col gap-6 cursor-pointer text-neutral-500 ">
              {Tracks.map((data, idx) => {
                return (
                  <div
                    key={idx}
                    className="p-2 flex items-center gap-4 bg-neutral-800 hover:bg-[#333333] transition-all ease-in-out duration-300 rounded-sm"
                  >
                    <IconWithTitle
                      key={idx}
                      title={`${data.trackName}`}
                      Icon={data.icon}
                      iconStyle={`${data.color}`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="pt-6 flex justify-center">
          <WhiteButton
            text="Start Interview"
            onClick={() => activateInterviewScreen("Interview")}
            className="bg-[#171717] text-neutral-400 py-1.5 hover:text-neutral-300 hover:bg-[#171717] hover:scale-110 transition-all duration-500"
          />
        </div>
      </div>
    </div>
  );
};

export default TrackSelection;

const IconWithTitle = ({
  Icon,
  title,
  iconStyle,
}: {
  Icon: IconType;
  title: string;
  iconStyle: string;
}) => {
  return (
    <>
      <span className={`p-2 rounded-sm ${iconStyle}`}>
        <Icon className={`h-6 w-6 text-white`} />
      </span>
      <span className="text-lg">{title}</span>
    </>
  );
};
