import TriviaService from '../../services/TriviaService';

describe('TriviaService', () => {
  beforeEach(() => {
    global.fetch = jest.fn(); // ou jest.fn() se você estiver usando Jest
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('getCategories() should return list of categories', async () => {
    const mockResponse = {
      trivia_categories: [
        { id: 9, name: 'General Knowledge' },
        { id: 10, name: 'Books' },
      ],
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockResponse,
    });

    const categories = await TriviaService.getCategories();

    expect(fetch).toHaveBeenCalledWith('https://opentdb.com/api_category.php');
    expect(categories).toEqual(mockResponse.trivia_categories);
  });

  it('getQuestions() should return list of questions', async () => {
    const mockResponse = {
      results: [
        {
          category: 'General Knowledge',
          type: 'multiple',
          difficulty: 'easy',
          question: 'What is the capital of France?',
          correct_answer: 'Paris',
          incorrect_answers: ['Lyon', 'Marseille', 'Toulouse'],
        },
      ],
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockResponse,
    });

    const questions = await TriviaService.getQuestions(5, 9, 'easy');

    expect(fetch).toHaveBeenCalledWith(
      'https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple',
    );
    expect(questions).toEqual(mockResponse.results);
  });
});
