import AnimatedSection from "@/components/animations/ComponentEmergeAnimation";
import UserInfo from "./UserInfo";
import UserInterviews from "./UserInterviews";
import { Accordion } from "@/components/ui/accordion";

const Profile = () => {
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
          <UserInfo />
        </div>

        {/* shared interview experiences  */}
        <div className="w-full flex justify-center">
          <div className="w-full px-4 pb-12 max-w-4xl">
            <Accordion type="single" collapsible>
              <UserInterviews />
            </Accordion>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Profile;
