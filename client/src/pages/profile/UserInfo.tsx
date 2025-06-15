import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { MdModeEditOutline } from "react-icons/md";
import Doodle from "../../assets/doodle.png";
import Female from "../../assets/Female.png";
import Waiting from "../../assets/ComingSoon.png";
import AllGood from "../../assets/AllGood.png";
import Birthday from "../../assets/Birthday.png";
import DontMove from "../../assets/DontMove.png";
import Vibing from "../../assets/Vibing.png";

const getAvatar = (avatar:string) => {
  if(avatar == "Doodle") return Doodle;
  if(avatar == "Female") return Female;
  if(avatar == "Waiting") return Waiting;
  if(avatar == "AllGood") return AllGood;
  if(avatar == "Birthday") return Birthday;
  if(avatar == "DontMove") return DontMove;
  if(avatar == "Vibing") return Vibing;
  return Doodle;
}

const UserInfo = ({
  username,
  degree,
  branch,
  yearOfPassingOut,
  xHandle,
  linkedIn,
  avatar,
}: {
  username: string;
  degree: string;
  branch: string|null;
  yearOfPassingOut: number;
  xHandle?: string | null;
  linkedIn?: string | null;
  avatar: string;
}) => {
  return (
    <div className="w-full max-w-4xl  px-4 flex gap-12 flex-col lg:flex-row md:justify-between items-center ">
      {/* profile image  */}
      <div className="p-1 bg-neutral-400/40 rounded-full">
        <img src={getAvatar(avatar)} alt="Avatar" className="h-36 w-36 rounded-full" />
        {/* <div className="h-36 w-36 rounded-full bg-neutral-400"></div> */}
      </div>

      {/* user info  */}
      <div className="relative flex flex-col gap-4 text-white text-xl md:text-2xl font-mono bg-[#171717] border-1 border-[#333333]/40 px-2 md:px-8 pt-8 pb-4 rounded-md">
        {/* edit  */}
        <div className="absolute top-4 right-4">
          <div className="w-fit p-2 cursor-pointer rounded-full bg-neutral-800 hover:bg-neutral-600 text-neutral-400">
            <MdModeEditOutline className="h-6 w-6" />
          </div>
        </div>

        {/* Name  */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <span className="text-neutral-400 text-nowrap">Name : </span>
          <span>{username}</span>
        </div>

        {/* Degree  */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <span className="text-neutral-400 text-nowrap">Degree : </span>
          <span>{degree}</span>
        </div>

        {/* Branch  */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <span className="text-neutral-400 text-nowrap">Branch : </span>

          <span>{branch ?? "Not Available"}</span>
        </div>

        {/* Year of passing out  */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <span className="text-neutral-400 text-wrap">
            Year of Passing Out :{" "}
          </span>

          <span>{yearOfPassingOut}</span>
        </div>

        {/* socials  */}
        <div className="flex justify-end">
          <div className="text-neutral-400 flex gap-6">
            <span className="hover:text-blue-500 hover:scale-125 transition-all duration-200 ease-in cursor-pointer">
              <a href={`${xHandle ?? "#"}`} target="_blank"  rel="noopener noreferrer">
                <FaXTwitter className="h-6 w-6" />
              </a>
            </span>
            <span className="hover:text-blue-500 hover:scale-125 transition-all duration-200 ease-in cursor-pointer">
              <a href={`${linkedIn ?? "#"}`} target="_blank"  rel="noopener noreferrer">
                <FaLinkedin className="h-6 w-6" />
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
