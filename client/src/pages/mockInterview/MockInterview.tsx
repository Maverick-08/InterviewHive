import { useContentAccessStore } from "@/store/contentAccessStore";
import ContentNotAccessible from "@/components/common/ContentNotAccessible";
import TrackSelection from "./TrackSelection";
import { useState } from "react";
import Interview from "./Interview";


const MockInterview = () => {
  const isContentAccessible = useContentAccessStore(
    (state) => state.isAccessible
  );
  const [screenActiveState,setScreenActiveState] = useState("Track Selection");
  return (
    <div className="h-[80vh] flex justify-center items-center">
      {!isContentAccessible ? (
        <ContentNotAccessible />
      ) : (
        screenActiveState == "Track Selection" ?
          <TrackSelection activateInterviewScreen={setScreenActiveState}/> :
          <Interview />
      )}
    </div>
  );
};

export default MockInterview;
