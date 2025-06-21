import { RiRobot3Line } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { FiSend } from "react-icons/fi";
import { useState } from "react";

const ChatWindow = ({closeChatWindow}:{closeChatWindow:(x:boolean)=>void}) => {
  const [prompt, setPrompt] = useState("");
  return (
    <div className="absolute right-12 bottom-28 h-[60vh] w-[30vw]   bg-[#171717] border border-[#333333] rounded-sm text-white">
      <div className="h-full flex flex-col">
        {/* topbar  */}
        <div className="px-4 py-2 flex justify-between items-center border-b border-[#333333]">
          {/* Icon + text  */}
          <div className="flex gap-4">
            {/* icon  */}
            <div className="text-yellow-500 bg-yellow-500/20 rounded-full p-4">
              <RiRobot3Line className="h-6 w-6" />
            </div>

            {/* text  */}
            <div className="flex flex-col gap-1">
              <p className="text-lg font-semibold">AI Assistant</p>
              <p className="text-sm text-neutral-400">Online</p>
            </div>
          </div>

          {/* close window  */}
          <div onClick={()=>closeChatWindow(false)} className="cursor-pointer text-neutral-400">
            <IoClose className="h-6 w-6" />
          </div>
        </div>

        {/* chat section  */}
        <div className="flex-1"></div>

        {/* send prompt  */}
        <div className="px-2 py-4 gap-4 flex justify-around items-center border-t border-[#333333]">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 h-full focus:outline-none rounded-sm px-4 py-2 border border-[#333333] placeholder:text-neutral-400 text-neutral-500"
          />
          <div className="text-yellow-500 bg-yellow-500/20 p-3 rounded-md">
            <FiSend className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
