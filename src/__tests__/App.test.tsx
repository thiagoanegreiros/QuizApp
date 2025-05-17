import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom'

describe('App component', () => {
  it('should render button with count and increment when clicked', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const button = screen.getByRole('button', { name: /Count 0/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByRole('button', { name: /Count 1/i })).toBeInTheDocument();
  });
});
