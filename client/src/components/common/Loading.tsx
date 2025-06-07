const Loading = () => {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 border-4 border-white rounded-full border-dotted animate-spin"></div>
      <p className="text-2xl font-mono text-white">Loading</p>
    </div>
  );
};

export default Loading;
