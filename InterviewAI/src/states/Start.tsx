import logo from "../resources/artificial-intelligence-recruitment.jpg";

interface StartProps {
  setCurrentState: (state: string) => void;
  setQuestion: (question: string) => void;
  questions: string[];
}

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
      <div className="text-center p-5 bg-white bg-opacity-70 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to the AI Interview Simulator
        </h1>
        <p className="mb-6 text-lg">
          Get ready to practice your interview skills with a variety of
          behavioral questions.
        </p>
        <button
          onClick={handleRandomClick}
          className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-800 transition duration-300 ease-in-out"
        >
          Start Interview with a Random Question
        </button>
      </div>
    </div>
  );
}
