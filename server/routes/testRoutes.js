// routes/testRoutes.js

import express from 'express';

const router = express.Router();

router.get('/test', (req, res) => {
    try {
        console.log('Received request to test server health');
        res.status(200).json({ message: 'Server is running fine' });
    } catch (error) {
        console.error('Error testing server health:', error);
        res.status(500).json({ error: 'Server Error' });
    }
});

export default router;
