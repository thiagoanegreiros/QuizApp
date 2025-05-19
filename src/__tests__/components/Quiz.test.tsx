import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Quiz } from '../../components/Quiz';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

jest.mock('../../services/TriviaService', () => ({
  __esModule: true,
  default: {
    getCategories: jest.fn().mockResolvedValue([
      { id: 9, name: 'General Knowledge' },
      { id: 10, name: 'Books' },
    ]),
    getQuestions: jest.fn().mockResolvedValue([
      {
        question: 'What is the capital of France?',
        correct_answer: 'Paris',
        incorrect_answers: ['Lyon', 'Marseille', 'Toulouse'],
        category: 'Geography',
        type: 'multiple',
        difficulty: 'easy',
      },
    ]),
  },
}));

describe('Quiz Component', () => {
  it('renders heading, selects and button correctly', async () => {
    render(
      <MemoryRouter>
        <Quiz />
      </MemoryRouter>,
    );
    expect(await screen.findByText(/Create Your Quiz/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/select category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/select difficulty/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /create quiz/i }),
    ).toBeInTheDocument();
  });

  it('loads categories into the category select', async () => {
    render(
      <MemoryRouter>
        <Quiz />
      </MemoryRouter>,
    );
    expect(await screen.findByText('General Knowledge')).toBeInTheDocument();
    expect(screen.getByText('Books')).toBeInTheDocument();
  });

  it('allows user to select category and difficulty', async () => {
    render(
      <MemoryRouter>
        <Quiz />
      </MemoryRouter>,
    );
    await screen.findByText('General Knowledge');

    const categorySelect = screen.getByLabelText(/select category/i);
    const difficultySelect = screen.getByLabelText(/select difficulty/i);

    await userEvent.selectOptions(categorySelect, '9');
    await userEvent.selectOptions(difficultySelect, 'medium');

    expect(categorySelect).toHaveValue('9');
    expect(difficultySelect).toHaveValue('medium');
  });

  it('loads and shows question after clicking "Create Quiz"', async () => {
    render(
      <MemoryRouter>
        <Quiz />
      </MemoryRouter>,
    );
    await screen.findByText('General Knowledge');

    const categorySelect = screen.getByLabelText(/select category/i);
    const difficultySelect = screen.getByLabelText(/select difficulty/i);
    const createButton = screen.getByRole('button', { name: /create quiz/i });

    await userEvent.selectOptions(categorySelect, '9');
    await userEvent.selectOptions(difficultySelect, 'hard');
    await userEvent.click(createButton);

    expect(
      await screen.findByText(/What is the capital of France\?/i),
    ).toBeInTheDocument();
  });

  it('logs error if getCategories fails', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const TriviaService = await import('../../services/TriviaService');

    (TriviaService.default.getCategories as jest.Mock).mockRejectedValueOnce(
      new Error('API error'),
    );

    render(
      <MemoryRouter>
        <Quiz />
      </MemoryRouter>,
    );
    await screen.findByText(/Create Your Quiz/i);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error loading categories:',
      expect.any(Error),
    );
    consoleErrorSpy.mockRestore();
  });

  it('does not fetch questions if no category is selected', async () => {
    render(
      <MemoryRouter>
        <Quiz />
      </MemoryRouter>,
    );
    await screen.findByLabelText(/select category/i);
    const createButton = screen.getByRole('button', { name: /create quiz/i });
    expect(createButton).toBeDisabled();
  });

  it('shows "Submit Quiz" button after all questions are answered', async () => {
    render(
      <MemoryRouter>
        <Quiz />
      </MemoryRouter>,
    );

    await screen.findByText('General Knowledge');
    await userEvent.selectOptions(
      screen.getByLabelText(/select category/i),
      '9',
    );
    await userEvent.selectOptions(
      screen.getByLabelText(/select difficulty/i),
      'easy',
    );
    await userEvent.click(screen.getByRole('button', { name: /create quiz/i }));

    const answerBtn = await screen.findByRole('button', { name: 'Paris' });
    await userEvent.click(answerBtn);

    expect(
      screen.getByRole('button', { name: /submit quiz/i }),
    ).toBeInTheDocument();
  });

  it('navigates to results with answers on submit', async () => {
    render(
      <MemoryRouter>
        <Quiz />
      </MemoryRouter>,
    );

    await screen.findByText('General Knowledge');
    await userEvent.selectOptions(
      screen.getByLabelText(/select category/i),
      '9',
    );
    await userEvent.selectOptions(
      screen.getByLabelText(/select difficulty/i),
      'easy',
    );
    await userEvent.click(screen.getByRole('button', { name: /create quiz/i }));

    const answerBtn = await screen.findByRole('button', { name: 'Paris' });
    await userEvent.click(answerBtn);

    const submitBtn = screen.getByRole('button', { name: /submit quiz/i });
    await userEvent.click(submitBtn);

    expect(mockNavigate).toHaveBeenCalledWith('/results', {
      state: {
        questions: expect.any(Array),
        answers: { 0: 'Paris' },
      },
    });
  });
});
