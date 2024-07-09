import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomerList from '../components/CustomerList';

describe('CustomerList', () => {
  test('renders customer list with customers', () => {
    const customers = [
      { id: 1, firstName: 'John', lastName: 'Doe', companyName: 'Amazon' },
      { id: 2, firstName: 'Jane', lastName: 'Doe', companyName: 'Boeing' },
    ];
    render(<CustomerList customers={customers} />);
    
    expect(screen.getByText('Customer List')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Amazon')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Boeing')).toBeInTheDocument();
  });

  test('renders "No customers found." when customer list is empty', () => {
    render(<CustomerList customers={[]} />);
    expect(screen.getByText('No customers found.')).toBeInTheDocument();
  });
});
