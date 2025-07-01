import { useState } from "react";
import AddCompanyInfo from "./AddCompayInfo";
import InterviewDetails from "./InterviewDetails";
import InterviewTag from "./InterviewTag";
import { useSidebarStore } from "@/store/SidebarStore";
import { useContentAccessStore } from "@/store/contentAccessStore";
import ContentNotAccessible from "@/components/common/contentNotAccessible";

const ShareInterviewExperience = () => {
  const [componentActive, setComponentActive] = useState(1);
  const isSidebarActive = useSidebarStore((state) => state.isSidebarActive);
  const isContentAccessible = useContentAccessStore(state => state.isAccessible);
  return (
    <div className={`pt-8 ${isSidebarActive ? "w-full" : "max-w-5xl mx-auto"}`}>
      { !isContentAccessible ? <ContentNotAccessible /> : ( 
        componentActive == 1 ? (
          <AddCompanyInfo setNextComponentActive={setComponentActive} />
        ) : componentActive == 2 ? (
          <InterviewDetails setComponentActive={setComponentActive} />
        ) : (
          <InterviewTag setComponentActive={setComponentActive} />
        )
      )}
    </div>
  );
};

export default ShareInterviewExperience;
