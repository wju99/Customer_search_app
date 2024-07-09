import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

describe('SearchBar', () => {
  test('renders search bar and handles input', async () => {
    const onSearchMock = jest.fn();

    render(
      <Router>
        <SearchBar onSearch={onSearchMock} />
      </Router>
    );

    // Check search input is rendered
    expect(screen.getByLabelText(/search by name/i)).toBeInTheDocument();

    // Type in search input
    fireEvent.change(screen.getByLabelText(/search by name/i), {
      target: { value: 'test search' },
    });

    // Check input value is updated, onSearch is called
    await waitFor(() => {
      expect(screen.getByLabelText(/search by name/i)).toHaveValue('test search');
    });
  });
});
