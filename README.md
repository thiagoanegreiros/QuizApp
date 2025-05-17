# 🧠 Trivia Quiz App - React + TypeScript + Vite

![CI](https://github.com/thiagoanegreiros/quiz-app/actions/workflows/ci.yml/badge.svg)
![CodeQL](https://github.com/thiagoanegreiros/quiz-app/actions/workflows/codeql.yml/badge.svg)
![Codecov](https://codecov.io/gh/thiagoanegreiros/quiz-app/branch/master/graph/badge.svg)(https://codecov.io/gh/thiagoanegreiros/quiz-app)
![React](https://img.shields.io/badge/react-19.x-blue)
![TypeScript](https://img.shields.io/badge/typescript-5.x-blue)
![Vite](https://img.shields.io/badge/vite-fast%20builds-purple)
![Tailwind](https://img.shields.io/badge/tailwindcss-3.x-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![ESLint](https://img.shields.io/badge/eslint-configured-blue)
![Prettier](https://img.shields.io/badge/prettier-formatted-critical)
![husky](https://img.shields.io/badge/husky-pre--commit%20hook-enabled.svg)

This is a **React + Vite** frontend application built with **TypeScript** and styled using **Tailwind CSS**, designed to present trivia quizzes fetched from the [Open Trivia Database API](https://opentdb.com/).

---

## 🚀 Features

- ✅ React 19 + Vite for lightning-fast development
- ✅ TypeScript with strict typing
- ✅ TailwindCSS utility-first styling
- ✅ Trivia questions fetched from Open Trivia DB API
- ✅ Category and difficulty selection
- ✅ Quiz with 5 random questions
- ✅ Answer selection with highlight logic
- ✅ Score-based results screen with color scale
- ✅ Routing with `react-router-dom`
- ✅ Unit tests and Code Coverage

---

## 🎯 Project Purpose

This project demonstrates a functional React application from scratch using:

- State management with React Hooks
- Asynchronous data fetching with `fetch`
- Conditional rendering and routing
- Clean and maintainable component architecture
- Minimal but functional UI using TailwindCSS

---

## 🧩 App Flow

### ✅ Step #1 – Select Category and Difficulty

- Fetches category list from:  
  `https://opentdb.com/api_category.php`
- Dropdowns:
  - `categorySelect` (ID for category dropdown)
  - `difficultySelect` (ID for difficulty dropdown)
- Start button:  
  - `createBtn` (ID for quiz start)

---

### ✅ Step #2 – Display 5-Question Quiz

- Fetches questions from:  
  `https://opentdb.com/api.php?amount=5&category=...&difficulty=...&type=multiple`
- Answers are randomized
- One answer can be selected per question
- Once all questions are answered, a **Submit** button appears

---

### ✅ Step #3 – Show Results

- Correct answers highlighted in **green**
- Wrong answers highlighted in **red**
- Score color:
  - ✅ 4–5 correct: Green
  - ⚠️ 2–3 correct: Yellow
  - ❌ 0–1 correct: Red
- A button at the bottom lets the user restart and create a new quiz

---

## 📦 Setup and Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```
---

## 🧪 Running Tests with Coverage

To execute all tests and generate a coverage report:

```bash
npm test -- --coverage --watchAll=false
```
---

🧪 Running Lint & Format

```bash
# Check for lint issues
npm run lint

# Format using Prettier
npm run format
```

## 🤝 Contributing

Contributions and suggestions are welcome! This project is part of an ongoing learning journey and will continue to evolve.

---

## 👨‍💻 Author

Made by **Thiago Ananias**
