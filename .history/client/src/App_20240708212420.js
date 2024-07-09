import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import CustomerList from './components/CustomerList.js';
import SearchBar from './components/SearchBar.js';
import CompanyFilter from './components/CompanyFilter.js';
import { Container, Typography, Box } from '@mui/material';
import './App.css'; // Import the CSS file for styling
import logo from './assets/new_relic_logo.png'; // Import the logo image

const App = () => {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async (query) => {
    setCustomers([]); // Clear current customers
    try {
      const response = await axios.get(`http://localhost:5001/api/customers/search?name=${query}`);
      console.log('Search Response:', response.data);
      setCustomers(response.data || []); // Ensure response data is an array
    } catch (error) {
      console.error('Error fetching customers:', error);
      setCustomers([]); // Ensure empty state on error
    }
  };

  const fetchCustomersByCompany = async (company) => {
    setCustomers([]); // Clear current customers
    try {
      const response = await axios.get(`http://localhost:5001/api/customers/filter?company=${company}`);
      console.log('Filter Response:', response.data);
      setCustomers(response.data || []); // Ensure response data is an array
    } catch (error) {
      console.error('Error fetching customers:', error);
      setCustomers([]); // Ensure empty state on error
    }
  };

  return (
    <Router>
      <Container className="container">
        <Box className="header">
          <img src={logo} alt="Logo" className="logo" /> {/* Use the imported logo */}
          <Typography variant="h4" gutterBottom> {/* Use h4 variant for smaller font size */}
            Customer Filters
          </Typography>
        </Box>
        <SearchBar onSearch={fetchCustomers} />
        <CompanyFilter onFilter={fetchCustomersByCompany} />
        <CustomerList customers={customers} />
      </Container>
    </Router>
  );
};

export default App;
