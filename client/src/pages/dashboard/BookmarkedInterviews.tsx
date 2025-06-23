import { useEffect, useState } from "react";
import type { Interview } from "@/types";
import { toast } from "sonner";
import { fetchInterviewTags, fetchSavedInterviews } from "./utils";
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

const BookmarkedInterviews = () => {
  const [allInterviews, setAllInterviews] = useState<Interview[]>([]);
  const [filteredInterviews, setFilteredInterviews] = useState<Interview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [companyName, setCompanyName] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [tags, setTags] = useState<{ tagId: string; tagName: string }[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const navigate = useNavigate();
  const limit = 12;
  const userId = useUserStore((state) => state.userId);

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
      const response = await fetchSavedInterviews(userId as string, 1, limit);
      const tagsResponse = await fetchInterviewTags();
      if (response.success && tagsResponse.success) {
        setAllInterviews(response.data as Interview[]);
        // setFilteredInterviews(response.data as Interview[]);
        setTags(tagsResponse.data as { tagId: string; tagName: string }[]);
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
  }, [navigate, userId]);

  // On page change
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const response = await fetchSavedInterviews(
        userId as string,
        page,
        limit
      );
      if (response.success) {
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
  }, [page, navigate, userId]);

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
    <div className="pt-8 flex flex-col gap-16">
      {/* title + search bar + filter  */}
      <div className="px-4 flex justify-between items-center">
        {/* title  */}
        <div className="text-4xl">Bookmarked Interviews</div>

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
            <InterviewFilters
              tags={tags}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
          </div>
        </div>
      </div>

      {/* Stats  */}
      <div className="w-full flex flex-wrap justify-between gap-8 px-4">
        <BookmarkCards
          title="Total Bookmarks"
          value={`${totalCount}`}
          Icon={CiBookmark}
          iconStyle="text-yellow-500 bg-yellow-500/20"
        />
        <BookmarkCards
          title="Companies"
          value={`2`}
          Icon={FaRegHeart}
          iconStyle="text-blue-500 bg-blue-500/20"
        />
        <BookmarkCards
          title="Average CTC"
          value={`15 LPA`}
          Icon={FaIndianRupeeSign}
          iconStyle="text-green-500 bg-green-500/20"
        />
        <BookmarkCards
          title="Recent Bookmarks"
          value={`1`}
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
        <div className="flex flex-col gap-4 px-4">
          <div className="flex gap-4 items-center">
            <span className="text-3xl">Your Bookmarks</span>
            <div className="text-yellow-400 bg-yellow-500/20 rounded-2xl px-3 py-1 border border-yellow-600">
              <span className="text-xs">{allInterviews.length} Interviews</span>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            {allInterviews.length == 0 && <NoInterviewsAvailableCard />}
            {allInterviews.length > 0 && (
              <ListInterviews interviewData={filteredInterviews} />
            )}
          </div>
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
