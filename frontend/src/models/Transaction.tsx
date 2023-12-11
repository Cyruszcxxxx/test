export interface Transaction {
    _id?: string;
    type: 'Income' | 'Expense';
    amount: number;
    date: string;
    comment: string;
    user: string;
    source?: string;
    category?: string;
  }
  
  export interface AccountingState {
    transactions: Transaction[];
  }


  