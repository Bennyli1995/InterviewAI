import logo from "../resources/artificial-intelligence-recruitment.jpg";
import { StartProps } from "../types";
export function Start({ setCurrentState, setQuestion, questions }: StartProps) {
  const handleRandomClick = () => {
    if (questions.length > 0) {
      const randomQuestion =
        questions[Math.floor(Math.random() * questions.length)];
      setQuestion(randomQuestion);
      setCurrentState("respond");
    }
  };

  return (
    <div
      className="flex flex-1 flex-col items-center justify-center min-w-full min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${logo})` }}
    >
      <div className="text-center p-5 bg-white bg-opacity-50 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-4">AI-Generated Interview Prep</h1>
        <p className="mb-6 text-lg">
          Instantaneous feedback on your responses to behavioral interview
          questions.
        </p>
        <button
          onClick={handleRandomClick}
          className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-800 transition duration-300 ease-in-out"
        >
          Start Practicing
        </button>
      </div>
    </div>
  );
}
