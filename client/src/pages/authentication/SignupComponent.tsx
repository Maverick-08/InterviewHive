import InputComponent from "@/components/common/InputComponent";
import { MdOutlineEmail } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import WhiteButton from "@/components/common/WhiteButton";
import { useNavigate } from "react-router-dom";

const SignupComponent = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full max-w-md px-4 flex flex-col justify-center items-center gap-2 text-white select-none">
      <p className="text-2xl text-center">Welcome Back ! 👋</p>
      <div className="w-full">
        <div className="flex flex-col gap-6">
          <InputComponent
            title="Email"
            Icon={MdOutlineEmail}
            inputType={"email"}
            placeholder="name@example.com"
          />
          <InputComponent
            title="Password"
            Icon={IoKeyOutline}
            inputType={"password"}
            placeholder="your password"
          />
        </div>
        <p className="my-4 text-right underline cursor-pointer">Reset password</p>
        <WhiteButton text="Sign In" onClick={()=>navigate("/interview/dashboard")} className="w-full font-mono"/>
        <div className="my-4 ">Don't have an account ? <span onClick={()=>navigate("/register")}  className="underline cursor-pointer">Sign Up</span></div>
      </div>
    </div>
  );
};

export default SignupComponent;
