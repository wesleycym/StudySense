import express from "express";
import cors from "cors";

// --- OpenAI Setup ---
import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";
import { stylePrompts } from "./prompts.js";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// TEST route
app.get("/test", (req, res) => {
  res.send("Backend is running!");
});

// STUDY route — OpenAI version
app.post("/study/generate", async (req, res) => {
  try {
    const { text, learningStyle } = req.body;

    if (!text || !learningStyle) {
      return res.status(400).json({ error: "Missing text or learningStyle" });
    }

    const chosenPrompt = stylePrompts[learningStyle];

    const fullPrompt = `
${chosenPrompt}

Rewrite the following notes specifically for this learning style:

${text}
    `;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: fullPrompt }],
    });

    res.json({ output: completion.choices[0].message.content });

  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ error: "Failed to generate study guide" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});