import Card from "@/components/common/Card";
import InputComponent from "@/components/common/InputComponent";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { LiaToolsSolid } from "react-icons/lia";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { LuNotepadText } from "react-icons/lu";
import WhiteButton from "@/components/common/WhiteButton";

const AddCompanyInfo = ({
  isNextComponentActive,
}: {
  isNextComponentActive: (x: boolean) => void;
}) => {
  return (
    <Card componentStyle="px-2 sm:px-4 py-4 sm:py-8 rounded-md">
      <div>
        <h3 className="text-xl sm:text-2xl md:text-4xl">
          Share Interview Experience
        </h3>
        <div className="pt-8 flex flex-col gap-8">
          <div className="w-full flex flex-col md:flex-row gap-8 md:gap-4">
            <InputComponent
              title="Enter Company Name"
              placeholder="Ex - Amazon, Razorpay"
              inputType={`text`}
              Icon={HiOutlineBuildingOffice2}
              componentStyle="gap-3 flex-6"
              titleStyle="text-lg sm:text-xl"
            />
            <InputComponent
              title="Year Of Interview"
              placeholder="Ex - 2025"
              inputType={`number`}
              Icon={IoCalendarNumberOutline}
              componentStyle="gap-3 flex-4"
              titleStyle="text-lg sm:text-xl"
            />
          </div>
          <InputComponent
            title="Role"
            placeholder="Ex - SDE, SWE, Analyst"
            inputType={`text`}
            Icon={LiaToolsSolid}
            componentStyle="gap-3"
            titleStyle="text-lg sm:text-xl"
          />
          <InputComponent
            title="CTC Offered (in lpa)"
            placeholder="Ex - 12"
            inputType={`number`}
            Icon={AiOutlineDollarCircle}
            componentStyle="gap-3"
            titleStyle="text-lg sm:text-xl"
            iconColor={`text-yellow-500`}
            iconSize="h-8 w-8"
          />
          <InputComponent
            title="Interview Status"
            placeholder="Ex - Selected, Pending, Rejected"
            inputType={`text`}
            Icon={LuNotepadText}
            componentStyle="gap-3"
            titleStyle="text-lg sm:text-xl"
          />
        </div>
      </div>
      <div className="pt-8 flex justify-center items-center">
        <WhiteButton
          onClick={() => isNextComponentActive(true)}
          text="Next Section"
          className="w-full max-w-md sm:max-w-lg text-lg sm:text-xl"
        />
      </div>
    </Card>
  );
};

export default AddCompanyInfo;
