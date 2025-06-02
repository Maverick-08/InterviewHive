import { cn } from "@/lib/utils"

interface ButtonProps{
    text:string,
    className?:string
}


const WhiteButton = ({text,className}:ButtonProps) => {
  return (
    <button className={cn(`${className} px-4 py-1 rounded-md bg-white hover:bg-white/80 text-black text-lg cursor-pointer`)}>
      {text}
    </button>
  )
}

export default WhiteButton
