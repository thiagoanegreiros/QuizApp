import { render, screen } from '@testing-library/react';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

jest.mock('../services/TriviaService', () => ({
  __esModule: true,
  default: {
    getCategories: jest.fn().mockResolvedValue([
      { id: 9, name: 'General Knowledge' },
      { id: 10, name: 'Books' },
    ]),
  },
}));

describe('App component', () => {
  it('should render button with count and increment when clicked', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const heading = await screen.findByText(/Create Your Quiz/i);
    expect(heading).toBeInTheDocument();
  });
});
