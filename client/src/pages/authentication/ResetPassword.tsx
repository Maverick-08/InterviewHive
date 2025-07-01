import { IoKeyOutline } from "react-icons/io5";
import InfoComponent from "./InfoComponent";
import InputComponent from "@/components/common/InputComponent";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WhiteButton from "@/components/common/WhiteButton";
import { ImSpinner8 } from "react-icons/im";
import { postFunction } from "@/utils/axiosRequest";
import { toast } from "sonner";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { secretToken, userId } = useParams();

  useEffect(() => {
    const post = async () => {
      const response = await postFunction("/api/reset-password", {
        secretToken,
        userId,
        password: "@",
      });

      if (!response.success) {
        toast.warning("The link has been expired", {
          description: "Initiate the process again.",
        });
      }
    };
    post();
  }, [secretToken, userId]);

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      toast.warning("The password do not match.");
      return;
    }
    setIsSubmitting(true);
    const response = await postFunction("/api/reset-password", {
      secretToken,
      userId,
      password: confirmPassword,
    });

    if (response.success) {
      toast.success(`${response.data.data}`);
      setIsSubmitting(false);
    } else {
      toast.warning(`${response.errMsg}`);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen flex bg-gradient-to-r from-[#161616] to-black font-mono">
      <div className="flex-1 hidden sm:flex items-center justify-center bg-[#171717]">
        <InfoComponent />
      </div>
      <div className="flex-1 flex items-center justify-center flex-col gap-8 bg-[#111111]">
        <p className="text-2xl text-center text-white">Reset Password</p>
        <div className="w-full max-w-md flex flex-col gap-8">
          <InputComponent
            title="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            Icon={IoKeyOutline}
            inputType={"password"}
            placeholder="password"
            inputTagStyle="py-2 placeholder:text-sm placeholder:tracking-wide rounded-sm text-neutral-400"
          />
          <InputComponent
            title="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            Icon={IoKeyOutline}
            inputType={"password"}
            placeholder="confirm password"
            inputTagStyle="py-2 placeholder:text-sm placeholder:tracking-wide rounded-sm text-neutral-400"
          />
          <WhiteButton
            disabled={isSubmitting}
            onClick={handleSubmit}
            Icon={isSubmitting ? ImSpinner8 : undefined}
            iconSize={`animate-spin`}
            text="Reset Password"
            containerStyle="flex justify-center items-center"
            className="w-full font-mono"
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
