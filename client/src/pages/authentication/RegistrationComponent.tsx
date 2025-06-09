import InputComponent from "@/components/common/InputComponent";
import { MdOutlineEmail } from "react-icons/md";
import { IoChevronBackOutline, IoKeyOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { LuNotebookPen } from "react-icons/lu";
import { FaRegCalendarCheck } from "react-icons/fa6";
import WhiteButton from "@/components/common/WhiteButton";
import { useNavigate } from "react-router-dom";
import { AiOutlineChrome, AiOutlineGithub } from "react-icons/ai";

const RegistrationComponent = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full max-w-md px-4 flex flex-col gap-4 text-white select-none">

      {/* Back Button  */}
      <span
        onClick={() => navigate("/")}
        className="absolute lg:hidden top-6 left-4 text-neutral-400 cursor-pointer"
      >
        <IoChevronBackOutline className="h-6 w-6" />
      </span>

      {/* Top Heading - Welcome Back  */}
      <p className="text-2xl text-center">Welcome Back ! 👋</p>
      <div className="flex flex-col gap-6">
        {/* Username  */}
        <InputComponent
          title="Username"
          Icon={IoPersonOutline}
          inputType={"text"}
          placeholder="Username"
        />
        <div className="flex justify-between items-center gap-2">
          {/* Course  */}
          <InputComponent
            title="Course"
            Icon={LuNotebookPen}
            inputType={"text"}
            placeholder="MCA / CSE / MBA"
          />

          {/* Year of passing out   */}
          <InputComponent
            title="Year"
            Icon={FaRegCalendarCheck}
            inputType={"number"}
            placeholder=""
          />
        </div>

        {/* Email  */}
        <InputComponent
          title="Email"
          Icon={MdOutlineEmail}
          inputType={"email"}
          placeholder="name@example.com"
        />
        
        {/* Password  */}
        <InputComponent
          title="Password"
          Icon={IoKeyOutline}
          inputType={"password"}
          placeholder="your password"
        />
      </div>

      {/* Register  */}
      <WhiteButton text="Register" className="mt-4 w-full font-mono" />

      <div className="pb-4 border-b border-[#333333]">
        Have an account ?{" "}
        <span
          onClick={() => navigate("/login")}
          className="underline cursor-pointer"
        >
          Sign In
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
  );
};

export default RegistrationComponent;
