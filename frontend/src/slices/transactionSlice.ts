import { createSlice, createAsyncThunk, PayloadAction, createAction } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';
import { RootState } from '../store';
import { Transaction } from '../models/Transaction';
import axios from 'axios';

export type TransactionsState = {
    transactions: Transaction[];
    loading: boolean;
    error: string | null;
    selectedTransaction: Transaction | null;
}

const initialState: TransactionsState = {
    transactions: [],
    loading: false,
    error: null,
    selectedTransaction: null,
  };



export const addTransaction = createAsyncThunk(
    'transactions/addTransaction',
    async (transactionData: Transaction, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/transactions', transactionData);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data);
            }
            throw error;
        }
    }
);

export const fetchTransactionsByUser = createAsyncThunk(
    'transactions/fetchByUser',
    async (userId: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/transactions/user/${userId}`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data);
            }
            throw error;
        }
    }
);

export const fetchTransactionById = createAsyncThunk(
    'transactions/fetchById',
    async (transactionId: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/transactions/${transactionId}`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data);
            }
            throw error;
        }
    }
);

export const updateTransaction = createAsyncThunk(
    'transactions/update',
    async ({ transactionId, transactionData }: { transactionId: string; transactionData: Transaction }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/transactions/${transactionId}`, transactionData);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data);
            }
            throw error;
        }
    }
);

export const deleteTransaction = createAsyncThunk(
    'transactions/delete',
    async (transactionId: string, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`/transactions/${transactionId}`);
            return transactionId;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data);
            }
            throw error;
        }
    }
);

export const setSelectedTransaction = createAction<Transaction | null>('transactions/setSelectedTransaction');






const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        selectTransaction: (state, action: PayloadAction<Transaction | null>) => {
            state.selectedTransaction = action.payload;
        },

        searchTransaction: (state, action: PayloadAction<string>) => {
            state.transactions = state.transactions.filter(
              (transaction) => transaction.comment && transaction.comment.startsWith(action.payload)
            );
        },

        findById: (state, action: PayloadAction<string | undefined>) => {
            const id = action.payload;
            const foundTransaction = state.transactions.find((transaction) => transaction._id === id);
            if (foundTransaction) {
              state.selectedTransaction = foundTransaction;
            } else {
              state.selectedTransaction = null; 
            }
          },
        },
    
    extraReducers: (builder) => {
        builder
          .addCase(addTransaction.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(addTransaction.fulfilled, (state, action) => {
            state.loading = false;
            state.transactions.push(action.payload); 
          })
          .addCase(addTransaction.rejected, (state, action) => {
            state.loading = false;
            state.error =  'An error occurred.';
          })    
          .addCase(fetchTransactionsByUser.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchTransactionsByUser.fulfilled, (state, action: PayloadAction<Transaction[]>) => {
            state.loading = false;
            state.transactions = action.payload;
          })
          .addCase(fetchTransactionsByUser.rejected, (state, action) => {
            state.loading = false;
            state.error = 'Can not get data';
          })
          .addCase(fetchTransactionById.pending, (state) => {
            state.loading = true;
            state.error = null;
          })      
          .addCase(fetchTransactionById.fulfilled, (state, action: PayloadAction<Transaction>) => {
            state.loading = false;
            //Handle the case of getting a single transaction, such as adding it to state.transactions
            state.selectedTransaction = action.payload;
          })
          .addCase(fetchTransactionById.rejected, (state, action) => {
            state.loading = false;
            state.error = 'An error occurred.';
          })
          .addCase(updateTransaction.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(updateTransaction.fulfilled, (state, action: PayloadAction<Transaction>) => {
            state.loading = false;
            const updatedTransaction = state.transactions.find((transaction) => transaction._id === action.payload._id);
            if (updatedTransaction) {
                Object.assign(updatedTransaction, action.payload);
              }
          })
          .addCase(updateTransaction.rejected, (state, action) => {
            state.loading = false;
            state.error = 'An error occurred.';
          });
          

    },
});

export const searchTransaction = (query: string): ((state: RootState) => TransactionsState) => {
    return (state: RootState) => ({
        ...state.transaction,
        transactions: state.transaction.transactions.filter(c => c.comment && c.comment.startsWith(query))
    });
};



export default transactionSlice.reducer;
