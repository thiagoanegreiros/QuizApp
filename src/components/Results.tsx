import { useLocation, useNavigate } from 'react-router-dom';
import { QuizQuestion } from './QuizQuestion';
import type { TriviaQuestion } from '../types/trivia';

export const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    questions,
    answers,
  }: {
    questions: TriviaQuestion[];
    answers: Record<number, string>;
  } = location.state;

  const correctCount = questions.reduce(
    (count, q, i) => (q.correct_answer === answers[i] ? count + 1 : count),
    0,
  );

  const scoreColor =
    correctCount >= 4
      ? 'bg-green-600'
      : correctCount >= 2
        ? 'bg-yellow-400 text-black'
        : 'bg-red-600';

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h2 className="text-2xl font-bold mb-4">RESULTS</h2>

      <div className="w-full max-w-2xl">
        {questions.map((q, index) => (
          <QuizQuestion
            key={index}
            question={q.question}
            options={q.options}
            correctAnswer={q.correct_answer}
            selectedAnswer={answers[index]}
          />
        ))}

        <div
          className={`mt-6 p-2 text-white text-center font-bold ${scoreColor}`}
        >
          You scored {correctCount} out of {questions.length}
        </div>

        <button
          onClick={() => navigate('/')}
          className="mt-4 px-6 py-2 bg-gray-700 text-white font-bold rounded hover:bg-gray-800"
        >
          Create a new quiz
        </button>
      </div>
    </div>
  );
};
