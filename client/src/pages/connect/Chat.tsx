import ComingSoon from "../../assets/ComingSoon.png";

const Chat = () => {
  return (
    <div className="w-full max-w-6xl h-screen flex flex-col gap-4 justify-center items-center">
      <img src={ComingSoon} alt="" className="w-80 h-80"/>
      <p className="text-xl sm:text-4xl font-mono text-white">Currently In Development</p>
    </div>
  )
}

export default Chat
