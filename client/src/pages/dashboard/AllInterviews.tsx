import { MdOutlineSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Loading from "@/components/common/Loading";
import { fetchInterviews, fetchInterviewTags } from "./utils";
import { useEffect, useState } from "react";
import type { Interview } from "@/types";
import NoInterviewsAvailableCard from "@/components/common/NoInterviewsAvailableCard";
import ListInterviews from "./ListInterviews";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { InterviewFilters } from "@/components/common/InterviewFilters";

const AllInterviews = () => {
  const [allInterviews, setAllInterviews] = useState<Interview[]>([]);
  const [filteredInterviews, setFilteredInterviews] = useState<Interview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [companyName, setCompanyName] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [tags, setTags] = useState<{tagId:string; tagName: string }[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const navigate = useNavigate();
  const limit = 12;

  // Handle company name change
  const handleChange = (value: string) => {
    const regex = /^[a-zA-Z\s]*$/;
    if (regex.test(value)) {
      setCompanyName(value.toUpperCase());
    }
  };

  // Handle page increment
  const increment = () => {
    if (!isLoading && totalCount >= limit) {
      setPage(page + 1);
    }
  };

  // Handle page decrement
  const decrement = () => {
    if (!isLoading && page > 1) {
      setPage(page - 1);
    }
  };

  // Handle tags change
  useEffect(() => {
    setPage(1);
  }, [selectedTags]);

  // Debounce company name change
  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedValue(companyName.trim());
      setPage(1);
    }, 500);

    return () => clearInterval(id);
  }, [companyName]);

  //  Initial fetch
  useEffect(() => {
    const fetch = async () => {
      const response = await fetchInterviews(1, limit);
      const tagsResponse = await fetchInterviewTags();
      if (response.success && tagsResponse.success) {
        setAllInterviews(response.data as Interview[]);
        setFilteredInterviews(response.data as Interview[]);
        setTags(tagsResponse.data as {tagId:string;tagName:string}[])
        setTotalCount(response.totalCount as number);
      } else {
        if (!response.isAuthenticated) {
          toast.warning(response.errMsg);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
          return;
        }
        toast.warning(response.errMsg);
      }
      setIsLoading(false);
    };
    fetch();
  }, [navigate]);

  // On page, debounced value or tag change
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const response = await fetchInterviews(page, limit,debouncedValue,selectedTags);
      if (response.success) {
        setAllInterviews(response.data as Interview[]);
        setFilteredInterviews(response.data as Interview[]);
        setTotalCount(response.totalCount as number);
      } else {
        if (!response.isAuthenticated) {
          toast.warning(response.errMsg);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
          return;
        }
        toast.warning(response.errMsg);
      }
      setIsLoading(false);
    };
    fetch();
  }, [page, debouncedValue, selectedTags, navigate]);

  return (
    <div className="mt-8 flex flex-col gap-4">
      {/* title + search bar + filter  */}
      <div className="p-4 flex justify-between items-center rounded-md border-t border-white/10">
        {/* title  */}
        <div className="text-4xl">All Interviews</div>

        {/* input tag + filter  */}
        <div className="flex items-center gap-8">
          {/* input  */}
          <div className="flex items-center px-4 gap-2 rounded-sm border border-[#333333]">
            <MdOutlineSearch className="size-6" />
            <input
              type="text"
              value={companyName}
              onChange={(e) => handleChange(e.target.value)}
              className="focus:outline-none border-none px-2 py-2 placeholder:text-neutral-400 placeholder:text-center"
              placeholder="Search company name"
            />
          </div>

          {/* filter  */}
          <div className="flex items-center gap-2">
            {/* <span>Filter</span>
            <IoIosArrowDown className="size-2" /> */}
            <InterviewFilters tags={tags} selectedTags={selectedTags} setSelectedTags={setSelectedTags}/>
          </div>
        </div>
      </div>

      {/* list interviews  */}
      {isLoading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {allInterviews.length == 0 && <NoInterviewsAvailableCard />}
          {allInterviews.length > 0 && (
            <ListInterviews interviewData={filteredInterviews} />
          )}
        </div>
      )}

      {/* pagination  */}
      <div className="flex justify-center">
        <div className="flex items-center gap-8 select-none">
          {/* previous page  */}
          <div
          onClick={decrement}
            className={`flex items-center gap-2 cursor-pointer ${
              page == 1 || isLoading ? "text-neutral-500" : "text-white"
            }`}
          >
            <MdKeyboardDoubleArrowLeft className="size-6" />
            <span className="text-lg">Previous</span>
          </div>

          {/* next page  */}
          <div
          onClick={increment}
            className={`flex items-center gap-2 cursor-pointer ${
              (totalCount < limit) || isLoading ? "text-neutral-500" : "text-white"
            }`}
          >
            <span className="text-lg">Next</span>
            <MdKeyboardDoubleArrowRight className="size-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllInterviews;
