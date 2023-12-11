import express from 'express';
import reportService from '../services/report-service.js';
import { setErrorResponse, setResponse } from './response-handler.js';

const router = express.Router();

// Create a new report
router.post('/', async (request, response) => {
    try {
        const reportData = request.body;
        const report = await reportService.createReport(reportData);
        setResponse(report, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
});

// Get a report by its ID
router.get('/:reportId', async (request, response) => {
    try {
        const reportId = request.params.reportId;
        const report = await reportService.getReportById(reportId);
        if (!report) {
            return response.status(404).send('Report not found');
        }
        setResponse(report, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
});

// Update a report by its ID
router.put('/:reportId', async (request, response) => {
    try {
        const reportId = request.params.reportId;
        const updatedData = request.body;
        const updatedReport = await reportService.updateReport(reportId, updatedData);
        if (!updatedReport) {
            return response.status(404).send('Report not found');
        }
        setResponse(updatedReport, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
});

// Delete a report by its ID
router.delete('/:reportId', async (request, response) => {
    try {
        const reportId = request.params.reportId;
        const result = await reportService.deleteReport(reportId);
        if (!result) {
            return response.status(404).send('Report not found');
        }
        setResponse({ message: 'Report successfully deleted' }, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
});

// Get all reports for a specific user
router.get('/user/:userId', async (request, response) => {
    try {
        const userId = request.params.userId;
        const reports = await reportService.getReportsByUser(userId);
        setResponse(reports, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
});

// Generate report content (assuming this function is part of your service)
router.get('/generate/:reportId', async (request, response) => {
    try {
        const reportId = request.params.reportId;
        const content = await reportService.generateReportContent(reportId);
        if (!content) {
            return response.status(404).send('Report not found or no content available');
        }
        setResponse(content, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
});

export default router;
