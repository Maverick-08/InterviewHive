import Chatbot from "../chatbot/Chatbot";
import InterviewTopicsStats from "../Stats/InterviewTopicsStats";
import OverallStats from "../Stats/OverallStats";
import AllInterviews from "./AllInterviews";
import DashboardLayout from "./DashboardLayout";

const Dashboard = () => {

  return (
    <DashboardLayout componentTitle={"Dashboard"}>
      <div className="flex flex-col gap-8">
        <OverallStats />
        <InterviewTopicsStats />
        <AllInterviews />
        <Chatbot />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
