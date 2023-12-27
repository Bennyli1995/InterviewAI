import { useEffect, useState } from "react";

export function Results(props) {
  const [apiResponse, setapiResponse] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [rating, setRating] = useState();
  const [debug, setDebug] = useState(false);

  //feedback, rating

  useEffect(() => {
    (async function () {
      const response = await props.openai.createCompletion({
        model: "text-davinci-003",
        prompt: `You are the interviewer at a company and you are conducting a behavioural interview. You have a rating system from 0 (weakest response) to 5 (strongest response) with the possibility of 0.5, 1.5, 2.5, 3.5, and 4.5 ratings depending on the interviewee answer. Please provide a json object with only a rating and feedback, including areas of improvement, that addresses the interviewee to this interview question and response
              \n Question: ${props.question}
              \n Answer: ${props.userAnswer}`,
        temperature: 0,
        max_tokens: 2000,
      });

      setapiResponse(response.data.choices[0].text);

      console.log(response);
      console.log(response.data.choices[0].text);
      console.log("the parsed jsonObject is below");
      try {
        const responseText = response.data.choices[0].text;
        const secondHalfString = responseText.split("{")[1];
        const fixedString = "{" + secondHalfString;
        // console.log("the response", ;
        const jsonObject = JSON.parse(fixedString);
        console.log("jsonObject");
        console.log(jsonObject);
        setRating(jsonObject.rating);
        setFeedback(jsonObject.feedback);
      } catch {}
    })();
  }, []);

  return (
    <div>
      <p className="text-3xl">Results</p>
      <br></br>
      <p>Question: {props.question}</p>
      <br></br>
      {/* <p>this is the results page component</p> */}
      {/* <p>{rating}</p> */}
      <p>Rating: {"⭐".repeat(Math.trunc(parseInt(rating)))}</p>
      <br></br>
      <p>Feedback: {feedback}</p>
      <br></br>
      <p>Your transcribed answer: {props.userAnswer}</p>
      <br></br>
      <button
        onClick={() => {
          setDebug(!debug);
        }}
      >
        {debug ? "hide debug data" : "show debug data"}
      </button>
      {debug ? <p>{apiResponse}</p> : <></>}
    </div>
  );
}
