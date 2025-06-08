import Loading from "@/components/common/Loading";
import { useEffect, useState } from "react";
import ListExperiences from "./ListExperiences";
import { tempData } from "./temp";
import { Combobox } from "@/components/ui/combobox";

const ReadInterviewExperience = () => {
  const options = [
    {
      value: "All",
      label: "All Interviews",
    },
    {
      value: "DSA",
      label: "DSA",
    },
    {
      value: "DBMS",
      label: "DBMS",
    },
    {
      value: "OOPS",
      label: "OOPS",
    },
    {
      value: "CN",
      label: "Computer Networks",
    },
    {
      value: "OS",
      label: "Operating Systems",
    },
    {
      value: "System Design",
      label: "System Design",
    },
  ];
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

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
    <div className="w-full max-w-7xl pt-24 md:pt-32">
      <div className="flex flex-col gap-4 px-4 text-white font-mono">
        {/* Top title and search component  */}
        <div className="px-2 flex flex-col md:flex-row items-center gap-4 md:gap-0">
          {/* Title component  */}
          <div className="flex-3 bg-gradient-to-b from-white to-zinc-600 bg-clip-text text-transparent ">
            <span className="text-4xl font-semibold">All Interviews</span>
          </div>

          {/* search bar and filter tag  */}
          <div className="flex-2 w-full flex items-center justify-between gap-4 ">
            {/* search bar  */}
            <input
              type="text"
              placeholder="Search Company Name"
              className="flex-1 focus:outline-none border rounded-sm border-neutral-500 px-2 py-2 placeholder:text-neutral-400 placeholder:text-center"
            />

            {/* filter tag  */}
            <Combobox
              isPopoverOpen={open}
              setIsPopoverOpen={setOpen}
              label="Filter"
              labelStyle="flex items-center gap-2 font-mono border-[1px] border-neutral-800 px-2 py-2 rounded-full sm:rounded-sm text-neutral-400 cursor-pointer bg-[#171717]"
              options={options}
              values={filters}
              setValues={setFilters}
            />
          </div>
        </div>

        {/* Display experiences  */}
        <ListExperiences interviewData={tempData} />
      </div>
    </div>
  );
};

export default ReadInterviewExperience;
