import Loading from "@/components/common/Loading";
import { useEffect, useState } from "react";
import ListExperiences from "./ListExperiences";
import { tempData } from "./temp";
import SmoothScrollProvider from "@/components/common/SmoothScrollProvider";

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
      <div className="w-full h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="mb-12 w-full max-w-7xl pt-24 lg:pt-32">
      <SmoothScrollProvider />
      <div className="flex flex-col gap-4 px-4 text-white font-mono">
        {/* Top title and search component  */}
        <div className="px-2 flex flex-col md:flex-row items-center gap-4 md:gap-0">
          {/* Title component  */}
          <div className="flex-4 bg-gradient-to-b from-white to-zinc-600 bg-clip-text text-transparent ">
            <span className="text-4xl font-semibold">Saved Interviews</span>
          </div>

          {/* search bar */}
          <div className="flex-1 w-full flex items-center justify-between gap-4 ">
            {/* search bar  */}
            <input
              type="text"
              placeholder="Search Company Name"
              className="flex-1 focus:outline-none border rounded-sm border-neutral-500 px-2 py-2 placeholder:text-neutral-400"
            />
          </div>
        </div>

        {/* Display experiences  */}
        <ListExperiences interviewData={tempData} />
      </div>
    </div>
  );
};

export default SavedInterviewExperiences;
