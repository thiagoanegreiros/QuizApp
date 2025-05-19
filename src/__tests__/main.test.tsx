import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder as typeof global.TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;
import '@testing-library/jest-dom';

import { screen } from '@testing-library/dom';

jest.mock('../services/TriviaService', () => ({
  __esModule: true,
  default: {
    getCategories: jest.fn().mockResolvedValue([
      { id: 9, name: 'General Knowledge' },
      { id: 10, name: 'Books' },
    ]),
  },
}));

beforeEach(() => {
  document.body.innerHTML = '';
  jest.resetModules();
});

it('should render the app into #root', async () => {
  document.body.innerHTML = '<div id="root"></div>';

  const { bootstrapApp } = await import('../main');
  bootstrapApp();

  const heading = await screen.findByText(/Create Your Quiz/i);
  expect(heading).toBeInTheDocument();
});
