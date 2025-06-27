const Loading = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="w-8 h-8 border-4 border-white rounded-full border-dotted animate-spin"></div>
      <p className="text-2xl font-mono text-white">Loading</p>
    </div>
  );
};

export default Loading;
