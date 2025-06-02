import InputComponent from "@/components/common/InputComponent";
import { MdOutlineEmail } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { LuNotebookPen } from "react-icons/lu";
import { FaRegCalendarCheck } from "react-icons/fa6";
import WhiteButton from "@/components/common/WhiteButton";

const RegistrationComponent = () => {
  return (
    <div className="w-full max-w-md px-4 flex flex-col gap-4 text-white">
      <p className="text-2xl text-center">Welcome Back ! 👋</p>
      <div className="flex flex-col gap-6">
        <InputComponent
          title="Username"
          Icon={IoPersonOutline}
          inputType={"text"}
          placeholder="Username"
        />
        <div className="flex justify-between items-center gap-2">
          <InputComponent
            title="Course"
            Icon={LuNotebookPen}
            inputType={"text"}
            placeholder="MCA / CSE / MBA"
          />
          <InputComponent
            title="Year"
            Icon={FaRegCalendarCheck}
            inputType={"number"}
            placeholder=""
          />
        </div>
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
        <WhiteButton text="Register" className="mt-4 w-full font-mono"/>
    </div>
  );
};

export default RegistrationComponent;
