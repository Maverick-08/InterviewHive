import Card from "@/components/common/Card";
import InputComponent from "@/components/common/InputComponent";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { LiaToolsSolid } from "react-icons/lia";
import { MdCurrencyRupee } from "react-icons/md";
import { LuNotepadText } from "react-icons/lu";
import WhiteButton from "@/components/common/WhiteButton";
import { useState } from "react";
import { toast } from "sonner";
import { useInterviewStore } from "@/store/interview";
import { useUserStore } from "@/store/userStore";

const AddCompanyInfo = ({
  setNextComponentActive,
}: {
  setNextComponentActive: (x: number) => void;
}) => {
  // Stored Data
  const store_companyName = useInterviewStore(state => state.companyName);
  const store_yearOfInterview = useInterviewStore(state => state.yearOfInterview);
  const store_role = useInterviewStore(state => state.role);
  const store_CTCOffered = useInterviewStore(state => state.CTCOffered);
  const store_interviewStatus = useInterviewStore(state => state.interviewStatus);
  const setInterview = useInterviewStore((state) => state.updateInterview);

  // Managing state change
  const [companyName, setCompanyName] = useState(store_companyName ?? "");
  const [yearOfInterview, setYearOfInterview] = useState(
    store_yearOfInterview ?? new Date().getFullYear()
  );
  const [role, setRole] = useState(store_role ?? "");
  const [CTCOffered, setCTCOffered] = useState<number | null>(store_CTCOffered ?? null);
  const [interviewStatus, setInterviewStatus] = useState(store_interviewStatus ?? "");
  const authorId = useUserStore((state) => state.id);
  const regex = /[a-zA-Z]+$/;;

  const saveInterviewInfo = () => {
    const allowedStatuses = ["SELECTED", "PENDING", "REJECTED"];

    if(companyName == "" || role == "" || interviewStatus == ""){
      toast.warning("Empty Fields", {
        description: "Please fill complete information.",
      });
      return false;
    }

    if (!regex.test(companyName)) {
      toast.warning("Invalid Format", {
        description: "The company name can have only letters or spaces.",
      });
      return false;
    }

    if(yearOfInterview > (new Date).getFullYear()){
      toast.warning("Invalid Year");
      return false;
    }

    if(yearOfInterview < (new Date).getFullYear()-5){
      toast.info("Content Review Required",{
        description:'The year of interview seems outdated.'
      });
      return false;
    }

    if (!regex.test(role)) {
      toast.warning("Invalid Format", {
        description: "The role can have only letters or spaces.",
      });
      return false;
    }

    if (!regex.test(interviewStatus)) {
      toast.warning("Invalid Format", {
        description:
          "The interview status can be - Selected, Rejected or Pending",
      });
      return false;
    } 

    if(!allowedStatuses.includes(interviewStatus.toUpperCase())){
      toast.warning("Invalid Format", {
        description:
          "The interview status can be - Selected, Rejected or Pending",
      });
      return false;
    }

    setInterview({
      authorId: authorId as string,
      companyName,
      yearOfInterview,
      CTCOffered,
      role,
      interviewStatus,
    });
    return true;
  };

  return (
    <Card componentStyle="px-4 py-4 sm:py-8 bg-[#171717] border-1 border-[#333333] rounded-md">
      <div>
        <h3 className="text-xl sm:text-2xl md:text-4xl">
          Add Interview Experience
        </h3>
        <div className="pt-8 flex flex-col gap-8">
          <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-4">
            <InputComponent
              title="Enter Company Name"
              value={companyName}
              onChange={e => setCompanyName(e.target.value.trim())}
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
              value={yearOfInterview}
              onChange={(e) => setYearOfInterview(Number(e.target.value))}
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
            value={role}
            onChange={e => setRole(e.target.value.trim())}
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
            value={CTCOffered ? CTCOffered : ""}
            onChange={(e) => setCTCOffered(Number(e.target.value))}
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
            value={interviewStatus}
            onChange={(e) => setInterviewStatus(e.target.value.trim())}
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
          onClick={() => {
            if(saveInterviewInfo()) setNextComponentActive(2);
          }}
          text="Next Section"
          className="w-full max-w-sm sm:max-w-md text-lg sm:text-xl"
        />
      </div>
    </Card>
  );
};

export default AddCompanyInfo;
