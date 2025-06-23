import { Card } from "../ui/card";

const NoInterviewsAvailableCard = () => {
  return (
    <div className="flex justify-center">
      <Card className="bg-[#171717] w-full max-w-4xl h-56 flex justify-center border-1 border-[#333333] rounded-md select-none">
        <p className="text-xl md:text-3xl text-center text-white">
          Oops...! No Interviews Available.
        </p>
        <p className="text-xs md:text-sm text-neutral-400 text-center">
          Try searching with different keywords or filter tags.
        </p>
      </Card>
    </div>
  );
};

export default NoInterviewsAvailableCard;
