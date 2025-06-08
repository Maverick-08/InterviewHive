import Loading from "@/components/common/Loading";
import { useEffect, useState } from "react";
import ListExperiences from "./ListExperiences";
import { tempData } from "./temp";

const SavedInterviewExperiences = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const Id = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearInterval(Id);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-[60vh] flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen max-w-7xl pt-24  px-8 lg:px-20 text-white">
      <ListExperiences interviewData={tempData}/>
    </div>
  );
};

export default SavedInterviewExperiences;
