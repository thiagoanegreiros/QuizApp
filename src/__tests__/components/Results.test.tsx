import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Results } from '../../components/Results';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockQuestions = [
  {
    question: 'Capital of France?',
    correct_answer: 'Paris',
    incorrect_answers: ['Lyon', 'Marseille', 'Toulouse'],
    options: ['Paris', 'Lyon', 'Marseille', 'Toulouse'],
  },
  {
    question: '2 + 2?',
    correct_answer: '4',
    incorrect_answers: ['3', '5', '6'],
    options: ['3', '4', '5', '6'],
  },
  {
    question: 'First letter of alphabet?',
    correct_answer: 'A',
    incorrect_answers: ['B', 'C', 'D'],
    options: ['A', 'B', 'C', 'D'],
  },
  {
    question: 'Best color?',
    correct_answer: 'Blue',
    incorrect_answers: ['Red', 'Green', 'Yellow'],
    options: ['Red', 'Blue', 'Green', 'Yellow'],
  },
  {
    question: 'React library?',
    correct_answer: 'JavaScript',
    incorrect_answers: ['Python', 'C++', 'Java'],
    options: ['JavaScript', 'Python', 'C++', 'Java'],
  },
];

const renderWithRouterState = (answers: Record<number, string>) => {
  render(
    <MemoryRouter
      initialEntries={[
        { pathname: '/results', state: { questions: mockQuestions, answers } },
      ]}
    >
      <Routes>
        <Route path="/results" element={<Results />} />
      </Routes>
    </MemoryRouter>,
  );
};

describe('Results Page', () => {
  it('displays all questions with correct and selected answers', () => {
    const answers = {
      0: 'Paris',
      1: '4',
      2: 'C',
      3: 'Blue',
      4: 'Java',
    };

    renderWithRouterState(answers);

    expect(screen.getByText('RESULTS')).toBeInTheDocument();
    expect(screen.getByText('Capital of France?')).toBeInTheDocument();
    expect(screen.getByText('2 + 2?')).toBeInTheDocument();
    expect(screen.getByText('You scored 3 out of 5')).toBeInTheDocument();
  });

  it('applies red/yellow/green background based on score', () => {
    const answersLow = { 0: 'Lyon', 1: '5', 2: 'B', 3: 'Green', 4: 'Java' }; // 0 correct
    const answersMedium = { 0: 'Paris', 1: '4', 2: 'B', 3: 'Red', 4: 'Java' }; // 2 correct
    const answersHigh = {
      0: 'Paris',
      1: '4',
      2: 'A',
      3: 'Blue',
      4: 'JavaScript',
    }; // 5 correct

    renderWithRouterState(answersLow);
    expect(screen.getByText(/You scored 0 out of 5/i)).toHaveClass(
      'bg-red-600',
    );

    renderWithRouterState(answersMedium);
    expect(screen.getByText(/You scored 2 out of 5/i)).toHaveClass(
      'bg-yellow-400',
    );

    renderWithRouterState(answersHigh);
    expect(screen.getByText(/You scored 5 out of 5/i)).toHaveClass(
      'bg-green-600',
    );
  });

  it('navigates to root when clicking "Create a new quiz"', async () => {
    const answers = { 0: 'Paris', 1: '4', 2: 'A', 3: 'Blue', 4: 'JavaScript' };

    renderWithRouterState(answers);

    const button = screen.getByRole('button', { name: /create a new quiz/i });
    await userEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
