import type { AddRound, DeleteRound, AddRoundQuestion, DeleteRoundQuestion } from "@/types";
import { v4 as uuid } from "uuid";

export const addRound = ({roundIds,setRoundIds}:AddRound) => {
  const newRoundId = "" + uuid();
  setRoundIds([...roundIds, newRoundId]);
};

export const deleteRound = ({roundId,roundIds,setRoundIds}:DeleteRound) => {
  const newRoundIds = roundIds.filter(
    (currentRound) => currentRound != roundId
  );
  setRoundIds(newRoundIds);
};

export const addQuestion = ({questionIds, setQuestionIds}:AddRoundQuestion) => {
    const newQuestionId = "" + uuid();
    setQuestionIds([...questionIds,newQuestionId]);
}

export const deleteQuestion = ({questionId,questionIds,setQuestionIds}:DeleteRoundQuestion) => {
  const newRoundIds = questionIds.filter(
    (currentRound) => currentRound != questionId
  );
  setQuestionIds(newRoundIds);
};