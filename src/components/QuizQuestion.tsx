import React from 'react';
import classNames from 'classnames';
import type { QuizQuestionProps } from '../types/components';
import he from 'he';

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  options,
  correctAnswer,
  selectedAnswer,
  onSelect,
}) => {
  const isResultMode = correctAnswer !== undefined;

  return (
    <div className="mb-8">
      <p className="font-semibold mb-4">{he.decode(question)}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option, index) => {
          const isCorrect = option === correctAnswer;
          const isSelected = option === selectedAnswer;

          const buttonStyle = classNames('px-4 py-2 rounded border text-sm', {
            'bg-green-600 text-white': isResultMode && isCorrect,
            'bg-red-600 text-white': isResultMode && isSelected && !isCorrect,
            'border-gray-300': isResultMode && !isSelected && !isCorrect,
            'bg-blue-500 text-white': !isResultMode && isSelected,

            'hover:bg-blue-100': !isResultMode && !isSelected,
            'hover:bg-blue-100 cursor-pointer': !isResultMode && !isSelected,
          });

          return (
            <button
              key={index}
              className={buttonStyle}
              disabled={isResultMode}
              onClick={() => onSelect(option)}
            >
              {he.decode(option)}
            </button>
          );
        })}
      </div>
    </div>
  );
};
