# Customer Search / Filter Application

This project is a customer searching and filtering application built with a React frontend and a Node backend, which communicates with a Firestore database. The application allows users to search for customers by first or last name and filter customers by company name.

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

0. **Install Npm**:
  Npm is required to run this repository. [Follow these instructions to install NPM](https://radixweb.com/blog/installing-npm-and-nodejs-on-windows-and-mac)

2. **Install dependencies**:
   ```sh
   cd client
   npm install
   ```

3. **Set up Firestore**:
    - Ensure you have the `firebaseAdminConfig.js` file in the `backend` directory with your Firebase configuration.
    - Replace serviceAccountKey.json with [this file](https://drive.google.com/file/d/1eNqavF6YQAekizP5sHvat5Wl97pL1WZw/view?usp=sharing) inside of the server folder. If there is no serviceAccountKey.json, make one.


4. **Run the server**:
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
  - `200`: Returns an array of customers matching searched name.
  - `404`: No matching customers found.
  - `500`: Server error.

#### `GET /api/customers/filter`

- **Description**: Filter customers by company name.
- **Query Parameters**:
  - `company`: The company name to filter by.
- **Response**:
  - `200`: Returns an array of customers with the given company name.
  - `404`: No matching customers found.
  - `500`: Server error.

#### `GET /api/customers/companies`

- **Description**: Get a list of all company names from the database.
- **Response**:
  - `200`: Returns an array of all company names.
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
    Note: The application should be running on localhost port 3000 by default

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
