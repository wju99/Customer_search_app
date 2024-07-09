# Customer Search/Filter Application

This project is a customer searching and filtering application built with a React frontend and a Node backend, which communicates with a Firestore database. The application allows users to search for customers by first or last name and filter customers by company name.

## Architectural Choices

- **Express.js**: I chose to use Express due to simplicity and familiarity. I'm very familiar with the framework and have lots of experience building web applications on it.
- **Firestore**: I chose Firebase Cloud Firestore for the database because it is very easy to set up and effective for small projects. Firestore provides a non-relational database without the need for managing database servers. I chose to go with a non-relational database instead of a relational one because I opted to implement the filter and search functionality. In my opinion, none of the queries were complex enough to warrant usinga relational database instead. However, if I had chosen to implement the Sort functionality, I would definitely have considered using a relational database such as Postgres.

## Table of Contents

1. [Backend Server](#backend-server)
   - [Setup](#setup)
   - [Routes](#routes)
2. [Frontend Client](#frontend-client)
   - [Setup](#setup-1)
   - [Components](#components)
3. [Testing](#testing)

## Backend Server Setup

### Setup

1. **Install dependencies**:
   ```sh
   cd client
   npm install
   ```

2. **Set up Firestore**:
    - Ensure you have the `firebaseAdminConfig.js` file in the `backend` directory with your Firebase configuration.

3. **Run the server**:
    ```sh
    npm start
    ```
    Note: server should run on localhost port 5001 by default

### Routes

#### `GET /api/customers/search`

- **Description**: Search customers by first or last name.
- **Query Parameters**:
  - `name`: The name to search for.
- **Response**: 
  - `200`: Returns an array of matching customers.
  - `404`: No matching customers found.
  - `500`: Server error.

#### `GET /api/customers/filter`

- **Description**: Filter customers by company name.
- **Query Parameters**:
  - `company`: The company name to filter by.
- **Response**:
  - `200`: Returns an array of customers from the specified company.
  - `404`: No matching customers found.
  - `500`: Server error.

#### `GET /api/customers/companies`

- **Description**: Get a list of all company names from the database.
- **Response**:
  - `200`: Returns an array of company names.
  - `500`: Error fetching company names.

## Frontend Client

### Setup

1. **Install dependencies**:
   ```sh
   cd client
   npm install
   ```

2. **Run the application**:
    ```sh
    npm start
    ```

### Frontend Components

#### `CompanyFilter.js`

- A component for filtering customers by company name.
- Fetches company names from the backend and provides a dropdown to select a company.

#### `SearchBar.js`

- A component for searching customers by name.
- Provides a text field for input and triggers a search on change with debounce.

#### `CustomerList.js`

- A component for displaying the list of customers.
- Takes an array of customers as a prop and displays them in a list format.

## Testing

### Running Tests

To run tests for the frontend client:
```sh
cd client
npm test
```

To run tests for the backend server:
```sh
cd server
npm test
```
