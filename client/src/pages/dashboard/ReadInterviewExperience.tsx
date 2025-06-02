import { useEffect, useState } from "react";

const ReadInterviewExperience = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const Id = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearInterval(Id);
  }, []);

    if (isLoading) {
      return (
        <div className="w-screen h-screen bg-[#111111] flex justify-center items-center gap-2">
          <div className="w-10 h-10 border-4 border-white rounded-full border-dotted animate-spin"></div>
          <p className="text-2xl font-mono text-white">Loading</p>
        </div>
      );
    }

  return (
    <div className="text-white">
      <p>Read Interview Experience</p>
    </div>
  );
};

export default ReadInterviewExperience;
