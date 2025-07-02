import InputComponent from "@/components/common/InputComponent";
import WhiteButton from "@/components/common/WhiteButton";
import { Card } from "@/components/ui/card";
import { getFunction } from "@/utils/axiosRequest";
import { useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { MdOutlineEmail } from "react-icons/md";
import { toast } from "sonner";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleReset = async () => {
    if (email == "") {
      toast.warning("Please enter mail address");
      return;
    }
    setIsSubmitting(true);
    const response = await getFunction(`/api/reset-password?email=${email}`);
    if (response.success) {
      toast.success(`${response.data.data}`);
      setIsSubmitting(false);
      setDisabled(true);
    } else {
      toast.warning(`${response.errMsg}`);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-screen h-screen p-4 flex justify-center items-center bg-[#171717]">
      <Card className="p-4 w-xl bg-[#333333] border border-white/25 flex flex-col gap-6 font-mono">
        <p className="text-center text-white text-2xl">
          Enter Registered Email
        </p>
        <div className="flex flex-col gap-6">
          <InputComponent
            title="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            Icon={MdOutlineEmail}
            inputType={"email"}
            placeholder="name@example.com"
            inputTagStyle="py-2 placeholder:text-sm placeholder:tracking-wider rounded-sm text-neutral-400"
          />
          <WhiteButton
            onClick={handleReset}
            disabled={disabled}
            text="Send Reset Password Link"
            Icon={isSubmitting ? ImSpinner8 : undefined}
            iconSize={`animate-spin`}
            containerStyle="flex justify-center items-center"
            className="w-full font-mono"
          />
        </div>
      </Card>
    </div>
  );
};

export default Reset;
