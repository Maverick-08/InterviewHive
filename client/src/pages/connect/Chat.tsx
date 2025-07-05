import ComingSoon from "../../assets/ComingSoon.png";

const Chat = () => {
  return (
    <div className="h-[70vh] flex flex-col gap-8 justify-center items-center">
      <img src={ComingSoon} className="h-32 w-32 md:h-64 md:w-64 rounded-lg"/>
      <p className="text-lg sm:text-xl text-balance">Currently in Development</p>
    </div>
  );
};

export default Chat;
