import { useContentAccessStore } from "@/store/contentAccessStore";
import ComingSoon from "../../assets/ComingSoon.png";
import ContentNotAccessible from "@/components/common/ContentNotAccessible";

const MockInterview = () => {
  const isContentAccessible = useContentAccessStore(state => state.isAccessible);
  return (
    <div className="w-full max-w-6xl h-screen flex flex-col gap-4 justify-center items-center">
      {!isContentAccessible ? <ContentNotAccessible /> : 
     (
        <>
          <img src={ComingSoon} alt="" className="w-80 h-80"/>
          <p className="text-xl sm:text-4xl font-mono text-white">Currently In Development</p>
        </>
      )
    }
    </div>
  )
}

export default MockInterview
