import logo from "../resources/background.png";
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
    <div className="flex flex-1 flex-col items-center justify-center bg-cover bg-center">
      <div className="text-center p-12 bg-purple-600 bg-opacity-60 rounded-lg shadow-xl max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">
          AI-Generated Behavioural Interview Prep
        </h1>
        <p className="mb-6 text-lg">
          Get instantaneous feedback on your responses to behavioral interview
          questions.
        </p>
        <div className="mb-6 text-left">
          <h2 className="text-2xl font-semibold mb-3">
            Ace Your Interview with the STAR Method:
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Situation:</strong> Set the scene and give the necessary
              details of your example.
            </li>
            <li>
              <strong>Task:</strong> Describe what your responsibility was in
              that situation.
            </li>
            <li>
              <strong>Action:</strong> Explain exactly what steps you took to
              address it.
            </li>
            <li>
              <strong>Result:</strong> Share what outcomes your actions
              achieved.
            </li>
          </ul>
        </div>
        <button
          onClick={handleRandomClick}
          className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
        >
          Start Practicing
        </button>
      </div>
    </div>
  );
}

export default Start;
