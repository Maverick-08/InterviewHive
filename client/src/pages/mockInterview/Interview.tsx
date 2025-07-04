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

  const { startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ video: true, audio: true, screen: true });

  const videoConstraints = {
    width: 600,
    height: 330,
    facingMode: "user",
  };

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
        <div className="w-[60%] h-[50vh] p-4 flex flex-col gap-2 bg-[#333333] rounded-lg">
          {/* Recording Status  */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className=" h-2 w-2 rounded-full bg-red-600"></div>
              <div className="absolute inset-0 h-2 w-2 rounded-full bg-red-600 animate-ping"></div>
            </div>
            <p>{isRecording ? "Recording" : "Recording Stopped"}</p>
          </div>

          {/* Web Cam  */}
          <div>
            <Webcam mirrored={true} videoConstraints={videoConstraints} />
          </div>
        </div>

        {/* Questions  */}
        <div className="w-[35%] h-[40vh] border"></div>
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
            }}
            className="bg-gradient-to-b from-green-400 to-green-500 hover:bg-green-600 hover:scale-110 transition-all ease-in duration-300 delay-100 text-white font-sans"
          />
        </div>
      </div>
    </div>
  );
};

export default Interview;
