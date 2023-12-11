import * as queryService from '../services/query-service.js';
import { setResponse, setErrorResponse } from './response-handler.js';

// Get all transactions queried by record type
export const queryTransactionsByRecordType = async (request, response) => {
    try {
        //const recordType = request.params.type;
        const recordType = request.query.recordType; 

        // Check if recordType is provided in the query string
        if (!recordType) {
            return response.status(400).json({ message: "Record type is required" });
        }

        const records = await queryService.queryTransactionsByRecordType(recordType);
        setResponse(records, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
};

// Get all transactions queried by income type
export const queryTransactionsByIncomeType = async (request, response) => {
    try {
        //const incomeType = request.params.type;
        const incomeType = request.query.incomeType; 

        // Check if incomeType is provided in the query string
        if (!incomeType) {
            return response.status(400).json({ message: "Income type is required" });
        }

        const records = await queryService.queryTransactionsByIncomeType(incomeType);
        setResponse(records, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
};

// Get all transactions queried by expense type
export const queryTransactionsByExpenseType = async (request, response) => {
    try {
        //const incomeType = request.params.type;
        const expenseType = request.query.expenseType; 

        // Check if expenseType is provided in the query string
        if (!expenseType) {
            return response.status(400).json({ message: "Expense type is required" });
        }

        const records = await queryService.queryTransactionsByExpenseType(expenseType);
        setResponse(records, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
};

// Get all transactions queried by date range
export const queryTransactionsByDateRange = async (request, response) => {
    try {
        const { startDate, endDate } = request.query;

        if (!startDate || !endDate) {
            return response.status(400).json({ message: "Start date and end date are required" });
        }

        const transactions = await queryService.queryTransactionsByDateRange(startDate, endDate);
        setResponse(transactions, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
};

// Get all transactions queried by amount range
export const queryTransactionsByAmountRange = async (request, response) => {
    try {
        const { minAmount, maxAmount } = request.query;

        if (!minAmount || !maxAmount) {
            return response.status(400).json({ message: "Valid minAmount and maxAmount are required" });
        }

        const transactions = await queryService.queryTransactionsByAmountRange(minAmount, maxAmount);
        setResponse(transactions, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
};
