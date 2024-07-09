import express from 'express';
import { searchCustomers, filterCustomers, getCompanyNames } from '../controllers/customerController.js';

const router = express.Router();

router.get('/search', searchCustomers);
router.get('/filter', filterCustomers);
router.get('/companies', getCompanyNames);

export default router;
