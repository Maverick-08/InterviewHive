import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectCourse = ({
  selectedCourse,
  setSelectedCourse,
}: {
  selectedCourse: string | null;
  setSelectedCourse: (x: string) => void;
}) => {

  return (
    <Select>
      <SelectTrigger className="w-full text-white">
        <SelectValue
          placeholder={`${selectedCourse == null ? "Course" : selectedCourse}`}
          className="text-neutral-500 py-1.5"
        />
      </SelectTrigger>
      <SelectContent className="bg-[#181818] border border-white/30 text-neutral-500">
        <SelectItem
          onClick={() => setSelectedCourse("MCA" )}
          value="MCA"
        >
          MCA
        </SelectItem>
        <SelectItem
          onClick={() => setSelectedCourse("BTECH-CSE")}
          value="BTECH-CSE"
        >
          BTECH-CSE
        </SelectItem>
        <SelectItem
          onClick={() => setSelectedCourse("BTECH-EE" )}
          value="BTECH-EE"
        >
          BTECH-EE
        </SelectItem>
        <SelectItem
          onClick={() => setSelectedCourse("MTECH-CSE")}
          value="MTECH-CSE"
        >
          MTECH-CSE
        </SelectItem>
        <SelectItem
          onClick={() => setSelectedCourse("MDS")}
          value="MDS"
        >
          MDS
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectCourse;
