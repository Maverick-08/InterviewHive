import Loading from "@/components/common/Loading";
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
    return <Loading />;
  }

  return (
    <div className="w-full min-h-screen max-w-7xl px-8 lg:px-20 text-white">
      <div className="h-full border">
        <p>Content</p>
      </div>
    </div>
  );
};

export default ReadInterviewExperience;
