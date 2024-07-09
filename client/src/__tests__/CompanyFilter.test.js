import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import CompanyFilter from '../components/CompanyFilter';

jest.mock('axios');

describe('CompanyFilter', () => {
  test('renders company filter and loads company options', async () => {
    // Mock list of companies from API call
    axios.get.mockResolvedValue({ data: ['Company A', 'Company B'] });

    render(
      <Router>
        <CompanyFilter onFilter={jest.fn()} />
      </Router>
    );

    // Check filter label is rendered
    expect(screen.getByLabelText(/filter by company/i)).toBeInTheDocument();

    // Open dropdown
    fireEvent.mouseDown(screen.getByLabelText(/filter by company/i));

    // Check options are rendered
    await waitFor(() => {
      expect(screen.getByText('Company A')).toBeInTheDocument();
      expect(screen.getByText('Company B')).toBeInTheDocument();
    });
  });
});
