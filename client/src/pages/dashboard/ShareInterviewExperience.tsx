import { useState } from "react";
import AddCompanyInfo from "./AddCompanyInfo";
import WriteExperienceDetails from "./WriteExperienceDetails";
import SmoothScrollProvider from "@/components/common/SmoothScrollProvider";
import InterviewTag from "./InterviewTag";

const ShareInterviewExperience = () => {
  const [componentActive, setComponentActive] =
    useState(1);
  return (
    <div className="w-full h-full max-w-6xl flex justify-center items-center">
      <SmoothScrollProvider />
      <div className="pt-24 sm:pt-32 lg:pt-28 px-4 pb-8 w-full max-w-4xl">
        {componentActive == 1 ? (
          <AddCompanyInfo
          setNextComponentActive={setComponentActive}
          />
        ) : (
          componentActive == 2 ?
          <WriteExperienceDetails setComponentActive={setComponentActive}/>
          : <InterviewTag setComponentActive={setComponentActive}/>
        )}
      </div>
    </div>
  );
};

export default ShareInterviewExperience;
