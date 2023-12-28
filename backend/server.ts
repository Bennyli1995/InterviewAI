import express, { Request, Response } from 'express';
import multer from 'multer';
import cors from 'cors';
import { SpeechClient } from '@google-cloud/speech';
import dotenv from 'dotenv';
import OpenAI from 'openai';

// Load environment variables from .env file
dotenv.config();

const speech = require('@google-cloud/speech');

const client = new speech.SpeechClient();

// OpenAI configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const app = express();
const speechClient = new SpeechClient();
const upload = multer({ storage: multer.memoryStorage() });

// Enable CORS and JSON body parsing
app.use(cors());
app.use(express.json());

const interviewQuestions = [
    "Describe a time when you had to adjust to a colleague’s working style in order to complete a project or achieve your objectives.",
    "How do you handle changes in the workplace?",
    "Tell me about a time when you had to explain a complex idea to a client or colleague.",
    "Can you describe an instance where effective communication really paid off for your team?",
    "Describe a situation where you disagreed with a supervisor.",
    "Have you ever had to settle a dispute between team members? How did you go about it?",
    "Give an example of a difficult decision you had to make at work. How did you arrive at your decision?",
    "Describe a time when you had to make a decision without all the information you needed.",
    "Can you provide an example of a time when you had to solve a challenging problem?",
    "Describe a situation where you found a creative way to overcome an obstacle.",
    "Tell me about a time you had to work closely with someone whose personality was very different from yours.",
    "Give an example of a team project that failed. What went wrong?",
    "Describe a long-term project that you managed. How did you keep everything moving along in a timely manner?",
    "Tell me about a time when you went above and beyond the call of duty.",
    "Describe a time when you had to prioritize multiple tasks. How did you organize and schedule them?",
    "How do you manage your time in a project with tight deadlines?",
    "Provide an example of a time when you successfully organized a diverse group of people to accomplish a task.",
    "Have you ever taken the lead on a project? What was the outcome?",
    "Describe a time when you saw a problem and took the initiative to correct it rather than waiting for someone else to do it.",
    "Tell me about a time when you worked under close supervision or extremely loose supervision. How did you handle that?",
    "Describe a time when you were asked to perform a task or project in an area outside your comfort zone.",
    "How do you adjust to changes that you have no control over?",
    "Tell me about a time when you had to deal with a difficult client. How did you handle the situation?",
    "Have you ever had to 'sell' an idea to your coworkers or group? How did you do it?",
    "Describe a time when you set ambitious goals. How did you go about achieving them?",
    "Can you tell me about a time when you improved the performance of an existing process?",
    "Provide an example of a time when your attention to detail prevented a mistake.",
    "Tell me about a project that required high attention to detail.",
    "Describe a time when you were under a lot of pressure at work. How did you handle it?",
    "Give an example of how you handle the stress of tight deadlines."
  ];

// Endpoint to get interview questions
app.get('/questions', (req: Request, res: Response) => {
  res.json({ questions: interviewQuestions });
});

// Endpoint to handle audio transcription
app.post('/transcribe', upload.single('audio'), async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send('No audio file uploaded.');
  }
  console.log(req.file);
  const audioBytes = req.file.buffer.toString('base64');
  const audio = { content: audioBytes };
  const config = {
    encoding: 'WAV',
    sampleRateHertz: 48000,
    languageCode: 'en-US',
    enableWordTimeOffsets: true,
  };
  const request = {
    audio: audio,
    config: config,
  };

  try {
    const [response] = await client.recognize(request);
    console.log(response);
    const transcription = response.results!
      .map((result: any) => result.alternatives[0].transcript)
      .join('\n');
    res.json({ transcript: transcription });
    console.log(transcription);
  } catch (error) {
    console.error('Speech-to-text error:', error);
    res.status(500).send('Error processing the audio file.');
  }
});

// Analyze endpoint
app.post('/analyze', async (req: Request, res: Response) => {
  const { question, answer } = req.body;

  if (!question || !answer) {
    return res.status(400).json({ error: 'Question and answer are required.' });
  }

  try {
    const prompt = `You are the interviewer at a company and you are conducting a behavioural interview. You have a rating system from 0 (weakest response) to 5 (strongest response) with the possibility of 0.5, 1.5, 2.5, 3.5, and 4.5 ratings depending on the interviewee answer. Please provide a json object with only a rating and feedback, including areas of improvement, that addresses the interviewee to this interview question and response
\nQuestion: ${question}
\nAnswer: ${answer}`;

    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt,
      max_tokens: 2000,
    });

    const data = response.choices[0].text;
    // Extracting JSON from the response (assuming the response is in the correct format)
    const feedback = JSON.parse(data.substring(data.indexOf('{')));
    
    res.json(feedback);
  } catch (error) {
    console.error('Error with OpenAI API:', error);
    res.status(500).json({ error: 'Error processing the feedback.' });
  }
});

// Define the port number and start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
