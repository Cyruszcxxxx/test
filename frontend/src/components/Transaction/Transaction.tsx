import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { fetchTransactionById, fetchTransactionsByUser } from '../../slices/transactionSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { useEffect } from 'react';

interface TransactionProps {
    onClose: () => void;
  }

export const Transaction: React.FC<TransactionProps> = ( {onClose} ) => {
    const { t } = useTranslation('common');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    //const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);

    const { transactionId } = useParams();
    const transaction = useAppSelector(state =>
        state.transaction.selectedTransaction
    );

    console.log(transaction);

    useEffect(() => {
        if (transactionId) {
            dispatch(fetchTransactionById(transactionId));
        }
    }, [transactionId, dispatch]);
    

   
    return (
        <Card sx={{ position: 'fixed', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {t('Type: ')}: {transaction?.type} <br />
                {t('Amount')}: {transaction?.amount} <br />
                {t('Comment')}: {transaction?.comment} <br />
                {t('Date')}: {transaction?.date ? new Date(transaction.date).toLocaleDateString() : ''}
 <br />
                {transaction?.type === 'Income' ? (
                    <>{t('Source')}: {transaction?.source}</>
                    ) : transaction?.type === 'Expense' ? (
                    <>{t('Category')}: {transaction?.category}</>
                    ) : null}
                </Typography>
            </CardContent>
            <CardActions>
            <Button size="small" onClick={onClose ? () => onClose() : undefined}>{t('Close')}</Button>
                {/* <Button size="small" onClick={handleUpdateClick}>{t('Update')}</Button>
                <Button size="small" onClick={handleDeleteClick}>{t('Delete')}</Button> */}
                {/* <Button size="small" onClick={() => navigate(-1)}>{t('Go Back')}</Button> */}
            </CardActions>
        </Card>
    );
}