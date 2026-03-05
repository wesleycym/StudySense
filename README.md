# StudySense - Personalized Learning Assistent   
*A lightweight, front-end–driven learning style analyzer + AI study companion.*

## Overview
**StudySense** is a web application that adapts study material to a user’s preferred learning style using a simple BuzzFeed-style quiz and lightweight client-side processing. Instead of requiring a backend database, the user’s learning style is stored in a browser cookie and attached to prompts for personalized AI responses.

The project emphasizes:
- Clean front-end architecture
- Stateless design (no backend DB)
- Separation of logic and UI
- Minimal API surface
- Fast, repeatable testing
- Maintainable component structure

## Features
### Learning Style Quiz
A short, interactive quiz determines the user's learning style (e.g., Visual, Auditory, Read/Write, Kinesthetic). The result is stored as a cookie for future sessions.

### Cookie-Driven Personalization
No database needed.   
The browser stores:
```
studyStyle=visual | auditory | readwrite | kinesthetic
```   
Cookies are automatically attached to requests to the StudySense API.

### AI-Powered Study Assistant
Users can input any prompt (e.g., "Explain binary search") adn StudySense reshapes the response based on their learning style.   

Examples:
- Visual learners: diagrams, flowcharts, bullet structures
- Auditory learners: step-by-step explanations, analogies
- Read/Write learners: structured notes, definitions, examples
- Kinesthetic learners: mini-exercises, practice prompts

### Modular Frontend Architecture
- Reusable component system
- Clean separation between UI, quiz logic, and API functions
- Easily extendable for more learning styles or quiz questions.


## Testing commands   
### Terminal 1   
1) cd backend
2) node server.js   
### Terminal 2
1) cd frontend   
2) npm run dev   