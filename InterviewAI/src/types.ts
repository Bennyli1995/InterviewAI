export type PossibleState = "start" | "respond" | "results";

export interface StartProps {
  setCurrentState: (state: PossibleState) => void;
  setQuestion: (question: string) => void;
  questions: string[];
}

export interface RespondProps {
  setCurrentState: (state: string) => void;
  question: string;
  setUserAnswer: (answer: string) => void;
  setFeedback: (feedback: object) => void;
}
