const express = require('express');

const { Configuration, OpenAIApi } = require('openai');

require('dotenv').config();

const app = express();
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post('/api/question', async (req, res) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-002", // Replace with your model
      prompt: req.body.prompt,
      max_tokens: 150,
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
