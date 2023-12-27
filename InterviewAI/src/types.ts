export type PossibleState = "start" | "respond" | "results";

export interface StartProps {
  setCurrentState: (state: PossibleState) => void;
  setQuestion: (question: string) => void;
  questions: string[];
}
