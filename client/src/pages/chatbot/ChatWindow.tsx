import { RiRobot3Line } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { FiSend } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useLoadResponseStore, usePromptStore } from "@/store/PromptStore";
import Message from "./Message";
import SuggestPrompt from "./SuggestPrompt";
import { postFunction } from "@/utils/axiosRequest";
import LoadingAnimation from "./LoadingAnimation";

const ChatWindow = ({
  closeChatWindow,
}: {
  closeChatWindow: (x: boolean) => void;
}) => {
  const [prompt, setPrompt] = useState("");

  const addPrompt = usePromptStore((state) => state.addPrompt);
  const clearPromptHistory = usePromptStore((state) => state.clearPrompt);
  const conversation = usePromptStore((state) => state.messages);
  const isResponseLoading = useLoadResponseStore(
    (state) => state.isResponseLoading
  );
  const loadResponse = useLoadResponseStore((state) => state.loadResponse);

  useEffect(()=>{
    clearPromptHistory();
  },[clearPromptHistory])

  useEffect(() => {
    const fetch = async () => {
      const query = conversation.at(-1)?.message;
      const response = await postFunction("/api/chatbot",{query});
      loadResponse(false);
      addPrompt({message:response.data,sentBy:'llm'});
    }
    if(isResponseLoading){
      fetch();
    }
  }, [conversation,addPrompt,loadResponse,isResponseLoading]);

  const handlePromptSubmit = () => {
    addPrompt({ message: prompt, sentBy: "user" });
    setPrompt("");
    loadResponse(true);
  };

  return (
    <div className="absolute h-[95vh] w-full bottom-0 right-0 md:h-[85vh] md:w-[40%] md:bottom-4 md:right-4 lg:w-[30%] rounded-xl border border-white/20 bg-[#171717] text-white">
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
        <div className="flex-1 p-2 flex flex-col overflow-y-scroll gap-4 ">
          {conversation.length == 0 ? (
            <SuggestPrompt />
          ) : (
            conversation.map((data) => {
              return <Message message={data.message} sentBy={data.sentBy} />;
            })
          )}
        </div>

        {isResponseLoading && <LoadingAnimation />}

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
            aria-disabled={isResponseLoading}
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
