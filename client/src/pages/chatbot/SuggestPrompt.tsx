import { useLoadResponseStore, usePromptStore } from "@/store/PromptStore";

const SuggestPrompt = () => {
  const addQuery = usePromptStore((state) => state.addPrompt);
  const loadResponse = useLoadResponseStore(state=>state.loadResponse)

  const handlePrompt = (topic: string) => {
    addQuery({
      message: topic,
      sentBy: "user",
    });
    loadResponse(true);
  };

  return (
    <div className="p-2 text-md text-white/70">
      <div className="">
        <p>Hii There! 👋</p>
        <p>Worried about what to search ? Try these prompts...</p>
      </div>
      <div className="mt-2 grid text-md gap-4">
        <div
          onClick={() => handlePrompt("Operating System Questions")}
          className="px-3 rounded-full bg-blue-500/20 text-blue-500 border border-blue-500/30 w-fit"
        >
          Operating System Questions
        </div>

        <div
          onClick={() => handlePrompt("Top 10 DBMS Questions")}
          className="px-3 rounded-full bg-fuchsia-400/20 text-fuchsia-500 border border-fuchsia-400/30 w-fit"
        >
          Top 10 DBMS Questions
        </div>

        <div
          onClick={() => handlePrompt("DSA Questions")}
          className="px-3 rounded-full bg-teal-400/20 text-teal-500 border border-teal-400/30 w-fit"
        >
          DSA Questions
        </div>

        <div
          onClick={() => handlePrompt("Interview Preparation")}
          className="px-3 rounded-full bg-rose-400/20 text-rose-500 border border-rose-400/30 w-fit"
        >
          Interview Preparation
        </div>
      </div>
    </div>
  );
};

export default SuggestPrompt;
