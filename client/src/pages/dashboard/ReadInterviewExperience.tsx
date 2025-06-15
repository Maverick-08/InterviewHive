import Loading from "@/components/common/Loading";
import React, { useEffect, useState } from "react";
import ListExperiences from "./ListExperiences";
import { Combobox } from "@/components/ui/combobox";
import type { Interview } from "@/types";
import { fetchInterviews } from "./utils";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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
  const [allInterviews, setAllInterviews] = useState<Interview[]>([]);
  const [filteredInterviews, setFilteredInterviews] = useState<Interview[]>([]);
  const [searchedCompany,setSearchedCompany] = useState("");
  const [debounceSearchCompany,setDebounceSearchCompany] = useState("");
  const [page,setPage] = useState(1);
  const [totalCount,setTotalCount] = useState(0);
  const navigate = useNavigate();

  // on load api call
  useEffect(() => {
    const fetch = async () => {
      const response = await fetchInterviews(page, 10);
      if (response.success) {
        setAllInterviews(response.data as Interview[]);
        setTotalCount(response.totalCount as number);
      } else {
        if(!response.isAuthenticated){
          toast.warning(response.errMsg);
          setTimeout(() => {
            navigate("/login")
          }, 2000);
          return;
        }
        toast.warning(response.errMsg);
      }
      setIsLoading(false);
    };
    fetch();
  }, [navigate,page]);

  useEffect(()=>{
    setIsLoading(true);
    if(filters.includes('All')){
      setPage(1);
    }
  },[page,filters])

  // handle search
  const handleSearchText = (e:React.ChangeEvent<HTMLInputElement>) => {
     const regex = /^[a-zA-Z\s]+$/;
     if(regex.test(e.target.value)){
      setSearchedCompany(e.target.value.trim().toUpperCase())
     }
     if(e.target.value == "") setSearchedCompany("");
  }

  // debounce 
  useEffect(()=>{
    const Id = setTimeout(() => {
      setDebounceSearchCompany(searchedCompany)
    }, 1000);
    return () => clearInterval(Id);
  },[searchedCompany])

  // api call for debounced value
  useEffect(()=>{
    if(debounceSearchCompany !== "" || filters.length > 0){
      const fetch = async () => {
      setIsLoading(true);
      console.log(filters)
      const response = await fetchInterviews(page,10,debounceSearchCompany,filters);
      if (response.success) {
        setFilteredInterviews(response.data as Interview[]);
        setTotalCount(response.totalCount as number);
      }
      else {
        if(!response.isAuthenticated){
          toast.warning(response.errMsg);
          setTimeout(() => {
            navigate("/login")
          }, 2000);
          return;
        }
        toast.warning(response.errMsg);
      }
      setIsLoading(false);
    }
    fetch();
    }
    else{
      setFilteredInterviews(allInterviews);
    }

  },[debounceSearchCompany,navigate,allInterviews,page,filters])

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="mb-12 w-full max-w-7xl pt-24 md:pt-32">
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
              value={searchedCompany}
              onChange={handleSearchText}
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
              closePopoverOnClick={false}
              setValues={setFilters}
            />
          </div>
        </div>

        {/* Display experiences  */}
        <ListExperiences interviewData={filteredInterviews} page={page} setPage={setPage} totalCount={totalCount} isLoading={isLoading}/>
      </div>
    </div>
  );
};

export default ReadInterviewExperience;
