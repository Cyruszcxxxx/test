import { TransactionModel } from '../models/transaction.js';


// Function to query transactions by record type (income or expense)
export const queryTransactionsByRecordType = async (recordType) => {
    // Validate the type input to be either 'income' or 'expense'
    // if (recordType !== 'income' && recordType !== 'expense') {
    //     throw new Error('Invalid record type');
    // }

    // Query the transactions by type
    // const transactions = await TransactionModel.find({ type: recordType }).exec();
    // return transactions;
};

// Function to query transactions by income type
export const queryTransactionsByIncomeType = async (incomeType) => {

    // Query the transactions by expense type
    // const transactions = await IncomeModel.find({ type: incomeType }).exec();
    // return transactions;
};

// Function to query transactions by expense type
export const queryTransactionsByExpenseType = async (expenseType) => {

    // // Query the transactions by expense type
    // const transactions = await ExpenseModel.find({ type: expenseType }).exec();
    // return transactions;
};

// Function to query transactions by date range
export const queryTransactionsByDateRange = async (startDate, endDate) => {
    const transactions = await TransactionModel.find({
        date: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
        }
    }).exec();
    return transactions;
};

// Function to query transactions by amount range
export const queryTransactionsByAmountRange = async (minAmount, maxAmount) => {
    const transactions = await TransactionModel.find({
        amount: {
            $gte: minAmount,
            $lte: maxAmount
        }
    }).exec();
    return transactions;
};



