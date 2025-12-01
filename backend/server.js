import express from "express";
import cors from "cors";

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