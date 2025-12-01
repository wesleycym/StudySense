// Array of quiz questions and options

// Used AI to generate question based on learning style. Will not use AI to create custom quizes for each user. Too much variation 

const quizQuestions = [
  {
    question: "1. When learning a new topic, what helps you the most?",
    options: [
      { label: "Charts or diagrams", value: "V" },
      { label: "Someone explaining it aloud", value: "A" },
      { label: "Reading a detailed explanation", value: "R" },
      { label: "Doing a hands-on example", value: "K" },
    ],
  },
  {
    question: "2. When studying for a test, what method do you prefer?",
    options: [
      { label: "Highlighting visuals or slides", value: "V" },
      { label: "Listening to a review or video", value: "A" },
      { label: "Rewriting my notes", value: "R" },
      { label: "Practice problems or flashcards", value: "K" },
    ],
  },
  {
    question: "3. How do you best remember information?",
    options: [
      { label: "By seeing it", value: "V" },
      { label: "By hearing it", value: "A" },
      { label: "By writing it down", value: "R" },
      { label: "By doing it", value: "K" },
    ],
  },
  {
    question: "4. When someone gives you directions, what works best?",
    options: [
      { label: "A map or visual reference", value: "V" },
      { label: "Verbal instructions", value: "A" },
      { label: "Written steps", value: "R" },
      { label: "Walking the route", value: "K" },
    ],
  },
  {
    question: "5. In a classroom, what helps you stay focused?",
    options: [
      { label: "Seeing visuals on the board", value: "V" },
      { label: "Listening to the lecture", value: "A" },
      { label: "Taking notes", value: "R" },
      { label: "Hands-on activities", value: "K" },
    ],
  },
  {
    question: "6. When solving a problem, how do you approach it?",
    options: [
      { label: "Draw it out", value: "V" },
      { label: "Talk through it out loud", value: "A" },
      { label: "Read similar examples", value: "R" },
      { label: "Experiment physically", value: "K" },
    ],
  },
  {
    question: "7. What kind of content do you enjoy most?",
    options: [
      { label: "Infographics, diagrams", value: "V" },
      { label: "Podcasts, discussions", value: "A" },
      { label: "Articles and books", value: "R" },
      { label: "Interactive simulations", value: "K" },
    ],
  },
  {
    question: "8. What do you do when you don’t understand something?",
    options: [
      { label: "Look for a picture to explain it", value: "V" },
      { label: "Ask someone to explain it verbally", value: "A" },
      { label: "Search for written explanations", value: "R" },
      { label: "Try to physically apply it", value: "K" },
    ],
  },
  {
    question: "9. What study method feels most natural to you?",
    options: [
      { label: "Drawing mind maps", value: "V" },
      { label: "Speaking or listening aloud", value: "A" },
      { label: "Re-reading notes", value: "R" },
      { label: "Doing practice problems", value: "K" },
    ],
  },
  {
    question: "10. Pick the tool you'd choose first when learning something new:",
    options: [
      { label: "Flowchart", value: "V" },
      { label: "Audio lecture", value: "A" },
      { label: "Textbook", value: "R" },
      { label: "Lab experiment", value: "K" },
    ],
  },
];

export default quizQuestions;