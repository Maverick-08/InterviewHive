import { useEffect, useState } from "react";
import InfoComponent from "./InfoComponent";
import RegistrationComponent from "./RegistrationComponent";
import OTPComponent from "./OTPComponent";

const Registration = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOTPComponentActive,setIsOTPComponentActive] = useState(false);

  useEffect(() => {
    const Id = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearInterval(Id);
  }, []);

  if (isLoading) {
    return (
      <div className="w-screen h-screen bg-[#111111] flex justify-center items-center gap-2">
        <div className="w-10 h-10 border-4 border-white rounded-full border-dotted animate-spin"></div>
        <p className="text-2xl font-mono text-white">Loading</p>
      </div>
    );
  }

  return (
    <div className="w-full flex">
      <div className="flex-1 flex justify-center items-center bg-[#111111]">
       {isOTPComponentActive ? <OTPComponent /> : <RegistrationComponent activateOTPComponent={setIsOTPComponentActive} />}
      </div>
      <div className="flex-1 hidden lg:flex justify-center items-center bg-[#171717]">
        <InfoComponent />
      </div>
    </div>
  );
};

export default Registration;
