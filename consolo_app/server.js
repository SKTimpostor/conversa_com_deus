const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');

dotenv.config();
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1'
});

app.post('/api/consolo', async (req, res) => {
  const { pergunta } = req.body;
  try {
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Você é um conselheiro espiritual que usa a Bíblia para dar consolo e esperança." },
        { role: "user", content: pergunta }
      ]
    });
    res.json({ resposta: completion.choices[0].message.content });
  } catch (error) {
    console.error("Erro da OpenRouter:", error);
    res.status(500).json({ erro: 'Erro ao consultar a OpenRouter' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});