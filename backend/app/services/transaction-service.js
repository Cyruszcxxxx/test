import { TransactionModel } from '../models/transaction.js';

// Create and save a new transaction to the database
// export const createTransaction = async (data) => {
//     let transaction;
//     if (data.type === 'income') {
//         //transaction = new IncomeModel(data);
//     } else if (data.type === 'expense') {
//         //transaction = new ExpenseModel(data);
//     } else {
//         throw new Error('Invalid transaction type');
//     }
//     return await transaction.save();
// };
export const createTransaction = async (data) => {
    const transaction = new TransactionModel(data);
    return await transaction.save();
};


// Retrieve a transaction by its ID
export const getTransaction = async (id) => {
    const transaction = await TransactionModel.findById(id).exec();
    return transaction;
};

// Retrieve all transactions associated with a specific user
export const getTransactionsByUser = async (userId) => {
    const transactions = await TransactionModel.find({ user: userId }).exec();
    return transactions;
};

// Update a transaction by its ID and return the updated document
export const updateTransaction = async (id, updatedTransaction) => {
    const transaction = await TransactionModel.findByIdAndUpdate(id, updatedTransaction, { new: true }).exec();
    return transaction;
};

// Delete a transaction by its ID
export const deleteTransaction = async (id) => {
    return await TransactionModel.findByIdAndDelete(id).exec();
};