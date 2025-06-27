import { useEffect, useState } from "react"


const LoadingAnimation = () => {
    const [text,setText] = useState<string>("Gathering data");
    let counter = 0;
    console.log("loading Animation")

    useEffect(()=>{
        const responses = ["Analyzing","Preparing response"];
        const id = setInterval(()=>{
            setText(responses[counter%responses.length] as string);
            ++counter;
        },2500);

        return () => clearInterval(id)
    },[counter])
  return (
    <div className="txt-lg text-neutral-400 px-4">
      <span>{text}</span>...
    </div>
  )
}

export default LoadingAnimation
