import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserStore } from "@/store/userStore";

const SelectCourse = () => {
  const savedCourseId = useUserStore((state) => state.courseId);
  const setCourseId = useUserStore((state) => state.setUserState);
  return (
    <Select>
      <SelectTrigger className="w-full text-white">
        <SelectValue
          placeholder={`${savedCourseId == "NA" ? "Course" : savedCourseId}`}
          className="text-neutral-500 py-1.5"
        />
      </SelectTrigger>
      <SelectContent className="bg-[#181818] border border-white/30 text-neutral-500">
        <SelectItem
          onClick={() => setCourseId({ courseId: "MCA" })}
          value="MCA"
        >
          MCA
        </SelectItem>
        <SelectItem
          onClick={() => setCourseId({ courseId: "BTECH-CSE" })}
          value="BTECH-CSE"
        >
          BTECH-CSE
        </SelectItem>
        <SelectItem
          onClick={() => setCourseId({ courseId: "BTECH-EE" })}
          value="BTECH-EE"
        >
          BTECH-EE
        </SelectItem>
        <SelectItem
          onClick={() => setCourseId({ courseId: "MTECH-CSE" })}
          value="MTECH-CSE"
        >
          MTECH-CSE
        </SelectItem>
        <SelectItem
          onClick={() => setCourseId({ courseId: "MDS" })}
          value="MDS"
        >
          MDS
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectCourse;
