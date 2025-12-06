// Homepage UI
import { useState } from "react";
import Cookies from "js-cookie";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import "./css/StudyGuide.css";


export default function Main() {
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateStudyGuide() {
    if (!notes.trim()) {
      alert("Please enter your notes."); // Switch to toast notification later
      return;
    }

    const learningStyle = Cookies.get("learningStyle");

    if (!learningStyle) {
      alert("Please take the quiz first so we know your learning style."); // Switch to toast notification if you have time
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/study/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: notes,
          learningStyle: learningStyle,
        }),
      });

      const data = await response.json();

      setResult(data.output);
    } catch (error) {
      console.error("Error generating study guide:", error);
      alert("Something went wrong."); // toast this
    }

    setLoading(false);
  }

  return (
    <div style={{ padding: "20px" }}>

      <h1 className = "text-center font-bold text-4xl mb-5">StudySense</h1>

      {/* Test Server Connection Button */}
      <div className = 'flex justify-center mb-4'>
        <button
        className = "py-2 px-4 hover:bg-gray-500 text-white rounded-4xl cursor-pointer"
        onClick={async () => {
          const res = await fetch("http://localhost:3001/test");
          const text = await res.text();
          alert("Server responded: " + text);
        }}>
          Test Server Connection
        </button>
      </div>

      {/* Take or Retake Quiz Button */}
      <div className = "flex justify-center mb-4">
        <a 
        href="/quiz"
        className = "py-2 px-4 hover:bg-gray-500 text-white rounded-4xl"
        >
          Take or Retake Quiz
        </a>
      </div>

      {/* Instructions */}
      <div className = "flex justify-left pl-2 mb-4">
        <p>
          Enter your notes below and click “Generate Study Guide” to
          receive tailored content based on your learning style.
        </p>
      </div>

      {/* Notes Input Area */}
      <textarea
        placeholder="Paste your notes here..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        style={{
          width: "100%",
          height: "200px",
          padding: "10px",
          marginBottom: "10px",
          resize:"none",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />

      {/* Clear Notes Button */}
      <div className = "flex justify-center">
        <button
          className="py-2 px-4 hover:bg-gray-500 text-white rounded-4xl cursor-pointer"
          onClick={() => setNotes("")}
        >
          Clear Notes
        </button>
      </div>

      {/* Generate Study Guide Button */}
      <div className = "flex justify-left">
        <button className = "py-2 px-4 hover:bg-gray-500 text-white rounded-4xl cursor-pointer" onClick={generateStudyGuide} disabled={loading}>
          {loading ? "Generating..." : "Generate Study Guide"}
        </button>
      </div>

      {/* Display Result */}
      {result && (
        <div
          style={{
            marginTop: "30px",
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            whiteSpace: "pre-wrap",
          }}
        >
          <h2>Your Study Guide:</h2>

          <div className="study-guide">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {result}
            </ReactMarkdown>
          </div>

        </div>
      )}
    </div>
  );
}