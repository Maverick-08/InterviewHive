import AnimatedSection from "@/components/animations/ComponentEmergeAnimation";
import UserInfo from "./UserInfo";
import UserInterviews from "./UserInterviews";
import { Accordion } from "@/components/ui/accordion";
import SmoothScrollProvider from "@/components/common/SmoothScrollProvider";
import { useEffect, useState } from "react";
import type { Interview } from "@/types";
import Loading from "@/components/common/Loading";
import { fetchUserInterviews } from "./utils";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const [allInterviews, setAllInterviews] = useState<Interview[]>([]);
  const [isLoading,setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () =>{
      const response = await fetchUserInterviews('cmbup2vc10001w0vg1w5we495');
      if(response.success){
        setAllInterviews(response.data as Interview[]);
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
  },[navigate])

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <AnimatedSection>
      <div className="w-full max-w-6xl pt-32 flex flex-col gap-8 sm:gap-12">
        <SmoothScrollProvider />
        {/* Title  */}
        {/* <div className="w-full flex justify-center">
        <div className="w-full max-w-4xl bg-gradient-to-b from-white to-zinc-600 bg-clip-text text-transparent">
          <span className="text-4xl font-semibold">User Profile</span>
        </div>
      </div> */}
        {/* image and user information  */}
        <div className="w-full flex justify-center">
          <UserInfo />
        </div>

        {/* shared interview experiences  */}
        <div className="w-full flex justify-center">
          <div className="w-full px-4 pb-12 max-w-4xl">
            <Accordion type="single" collapsible>
              <UserInterviews interviews={allInterviews} />
            </Accordion>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default UserProfile;
