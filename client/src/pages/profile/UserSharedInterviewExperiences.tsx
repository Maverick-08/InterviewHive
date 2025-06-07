import ListExperiences from "../dashboard/ListExperiences"
import { tempData } from "../dashboard/temp"


const UserSharedInterviewExperiences = () => {
  return (
    <div className="w-full max-w-4xl text-white">
        <p className="text-4xl  font-mono pt-12 text-center">Interview Experiences</p>
      <ListExperiences interviewData={tempData}/>
    </div>
  )
}

export default UserSharedInterviewExperiences
