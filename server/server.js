import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import customerRoutes from './routes/customerRoutes.js';
import testRoutes from './routes/testRoutes.js';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/customers', customerRoutes);
app.use('/api', testRoutes); // Add the test routes

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Global Error Handler:', err.stack);
  res.status(500).json({ error: err.message, stack: err.stack });
});

// 404 Error Handling Middleware
app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

// Server
const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server running on port ${port}`));

export default app;
