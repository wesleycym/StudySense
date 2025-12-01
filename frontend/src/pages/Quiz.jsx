// Quiz page
// Put quiz result into a cookie

// Quiz will be a 'buzzfeed' style quiz, AI will not be involved for this portion

/*
  10 questions with 4 options each. Each option corresponds to a different learning type

  V -> Visual
  A -> Auditory
  R -> Reading/Writing
  K -> Kinesthetic

*/

import quizQuestions from "../data/quizQuestions";
import useQuizLogic from "../hooks/useQuizLogic";

export default function Quiz() {
  const { answers, handleSelect, handleSubmit } = useQuizLogic(quizQuestions.length);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Learning Style Quiz</h1>

      {quizQuestions.map((q, questionIndex) => (
        <div key={questionIndex} style={{ marginBottom: "20px" }}>
          <h3>{q.question}</h3>

          {q.options.map((opt, optionIndex) => (
            <label key={optionIndex} style={{ display: "block", marginBottom: "5px" }}>
              <input
                type="radio"
                name={`q${questionIndex}`}  // each question is grouped
                value={opt.value}
                checked={answers[questionIndex] === opt.value}
                onChange={() => handleSelect(questionIndex, opt.value)}
              />
              {" "}{opt.label}
            </label>
          ))}
        </div>
      ))}

      <button onClick={handleSubmit} style={{ marginTop: "20px" }}>
        Submit Quiz
      </button>

      <div style={{ marginTop: "15px" }}>
        <a href="/">Back to Main</a>
      </div>
    </div>
  );
}