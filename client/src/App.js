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
    // Clear current customers
    setCustomers([]); 
    try {
      const response = await axios.get(`http://localhost:5001/api/customers/search?name=${query}`);
      console.log('Search Response:', response.data);
      setCustomers(response.data || []);
    } catch (error) {
      console.error('Error fetching customers:', error);
      // Set empty state on error
      setCustomers([]); 
    }
  };

  const fetchCustomersByCompany = async (company) => {
    setCustomers([]);
    try {
      const response = await axios.get(`http://localhost:5001/api/customers/filter?company=${company}`);
      console.log('Filter Response:', response.data);
      setCustomers(response.data || []);
    } catch (error) {
      console.error('Error fetching customers:', error);
      setCustomers([]); 
    }
  };

  return (
    <Router>
      <Container className="container">
        <Box className="header">
          <img src={logo} alt="Logo" className="logo" /> {}
          <Typography variant="h4" gutterBottom> {}
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
