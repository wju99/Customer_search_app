import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Box } from '@mui/material';
import _ from 'lodash';

const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('search');
    if (searchQuery && searchQuery !== search) {
      setSearch(searchQuery);
      onSearch(searchQuery);
    }
  }, [location.search]);

  const debouncedSearch = useCallback(
    _.debounce((query) => {
      navigate(`?search=${query}`);
      onSearch(query);
    }, 300),
    []
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    debouncedSearch(value);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 2 }}>
      <TextField
        label="Search by name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'search by name' }}
      />
    </Box>
  );
};

export default SearchBar;
