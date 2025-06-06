import { useState } from "react";
import AddCompanyInfo from "./AddCompanyInfo";
import WriteExperienceDetails from "./WriteExperienceDetails";

const ShareInterviewExperience = () => {
  const [isShareInterviewComponentActive, setIsShareInterviewComponentActive] =
    useState(false);
  return (
    <div className="w-full h-full max-w-6xl flex justify-center items-center">
      <div className="pt-8 pb-20 px-2 w-full max-w-4xl">
        {isShareInterviewComponentActive ? (
          <WriteExperienceDetails />
        ) : (
          
          <AddCompanyInfo
            isNextComponentActive={setIsShareInterviewComponentActive}
          />
        )}
      </div>
    </div>
  );
};

export default ShareInterviewExperience;
