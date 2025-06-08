import Card from "@/components/common/Card";
import { Accordion } from "@/components/ui/accordion";
import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import WhiteButton from "@/components/common/WhiteButton";
import { addRound } from "./utils";
import InterviewRound from "./InterviewRound";

const WriteExperienceDetails = () => {
  const [roundIds, setRoundIds] = useState<string[]>([]);

  return (
    <Card componentStyle="px-4 py-4 sm:py-8 bg-[#171717] border-1 border-[#333333] rounded-md select-none">
      <div>
        {/* title  */}
        <h3 className="text-xl sm:text-2xl md:text-4xl">
          Add Interview Rounds
        </h3>

        {/* round accordion  */}
        <div className="pt-4">
          {roundIds.length > 0 ? (
            <Accordion type="single" collapsible>
              {roundIds.map((round, index) => {
                return (
                  <InterviewRound
                    key={round}
                    roundId={round}
                    roundIds={roundIds}
                    roundNumber={index + 1}
                    setRoundIds={setRoundIds}
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
              onClick={() => addRound({ roundIds, setRoundIds })}
              text="Add Round"
              Icon={IoIosAddCircleOutline}
              className="bg-transparent text-neutral-400 hover:text-black"
            />
          </div>
        </div>

        {/* publish button  */}
        <div className="pt-12 w-full flex justify-center">
          <WhiteButton disabled={roundIds.length == 0} text="Share" className={`w-full max-w-lg text-xl ${roundIds.length > 0 ? 'bg-white' : 'bg-white/50 hover:bg-white/50'}`}/>
        </div>
      </div>
    </Card>
  );
};

export default WriteExperienceDetails;
