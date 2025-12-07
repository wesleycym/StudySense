// Quiz page
// Put quiz result into a cookie

// Quiz will be a 'buzzfeed' style quiz, AI will not create custom quizzes for each user -> too much variation

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
    <div className = "p-5">

      <h1 className = "text-center font-bold text-4xl mb-5">Learning Style Quiz</h1>

      {/* Quiz questions */}
      {quizQuestions.map((q, questionIndex) => (
        <div key={questionIndex} className = "mb-6 p-4">
          <h3 className = "text-left font-bold text-xl mb-5">{q.question}</h3>

          {q.options.map((opt, optionIndex) => (
            <label key={optionIndex} className = "block mt-2 pl-5">
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

      {/* Submit button */}
      <div className = "flex justify-left ml-4 mt-4 mb-4">
        <button onClick={handleSubmit} className = "py-2 px-4 hover:bg-gray-500 text-white rounded-4xl cursor-pointer">
          Submit Quiz
        </button>
      </div>

      {/* Back to main */}
      <div className = "flex justify-left ml-4 mt-4 mb-4">
        <a href="/" className = "py-2 px-4 hover:bg-gray-500 text-white rounded-4xl">Back to Main</a>
      </div>
    </div>
  );
}