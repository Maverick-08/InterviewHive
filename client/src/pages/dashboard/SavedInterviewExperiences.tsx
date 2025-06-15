import Loading from "@/components/common/Loading";
import { useEffect, useState } from "react";
import ListExperiences from "./ListExperiences";
// import SmoothScrollProvider from "@/components/common/SmoothScrollProvider";
import type { Interview } from "@/types";
import { fetchSavedInterviews } from "./utils";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useInterviewModalStore } from "@/store/interviewModal";

const SavedInterviewExperiences = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
    const isInterviewModalOpen = useInterviewModalStore(state => state.isInterviewModalOpen);
    const setIsInterviewModalOpen = useInterviewModalStore(state => state.setIsInterviewModalOpen);
  const [savedInterviews, setSavedInterviews] = useState<Interview[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchSavedInterviews("cmbuiclbk0007w06k0x2q7kzm");
      if (response.success) {
        setSavedInterviews(response.data as Interview[]);
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

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="mb-12 w-full max-w-7xl pt-24 lg:pt-32">
      <div className="flex flex-col gap-4 px-4 text-white font-mono">
        {/* Top title and search component  */}
        <div className="px-2 flex flex-col md:flex-row items-center gap-4 md:gap-0">
          {/* Title component  */}
          <div className="flex-4 bg-gradient-to-b from-white to-zinc-600 bg-clip-text text-transparent ">
            <span className="text-4xl font-semibold">Saved Interviews</span>
          </div>
        </div>

        {/* Display experiences  */}
        <ListExperiences interviewData={savedInterviews} isModalOpen={isInterviewModalOpen} setIsModalOpen={setIsInterviewModalOpen}/>
      </div>
    </div>
  );
};

export default SavedInterviewExperiences;
