import { useState } from "react";
import { BsChatRightText } from "react-icons/bs";
import ChatWindow from "./ChatWindow";

const Chatbot = () => {
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);

  const toggle = () => {
    if (isChatboxOpen) setIsChatboxOpen(false);
    else setIsChatboxOpen(true);
  };

  return (
    <div>
      <div
        onClick={toggle}
        className="flex items-center absolute bottom-8 right-8 p-2 rounded-full cursor-pointer bg-yellow-500 text-black hover:scale-110 transition-all duration-300"
      >
        <BsChatRightText className="size-8" />
      </div>
      {isChatboxOpen && <ChatWindow closeChatWindow={setIsChatboxOpen}/>}
    </div>
  );
};

export default Chatbot;
