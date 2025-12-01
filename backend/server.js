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

// STUDY route (basic placeholder)
app.post("/study/generate", (req, res) => {
  const { text, learningStyle } = req.body;

// Debug logs
console.log("Received request:"); console.log("Text:", text); console.log("Learning Style:", learningStyle);

  // Placeholder
res.json({
    output: `Placeholder study guide for ${learningStyle} based on: ${text}`,
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});