import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { useState } from "react";
import { AppDispatch } from "../store";
import { Typography,Paper } from '@mui/material';
import React, { useEffect } from "react";
import TransactionTable from '../components/TransactionTable/TransactionTable';
import { fetchTransactionsByUser } from '../slices/transactionSlice';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);


const Home: React.FC = () => {
  const [filter, setFilter] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);
  const transactions = useAppSelector((state) =>  state.transaction.transactions); // This is an example, adjust to your actual state structure

  useEffect(() => {
    if (basicUserInfo) {
      dispatch(fetchTransactionsByUser(basicUserInfo?.id));
    }
  }, [dispatch, basicUserInfo]);

  const searchHandler = (query: string) => {
    setFilter(query);
  };

const incomeAmount = transactions.reduce((sum, transaction) => {
  return transaction.type === 'Income' ? sum + transaction.amount : sum;
}, 0);

// Calculate the sum of expense transactions
const expenseAmount = transactions.reduce((sum, transaction) => {
  return transaction.type === 'Expense' ? sum + transaction.amount : sum;
}, 0);

const data = {
  labels: ['Expense', 'Income'],
  datasets: [
    {
      label: '# of Votes',
      data: [expenseAmount, incomeAmount],
      backgroundColor: [
        'rgba(36, 233, 165, 0.2)',
        'rgba(54, 162, 235, 0.2)',
      ],
      borderColor: [
        'rgba(36, 233, 165, 1)',
        'rgba(54, 162, 235, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const theme = createTheme({
  typography: {
    h6: {
      fontFamily: '"Roboto Slab", serif',
      fontWeight: '600',
      color: '#16515C',
    },
  },
});

return (
  <>
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container maxWidth={false} sx={{display: 'flex', mt: 2, p: 1, margin: '50px 0 0 50px',}}>
      {/* Paper component with 60% width of the viewport */}
      <Paper elevation={3} sx={{width: '30vw', overflow: 'auto',bgcolor: 'background.paper', p: 3,}}>
        <Typography variant="h6" sx={{ mr: 2 }}>Expense Amount: {expenseAmount}</Typography>
        <Typography variant="h6" sx={{ mr: 1 }}>Income Amount: {incomeAmount}</Typography>
        {/* <TransactionTable query={filter}></TransactionTable> */}
        <Doughnut data={data} />
      </Paper>
    </Container>
    </ThemeProvider>
  </>
);
}

export default Home;
