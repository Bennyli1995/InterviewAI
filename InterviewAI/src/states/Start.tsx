import logo from "../resources/beaverLogo.png";

export function Start(props) {
  const { setCurrentState, setQuestion } = props;

  const handleRandomClick = () => {
    // Code to generate random question goes here
    const questions = [
      "What is your biggest weakness?",
      "Tell me about a time where you had to face criticism",
      "Tell me about a time where you had to make a decision with limited data",
      "Tell me about a time where you had to explain a concept to someone who had less experience in the topic",
      "Tell me about a time where you had a conflict with another teammember",
    ];
    setQuestion(questions[Math.trunc(Math.random() * questions.length)]);
    setCurrentState("respond");
  };

  const handleCustomClick = () => {
    setCurrentState("respond");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundImage: `url(${logo})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
      }}
    >
      <p
        style={{
          marginTop: "43%",
        }}
      ></p>
      <button className="button" onClick={handleRandomClick}>
        Start Interview with random generated question
      </button>
      {/* <button onClick={handleCustomClick}>Start Interview with my own question</button> */}
    </div>
  );
}
