import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import customerRoutes from './routes/customerRoutes.js';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/customers', customerRoutes);

// Server
const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server running on port ${port}`));

export default app;
