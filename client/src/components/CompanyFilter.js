import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import axios from 'axios';

const CompanyFilter = ({ onFilter }) => {
  const [company, setCompany] = useState('');
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/customers/companies');
        console.log('Fetched companies:', response.data); // Debugging line
        setCompanies(response.data);
      } catch (error) {
        console.error('Error fetching company names:', error);
      }
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const companyQuery = params.get('filter_by_company_name');
    if (companyQuery && companyQuery !== company) {
      setCompany(companyQuery);
      onFilter(companyQuery);
    }
  }, [location.search]); // Only run when location.search changes

  const handleChange = (e) => {
    const value = e.target.value;
    setCompany(value);
    navigate(`?filter_by_company_name=${value}`);
    onFilter(value);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 2 }}>
      <FormControl fullWidth margin="normal">
        <InputLabel id="company-filter-label">Filter by company</InputLabel>
        <Select
          labelId="company-filter-label"
          value={company}
          onChange={handleChange}
          label="Filter by company"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {companies.map((companyName) => (
            <MenuItem key={companyName} value={companyName}>
              {companyName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CompanyFilter;
