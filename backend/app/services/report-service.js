import Report from '../models/report.js';

const reportService = {
    /**
     * Create a new report.
     * @param {Object} data - Report data.
     * @returns {Promise<Document>} - The saved report document.
     */
    createReport: async (data) => {
        const newReport = new Report(data);
        return await newReport.save();
    },

    /**
     * Get a report by its ID.
     * @param {String} reportId - The ID of the report.
     * @returns {Promise<Document>} - The found report document.
     */
    getReportById: async (reportId) => {
        return await Report.findById(reportId).exec();
    },

    /**
     * Get all reports for a specific user.
     * @param {String} userId - The ID of the user.
     * @returns {Promise<Array>} - An array of report documents.
     */
    getReportsByUser: async (userId) => {
        return await Report.find({ user: userId }).exec();
    },

    /**
     * Update a report by its ID.
     * @param {String} reportId - The ID of the report to update.
     * @param {Object} updatedData - New data for the report.
     * @returns {Promise<Document>} - The updated report document.
     */
    updateReport: async (reportId, updatedData) => {
        return await Report.findByIdAndUpdate(reportId, updatedData, { new: true }).exec();
    },

    /**
     * Delete a report by its ID.
     * @param {String} reportId - The ID of the report to delete.
     * @returns {Promise<Document>} - The deleted report document.
     */
    deleteReport: async (reportId) => {
        return await Report.findByIdAndDelete(reportId).exec();
    },

    /**
     * Generate detailed report content.
     * @param {String} reportId - The ID of the report.
     * @returns {Promise<Object>} - The aggregated report content.
     */
    generateReportContent: async (reportId) => {
        const report = await Report.findById(reportId);
        if (!report) {
            throw new Error('Report not found');
        }

        // const expenses = await ExpenseModel.aggregate([
        //     { $match: { user: report.user, date: { $gte: report.startDate, $lte: report.endDate } } },
        //     { $group: { _id: '$category', totalAmount: { $sum: '$amount' } } }
        // ]);

        // const incomes = await IncomeModel.aggregate([
        //     { $match: { user: report.user, date: { $gte: report.startDate, $lte: report.endDate } } },
        //     { $group: { _id: '$source', totalAmount: { $sum: '$amount' } } }
        // ]);

        return {
            reportId: report._id,
            reportName: report.reportName,
            period: { start: report.startDate, end: report.endDate },
            expenses,
            incomes
        };
    },

    /**
     * Filter reports based on specified criteria.
     * @param {String} userId - The ID of the user.
     * @param {Object} filterCriteria - Criteria to filter reports.
     * @returns {Promise<Array>} - An array of filtered report documents.
     */
    filterReports: async (userId, filterCriteria) => {
        return await Report.find({ user: userId, ...filterCriteria }).exec();
    },
};

export default reportService;
