import { cn } from "@/lib/utils";
import type { IconType } from "react-icons";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  placeholder: string;
  inputType?: string;
  Icon:IconType;
  iconSize?: string;
  inputTagStyle?: string;
  titleStyle?: string;
  componentStyle?: string;
  iconColor?: string;
  value?: string|number;
}

const InputComponent = ({ title, placeholder, inputTagStyle, inputType="text",Icon,iconSize,titleStyle, componentStyle, iconColor,value,...rest}: InputProps) => {
  return (
    <div className={cn(`flex flex-col gap-1 text-white font-mono ${componentStyle}`)}>
      <div className="flex items-center gap-2 ">
        <span className={cn(`${iconColor}`)}><Icon className={cn(`h-6 w-6 ${iconSize}`)}/></span>
        <span className={cn(`text-lg tracking-wide font-mono ${titleStyle}`)}>{title}</span>
      </div>
      <div>
        <input
          {...rest}
          value={value}
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
