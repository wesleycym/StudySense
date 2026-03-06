# StudySense - Personalized Learning Assistent   
*A full-stack adaptive learning platform powered by React, Express, and OpenAI.*

## Overview
**StudySense** is a full-stack web application that generates personalized study guides based on a user's learning style. The app uses a BuzzFeed-style quiz to determine the learner’s VARK profile, stores that preference in a browser cookie, and uses it to shape AI-generated study material.

The project emphasizes:
- Clean front-end architecture
- Secure backend proxy design
- Modular prompt engine (Visual / Auditory / Reading/Writing / Kinesthetic)
- Maintainable component structure

## Features
### Learning Style Quiz
A short, interactive quiz determines the user's preferred learning style (Visual, Auditory, Read/Write, or Kinesthetic).   
The result is stored as a cookie:
```
learningStyle=V | A | R | K
```
This allows StudySense to automatically personalize future study guides.

### Cookie-Driven Personalization
Instead of using a database, StudySense stores the learning-style preference directly in the browser.   

Every request to the backend includes:
- The user’s notes
- Their learning style

This keeps the system lightweight while still offering dynamic personalization.

### AI-Powered Study Assistant
Users paste their notes into the UI, and StudySense transforms them into a tailored study guide using OpenAI’s API.

Examples:
- **Visual learners**: diagrams, flowcharts, bullet structures
- **Auditory learners**: step-by-step explanations, analogies
- **Read/Write learners**: structured notes, definitions, examples
- **Kinesthetic learners**: mini-exercises, practice prompts

### Backend with Secure OpenAI Proxy
To keep the API key safe, **all LLM requests** go through an Express backend.   
The backend handles:
- Input validation
- Cleaning and sanitizing user notes
- Selecting the correct prompt template
- Constructing the final LLM prompt
- Returning clean markdown to the frontend


### Modular Frontend Architecture
The frontend is built with Reacts and cleanly separates:
- UI Components
- Quiz logic
- Cookie management
- API communication
- Study guide rendering

## Backend (Express & OpenAI)
The backend serves as a **secure API proxy**, keeping the OpenAI key hidden and applying consistent formatting + sanitization rules.

**Key Responsibilities:**   
- Validate incoming requests
- Sanitize user-provided notes
- Select correct VARK prompt template
- Construct the instruction for the LLM
- Forward request to OpenAI's Chat Completions API
- Normalize markdown output
- Return generated study guide to frontend

### Input Sanitization
Before sending notes to teh LLM, input is cleaned to avoid: 
- HTML injection
- Control characters
- Accidental markdown headers
- Runaway whitespace 
- Excessive repeated characters
- Spoofed ``[BEGIN_NOTES]`` or ``[END_NOTES]``

**Sanitization Function:**   
```
function sanitizeInput(raw) {
  return raw
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/\s+/g, " ")
    .replace(/[\x00-\x1F\x7F]/g, "")
    .replace(/^#+\s*/gm, "")
    .replace(/[-]{3,}/g, "")
    .replace(/(.)\1{5,}/g, "$1$1")
    .replace(/\[BEGIN_NOTES\]/g, "")
    .replace(/\[END_NOTES\]/g, "")
    .trim();
}
```
Sanitizing input prevents malformed prompts, injection attempts, and formatting artifacts.

### Prompt Engine (**prompt.js**)
Different learners require different types of explanations.   
StudySense uses four prompt templates aligned with the VARK learning model:

**V — Visual Learners:**   
Emphasizes diagrams, flowcharts, spatial structure.

**A — Auditory Learners:**  
Uses conversational tone, verbal explanations, narrated steps.

**R — Reading/Writing Learners:**   
Focuses on structured paragraphs, rewritten definitions, bullet lists.

**K — Kinesthetic Learners:**   
Encourages hands-on steps, experiments, and physical analogies.   

Each template enforces:
- No adding new information
- No solving homework questions
- Only rewriting notes between ``[BEGIN_NOTES]`` and ``[END_NOTES]``
- Compact spacing
- Controlled markdown formatting

This ensures stable, predictable behavior across all prompts.

## Frontend (React)
The frontend provides:

### Clean UI for Input
A text area for notes, styled interactively, with:
-Controlled component state
-Clear and reset buttons
-Loading indicators
-Markdown rendering panel

### Quiz System
Identifies learning style and writes cookie:   
```learningStyle=V | A | R | K```   

### Study Guide Generation Flow
1. User pastes notes.
2. Learning style is read from the cookie.
3. Frontend POSTs to backend:
```
await fetch("http://localhost:3001/study/generate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ text: notes, learningStyle }),
});
```
4. Backend returns markdown.
5. UI renders with ``react-markdown`` & ``remark-gfm``.

## Testing Summary

### Frontend Tests
- Quiz correctness
- Cookie behavior
- Disabled button/loading states
- Markdown rendering
- Error states (empty notes, missing learning style)
- Backend connection test via /test

### Backend Tests
- Input validation (missing fields, too long, too short)
- Sanitization behavior
- Prompt selection correctness
- Error handling for OpenAI failures
- Output formatting (newlines, spacing, markdown cleanup)

## Installation & Running

### Backend Setup

```
cd backend
npm install
echo "OPENAI_API_KEY=your_key_here" > .env
npm start
```

Backend runs on:    
``http://localhost:3001``

### Frontend Setup

```
cd frontend
npm install
npm run dev
```

Frontend runs on:   
``http://localhost:5173``