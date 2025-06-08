import Card from "@/components/common/Card";
import InputComponent from "@/components/common/InputComponent";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { LiaToolsSolid } from "react-icons/lia";
import { MdCurrencyRupee } from "react-icons/md";
import { LuNotepadText } from "react-icons/lu";
import WhiteButton from "@/components/common/WhiteButton";

const AddCompanyInfo = ({
  isNextComponentActive,
}: {
  isNextComponentActive: (x: boolean) => void;
}) => {
  return (
    <Card componentStyle="px-4 py-4 sm:py-8 bg-[#171717] border-1 border-[#333333] rounded-md">
      <div>
        <h3 className="text-xl sm:text-2xl md:text-4xl">
          Add Interview Experience
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
              iconColor="text-sky-500"
              inputTagStyle="rounded-sm"
            />
            <InputComponent
              title="Year Of Interview"
              placeholder="Ex - 2025"
              inputType={`number`}
              Icon={IoCalendarNumberOutline}
              componentStyle="gap-3 flex-4"
              titleStyle="text-lg sm:text-xl"
              iconColor="text-purple-500"
              inputTagStyle="rounded-sm"
            />
          </div>
          <InputComponent
            title="Role"
            placeholder="Ex - SDE, SWE, Analyst"
            inputType={`text`}
            Icon={LiaToolsSolid}
            componentStyle="gap-3"
            titleStyle="text-lg sm:text-xl"
            iconColor="text-green-500"
            inputTagStyle="rounded-sm"
          />
          <InputComponent
            title="CTC Offered (in lpa)"
            placeholder="Ex - 12"
            inputType={`number`}
            Icon={MdCurrencyRupee}
            componentStyle="gap-3"
            titleStyle="text-lg sm:text-xl"
            iconColor={`text-yellow-500`}
            iconSize="h-6 w-6"
            inputTagStyle="rounded-sm"
          />
          <InputComponent
            title="Interview Status"
            placeholder="Ex - Selected, Pending, Rejected"
            inputType={`text`}
            Icon={LuNotepadText}
            componentStyle="gap-3"
            titleStyle="text-lg sm:text-xl"
            iconColor="text-red-500"
            inputTagStyle="rounded-sm"
          />
        </div>
      </div>
      <div className="pt-8 flex justify-center items-center">
        <WhiteButton
          onClick={() => isNextComponentActive(true)}
          text="Next Section"
          className="w-full max-w-sm sm:max-w-md text-lg sm:text-xl"
        />
      </div>
    </Card>
  );
};

export default AddCompanyInfo;
