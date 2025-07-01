const NoInterviewsAvailableCard = () => {
  return (
    <div className="w-full h-full">
      <div className="px-2 py-4 flex flex-col items-center rounded-md max-w-3xl mx-auto  border border-white/15 bg-neutral-800">
        <p className="text-xl md:text-2xl lg:text-3xl text-center">
          Oops...! No Interviews Available.
        </p>
        <p className="text-xs md:text-sm text-neutral-400 text-center text-balance">
          Try searching with different keywords or filter tags.
        </p>
      </div>
    </div>
  );
};

export default NoInterviewsAvailableCard;

// <p className="text-xl md:text-3xl text-center text-white">
//   Oops...! No Interviews Available.
// </p>
//
