import InputComponent from "@/components/common/InputComponent";
import { MdOutlineEmail } from "react-icons/md";
import { IoChevronBackOutline, IoKeyOutline } from "react-icons/io5";
import { AiOutlineChrome } from "react-icons/ai";
import WhiteButton from "@/components/common/WhiteButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { toast } from "sonner";
import { userAuth } from "./auth.util";
import { useUserStore } from "@/store/userStore";

const SignupComponent = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const setUserState = useUserStore((state) => state.setUserState);

  const handleSubmit = async () => {
    if (isSubmitting) return false;
    if (email && password) {
      setIsSubmitting(true);
      const response = await userAuth({ email, password });

      const data: {
        userId: string;
        username: string;
        degree: string;
        branch: string | null;
        yearOfPassingOut: number;
        avatar: string;
        xHandle: string | null;
        linkedIn: string | null;
      } = response.data;

      if (response.success) {
        setUserState({ ...data });
        toast.success(<p className="text-lg font-mono">Login Successful.</p>, {
          description: "Navigating to Dashboard.",
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        toast.error(<p className="text-lg font-mono">{response.data}</p>);
      }
      setIsSubmitting(false);
    } else {
      toast.error(<p className="text-lg font-mono">Please fill all details</p>);
    }
  };

  return (
    <div className="relative w-full max-w-md px-4 flex flex-col justify-center items-center gap-2 text-white select-none">
      {/* Back Button  */}
      <span
        onClick={() => navigate("/")}
        className="absolute lg:hidden top-6 left-4 text-neutral-400 cursor-pointer flex items-center gap-2"
      >
        <IoChevronBackOutline className="h-6 w-6" />{" "}
        <span className="text-lg text-neutral-400 font-mono">Back</span>
      </span>

      {/* Top Heading - Welcome Back */}
      <p className="text-2xl text-center">Welcome Back ! 👋</p>
      <div className="w-full">
        <div className="flex flex-col gap-6">
          {/* Email Component  */}
          <InputComponent
            title="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            Icon={MdOutlineEmail}
            inputType={"email"}
            placeholder="name@example.com"
            inputTagStyle="py-2 placeholder:text-sm placeholder:tracking-wider rounded-sm text-neutral-400"
          />

          {/* Password Component  */}
          <InputComponent
            title="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            Icon={IoKeyOutline}
            inputType={"password"}
            placeholder="your password"
            inputTagStyle="py-2 placeholder:text-sm placeholder:tracking-wide rounded-sm text-neutral-400"
          />
        </div>

        {/* Reset Password  */}
        <p className="my-4 text-right underline cursor-pointer">
          Reset password
        </p>

        {/* SignIn Button  */}
        <WhiteButton
          disabled={isSubmitting}
          onClick={handleSubmit}
          Icon={isSubmitting ? ImSpinner8 : undefined}
          iconSize={`animate-spin`}
          text="Sign In"
          containerStyle="flex justify-center items-center"
          className="w-full font-mono"
        />

        <div className="my-4 flex items-center gap-1">
          <span className="flex-1 border border-[#333333]"></span>
          <span className="text-lg font-mono">OR</span>
          <span className="flex-1 border border-[#333333]"></span>
        </div>

        {/* Sign in with google or github */}
        <div className="flex flex-col gap-4">
          <WhiteButton
            text="Sign in with Google"
            className="w-full font-mono flex items-center justify-center gap-2"
            Icon={AiOutlineChrome}
          />
        </div>

        {/* SignUp  */}
        <div className="my-2 pb-8 text-right">
          Don't have an account ?{" "}
          <span
            onClick={() => navigate("/register")}
            className="underline cursor-pointer hover:text-neutral-400"
          >
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignupComponent;
