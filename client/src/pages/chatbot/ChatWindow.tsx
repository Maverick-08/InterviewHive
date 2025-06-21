import { RiRobot3Line } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { FiSend } from "react-icons/fi";
import { useState } from "react";
import { usePromptStore } from "@/store/PromptStore";
import Message from "./Message";
import SuggestPrompt from "./SuggestPrompt";

const ChatWindow = ({
  closeChatWindow,
}: {
  closeChatWindow: (x: boolean) => void;
}) => {
  const [prompt, setPrompt] = useState("");
  const addPrompt = usePromptStore((state) => state.addPrompt);
  const clearPromptHistory = usePromptStore((state) => state.clearPrompt);
  const conversation = usePromptStore((state) => state.messages);

  const handlePromptSubmit = () => {
    addPrompt({ message: prompt, sentBy: "user" });
    setPrompt("");
  };

  return (
    <div className="absolute sm:right-12 bottom-28 h-110 w-100 bg-[#171717] border border-[#333333] rounded-md text-white">
      <div className="h-full flex flex-col">
        {/* topbar  */}
        <div className="px-4 py-2 flex justify-between items-center border-b border-[#333333] ">
          {/* Icon + text  */}
          <div className="flex gap-4">
            {/* icon  */}
            <div className="flex items-center text-yellow-500 bg-yellow-500/20 rounded-full p-4">
              <RiRobot3Line className="size-6" />
            </div>

            {/* text  */}
            <div className="flex flex-col">
              <p className="text-lg font-semibold">AI Assistant</p>
              <div className="flex items-center gap-2 ">
                <div className="relative">
                  <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                </div>
                <p className="text-sm text-green-400">Online</p>
              </div>
            </div>
          </div>

          {/* close window  */}
          <div
            onClick={() => {
              closeChatWindow(false);
              clearPromptHistory();
            }}
            className="cursor-pointer text-neutral-400"
          >
            <IoClose className="h-6 w-6" />
          </div>
        </div>

        {/* chat section  */}
        <div className="flex-1 p-2 flex flex-col overflow-y-scroll gap-4">
          {conversation.length == 0 ? (
            <SuggestPrompt/>
          ) : (
            conversation.map((data) => {
              return <Message message={data.message} sentBy={data.sentBy} />;
            })
          )}
        </div>

        {/* send prompt  */}
        <div className="px-2 py-4 gap-4 flex justify-around items-center border-t border-[#333333]">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 h-full focus:outline-none rounded-sm px-4 py-2 border border-[#333333] placeholder:text-neutral-400 text-neutral-400"
          />
          <div
            onClick={handlePromptSubmit}
            className="text-yellow-500 bg-yellow-500/20 p-3 rounded-md"
          >
            <FiSend className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
