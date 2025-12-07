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
      <h1 className = "text-center font-bold text-4xl mb-5">Learning Style Quiz</h1>

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

      <button onClick={handleSubmit} className = "py-2 px-4 hover:bg-gray-500 text-white rounded-4xl cursor-pointer">
        Submit Quiz
      </button>

      <div className = "flex justify-left ml-4 mt-4 mb-4">
        <a href="/" className = "py-2 px-4 hover:bg-gray-500 text-white rounded-4xl">Back to Main</a>
      </div>
    </div>
  );
}