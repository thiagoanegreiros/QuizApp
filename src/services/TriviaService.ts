import type { Category, TriviaQuestion } from '../types/trivia';

class TriviaService {
  private BASE_URL = 'https://opentdb.com';

  async getCategories(): Promise<Category[]> {
    const res = await fetch(`${this.BASE_URL}/api_category.php`);
    const data = await res.json();
    return data.trivia_categories;
  }

  async getQuestions(
    amount: number,
    category: number,
    difficulty: string,
  ): Promise<TriviaQuestion[]> {
    const res = await fetch(
      `${this.BASE_URL}/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`,
    );
    const data = await res.json();
    return data.results;
  }
}

export default new TriviaService();
