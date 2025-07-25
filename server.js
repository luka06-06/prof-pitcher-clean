const express = require("express");
const path = require("path");
const cors = require("cors");
const { OpenAI } = require("openai");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// 💡 Statische Dateien aus /public bereitstellen
app.use(express.static(path.join(__dirname, "public")));

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/api/translate", async (req, res) => {
  const { text, type } = req.body;

  const prompt = type === "genz"
    ? "Übersetze den folgenden Text in echten GenZ Slang wie er auch in echt verwendet wird mit Digga, Bro, Hell nah, lost, wild, cringe, real talk, dem TotenkopfEmoji.Der Ton kann bisschen frech sein"
    : "Erkläre den folgenden Text möglichst einfach und verständlich.";

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: text },
      ],
    });

    res.json({ result: response.choices[0].message.content });
  } catch (error) {
    console.error("Fehler:", error.message);
    res.status(500).json({ error: "Fehler beim Übersetzen." });
  }
});

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
