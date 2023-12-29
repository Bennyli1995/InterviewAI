import React, { useState, useEffect } from "react";
import { Respond } from "./states/Respond";
import Results from "./states/Results";
import Start from "./states/Start";
import { PossibleState } from "./types";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import Footer from "./components/Footer";

function App() {
  const [currentState, setCurrentState] = useState<PossibleState>("hero");
  const [question, setQuestion] = useState<string>("");
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:3001/questions")
      .then((response) => response.json())
      .then((data) => {
        if (data.questions && data.questions.length > 0) {
          setQuestions(data.questions);
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
    <div className="flex flex-col min-h-screen justify-between">
      <Navbar />
      {currentState === "hero" && (
        <>
          <HeroSection setCurrentState={setCurrentState} />
          <FeaturesSection setCurrentState={setCurrentState} />
        </>
      )}
      {currentState === "start" && (
        <Start
          setCurrentState={setCurrentState}
          setQuestion={setQuestion}
          questions={questions}
        />
      )}
      {currentState === "respond" && (
        <Respond
          setCurrentState={setCurrentState}
          question={question}
          setUserAnswer={setUserAnswer}
        />
      )}
      {currentState === "results" && (
        <Results
          setCurrentState={setCurrentState}
          question={question}
          userAnswer={userAnswer}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
