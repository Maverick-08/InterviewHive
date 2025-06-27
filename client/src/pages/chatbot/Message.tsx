const Message = ({
  message,
  sentBy,
}: {
  message: string;
  sentBy: "user" | "llm";
}) => {
  return (
    <div
      className={`flex ${sentBy == "user" ? "justify-end" : "justify-start"}`}
    >
      <span
        className={`w-fit max-w-xs text-wrap py-1 px-2 rounded-md ${
          sentBy == "user" ? "bg-gray-300 text-black" : "bg-neutral-800 text-neutral-400"
        }`}
      >
        {message}
      </span>
    </div>
  );
};

export default Message;
