import React from 'react';
import { List, ListItem, ListItemText, Typography, Box, Paper } from '@mui/material';
import PropTypes from 'prop-types';

const CustomerList = ({ customers }) => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Customer List
      </Typography>
      {customers.length > 0 ? (
        <Paper>
          <List>
            {customers.map((customer) => (
              <ListItem key={customer.id} divider>
                <ListItemText
                  primary={`${customer.firstName} ${customer.lastName}`}
                  secondary={customer.companyName}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      ) : (
        <Typography variant="body1">No customers found.</Typography>
      )}
    </Box>
  );
};

CustomerList.propTypes = {
  customers: PropTypes.arrayOf(PropTypes.object)
};

CustomerList.defaultProps = {
  customers: []
};

export default CustomerList;