import { useNavigate } from "react-router-dom";
import WhiteButton from "./WhiteButton";

const ContentNotAccessible = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-[60vh] flex flex-col justify-center items-center gap-4">
      <p className="text-sm sm:text-xl text-center text-balance">Please complete your profile inorder to access this feature.</p>
      <WhiteButton
        onClick={() => navigate("/profile")}
        text="Complete Profile"
        className="text-sm sm:text-lg"
      />
    </div>
  );
};

export default ContentNotAccessible;
