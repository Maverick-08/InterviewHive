import InputComponent from "@/components/common/InputComponent";
import { MdOutlineEmail } from "react-icons/md";
import { IoChevronBackOutline, IoKeyOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { LuNotebookPen } from "react-icons/lu";
import { FaRegCalendarCheck } from "react-icons/fa6";
import WhiteButton from "@/components/common/WhiteButton";
import { useNavigate } from "react-router-dom";
import { AiOutlineChrome } from "react-icons/ai";
import { useEffect, useState } from "react";
import {
  checkRegistrationDetails,
  courseOptions,
  getYearList,
} from "./register.util";
import { toast } from "sonner";
import { ImSpinner8 } from "react-icons/im";
import { Combobox } from "@/components/ui/combobox";
import { useRegisterUserStore } from "@/store/registerStore";
import { getFunction, postFunction } from "@/utils/axiosRequest";
import { useUserStore } from "@/store/userStore";
import { useAuthStore } from "@/store/authStore";
import { useContentAccessStore } from "@/store/contentAccessStore";
import { useAuth0 } from "@auth0/auth0-react";

const RegistrationComponent = ({
  activateOTPComponent,
}: {
  activateOTPComponent: (x: boolean) => void;
}) => {
  const navigate = useNavigate();
  const year = useRegisterUserStore((state) => state.yearOfPassingOut);

  const [username, setUsername] = useState<string | null>(
    useRegisterUserStore((state) => state.username) ?? null
  );
  const [email, setEmail] = useState<string | null>(
    useRegisterUserStore((state) => state.email) ?? null
  );
  const [password, setPassword] = useState<string | null>(
    useRegisterUserStore((state) => state.password) ?? null
  );
  const [courseId, setCourseId] = useState<string | null>(
    useRegisterUserStore((state) => state.courseId) ?? null
  );
  const [yearOfPassingOut, setYearOfPassingOut] = useState<string | null>(
    year !== null && year !== undefined ? String(year) : null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isComboboxOpen, setIsComboboxOpen] = useState(false);
  const [isYearComboboxOpen, setIsYearComboboxOpen] = useState(false);
  const yearList = getYearList();
  const updateRegistrationDetails = useRegisterUserStore(
    (state) => state.updateUserDetails
  );
  const setUserState = useUserStore((state) => state.setUserState);
  const setAuthState = useAuthStore((state) => state.setAuthState);
  const setContentAccessState = useContentAccessStore(
    (state) => state.setContentAccessibility
  );
  const { isAuthenticated, user, loginWithPopup } = useAuth0();

  useEffect(() => {
    if (isAuthenticated && user) {
      const fetch = async () => {
        // Platform
        const platform =
          innerWidth < 640
            ? "Mobile"
            : innerWidth > 640 && innerWidth < 1024
            ? "Tablet"
            : "Laptop";

        const response = await postFunction("/api/oauth", {
          username: user.name,
          email: user.email,
          platform,
        });

        if (response.success) {
          setIsLoggedIn(false);
          const userData = response.data;
          setUserState({
            id: userData.userId,
            username: userData.username,
            avatar: userData.avatar,
          });
          setAuthState(true);
          setContentAccessState(userData.contentAccess);
          toast.success(`Logging In`);
          setTimeout(() => {
            navigate("/dashboard");
          }, 500);
        } else {
          setIsLoggedIn(false);
          toast.warning("Authentication Error");
        }
      };
      fetch();
    }
  }, [
    isAuthenticated,
    user,
    navigate,
    setContentAccessState,
    setUserState,
    setAuthState,
  ]);

  const handleSubmit = async () => {
    if (isSubmitting) return;

    const isPayloadValid = checkRegistrationDetails({
      username,
      email,
      password,
      courseId,
      yearOfPassingOut: Number(yearOfPassingOut),
    });

    if (!isPayloadValid) {
      toast.error(`Incomplete Details`);
    } else {
      setIsSubmitting(true);

      updateRegistrationDetails({
        username: username as string,
        email: email as string,
        password: password as string,
        courseId: courseId as string,
        yearOfPassingOut: Number(yearOfPassingOut),
      });
      const response = await getFunction(
        `/api/register/sendOtp?email=${email}`
      );

      if (response.success) {
        toast.success(`${response.data.data}`);
        setIsSubmitting(false);
        setTimeout(() => {
          activateOTPComponent(true);
        }, 1000);
      } else {
        toast.warning(`${response.errMsg}`);
        setIsSubmitting(false);
      }
    }
  };

  const handleOAuth = async () => {
    if (isLoggedIn) return;
    setIsLoggedIn(true);
    await loginWithPopup();
  };

  return (
    <div className="w-full max-w-md h-full min-h-screen px-4 flex flex-col gap-4 justify-center items-center text-white select-none font-mono">
      {/* Back Button  */}
      <span
        onClick={() => navigate("/")}
        className="absolute lg:hidden top-6 left-4 text-neutral-400 cursor-pointer flex items-center gap-2"
      >
        <IoChevronBackOutline className="h-6 w-6" />{" "}
        <span className="text-lg text-neutral-400">Back</span>
      </span>

      {/* Top Heading - Welcome Back  */}
      <p className="pt-24 text-2xl text-center ">Welcome Back!👋</p>
      <div className="w-full flex flex-col gap-6">
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
              value={courseId ? courseId : ""}
              onClick={() => setIsComboboxOpen(true)}
              onChange={() => setCourseId(courseId)}
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
              value={yearOfPassingOut ? yearOfPassingOut : ""}
              onClick={() => setIsYearComboboxOpen(true)}
              onChange={() => setYearOfPassingOut(yearOfPassingOut)}
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
                value={yearOfPassingOut ? `${yearOfPassingOut}` : `1999`}
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
        text="Get OTP"
        containerStyle="flex justify-center items-center"
        className="mt-4 w-full font-mono"
      />

      <div className="flex w-full items-center gap-2">
        <p className="h-px bg-gradient-to-r from-transparent to-white/40 w-full "></p>
        <p className="text-sm text-white/80">OR</p>
        <p className="h-px bg-gradient-to-l from-transparent to-white/40 w-full "></p>
      </div>

      {/* Sign in with google */}

      <WhiteButton
        text="Continue with Google"
        onClick={handleOAuth}
        className="w-full font-mono flex items-center justify-center gap-2"
        Icon={AiOutlineChrome}
      />

      <div className="pb-8 text-right text-neutral-400">
        Have an account ?{" "}
        <span
          onClick={() => navigate("/login")}
          className="hover:underline underline-offset-4 cursor-pointer text-neutral-200 hover:text-neutral-400"
        >
          Sign In
        </span>
      </div>
    </div>
  );
};

export default RegistrationComponent;
