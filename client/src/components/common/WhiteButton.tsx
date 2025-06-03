import { cn } from "@/lib/utils"
import type { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    text:string,
    className?:string
}


const WhiteButton = ({text,className,...rest}:ButtonProps) => {
  return (
    <button {...rest} className={cn(` px-4 py-1 rounded-md bg-white hover:bg-white/80 text-black text-lg cursor-pointer ${className}`)}>
      {text}
    </button>
  )
}

export default WhiteButton
