import InfoComponent from "./InfoComponent"
import SignupComponent from "./SignupComponent"


const Login = () => {
  return (
    <div className="">
      <div className="flex h-screen">
        <div className="hidden flex-1 lg:flex items-center justify-center bg-[#171717]">
            <InfoComponent />
        </div>
        <div className="flex-1 flex justify-center bg-[#111111]">
            <SignupComponent />
        </div>
      </div>
    </div>
  )
}

export default Login
