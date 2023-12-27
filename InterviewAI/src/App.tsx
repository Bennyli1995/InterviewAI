import { useState, useEffect } from "react";
import { Respond } from "./states/Respond";
import { Results } from "./states/Results";
import { Start } from "./states/Start";
import { PossibleState } from "./types";

function App() {
  const [currentState, setCurrentState] = useState<PossibleState>("start");
  const [question, setQuestion] = useState<string>("");
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [feedback, setFeedback] = useState<object>({});
  const [questions, setQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:3001/questions")
      .then((response) => response.json())
      .then((data) => {
        if (data.questions && data.questions.length > 0) {
          setQuestions(data.questions);
          setQuestion(data.questions[0]); // Set a default question
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching questions:", err);
        setError("Failed to fetch questions");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div>
        {currentState === "start" && (
          <Start
            setCurrentState={setCurrentState}
            setQuestion={setQuestion}
            questions={questions} // Pass the list of questions
          />
        )}
        {/* {currentState === "respond" && (
          <Respond
            setCurrentState={setCurrentState}
            question={question}
            setUserAnswer={setUserAnswer}
            setFeedback={setFeedback}
          />
        )}
        {currentState === "results" && (
          <Results
            setCurrentState={setCurrentState}
            question={question}
            userAnswer={userAnswer}
            feedback={feedback}
          />
        )} */}
      </div>
    </div>
  );
}

export default App;
