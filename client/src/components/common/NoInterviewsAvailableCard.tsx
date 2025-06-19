import { Card } from "../ui/card";

const NoInterviewsAvailableCard = () => {
  return (
    <Card>
      <div className="w-full max-w-2xl py-8 px-2 flex flex-col justify-center items-center gap-4 bg-[#171717] border-1 border-[#333333] rounded-md select-none">
        <p className="text-xl md:text-3xl text-center">
          Oops...! No Interviews Available.
        </p>
        <p className="text-xs md:text-sm text-neutral-400 text-center">
          Try searching with different keywords or filter tags.
        </p>
      </div>
    </Card>
  );
};

export default NoInterviewsAvailableCard;
