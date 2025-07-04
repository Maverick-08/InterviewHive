import WhiteButton from "@/components/common/WhiteButton";
import { useSidebarStore } from "@/store/SidebarStore";
import { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { useReactMediaRecorder } from "react-media-recorder";

const Interview = () => {
  const isSideBarActive = useSidebarStore((state) => state.isSidebarActive);
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
  const [endInterview, setEndInterview] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const questions = [
    "Explain Normalization",
    "Explain the difference bewtween join and subqueries.",
    "Explain logical schema",
    "Explain SQL vs No Sql",
  ];
  const [counter, setCounter] = useState<number>(-1);
  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder(
    { video: true, audio: true, screen: true }
  );

  // Download
  useEffect(() => {
    if (mediaBlobUrl && endInterview) {
      const link = document.createElement("a");
      link.href = mediaBlobUrl;
      link.download = "interview-recording.webm";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [mediaBlobUrl, endInterview]);

  // Prevent Side bar opening
  useEffect(() => {
    if (isSideBarActive) {
      toggleSidebar();
    }
  }, [isSideBarActive, toggleSidebar]);

  // Full Screen
  useEffect(() => {
    const goFullScreen = () => {
      const elem = document.documentElement as HTMLElement & {
        webkitRequestFullscreen?: () => Promise<void>;
        msRequestFullscreen?: () => Promise<void>;
      };
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    };

    // Add listener on first click
    const handleClick = () => {
      goFullScreen();
      window.removeEventListener("click", handleClick);
    };

    window.addEventListener("click", handleClick);

    // Cleanup
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="w-full max-w-5xl flex flex-col gap-8">
      {/* Webcam & Questions  */}
      <div className="flex justify-between">
        {/* Recording Status & Webcam  */}
        <div className="w-[60%] h-[50vh] p-4 flex flex-col gap-2 border border-white/15 bg-[#171717] rounded-lg">
          {/* Recording Status  */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className=" h-2 w-2 rounded-full bg-red-600"></div>
              <div
                className={`absolute inset-0 h-2 w-2 rounded-full bg-red-600 ${
                  isRecording ? "animate-ping" : ""
                }`}
              ></div>
            </div>
            <p>{isRecording ? "Recording" : "Recording Stopped"}</p>
          </div>

          {/* Web Cam  */}
          <div className="h-full w-full">
            <Webcam
              mirrored={true}
              className="object-cover"
              style={{ width: "100%", height: "90%" }}
            />
          </div>
        </div>

        <div className="w-[35%] h-[40vh] flex flex-col gap-4">
          {/* Questions  */}
          <div className="p-2 flex flex-col items-center gap-4 bg-[#171717] border border-[#333333] rounded-sm">
            <p className="text-lg">
              {counter >= 0
                ? questions.at(counter)
                : "Click on Start Button to start the Interview"}
            </p>
            <WhiteButton
              disabled={counter == -1 || (counter>=questions.length)}
              onClick={() => {
                if (counter+1 < questions.length) {
                  setCounter(counter + 1);
                }
              }}
              text="Next Question"
              className={`${
                counter >= 0 && !(counter>=questions.length) ? "" : "bg-white/40 hover:bg-white/40"
              } text-md`}
            />
          </div>

          {/* progress bar  */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span>Progress</span>
              <span>
                Question {counter < 0 ? 0: counter+1} of {questions.length}
              </span>
            </div>
            <div>
              <div className="w-full rounded-sm bg-neutral-500">
                <div
                  className="h-1 rounded-sm  bg-yellow-500"
                  style={{ width: `${counter < 0 ? 0 :((counter+1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Control Buttons  */}
      <div className="flex justify-center">
        <div className="flex items-center gap-8">
          {/* End Interview  */}
          <WhiteButton
            text="End Interview"
            onClick={() => setEndInterview(true)}
            className="bg-gradient-to-b from-red-400 to-red-500 hover:bg-red-600 hover:scale-110 transition-all ease-in duration-300 delay-100 text-white font-sans"
          />

          {/* Pause Interview  */}
          <WhiteButton
            text="Stop Interview"
            onClick={() => {
              stopRecording();
              setIsRecording(false);
            }}
            className="bg-gradient-to-b from-blue-400 to-blue-500 hover:bg-blue-600 hover:scale-110 transition-all ease-in duration-300 delay-100 text-white font-sans"
          />

          {/* Start Interview  */}
          <WhiteButton
            text="Start Interview"
            onClick={() => {
              startRecording();
              setIsRecording(true);
              setCounter(0);
            }}
            className="bg-gradient-to-b from-green-400 to-green-500 hover:bg-green-600 hover:scale-110 transition-all ease-in duration-300 delay-100 text-white font-sans"
          />
        </div>
      </div>
    </div>
  );
};

export default Interview;
