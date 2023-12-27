import React, { useEffect, useState } from "react";
import { ResultsProps } from "../types";

const Results: React.FC<ResultsProps> = ({
  setCurrentState,
  question,
  userAnswer,
}) => {
  const [feedbackData, setFeedbackData] = useState<{
    rating: number;
    feedback: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchFeedback = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3001/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question, answer: userAnswer }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setFeedbackData(data);
      } catch (error) {
        setError("An error occurred while fetching feedback");
        console.error("Error fetching feedback:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedback();
  }, [question, userAnswer]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-lg p-6 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4">Results</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <>
            <p className="mb-4">
              <span className="font-semibold">Question:</span> {question}
            </p>
            <p className="mb-4">
              <span className="font-semibold">Your Answer:</span> {userAnswer}
            </p>
            {feedbackData && (
              <>
                <p className="mb-4">
                  <span className="font-semibold">Rating:</span>{" "}
                  {"⭐".repeat(feedbackData.rating)}
                </p>
                <p className="mb-4">
                  <span className="font-semibold">Feedback:</span>{" "}
                  {feedbackData.feedback}
                </p>
              </>
            )}
            <button
              onClick={() => setCurrentState("start")}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
            >
              Try Another Question
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Results;
