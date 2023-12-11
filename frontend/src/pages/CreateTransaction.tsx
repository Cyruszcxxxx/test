import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent, Typography } from '@mui/material';
import { Transaction } from '../models/Transaction';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { addTransaction } from '../slices/transactionSlice';
import { NotificationType, showNotification } from '../slices/notificationSlice';

const CreateTransaction: React.FC = () => {
    const dispatch = useAppDispatch();
    const userInfo = useAppSelector((state) => state.auth.basicUserInfo);


    const categoryList = ['Food', 'Traffic', 'Shopping', 'Rent', 'Other'];
    const sourceList =  ['Salary', 'Bonus', 'Investment', 'Other'];
    


    const [type, setType] = useState<Transaction['type']>('Expense');
    const [category, setCategory] = useState<string>('');
    const [source, setSource] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [comment, setComment] = useState<string>('');

    //const [transactionData, setTransactionData] = useState<Omit<Transaction, '_id'>>({ /* 初始状态 */ });
    const handleTypeChange = (event: SelectChangeEvent<string>) => {
      setType(event.target.value as 'Income' | 'Expense');
      // reset category and source
      setCategory('');
      setSource('');
    };
    
    const handleCategoryChange = (event: SelectChangeEvent<string>) => {
      if (type === 'Expense') {
        setCategory(event.target.value);
      } else if (type === 'Income') {
        setSource(event.target.value);
      }
    };
    
  
    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(event.target.value);
      setAmount(isNaN(value) ? 0 : value);
    };
  
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setDate(event.target.value);
    };
  
    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setComment(event.target.value);
    };

  const handleSubmit = async () => {
    const isExpenseType = type === 'Expense';
    const isIncomeType = type === 'Income';
    const isAmountValid = amount > 0;
    const isDateValid = date !== '';
    const isCategoryValid = isExpenseType ? category !== '' : true;
    const isSourceValid = isIncomeType ? source !== '' : true;
    
    if (isAmountValid && isDateValid && (isExpenseType ? isCategoryValid : isSourceValid)) {
      const transactionData: Omit<Transaction, '_id'> = {
        type,
        amount,
        date,
        comment,
        user: userInfo?.id || "", 
        ...(isExpenseType && { category }),
        ...(isIncomeType && { source }),
      }
      if(transactionData) {
        dispatch(addTransaction(transactionData))
      }
    }else {
        dispatch(
            showNotification({
              message: "Please fill out all the required fields",
              type: NotificationType.Error,
            })
          );
    }
  };
  
  return (
    <div style={{ margin: '20px' }}>
      <Typography variant="h5">Create Transaction</Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel>Type</InputLabel>
        <Select name="type" value={type} onChange={handleTypeChange}>
          <MenuItem value="Income">Income</MenuItem>
          <MenuItem value="Expense">Expense</MenuItem>
        </Select>
      </FormControl>

      {type === 'Expense' && (
        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select name="category" value={category} onChange={handleCategoryChange}>
            {categoryList.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {type === 'Income' && (
        <FormControl fullWidth margin="normal">
          <InputLabel>Source</InputLabel>
          <Select name="source" value={source} onChange={handleCategoryChange}>
            {sourceList.map((src) => (
              <MenuItem key={src} value={src}>
                {src}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      <TextField
        label="Amount"
        type="number"
        name="amount"
        value={amount}
        onChange={handleAmountChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Date"
        type="date"
        name="date"
        value={date}
        onChange={handleDateChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Comment"
        name="comment"
        value={comment}
        onChange={handleCommentChange}
        fullWidth
        margin="normal"
        multiline
      />
      <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: '20px' }}>
        Save
      </Button>
    </div>
  );
};

export default CreateTransaction;