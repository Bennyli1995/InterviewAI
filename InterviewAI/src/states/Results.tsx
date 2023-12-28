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
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-xl rounded-lg p-6 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-6">Results</h1>
        {isLoading ? (
          <p className="text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-red-600">Error: {error}</p>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-xl font-semibold">Question:</p>
              <p className="text-gray-700">{question}</p>
            </div>
            <div className="mb-6">
              <p className="text-xl font-semibold">Your Answer:</p>
              <p className="text-gray-700">{userAnswer}</p>
            </div>
            {feedbackData && (
              <div className="mb-6">
                <p className="text-xl font-semibold">Rating:</p>
                <div className="flex justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-3xl ${
                        star <= feedbackData.rating
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="mb-6">
              <p className="text-xl font-semibold">Feedback:</p>
              <p className="text-gray-700">{feedbackData.feedback}</p>
            </div>
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
