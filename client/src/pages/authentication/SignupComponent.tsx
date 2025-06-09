import InputComponent from "@/components/common/InputComponent";
import { MdOutlineEmail } from "react-icons/md";
import { IoChevronBackOutline, IoKeyOutline } from "react-icons/io5";
import { AiOutlineChrome } from "react-icons/ai";
import { AiOutlineGithub } from "react-icons/ai";
import WhiteButton from "@/components/common/WhiteButton";
import { useNavigate } from "react-router-dom";

const SignupComponent = () => {
  const navigate = useNavigate();
  return (
    <div className="relative w-full max-w-md px-4 flex flex-col justify-center items-center gap-2 text-white select-none">
      {/* Back Button  */}
      <span
        onClick={() => navigate("/")}
        className="absolute lg:hidden top-6 left-4 text-neutral-400 cursor-pointer"
      >
        <IoChevronBackOutline className="h-6 w-6" />
      </span>

      {/* Top Heading - Welcome Back */}
      <p className="text-2xl text-center">Welcome Back ! 👋</p>
      <div className="w-full">
        <div className="flex flex-col gap-6">
          {/* Email Component  */}
          <InputComponent
            title="Email"
            Icon={MdOutlineEmail}
            inputType={"email"}
            placeholder="name@example.com"
          />

          {/* Password Component  */}
          <InputComponent
            title="Password"
            Icon={IoKeyOutline}
            inputType={"password"}
            placeholder="your password"
          />
        </div>

        {/* Reset Password  */}
        <p className="my-4 text-right underline cursor-pointer">
          Reset password
        </p>

        {/* SignIn Button  */}
        <WhiteButton
          text="Sign In"
          onClick={() => navigate("/interview/dashboard")}
          className="w-full font-mono"
        />

        {/* SignUp  */}
        <div className="my-4 pb-4 border-b border-[#333333]">
          Don't have an account ?{" "}
          <span
            onClick={() => navigate("/register")}
            className="underline cursor-pointer"
          >
            Sign Up
          </span>
        </div>

        {/* Sign in with google or github */}
        <div className="flex flex-col gap-4">
          <WhiteButton
            text="Sign in with Google"
            className="w-full font-mono flex items-center justify-center gap-2"
            Icon={AiOutlineChrome}
          />
          <WhiteButton
            text="Sign in with Github"
            className="w-full font-mono flex items-center justify-center gap-2"
            Icon={AiOutlineGithub}
          />
        </div>
      </div>
    </div>
  );
};

export default SignupComponent;
