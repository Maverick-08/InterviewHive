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
        className="absolute bottom-8 right-8 p-4 rounded-full cursor-pointer bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/40 hover:scale-110 transition-all duration-300"
      >
        <BsChatRightText className="h-8 w-8" />
      </div>
      {isChatboxOpen && <ChatWindow closeChatWindow={setIsChatboxOpen}/>}
    </div>
  );
};

export default Chatbot;
