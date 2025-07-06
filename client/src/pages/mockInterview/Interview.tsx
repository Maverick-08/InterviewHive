import WhiteButton from "@/components/common/WhiteButton";
import { useSidebarStore } from "@/store/SidebarStore";
import { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { useReactMediaRecorder } from "react-media-recorder";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import questionsList from "./utils";
import { useSelectedTrack } from "@/store/selectedTrackStore";

const Interview = ({activateTrackSelection}:{activateTrackSelection:(x:string)=>void}) => {
  const isSideBarActive = useSidebarStore((state) => state.isSidebarActive);
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
  const [endInterview, setEndInterview] = useState(false);
  const selectedTrack = useSelectedTrack(state=>state.selectedTrack)
  const questions = questionsList.get(selectedTrack as string) as string[];
  const [counter, setCounter] = useState<number>(-1);
  const { status, startRecording, stopRecording, mediaBlobUrl, pauseRecording } =
    useReactMediaRecorder({ video: true, audio: true, screen: true });
    const navigate = useNavigate();

  // Prevent page reload
  useEffect(() => {
    const reload = (event: BeforeUnloadEvent) => {
      if (status == "recording" && !endInterview) {
        toast.warning("Please end Interview first");
        event.preventDefault();
        alert("Dont")
      }
    };
    window.addEventListener("beforeunload", reload);

    return () => window.removeEventListener("beforeunload", reload);
  }, [status, endInterview]);

  // Prevent back key press before interview ends
  useEffect(()=>{
    window.history.pushState(null, "", window.location.href);
    const handlePopState = () => {
      if(status == "recording" && !endInterview){
        toast.warning("Please end Interview first.")
        window.history.pushState(null, "", window.location.href);
      }
      if(status !== "recording"){
        navigate("/prepare")
        activateTrackSelection("Track Selection")
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  },[status,endInterview,navigate,activateTrackSelection])

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
    <div className="w-full max-w-6xl flex items-center justify-between">
      {/* Web cam  + Recording Status*/}
      <div className="w-[60%] h-full p-4 rounded-lg border border-neutral-800 bg-[#171717]">
        <div className="h-full flex flex-col gap-2 ">
          {/* Recording Status  */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className=" h-2 w-2 rounded-full bg-red-600"></div>
              <div
                className={`absolute inset-0 h-2 w-2 rounded-full bg-red-600 ${
                  status == "recording" ? "animate-ping" : ""
                }`}
              ></div>
            </div>
            <p className="text-neutral-500">
              {status == "recording"
                ? "Recording In Progress"
                : "Start Recording"}
            </p>
          </div>

          {/* Web Cam  */}
          <div className="h-full w-full">
            <Webcam
              mirrored={true}
              className="object-cover"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
      </div>

      {/* Questions + progress + control buttons  */}
      <div className="w-[35%] h-full flex flex-col justify-between">
        {/* Question card + Progress bar  */}
        <div className="flex flex-col gap-8">
          {/* Questions  */}
          <div className="p-4 flex flex-col items-center gap-4 rounded-lg border border-neutral-800 bg-[#171717]">
            <p className="text-lg">
              {counter >= 0
                ? questions.at(counter)
                : "Click on Start Button to start the Interview"}
            </p>
            <WhiteButton
              disabled={counter == -1 || counter >= questions.length}
              onClick={() => {
                if(status == 'stopped'){
                  toast.warning("Recording is stopped",{description:"Please resume recording"});
                  return;
                }
                if (counter + 1 < questions.length) {
                  setCounter(counter + 1);
                }
              }}
              text="Next Question"
              className={`${
                counter >= 0 && !(counter >= questions.length)
                  ? ""
                  : "bg-white/40 hover:bg-white/40"
              } text-md`}
            />
          </div>

          {/* progress bar  */}
          <div className="p-4 flex flex-col gap-2 rounded-lg border border-neutral-800 bg-[#171717]">
            <div className="flex items-center justify-between">
              <span>Progress</span>
              <span>
                Question {counter < 0 ? 0 : counter + 1} of {questions.length}
              </span>
            </div>
            <div>
              <div className="w-full rounded-sm bg-neutral-500">
                <div
                  className="h-1 rounded-sm  bg-yellow-500"
                  style={{
                    width: `${
                      counter < 0 ? 0 : ((counter + 1) / questions.length) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Control buttons  */}
        <div className="p-4 flex items-center justify-between rounded-lg border border-neutral-800 bg-[#171717]">
          <WhiteButton
            text="End Interview"
            onClick={() => {
              stopRecording();
              setEndInterview(true);
            }}
            className=" bg-red-500 hover:bg-red-500 text-white hover:scale-110 transition-all duration-300 ease-in"
          />
          <WhiteButton
            text={`${
              status == "recording" ? "Stop Interview" : "Start Interview"
            }`}
            onClick={() => {
              if (status == "recording") {
                pauseRecording();
              } else {
                startRecording();
                if (counter == -1) setCounter(0);
              }
            }}
            className=" bg-green-500 hover:bg-green-500 text-white hover:scale-110 transition-all duration-300 ease-in"
          />
        </div>
      </div>
    </div>
  );
};

export default Interview;
