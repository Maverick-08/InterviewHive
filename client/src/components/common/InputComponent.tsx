import { cn } from "@/lib/utils";
import type { IconType } from "react-icons";

interface InputProps {
  title: string;
  placeholder: string;
  inputTagStyle?: string;
  inputType?:string;
  Icon:IconType;
  iconStyle?:string;
}

const InputComponent = ({ title, placeholder, inputTagStyle, inputType="text",Icon,iconStyle}: InputProps) => {
  return (
    <div className="flex flex-col gap-1 text-white">
      <div className="flex items-center gap-2 ">
        <Icon className={cn(`h-6 w-6 ${iconStyle}`)}/>
        <span className="text-lg tracking-wide font-mono">{title}</span>
      </div>
      <div>
        <input
          placeholder={placeholder}
          type={inputType}
          className={cn(
            `w-full focus:outline-none border border-neutral-500 px-2 py-1 placeholder:text-neutral-400 ${inputTagStyle}`
          )}
        />
      </div>
    </div>
  );
};

export default InputComponent;
