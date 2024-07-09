import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // for jest-dom matchers
import App from '../App';

test('renders customer filters', () => {
  render(<App />);
  const linkElement = screen.getByText(/customer filters/i);
  expect(linkElement).toBeInTheDocument();
});
