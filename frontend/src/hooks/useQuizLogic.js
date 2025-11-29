// Helper file:
// Tracks quiz answers
// Checks if all questions answered
// Scores the quiz
// Stores result in a cookie (expires after a long time) [no db needed]
// Sends user back to homepage

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function useQuizLogic(totalQuestions = 10) {
  const navigate = useNavigate();

  const [answers, setAnswers] = useState(Array(totalQuestions).fill("")); // Array of selected answers

  // Used to update answer for a question
  function handleSelect(questionIndex, value) {
    const updated = [...answers];
    updated[questionIndex] = value;
    setAnswers(updated);
  }

  function handleSubmit() {

    // Make sure all questions answered
    if (answers.includes("")) {
      alert("Please answer all questions before submitting.");
      return;
    }

    // Tally up all answers 
    const score = { V: 0, A: 0, R: 0, K: 0 };
    answers.forEach((ans) => {
      score[ans] += 1;
    });

    // Determine the highest-scoring learning style
    let highestStyle = "";
    let highestScore = -1;

    for (const style in score) {
    if (score[style] > highestScore) {
        highestStyle = style;
        highestScore = score[style];
    }
    }
    const result = highestStyle;


    Cookies.set("learningStyle", result, { expires: 30 }); // Create the cookie [expires in 30 days] -> temporary solution for demo purposes

    alert(`Your learning style is: ${result}`); // Switch this to a toast notification when we start designing the UI

    navigate("/"); // Send user back to homepage
  }

  return {
    answers,
    handleSelect,
    handleSubmit,
  };
}