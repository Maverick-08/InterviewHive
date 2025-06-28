import AnimatedSection from "@/components/animations/ComponentEmergeAnimation";
import UserInfo from "./UserInfo";
import UserInterviews from "./UserInterviews";
import { Accordion } from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import type { Interview } from "@/types";
import Loading from "@/components/common/Loading";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { getFunction } from "@/utils/axiosRequest";
import Doodle from "@/assets/doodle.png";

const avatarsMap = new Map();
avatarsMap.set("Doodle",Doodle);

const UserProfile = () => {
  const navigate = useNavigate();
  const {userId} = useParams();
  const [allInterviews, setAllInterviews] = useState<Interview[]>([]);
  const [isLoading,setIsLoading] = useState(true);
  const [username,setUsername] = useState<string>("Username");
  const [degree,setDegree] = useState<string>("Degree");
  const [branch,setBranch] = useState<string>("Branch");
  const [yearOfPassingOut,setYearOfPassingOut] = useState<number>((new Date()).getFullYear());
  const [xHandle,setXHandle] = useState<string|null>(null);
  const [linkedIn,setLinkedIn] = useState<string|null>(null);
  const [avatar,setAvatar] = useState<string>("Username");
  
  useEffect(() => {
    const fetch = async () =>{
      const response = await getFunction(`/api/interview/user?userId=${userId}`);
      if(response.success){
        const interviews = response.data.data.interviews as Interview[];
        const userInfo = response.data.data.userInfo
        const courseInfo = response.data.data.userInfo.course_branch;
        setAllInterviews(interviews);
        setUsername(userInfo.username);
        setDegree(courseInfo.degree);
        setBranch(courseInfo.branch);
        setYearOfPassingOut(userInfo.yearOfPassingOut);
        setXHandle(userInfo.xHandle);
        setLinkedIn(userInfo.linkedIn);
        setAvatar(userInfo.avatar);
        setIsLoading(false);
      }
      else {
        toast.warning(response.errMsg);
        setIsLoading(false);
      }
    }
    fetch();
  },[navigate,userId])

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
        {/* Title  */}
        {/* <div className="w-full flex justify-center">
        <div className="w-full max-w-4xl bg-gradient-to-b from-white to-zinc-600 bg-clip-text text-transparent">
          <span className="text-4xl font-semibold">User Profile</span>
        </div>
      </div> */}
        {/* image and user information  */}
        <div className="w-full flex justify-center">
          <UserInfo username={username as string} degree={degree as string} branch={branch} yearOfPassingOut={yearOfPassingOut as number} xHandle={xHandle} linkedIn={linkedIn} avatar={avatar}/>
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
