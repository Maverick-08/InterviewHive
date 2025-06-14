import InputComponent from "@/components/common/InputComponent";
import { MdOutlineEmail } from "react-icons/md";
import { IoChevronBackOutline, IoKeyOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { LuNotebookPen } from "react-icons/lu";
import { FaRegCalendarCheck } from "react-icons/fa6";
import WhiteButton from "@/components/common/WhiteButton";
import { useNavigate } from "react-router-dom";
import { AiOutlineChrome } from "react-icons/ai";
import { useState } from "react";
import {
  checkRegistrationDetails,
  courseOptions,
  getYearList,
  submitRegistrationData,
} from "./register.util";
import { toast } from "sonner";
import { ImSpinner8 } from "react-icons/im";
import { Combobox } from "@/components/ui/combobox";

const RegistrationComponent = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [courseId, setCourseId] = useState<string | null>(null);
  const [yearOfPassingOut, setYearOfPassingOut] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComboboxOpen, setIsComboboxOpen] = useState(false);
  const [isYearComboboxOpen, setIsYearComboboxOpen] = useState(false);
  const yearList = getYearList();

  const handleSubmit = async () => {
    if (isSubmitting) return;
    console.log({
      username,
      email,
      password,
      courseId,
      yearOfPassingOut: Number(yearOfPassingOut),
    });
    const isPayloadValid = checkRegistrationDetails({
      username,
      email,
      password,
      courseId,
      yearOfPassingOut: Number(yearOfPassingOut),
    });

    if (!isPayloadValid) {
      toast.error(<p className="text-lg font-mono">Please fill all details</p>);
    } else {
      setIsSubmitting(true);
      await new Promise((r) => {
        setTimeout(r, 2000);
      });
      const response = await submitRegistrationData({
        username,
        email,
        password,
        courseId,
        yearOfPassingOut: Number(yearOfPassingOut),
      });
      if (response.status < 300) {
        toast.success(
          <p className="text-lg font-mono">User Registered Successfully.</p>,
          { description: <p className="font-mono">Navigating to login page!</p> }
        );
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(<p className="text-lg font-mono">{response.data.msg}</p>);
      }
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md h-full min-h-screen px-4 flex flex-col gap-4 text-white select-none">
      {/* Back Button  */}
      <span
        onClick={() => navigate("/")}
        className="absolute lg:hidden top-6 left-4 text-neutral-400 cursor-pointer flex items-center gap-2"
      >
        <IoChevronBackOutline className="h-6 w-6" /> <span className="text-lg text-neutral-400">Back</span>
      </span>

      {/* Top Heading - Welcome Back  */}
      <p className="pt-24 text-2xl text-center">Welcome Back ! 👋</p>
      <div className="flex flex-col gap-6">
        {/* Username  */}
        <InputComponent
          value={username ? username : ""}
          onChange={(e) => setUsername(e.target.value)}
          title="Username"
          Icon={IoPersonOutline}
          inputType={"text"}
          placeholder="Enter full name"
          inputTagStyle="placeholder:text-sm rounded-sm text-neutral-400"
        />
        <div className="w-full flex flex-col md:flex-row lg:justify-between lg:items-center gap-4 lg:gap-2">
          {/* Course  */}
          <div className="flex flex-col">
            <InputComponent
              defaultValue={courseId ? courseId : ""}
              onClick={() => setIsComboboxOpen(true)}
              title="Course"
              Icon={LuNotebookPen}
              inputType={"text"}
              placeholder="BTECH / MTECH / MCA"
              inputTagStyle="placeholder:text-sm rounded-sm text-neutral-400"
            />

            {isComboboxOpen && (
              <Combobox
                label=""
                labelStyle=""
                showTriggerIcon="hidden sm:hidden"
                options={courseOptions}
                value={courseId ? courseId : ""}
                setValue={setCourseId}
                isPopoverOpen={isComboboxOpen}
                setIsPopoverOpen={setIsComboboxOpen}
                closePopoverOnClick={true}
              />
            )}
          </div>

          {/* Year of passing out   */}
          <div className="relative flex flex-col">
            <InputComponent
              defaultValue={yearOfPassingOut ? yearOfPassingOut : ""}
              onClick={() => setIsYearComboboxOpen(true)}
              title="Year"
              Icon={FaRegCalendarCheck}
              inputType={"text"}
              placeholder="Year of Passing out"
              inputTagStyle="placeholder:text-sm placeholder:tracking-wide rounded-sm text-neutral-400"
            />

            {isYearComboboxOpen && (
              <Combobox
                label=""
                labelStyle=""
                showTriggerIcon="hidden sm:hidden"
                options={yearList}
                styleOption="text-lg"
                value={
                  yearOfPassingOut
                    ? `${yearOfPassingOut}`
                    : `1999`
                }
                setValue={setYearOfPassingOut}
                isPopoverOpen={isYearComboboxOpen}
                setIsPopoverOpen={setIsYearComboboxOpen}
                closePopoverOnClick={true}
              />
            )}
          </div>
        </div>

        {/* Email  */}
        <InputComponent
          value={email ? email : ""}
          onChange={(e) => setEmail(e.target.value)}
          title="Email"
          Icon={MdOutlineEmail}
          inputType={"email"}
          placeholder="name@example.com"
          inputTagStyle="placeholder:text-sm placeholder:tracking-wider rounded-sm text-neutral-400"
        />

        {/* Password  */}
        <InputComponent
          value={password ? password : ""}
          onChange={(e) => setPassword(e.target.value)}
          title="Password"
          Icon={IoKeyOutline}
          inputType={"password"}
          placeholder="your password"
          inputTagStyle="placeholder:text-sm placeholder:tracking-wide rounded-sm text-neutral-400"
        />
      </div>

      {/* Register  */}
      <WhiteButton
        disabled={isSubmitting}
        onClick={handleSubmit}
        Icon={isSubmitting ? ImSpinner8 : undefined}
        iconSize={`animate-spin`}
        text="Register"
        containerStyle="flex justify-center items-center"
        className="mt-4 w-full font-mono"
      />

      <div className="flex items-center gap-1">
        <span className="flex-1 border border-[#333333]"></span>
        <span className="text-lg font-mono">OR</span>
        <span className="flex-1 border border-[#333333]"></span>
      </div>

      {/* Sign in with google */}

        <WhiteButton
          text="Sign up with Google"
          className="w-full font-mono flex items-center justify-center gap-2"
          Icon={AiOutlineChrome}
        />

      <div className="pb-8 text-right">
        Have an account ?{" "}
        <span
          onClick={() => navigate("/login")}
          className="underline cursor-pointer hover:text-neutral-400"
        >
          Sign In
        </span>
      </div>
    </div>
  );
};

export default RegistrationComponent;
