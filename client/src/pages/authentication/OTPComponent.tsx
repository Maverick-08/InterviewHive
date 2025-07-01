import BlackButton from "@/components/common/BlackButton";
import WhiteButton from "@/components/common/WhiteButton";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRegisterUserStore } from "@/store/registerStore";
import { useTimerStore } from "@/store/resendTimer";
import { getFunction, postFunction } from "@/utils/axiosRequest";
import { useEffect, useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const OTPComponent = () => {
  const email = useRegisterUserStore((state) => state.email);
  const getPayload = useRegisterUserStore((state) => state.getUserDetails);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOTPSubmitting, setIsOTPSubmitting] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
  const value = useTimerStore((state) => state.value);
  const startCounter = useTimerStore((state) => state.startCounter);
  const updateCounter = useTimerStore((state) => state.setCounterValue);
  const payload = getPayload();
  const navigate = useNavigate();

  useEffect(()=>{
    if(value == 0){
      setTimerStarted(false);
    }
  },[value])

  useEffect(()=>{
    const intervalId = timerStarted ? setInterval(()=>startCounter(),1000) : null;
    return () => {if(intervalId) clearInterval(intervalId)};
  },[timerStarted,startCounter])

  const handleSubmit = async () => {
    const digit0 = document.querySelector("#slot-0")?.innerHTML;
    const digit1 = document.querySelector("#slot-1")?.innerHTML;
    const digit2 = document.querySelector("#slot-2")?.innerHTML;
    const digit3 = document.querySelector("#slot-3")?.innerHTML;
    const digit4 = document.querySelector("#slot-4")?.innerHTML;
    const digit5 = document.querySelector("#slot-5")?.innerHTML;

    if (!digit0 || !digit1 || !digit2 || !digit3 || !digit4 || !digit5) {
      toast.warning("Incomplete OTP");
      return;
    } else {
      const otp = digit0 + digit1 + digit2 + digit3 + digit4 + digit5;
      console.log({ ...payload, otp });
      setIsSubmitting(true);
      const response = await postFunction("/api/register", { ...payload, otp });
      if (response.success) {
        setIsSubmitting(false);
        toast.success(`${response.data}`);
        setTimeout(() => {
          navigate("/login");
        }, 500);
        localStorage.removeItem("RegistrationDetails");
      } else {
        setIsSubmitting(false);
        toast.warning(`${response.errMsg}`);
      }
    }
  };

  const handleResend = async () => {
    if(isOTPSubmitting) return;
    setIsOTPSubmitting(true);
    const response = await getFunction(`/api/register/sendOtp?email=${email}`);
    if (response.success) {
      toast.success(`${response.data.data}`);
      setIsOTPSubmitting(false);
    } else {
      toast.warning(`${response.errMsg}`);
      setIsOTPSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md h-full min-h-screen flex flex-col justify-center items-start gap-8 text-white select-none font-mono">
      <div className="p-2 flex flex-col gap-2 text-start">
        <p className=" text-5xl tracking-tight font-bold">Verification Code</p>
        <p className="text-neutral-400 text-lg">
          Please enter 6 digit OTP sent to your email address :{" "}
          <span className="text-neutral-200">
            {email.slice(0, 2) + "*******" + ".com"}
          </span>
        </p>
      </div>
      <div className="w-full p-2">
        <InputOTP maxLength={6}>
          <InputOTPGroup className="space-x-2">
            <InputOTPSlot
              index={0}
              id="slot-0"
              className="h-12 w-12 border border-slate-600"
            />
            <InputOTPSlot
              index={1}
              id="slot-1"
              className="h-12 w-12 border border-slate-600"
            />
            <InputOTPSlot
              index={2}
              id="slot-2"
              className="h-12 w-12 border border-slate-600"
            />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup className="space-x-2">
            <InputOTPSlot
              index={3}
              id="slot-3"
              className="h-12 w-12 border border-slate-600"
            />
            <InputOTPSlot
              index={4}
              id="slot-4"
              className="h-12 w-12 border border-slate-600"
            />
            <InputOTPSlot
              index={5}
              id="slot-5"
              className="h-12 w-12 border border-slate-600"
            />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <div>
        {(timerStarted && value > 0) &&(
          <p className="text-right text-xs text-blue-500">
            Resend otp in {value} s
          </p>
        )}
      </div>
      <div className=" flex items-center gap-4">
        <BlackButton
          Icon={isSubmitting ? ImSpinner8 : undefined}
          iconSize={`animate-spin`}
          disabled={timerStarted}
          text="Resend OTP"
          containerStyle="flex justify-center items-center"
          className="w-full font-mono"
          onClick={()=>{
            updateCounter(60);
            setTimerStarted(true)
            handleResend()
          }}
        />
        <WhiteButton text="Register" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default OTPComponent;
