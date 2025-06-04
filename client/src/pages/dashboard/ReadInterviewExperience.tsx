import Loading from "@/components/common/Loading";
import { useEffect, useState } from "react";
import ListExperiences from "./ListExperiences";

const ReadInterviewExperience = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const Id = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearInterval(Id);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen max-w-7xl px-8 lg:px-20 text-white">
      <div>
        <ListExperiences />
      </div>
    </div>
  );
};

export default ReadInterviewExperience;
