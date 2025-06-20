import { useState } from "react";
import AddCompanyInfo from "./AddCompayInfo";
import InterviewDetails from "./InterviewDetails";
import InterviewTag from "./InterviewTag";
import DashboardLayout from "./DashboardLayout";
import { useSidebarStore } from "@/store/SidebarStore";

const ShareInterviewExperience = () => {
  const [componentActive, setComponentActive] = useState(1);
  const isSidebarActive = useSidebarStore(state => state.isSidebarActive)
  return (
    <DashboardLayout componentTitle="Share Interview Experience">
        <div className={`pt-8 ${isSidebarActive ?'w-full' : 'max-w-5xl mx-auto'}`}>
          {componentActive == 1 ? (
            <AddCompanyInfo setNextComponentActive={setComponentActive} />
          ) : componentActive == 2 ? (
            <InterviewDetails setComponentActive={setComponentActive} />
          ) : (
            <InterviewTag setComponentActive={setComponentActive} />
          )}
        </div>
    </DashboardLayout>
  );
};

export default ShareInterviewExperience;
