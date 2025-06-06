import { cn } from "@/lib/utils";
import type { IconType } from "react-icons";

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>,HTMLDivElement>{
    className:string;
    linkName:string;
    linkStyle?:string;
    iconContainerStyle?:string;
    iconStyle?:string;
    Icon:IconType;
}

const NavigationLink = ({className,linkName,linkStyle,iconContainerStyle,iconStyle,Icon,...rest}:Props) => {
  return (
    <div {...rest} className={cn(`${className}`)}>
      <span className={cn(`${iconContainerStyle}`)}>
        <Icon className={cn(`h-6 w-6 ${iconStyle}`)}/>
      </span>
      <span className={cn(`${linkStyle}`)}>{linkName}</span>
    </div>
  )
}

export default NavigationLink
