import { cn } from "@/lib/utils"
import type { ButtonHTMLAttributes } from "react"
import type { IconType } from "react-icons";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  className?: string;
  Icon?: IconType;
  iconSize?: string;
  containerStyle?: string;
}


const BlackButton = ({text,className,Icon,iconSize,containerStyle,...rest}:ButtonProps) => {
  return (
    <button {...rest} className={cn(`px-4 py-1 rounded-md border border-white/20 hover:bg-black/60 text-lg cursor-pointer ${className} `)}>
      {Icon ? (
        <div className={cn(`flex items-center gap-2 text-lg ${containerStyle}`)}>
          <Icon className={cn(`h-6 w-6 ${iconSize}`)} />
          <span>{text}</span>
        </div>
      ) : (
        <span>{text}</span>
      )}
    </button>
  )
}

export default BlackButton
