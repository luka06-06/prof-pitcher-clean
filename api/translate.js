const cors = require("cors");
require("dotenv").config();
const express = require("express");
const { OpenAI } = require("openai");

const app = express();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(express.json());

app.post("/api/translate", async (req, res) => {
  const { text, type } = req.body;

  const prompt =
    type === "genz"
      ? "Übersetze den folgenden Text in ironische Gen-Z Sprache mit Slang und Emojis."
      : "Erkläre den folgenden Text möglichst einfach und verständlich.";

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: text },
      ],
    });

    const result = response.choices[0].message.content;
    console.log("GPT-Antwort:", result);
    res.json({ result });
  } catch (error) {
    console.error("Fehler bei GPT:", error.message);
    res.status(500).json({ error: "Fehler bei GPT: " + error.message });
  }
});

// Wichtig für Render: Express-App exportieren
module.exports = app;
