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
        className={`max-w-[70%] py-1 px-2 rounded-md ${
          sentBy == "user" ? "bg-[#333333]" : "bg-neutral-200"
        }`}
      >
        {message}
      </span>
    </div>
  );
};

export default Message;
