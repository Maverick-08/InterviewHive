import Loading from "@/components/common/Loading";
import { useInterviewStore } from "@/store/interview";
import { getFunction } from "@/utils/axiosRequest";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddCompanyInfo from "./AddCompayInfo";
import { useSidebarStore } from "@/store/SidebarStore";
import InterviewDetails from "./InterviewDetails";
import InterviewTag from "./InterviewTag";
import { toast } from "sonner";

const EditInterview = () => {
  const [componentActive, setComponentActive] = useState(1);
  const isSidebarActive = useSidebarStore((state) => state.isSidebarActive);
  const [isLoading, setIsLoading] = useState(true);
  const { interviewId } = useParams();
  const updateInterview = useInterviewStore((state) => state.updateInterview);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const response = await getFunction(
        `/api/interview/detail?interviewId=${interviewId}`
      );
      if (response.success) {
        updateInterview(response.data.data);
        setIsLoading(false);
      } else {
        toast.warning("Failed to fetch Interview Details", {
          description: "Please refresh the page",
        });
      }
    };
    fetch();
  }, [interviewId, updateInterview]);

  if (isLoading) {
    return <div className="h-[80vh] flex justify-center items-center">
        <Loading />
    </div>;
  }
  return (
    <div className={`pt-8 ${isSidebarActive ? "w-full" : "max-w-5xl mx-auto"}`}>
      {componentActive == 1 ? (
        <AddCompanyInfo setNextComponentActive={setComponentActive} />
      ) : componentActive == 2 ? (
        <InterviewDetails setComponentActive={setComponentActive} />
      ) : (
        <InterviewTag setComponentActive={setComponentActive} interviewId={interviewId}/>
      )}
    </div>
  );
};

export default EditInterview;
