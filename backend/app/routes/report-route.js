import express from 'express';
import * as reportController from '../controllers/report-controller.js';

const router = express.Router();

// POST: Create a new report
router.post('/', reportController.createReport);

// GET: Retrieve a specific report by its ID
router.get('/:reportId', reportController.getReportById);

// PUT: Update a specific report by its ID
router.put('/:reportId', reportController.updateReport);

// DELETE: Delete a specific report by its ID
router.delete('/:reportId', reportController.deleteReport);

// GET: Retrieve all reports associated with a specific user
router.get('/user/:userId', reportController.getReportsByUser);

export default router;
