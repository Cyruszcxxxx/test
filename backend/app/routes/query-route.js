import express from 'express';
import * as queryController from '../controllers/query-controller.js';

const router = express.Router();

router.get('/byRecordType', queryController.queryTransactionsByRecordType); 

router.get('/byIncomeType', queryController.queryTransactionsByIncomeType);

router.get('/byExpenseType', queryController.queryTransactionsByExpenseType);

router.get('/byDateRange', queryController.queryTransactionsByDateRange);

router.get('/byAmountRange', queryController.queryTransactionsByAmountRange);

export default router;
