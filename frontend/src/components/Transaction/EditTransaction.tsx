import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { Transaction } from '../../models/Transaction';
import { updateTransaction } from '../../slices/transactionSlice';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { NotificationType, showNotification } from '../../slices/notificationSlice';
import '../../scss/styles.module.scss'
import { deleteTransaction } from '../../slices/transactionSlice';

interface EditTransactionModalProps {
    transaction: Transaction | null;
    onClose: () => void;
  }

const EditTransaction: React.FC<EditTransactionModalProps> = ({ transaction, onClose }) => {
    const dispatch = useAppDispatch();
    const userInfo = useAppSelector((state) => state.auth.basicUserInfo);
  const [updatedTransaction, setUpdatedTransaction] = useState(transaction);
  
  const categoryList = ['Food', 'Traffic', 'Shopping', 'Rent', 'Other'];
  const sourceList =  ['Salary', 'Bonus', 'Investment', 'Other'];
  
  const [type, setType] = useState<Transaction['type']>('Expense'); // 默认值
  const [category, setCategory] = useState<string>('');
  const [source, setSource] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string>('');
  const [comment, setComment] = useState<string>('');

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

  useEffect(() => {
    if (transaction) {
      setType(transaction.type);
      setCategory(transaction.category || '');
      setSource(transaction.source || '');
      setAmount(transaction.amount || 0);
      setDate(transaction.date || '');
      setComment(transaction.comment || '');
    }
  }, [transaction]);

  const handleDeleteSubmit = async () => {
    const transactionId = transaction?._id;
    if(transactionId) {
      dispatch(deleteTransaction(transactionId));
    }
  }

  const handleUpdateSubmit = async () => {
    const isExpenseType = type === 'Expense';
    const isIncomeType = type === 'Income';
    const isAmountValid = amount > 0;
    const isDateValid = date !== '';
    const isCategoryValid = isExpenseType ? category !== '' : true;
    const isSourceValid = isIncomeType ? source !== '' : true;
    const transactionId = transaction?._id;
    
    if (isAmountValid && isDateValid && (isExpenseType ? isCategoryValid : isSourceValid)) {
      const transactionData : Transaction = { 
        type,
        amount,
        date,
        comment,
        user: userInfo?.id || "", 
        ...(isExpenseType && { category }),
        ...(isIncomeType && { source }),
      }
      if(transactionId && transactionData) {
        dispatch(updateTransaction({transactionId, transactionData}))
      }
    }else {
        dispatch(
            showNotification({
              message: "Please fill out all the required fields",
              type: NotificationType.Error,
            })
          );
    }
    onClose();
  };

  return (
    <Modal open={Boolean(transaction)} onClose={onClose}>
      <Box     
      style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      backgroundColor: 'white',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      padding: 4,
    }}>
        <div className="modal-header">
        <Typography variant="h5">Update Transaction</Typography>
        <button onClick={onClose} className="close-button">X</button>
        </div>
        <div className="modal-body">
      <FormControl margin="normal">
        <InputLabel>Type</InputLabel>
        <Select name="type" value={type} onChange={handleTypeChange}>
          <MenuItem value="Income">Income</MenuItem>
          <MenuItem value="Expense">Expense</MenuItem>
        </Select>
      </FormControl>

      {type === 'Expense' && (
        <FormControl margin="normal">
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
        <FormControl margin="normal">
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
        
        margin="normal"
      />
      <TextField
        label="Date"
        type="date"
        name="date"
        value={date}
        onChange={handleDateChange}
        
        margin="normal"
      />
      <TextField
        label="Comment"
        name="comment"
        value={comment}
        onChange={handleCommentChange}
        margin="normal"
      />
      </div>
      <div className="modal-footer">
    <Button variant="contained" color="primary" onClick={handleUpdateSubmit} style={{ marginTop: '20px' }}>
        Update
      </Button>

      <Button variant="contained" color="primary" onClick={handleDeleteSubmit} style={{ marginTop: '20px' }}>
        Delete
      </Button>
      </div>
      </Box>
    </Modal>
  );
};

export default EditTransaction;
