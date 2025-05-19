import { useEffect, useState } from 'react';
import TriviaService from '../services/TriviaService';
import type { Category } from '../types/trivia';

export const QuizSetup = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [difficulty, setDifficulty] = useState('easy');

  useEffect(() => {
    TriviaService.getCategories()
      .then(setCategories)
      .catch(err => console.error('Error loading categories:', err));
  }, []);

  const handleCreateQuiz = () => {
    console.log('Selected category:', selectedCategory);
    console.log('Selected difficulty:', difficulty);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Create Your Quiz
      </h1>

      <div className="mb-4">
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
      </div>

      <div className="mb-6">
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
      </div>

      <button
        id="createBtn"
        onClick={handleCreateQuiz}
        className="px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
      >
        Create Quiz
      </button>
    </div>
  );
};

export default QuizSetup;
