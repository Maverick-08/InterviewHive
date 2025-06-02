import { cn } from "@/lib/utils"

interface ButtonProps{
    text:string,
    className?:string
}


const BlackButton = ({text,className}:ButtonProps) => {
  return (
    <button className={cn(`${className} px-4 py-1 rounded-md border border-slate-400 hover:bg-black/60 text-lg cursor-pointer`)}>
      {text}
    </button>
  )
}

export default BlackButton
