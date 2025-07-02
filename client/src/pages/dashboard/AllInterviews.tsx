import { MdOutlineSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Loading from "@/components/common/Loading";
import { fetchAllInterviews, fetchInterviewTopicTags } from "./utils";
import { useEffect, useState } from "react";
import type { Interview } from "@/types";
import NoInterviewsAvailableCard from "@/components/common/NoInterviewsAvailableCard";
import ListInterviews from "./ListInterviews";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { InterviewFilters } from "@/components/common/InterviewFilters";
import { useAuthStore } from "@/store/authStore";
import { useInterviewModalStore } from "@/store/interviewModal";
import InterviewModal from "./InterviewModal";

const AllInterviews = () => {
  const [allInterviews, setAllInterviews] = useState<Interview[]>([]);
  const [filteredInterviews, setFilteredInterviews] = useState<Interview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [companyName, setCompanyName] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [tags, setTags] = useState<
    { id: string; tagName: string; tagInitials: string }[]
  >([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const navigate = useNavigate();
  const setAuthState = useAuthStore((state) => state.setAuthState);
  const setIsInterviewModalOpen = useInterviewModalStore(
    (state) => state.isInterviewModalOpen
  );
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
      const response = await fetchAllInterviews(1, limit, "", []);
      const tagsResponse = await fetchInterviewTopicTags();

      if (response.success) {
        setAllInterviews(response.data.data as Interview[]);
        setFilteredInterviews(response.data.data as Interview[]);
        setTags(
          tagsResponse.data.data as {
            id: string;
            tagName: string;
            tagInitials: string;
          }[]
        );
        setTotalCount(response.data.totalCount as number);
      } else if (!response.success && !response.isAuthenticated) {
        setAuthState(false);
      } else {
        toast.warning(response.errMsg);
      }
      setIsLoading(false);
    };
    fetch();
  }, [navigate, setAuthState]);

  // On page, debounced value or tag change
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const response = await fetchAllInterviews(
        page,
        limit,
        debouncedValue,
        selectedTags
      );
      if (response.success) {
        // setAllInterviews(response.data as Interview[]);
        setFilteredInterviews(response.data.data as Interview[]);
        setTotalCount(response.data.totalCount as number);
      } else if (!response.success && !response.isAuthenticated) {
        setAuthState(false);
      } else {
        toast.warning(response.errMsg);
      }
      setIsLoading(false);
    };
    fetch();
  }, [page, debouncedValue, selectedTags, navigate, setAuthState]);

  return (
    <div className="relative mt-8 flex flex-col gap-4 overflow-hidden">
      {/* title + search bar + filter  */}
      <div className="p-2 sm:p-4 gap-2 lg:gap-0 flex flex-col md:flex-row rounded-md justify-between border-t border-white/10">
        {/* title  */}
        <div className="text-2xl sm:text-3xl md:text-4xl text-center md:text-left">All Interviews</div>

        {/* input tag + filter  */}
        <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row justify-center md:justify-start  gap-2 sm:gap-4">
          {/* input  */}
          <div className="w-fit h-fit flex items-center justify-center px-1 sm:px-4 rounded-sm border border-[#333333]">
            <MdOutlineSearch className="size-6" />
            <input
              type="text"
              value={companyName}
              onChange={(e) => handleChange(e.target.value)}
              className="focus:outline-none border-none py-2 placeholder:text-neutral-400 placeholder:text-center"
              placeholder="Search company name"
            />
          </div>

          {/* filter  */}
          <div className="flex items-center justify-start sm:justify-center gap-2">
            {/* <span>Filter</span>
                        <IoIosArrowDown className="size-2" /> */}
            <InterviewFilters
              tags={tags}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
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
              totalCount < limit || isLoading
                ? "text-neutral-500"
                : "text-white"
            }`}
          >
            <span className="text-lg">Next</span>
            <MdKeyboardDoubleArrowRight className="size-6" />
          </div>
        </div>
      </div>
      {setIsInterviewModalOpen && <InterviewModal />}
    </div>
  );
};

export default AllInterviews;
