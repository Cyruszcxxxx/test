import express from "express";
import * as transactionController from '../controllers/transaction-controller.js';

const router = express.Router();

// Define routes for Transaction operations
router.route('/')
    .post(transactionController.createTransaction); // Create a new transaction

router.route('/:id')
    .get(transactionController.getTransactionById) // Retrieve a transaction by its ID
    .put(transactionController.updateTransaction) // Update a transaction by its ID
    .delete(transactionController.deleteTransaction); // Delete a transaction by its ID

router.route('/user/:userId')
    .get(transactionController.getTransactionsByUser); // Get all transactions for a specific user

export default router;