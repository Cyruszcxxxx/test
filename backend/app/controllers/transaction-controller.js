import * as transactionService from '../services/transaction-service.js';
import { setResponse, setErrorResponse } from './response-handler.js';

// Create a new transaction and send response
export const createTransaction = async (request, response) => {
    try {
        const newTransaction = { ...request.body };
        const transaction = await transactionService.createTransaction(newTransaction);

        setResponse(transaction, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
};

// Get a transaction by its ID and send response
export const getTransactionById = async (request, response) => {
    try {
        const id = request.params.id;
        const transaction = await transactionService.getTransaction(id);
        setResponse(transaction, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
};

// Get all transactions associated with a specific user and send response
export const getTransactionsByUser = async (request, response) => {
    try {
        const userId = request.params.userId;
        const transactions = await transactionService.getTransactionsByUser(userId);
        setResponse(transactions, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
};

// Update a transaction by its ID and send response
export const updateTransaction = async (request, response) => {
    try {
        const id = request.params.id;
        const updatedTransaction = { ...request.body };
        const transaction = await transactionService.updateTransaction(id, updatedTransaction);
        setResponse(transaction, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
};

// Delete a transaction by its ID and send response
export const deleteTransaction = async (request, response) => {
    try {
        const id = request.params.id;
        await transactionService.deleteTransaction(id);
        setResponse({ message: 'Transaction successfully deleted' }, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
};
