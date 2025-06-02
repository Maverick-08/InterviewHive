import { cn } from "@/lib/utils"
import type { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text:string,
    className?:string
}


const BlackButton = ({text,className,...rest}:ButtonProps) => {
  return (
    <button {...rest} className={cn(`${className} px-4 py-1 rounded-md border border-slate-400 hover:bg-black/60 text-lg cursor-pointer`)}>
      {text}
    </button>
  )
}

export default BlackButton
