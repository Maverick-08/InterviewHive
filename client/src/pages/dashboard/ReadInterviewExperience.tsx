import Loading from "@/components/common/Loading";
import { useEffect, useState } from "react";
import ListExperiences from "./ListExperiences";
import { tempData } from "./temp";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaAngleDown } from "react-icons/fa6";
import { FaFilter } from "react-icons/fa";

const ReadInterviewExperience = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [selectedTimestamp, setSelectedTimestamp] = useState("Filter");

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
    <div className="w-full max-w-7xl pt-24 lg:pt-32">
      <div className="flex flex-col gap-4 px-4 text-white font-mono">

        {/* Top title and search component  */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-0">

            {/* Title component  */}
          <div className="flex-3 bg-gradient-to-b from-white to-zinc-600 bg-clip-text text-transparent">
            <span className="text-4xl font-semibold">All Interviews</span>
          </div>

            {/* search bar and filter tag  */}
          <div className="flex-1 w-full flex items-center gap-4">
            {/* search bar  */}
            <input
              type="text"
              placeholder="Search Company Name"
              className="flex-4 focus:outline-none border rounded-sm border-neutral-500 px-2 py-2 placeholder:text-neutral-400 placeholder:text-center"
            />

              {/* filter tag  */}
            <Popover onOpenChange={setIsPopoverOpen} open={isPopoverOpen}>
              <PopoverTrigger>
                <div className="p-4 lg:px-4 lg:py-1.5 flex lg:gap-4 items-center bg-[#333333] rounded-full lg:rounded-sm">
                  <span className="text-neutral-400 hidden lg:block">{selectedTimestamp}</span>
                  <FaFilter className="block lg:hidden h-4 w-4" />
                  <FaAngleDown className="hidden lg:block h-4 w-4" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="bg-[#171717] border-1 border-[#333333] text-neutral-400 text-lg">
                <div
                  onClick={() => setIsPopoverOpen(false)}
                  className="flex flex-col gap-2 cursor-pointer"
                >
                  <div
                    onClick={() =>
                      setSelectedTimestamp("All")
                    }
                    className="hover:bg-[#333333] px-2 rounded-sm"
                  >
                    All Interviews
                  </div>

                  <div
                    onClick={() =>
                      setSelectedTimestamp("")
                    }
                    className="hover:bg-[#333333] px-2 rounded-sm"
                  >
                    All Interviews
                  </div>
                  
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
          
          {/* Display experiences  */}
        <ListExperiences interviewData={tempData} />
      </div>
    </div>
  );
};

export default ReadInterviewExperience;
