import { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { fetchTransactionsByUser, searchTransaction } from '../../slices/transactionSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { Transaction } from '../../models/Transaction';
import EditTransaction from '../Transaction/EditTransaction';
import { Button, MenuItem, Select } from '@mui/material';

type Props = {
    query: string
}

type SortableTransactionKeys = keyof Transaction;

type SortDirection = 'ascending' | 'descending';

interface SortConfig {
  key: SortableTransactionKeys;
  direction: SortDirection;
}

const TransactionTable: React.FC<Props> = (props: Props): ReactElement => {
    
  const dispatch = useAppDispatch();

  const transaction = useAppSelector((state) => state.transaction.transactions);
  const { t } = useTranslation('common');
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const openModal = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  //filter
  const [filterType, setFilterType] = useState<'all' | 'Expense' | 'Income'>('all');

  const filterTransactions = (transactions: Transaction[]): Transaction[] => {
    return transactions.filter((transaction) => {
      return filterType === 'all' || transaction.type === filterType;
    });
  };
  



  //sort
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'date', // date should be a valid key of Transaction
    direction: 'ascending',
  });
  
  const sortTransactions = (transactions: Transaction[]): Transaction[] => {
    return [...transactions].sort((a, b) => {
      const valueA = a[sortConfig.key] || 0; 
      const valueB = b[sortConfig.key] || 0;
  
      if (valueA < valueB) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  };
  
  
  const filteredAndSortedTransactions = sortTransactions(filterTransactions(transaction));


  const handleSort = (key: SortableTransactionKeys) => {
    setSortConfig({
      key,
      direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending',
    });
  };

  

  const transactionList = filteredAndSortedTransactions.map(c => (
    <TableRow
      key={c._id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 }, 'cursor': 'pointer' }}
      onClick={() => openModal(c)}
    >
          <TableCell component="th" scope="row">{c.type}</TableCell>
          <TableCell align="right">{c.category || c.source}</TableCell>
          <TableCell align="right">{c.amount}</TableCell>
          <TableCell align="right">{`${c.comment}`}</TableCell>
          <TableCell align="right">{c.date ? new Date(c.date).toLocaleDateString() : ''}</TableCell>
    </TableRow>
  ));

  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {/* <TableCell>{t('Type')}</TableCell> */}
            <TableCell>
              <Select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as 'all' | 'Expense' | 'Income')}
              >
                <MenuItem value="all">{t('All')}</MenuItem>
                <MenuItem value="Expense">{t('Expense')}</MenuItem>
                <MenuItem value="Income">{t('Income')}</MenuItem>
              </Select>
            </TableCell>
            <TableCell align="right">{t('Category')}</TableCell>

            <TableCell
              align="right"
              style={{ cursor: 'pointer' }}
              onClick={() => handleSort('amount')}
            >
              {t('Amount')} {sortConfig.key === 'amount' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
            </TableCell>
            <TableCell align="right">{t('Comment')}</TableCell>
            <TableCell
              align="right"
              style={{ cursor: 'pointer' }}
              onClick={() => handleSort('date')}
            >
              {t('Date')} {sortConfig.key === 'date' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>{transactionList}</TableBody>

      </Table>
      {isModalOpen && selectedTransaction && (
        <EditTransaction transaction={selectedTransaction} onClose={closeModal} />
      )}
    </TableContainer>
    );
}
export default TransactionTable;

