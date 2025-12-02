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

// Input sanitization function
function sanitizeInput(raw) {
  if (!raw) return "";

  return raw
    .replace(/<\/?[^>]+(>|$)/g, "") // Remove html tags
    .replace(/\s+/g, " ")           // Normalize whitespace
    .trim();
}

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// TEST route
app.get("/test", (req, res) => {
  res.send("Backend is running!");
});

// STUDY route -> generated study guides
app.post("/study/generate", async (req, res) => {
  try {
    const { text, learningStyle } = req.body;

    if (!text || !learningStyle) {
      return res.status(400).json({ error: "Missing text or learningStyle" });
    }

    const cleanText = sanitizeInput(text); // Clean the input
    if (cleanText.length < 5) { return res.status(400).json({ error: "Input is too short." });} // Check for min length
    if (cleanText.length > 15000) {return res.status(400).json({ error: "Input too long. Please shorten your notes." });} // Check for max length

    const chosenPrompt = stylePrompts[learningStyle];

    const fullPrompt = `
${chosenPrompt}

Rewrite the following notes specifically for this learning style:

${cleanText}
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