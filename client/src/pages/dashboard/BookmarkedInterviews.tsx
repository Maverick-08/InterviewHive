import { useEffect, useState } from "react";
import type { Interview } from "@/types";
import { toast } from "sonner";
import { fetchInterviewTopicTags, fetchSavedInterviews } from "./utils";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdOutlineSearch,
} from "react-icons/md";
import { InterviewFilters } from "@/components/common/InterviewFilters";
import { useNavigate } from "react-router-dom";
import NoInterviewsAvailableCard from "@/components/common/NoInterviewsAvailableCard";
import Loading from "@/components/common/Loading";
import ListInterviews from "./ListInterviews";
import { useUserStore } from "@/store/userStore";
import { CiBookmark } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FiClock } from "react-icons/fi";
import BookmarkCards from "@/components/common/BookmarkCards";
import { useAuthStore } from "@/store/authStore";
import { getFunction } from "@/utils/axiosRequest";
import InterviewModal from "./InterviewModal";

const BookmarkedInterviews = () => {
  const [allInterviews, setAllInterviews] = useState<Interview[]>([]);
  const [filteredInterviews, setFilteredInterviews] = useState<Interview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [averageCTC, setAverageCTC] = useState("0 LPA");
  const [recentBookmarkCount, setRecentBookmarkCount] = useState(0);
  const [differentCompanies, setDifferentCompanies] = useState(0);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [companyName, setCompanyName] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [tags, setTags] = useState<
    { id: string; tagName: string; tagInitials: string }[]
  >([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const navigate = useNavigate();
  const limit = 12;
  const userId = useUserStore((state) => state.id);
  const setAuthState = useAuthStore((state) => state.setAuthState);

  // Different companies

  // Fetch Recent Bookmark count
  useEffect(() => {
    const fetch = async () => {
      const response = await getFunction("/api/interview/save/stats");
      if (response.success) {
        setRecentBookmarkCount(response.data.count);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    const set = new Set();
    let total = 0;

    for (const data of allInterviews) {
      set.add(data.companyName);
      if (data.CTCOffered) {
        total += data.CTCOffered;
      }
    }
    if (total == 0) {
      setAverageCTC("0 LPA");
    } else {
      setAverageCTC(`${(total / allInterviews.length).toFixed(2)} LPA`);
    }
    setDifferentCompanies(set.size);
  }, [allInterviews]);

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
      const response = await fetchSavedInterviews(1, limit, userId as string);
      const tagsResponse = await fetchInterviewTopicTags();

      if (response.success && tagsResponse.success) {
        setAllInterviews(response.data.data as Interview[]);
        setTotalCount(response.data.totalCount as number);
        setFilteredInterviews(response.data.data as Interview[]);
        setTags(
          tagsResponse.data.data as {
            id: string;
            tagName: string;
            tagInitials: string;
          }[]
        );
      } else if (!response.success && !response.isAuthenticated) {
        setAuthState(false);
      } else {
        toast.warning(response.errMsg);
      }
      setIsLoading(false);
    };
    fetch();
  }, [navigate, userId, setAuthState]);

  // On page change
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const response = await fetchSavedInterviews(
        page,
        limit,
        userId as string
      );
      if (response.success) {
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
  }, [page, navigate, userId, setAuthState]);

  // On debounced value change
  useEffect(() => {
    if (debouncedValue == "") {
      setFilteredInterviews(allInterviews);
    } else {
      const filteredInterviewsList = allInterviews.filter((interview) =>
        interview.companyName.startsWith(debouncedValue)
      );
      setFilteredInterviews(filteredInterviewsList);
    }
  }, [debouncedValue, allInterviews]);

  // On

  return (
    <div className="pt-8 flex flex-col gap-16 w-full">
      {/* title + search bar + filter  */}

      {/* Stats  */}
      <div className="w-full flex flex-wrap justify-start gap-8 items-center">
        <BookmarkCards
          title="Total Bookmarks"
          value={`${allInterviews.length}`}
          Icon={CiBookmark}
          iconStyle="text-yellow-500 bg-yellow-500/20"
        />
        <BookmarkCards
          title="Companies"
          value={`${differentCompanies}`}
          Icon={FaRegHeart}
          iconStyle="text-blue-500 bg-blue-500/20"
        />
        <BookmarkCards
          title="Average CTC"
          value={`${averageCTC}`}
          Icon={FaIndianRupeeSign}
          iconStyle="text-green-500 bg-green-500/20"
        />
        <BookmarkCards
          title="Recent Bookmarks"
          value={`${recentBookmarkCount}`}
          Icon={FiClock}
          iconStyle="text-purple-500 bg-purple-500/20"
        />
      </div>


      {/* list interviews  */}
      {isLoading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <div className="flex flex-col gap-8 justify-between w-full">
          <div className="flex flex-col sm:flex-row justify-between w-full">

            {/* Bookmar Tag */}
            <div className="flex-col sm:flex gap-1">
              <div className="text-xl sm:text-3xl">Bookmarked Interviews</div>
              <span className="w-fit px-2 flex justify-center text-xs text-yellow-400 bg-yellow-500/20 border border-yellow-400/50 rounded-full h-4">
                {allInterviews.length} Interviews
              </span>
            </div>

            {/* Filter and Search */}
            <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row sm:items-center sm:justify-center items-start justify-start gap-2 sm:gap-4">
              {/* input  */}
              <div className="w-fit h-fit flex items-center justify-center px-1 sm:px-4 gap-0 rounded-sm border border-[#333333]">
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
              <div className="flex items-center justify-center gap-2">
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
          <div className="flex flex-col gap-8">
            {allInterviews.length == 0 && <NoInterviewsAvailableCard />}
            {allInterviews.length > 0 && (
              <ListInterviews interviewData={filteredInterviews} />
            )}
          </div>
          <InterviewModal />
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
    </div>
  );
};

export default BookmarkedInterviews;
