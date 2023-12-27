// backend/server.ts
import express, { Request, Response } from 'express';
import multer from 'multer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

// Add this array at the top of your server.ts file
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
  
  app.get('/questions', (req: Request, res: Response) => {
      res.json({ questions: interviewQuestions });
  });
  

app.post('/transcribe', upload.single('audio'), async (req: Request, res: Response) => {
    // Mock transcription logic
    console.log('Received audio file:', req.file);
    res.json({ transcript: 'Transcribed text goes here...' });
});

app.post('/analyze', express.json(), async (req: Request, res: Response) => {
    // Mock analysis logic
    console.log('Received text for analysis:', req.body.transcript);
    res.json({ analysis: 'Analysis results go here...' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
