import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { QuizQuestion } from '../../components/QuizQuestion';

const baseProps = {
  question: 'What is the capital of France?',
  options: ['Paris', 'Lyon', 'Marseille', 'Toulouse'],
};

describe('QuizQuestion', () => {
  it('renders question and options in selection mode', () => {
    render(
      <QuizQuestion
        {...baseProps}
        correctAnswer={undefined as unknown as string}
        selectedAnswer={undefined}
        onSelect={jest.fn()}
      />,
    );

    expect(screen.getByText(baseProps.question)).toBeInTheDocument();

    baseProps.options.forEach(option => {
      const btn = screen.getByRole('button', { name: option });
      expect(btn).toBeEnabled();
      expect(btn).toHaveClass('cursor-pointer');
    });
  });

  it('calls onSelect when an option is clicked', async () => {
    const handleSelect = jest.fn();

    render(
      <QuizQuestion
        {...baseProps}
        correctAnswer={undefined as unknown as string}
        selectedAnswer={undefined}
        onSelect={handleSelect}
      />,
    );

    const btn = screen.getByRole('button', { name: 'Paris' });
    await userEvent.click(btn);

    expect(handleSelect).toHaveBeenCalledWith('Paris');
  });

  it('renders selected option with blue background in selection mode', () => {
    render(
      <QuizQuestion
        {...baseProps}
        correctAnswer={undefined as unknown as string}
        selectedAnswer="Lyon"
        onSelect={jest.fn()}
      />,
    );

    const btn = screen.getByRole('button', { name: 'Lyon' });
    expect(btn).toHaveClass('bg-blue-500');
  });

  it('renders correct/incorrect styles in result mode', () => {
    render(
      <QuizQuestion
        {...baseProps}
        correctAnswer="Paris"
        selectedAnswer="Lyon"
        onSelect={() => {}}
      />,
    );

    const correctBtn = screen.getByRole('button', { name: 'Paris' });
    const incorrectBtn = screen.getByRole('button', { name: 'Lyon' });
    const neutralBtn = screen.getByRole('button', { name: 'Marseille' });

    expect(correctBtn).toHaveClass('bg-green-600');
    expect(incorrectBtn).toHaveClass('bg-red-600');
    expect(neutralBtn).toHaveClass('border-gray-300');

    expect(correctBtn).toBeDisabled();
    expect(incorrectBtn).toBeDisabled();
    expect(neutralBtn).toBeDisabled();
  });
});
