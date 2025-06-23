import Chatbot from "../chatbot/Chatbot";
import InterviewTopicsStats from "../Stats/InterviewTopicsStats";
import OverallStats from "../Stats/OverallStats";
import AllInterviews from "./AllInterviews";

const Dashboard = () => {

  return (
      <div className="flex flex-col gap-8">
        <OverallStats />
        <InterviewTopicsStats />
        <AllInterviews />
        <Chatbot />
      </div>
  );
};

export default Dashboard;
