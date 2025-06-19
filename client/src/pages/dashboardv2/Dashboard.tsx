// import ReadInterviewExperience from "../dashboard/ReadInterviewExperience"
import InterviewTopicsStats from "../Stats/InterviewTopicsStats"
import OverallStats from "../Stats/OverallStats"
import DashboardLayout from "./DashboardLayout"


const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
       
        <OverallStats />
        <InterviewTopicsStats />
        <div className="h-[100vh]"></div>
        {/* <ReadInterviewExperience /> */}
      </div>
    </DashboardLayout>
  )
}

export default Dashboard
