import Card from "@/components/common/Card";
import { Accordion } from "@/components/ui/accordion";
import { IoIosAddCircleOutline } from "react-icons/io";
import WhiteButton from "@/components/common/WhiteButton";
import InterviewRound from "./InterviewRound";
import { useInterviewStore } from "@/store/interview";

const InterviewDetails = ({
  setComponentActive,
}: {
  setComponentActive: (x: number) => void;
}) => {
  const interviewRounds = useInterviewStore((state) => state.interviewRounds);
  const addInterviewRound = useInterviewStore(
    (state) => state.addInterviewRound
  );

  return (
    <Card componentStyle="px-4 py-4 sm:py-8 bg-[#171717] border-1 border-[#333333] rounded-md select-none">
      <div>
        {/* title  */}
        <h3 className="text-xl sm:text-2xl md:text-4xl">
          Add Interview Rounds
        </h3>

        {/* round accordion  */}
        <div className="pt-4">
          {interviewRounds.length > 0 ? (
            <Accordion type="single" collapsible>
              {interviewRounds.map((round, index) => {
                return (
                  <InterviewRound
                    key={index}
                    interviewRoundId={round.id}
                    roundNumber={index + 1}
                  />
                );
              })}
            </Accordion>
          ) : (
            <div className="w-full py-4 text-center text-sm md:text-xl">
              Press the 'Add Round' button to add Interview Round.
            </div>
          )}
          <div className="pt-8">
            <WhiteButton
              onClick={() => addInterviewRound()}
              text="Add Round"
              Icon={IoIosAddCircleOutline}
              className="bg-transparent text-neutral-400 hover:text-black"
            />
          </div>
        </div>

        {/* publish button  */}
        <div className="pt-12 w-full flex justify-center">
          <div className="flex flex-row gap-8">
            <WhiteButton
              text="Previous Section"
              onClick={()=>setComponentActive(1)}
              className={`px-2 sm:px-4 py-1.5 text-xs sm:text-xl rounded-sm sm:rounded-lg`}
            />

            <WhiteButton
              disabled={interviewRounds.length == 0}
              onClick={()=>setComponentActive(3)}
              text="Next Section"
              className={`px-2 sm:px-4 py-1.5 text-xs sm:text-xl rounded-sm sm:rounded-lg ${
                interviewRounds.length > 0
                  ? "bg-white"
                  : "bg-white/50 hover:bg-white/50"
              }`}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default InterviewDetails;
