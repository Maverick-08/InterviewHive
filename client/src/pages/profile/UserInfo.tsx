import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { MdModeEditOutline } from "react-icons/md";
import Doodle from "../../assets/doodle.png";

const UserInfo = () => {
  return (
    <div className="w-full max-w-4xl  px-4 flex gap-12 flex-col lg:flex-row md:justify-between items-center ">
      {/* profile image  */}
      <div className="p-1 bg-neutral-400/40 rounded-full">
        <img src={Doodle} alt="" className="h-36 w-36 rounded-full" />
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
          <span>Vivek Ojha</span>
        </div>

        {/* Degree  */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <span className="text-neutral-400 text-nowrap">Degree : </span>
          <span>Bachelor of Technology (BTech)</span>
        </div>

        {/* Branch  */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <span className="text-neutral-400 text-nowrap">Branch : </span>

          <span>Computer Science & Engineering (CSE)</span>
        </div>

        {/* Year of passing out  */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <span className="text-neutral-400 text-wrap">
            Year of Passing Out :{" "}
          </span>

          <span>2026</span>
        </div>

        {/* socials  */}
        <div className="flex justify-end">
          <div className="text-neutral-400 flex gap-6">
            <span className="hover:text-blue-500 hover:scale-125 transition-all duration-200 ease-in cursor-pointer">
              <FaXTwitter className="h-6 w-6" />
            </span>
            <span className="hover:text-blue-500 hover:scale-125 transition-all duration-200 ease-in cursor-pointer">
              <FaLinkedin className="h-6 w-6" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
