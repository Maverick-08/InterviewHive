import UserInfo from "./UserInfo"
import UserSharedInterviewExperiences from "./UserSharedInterviewExperiences"


const Profile = () => {
  return (
    <div className="w-full max-w-6xl pt-8 flex flex-col ">
      {/* image and user information  */}
      <div className="w-full flex justify-center">
        <UserInfo />
      </div>


      {/* shared interview experiences  */}
      <div className="w-full flex justify-center">
        <UserSharedInterviewExperiences />
      </div>

    </div>
  )
}

export default Profile
