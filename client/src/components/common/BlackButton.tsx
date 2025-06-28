import { cn } from "@/lib/utils"
import type { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text:string,
    className?:string
}


const BlackButton = ({text,className,...rest}:ButtonProps) => {
  return (
    <button {...rest} className={cn(`px-4 py-1 rounded-md border border-white/20 hover:bg-black/60 text-lg cursor-pointer ${className} `)}>
      {text}
    </button>
  )
}

export default BlackButton
