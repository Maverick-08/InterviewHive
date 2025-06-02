import Logo from "../../assets/logo.png"

const InfoComponent = () => {
  return (
    <div className="flex flex-col justify-center gap-4 font-mono text-white text-center selection:bg-neutral-300 selection:text-neutral-900">
      <div className="flex justify-center items-center gap-2">
        <img src={Logo} alt="" className="h-10 w-10"/>
        <p className="text-4xl">Interview Hive</p>
      </div>
      <div className="text-xl tracking-wide space-y-2">
        <p>Welcome back to the realm of preparation.</p>
        <p>Keep preparing and practising until you land your dream offer.</p>
      </div>
    </div>
  )
}

export default InfoComponent
