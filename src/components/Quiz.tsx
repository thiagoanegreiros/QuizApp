import { useEffect, useState } from 'react';
import TriviaService from '../services/TriviaService';
import type { Category, TriviaQuestion } from '../types/trivia';
import { QuizQuestion } from './QuizQuestion';
import { useNavigate } from 'react-router-dom';

export const Quiz = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [difficulty, setDifficulty] = useState('easy');

  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  useEffect(() => {
    TriviaService.getCategories()
      .then(setCategories)
      .catch(err => console.error('Error loading categories:', err));
  }, []);

  const handleCreateQuiz = async () => {
    const fetchedQuestions = await TriviaService.getQuestions(
      5,
      Number(selectedCategory),
      difficulty,
    );

    const shuffled: TriviaQuestion[] = fetchedQuestions.map(q => ({
      ...q,
      options: shuffle([...q.incorrect_answers, q.correct_answer]),
    }));

    setQuestions(shuffled);
    setAnswers({});
  };

  const handleSelect = (index: number, option: string) => {
    setAnswers(prev => ({ ...prev, [index]: option }));
  };

  const shuffle = (array: string[]): string[] => {
    return array.sort(() => Math.random() - 0.5);
  };

  const allAnswered =
    questions.length > 0 && questions.every((_, i) => answers[i]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Create Your Quiz
      </h1>
      <div className="mb-4 flex items-end gap-4">
        <label htmlFor="categorySelect" className="block mb-2 font-semibold">
          Select Category
        </label>
        <select
          id="categorySelect"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="p-2 rounded border"
        >
          <option value="">-- Choose a category --</option>
          {categories.map(cat => (
            <option key={cat.id} value={`${cat.id}`}>
              {cat.name}
            </option>
          ))}
        </select>

        <label htmlFor="difficultySelect" className="block mb-2 font-semibold">
          Select Difficulty
        </label>
        <select
          id="difficultySelect"
          value={difficulty}
          onChange={e => setDifficulty(e.target.value)}
          className="p-2 rounded border"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button
          id="createBtn"
          onClick={handleCreateQuiz}
          className="px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
          disabled={!selectedCategory}
        >
          Create Quiz
        </button>
      </div>

      {questions.length > 0 && (
        <div className="w-full max-w-2xl mt-6">
          {questions.map((q, index) => (
            <QuizQuestion
              key={index}
              question={q.question}
              options={q.options}
              selectedAnswer={answers[index]}
              onSelect={option => handleSelect(index, option)}
            />
          ))}

          {allAnswered && (
            <button
              className="mt-4 px-6 py-2 bg-green-600 text-white font-bold rounded hover:bg-green-700"
              onClick={() => {
                navigate('/results', {
                  state: {
                    questions,
                    answers,
                  },
                });
              }}
            >
              Submit Quiz
            </button>
          )}
        </div>
      )}
    </div>
  );
};
