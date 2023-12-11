import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import TransactionTable from '../components/TransactionTable/TransactionTable';
import TransactionSearch from '../components/TransactionSearch/TransactionSearch';
import { fetchTransactionsByUser } from '../slices/transactionSlice';
import { AppDispatch } from '../store';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { Transaction } from '../components/Transaction/Transaction';


const TransactionPage=() => {
    const [filter, setFilter] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    //get user Id
    const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);
    
    useEffect(() => {
        if(basicUserInfo) {
            dispatch(fetchTransactionsByUser(basicUserInfo?.id));
        }
    }, []);

    const searchHandler = (query: string) => {
      setFilter(query);
    }

    // const [isModalOpen, setIsModalOpen] = useState(false);

    // // Function to open the modal
    // const openModal = () => {
    //   setIsModalOpen(true);
    // };
  
    // // Function to close the modal
    // const closeModal = () => {
    //   setIsModalOpen(false);
    // };

    return (
        <>
          <CssBaseline />
          <Container maxWidth="md" sx={{ mt: 2 }}>
            <TransactionSearch onSearch={searchHandler}></TransactionSearch>
            <TransactionTable query={filter}></TransactionTable>
          </Container>
      
        </>
      );
}

export default TransactionPage;