import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { IoChevronBackOutline } from "react-icons/io5";

const InfoComponent = () => {
  const navigate = useNavigate();
  return (
    <div className="relative flex flex-col justify-center gap-4 font-mono text-white text-center selection:bg-neutral-300 selection:text-neutral-900">
      <span
        onClick={() => navigate("/")}
        className="fixed top-6 left-6 text-neutral-400 cursor-pointer flex items-center gap-2"
      >
        <IoChevronBackOutline className="h-8 w-8" /><span className="text-lg text-neutral-400 font-mono">Back</span>
      </span>
      <div className="flex justify-center items-center gap-2">
        <img src={Logo} alt="" className="h-10 w-10" />
        <p className="text-4xl">Interview Hive</p>
      </div>
      <div className="text-xl tracking-wide space-y-2 ">
        <p>Welcome back to the realm of preparation. <br />
        Keep preparing and practising until you 
          <br />land your dream offer.</p>
      </div>
    </div>
  );
};

export default InfoComponent;
