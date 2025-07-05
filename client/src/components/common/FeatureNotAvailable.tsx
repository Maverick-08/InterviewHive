const FeatureNotAvailable = () => {
  return (
    <div className="w-full h-[60vh] flex flex-col justify-center items-center gap-4">
      <p className="text-sm sm:text-xl text-center text-balance">
        This Feature is not accessible in mobile phones.
      </p>
    </div>
  );
};

export default FeatureNotAvailable;
