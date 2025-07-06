import { useContentAccessStore } from "@/store/contentAccessStore";
import ContentNotAccessible from "@/components/common/ContentNotAccessible";
import TrackSelection from "./TrackSelection";
import { useEffect, useState } from "react";
import Interview from "./Interview";
import FeatureNotAvailable from "@/components/common/FeatureNotAvailable";

const MockInterview = () => {
  const isContentAccessible = useContentAccessStore(
    (state) => state.isAccessible
  );
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [screenActiveState, setScreenActiveState] = useState("Track Selection");

  useEffect(() => {
    const result =
      /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

      console.log(navigator.userAgent);
      console.log(result);

    setIsMobileDevice(result);
  }, []);

  if (!isContentAccessible) {
    return <ContentNotAccessible />;
  }

  if (isMobileDevice) {
    return <FeatureNotAvailable />;
  }

  return (
    <div className="h-[80vh] p-4 flex justify-center">
      {screenActiveState == "Track Selection" ? (
        <TrackSelection activateInterviewScreen={setScreenActiveState} />
      ) : (
        <Interview activateTrackSelection={setScreenActiveState}/>
      )}
    </div>
  );
};

export default MockInterview;
