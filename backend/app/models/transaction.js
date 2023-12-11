import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ['Income', 'Expense'] // Ensures the type can only be 'Income' or 'Expense'
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  comment: {
    type: String,
    default: ''
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user', // This must match the name given in mongoose.model() for the User
    required: true
  },
  source: {
    type: String,
    required: function() { return this.type === 'Income'; } 
  },
  category: {
    type: String,
    required: function() { return this.type === 'Expense'; } 
  }
}, {
    discriminatorKey: 'type', 
    versionKey: false
});

// Income and Expense models can be discriminators of the Transaction model
const TransactionModel = mongoose.model('transaction', transactionSchema);

// const IncomeModel = TransactionModel.discriminator('income', new Schema({
//   // specific fields for Income
//   source: { type: Schema.Types.ObjectId, ref: 'source' }
// }));

// const ExpenseModel = TransactionModel.discriminator('expense', new Schema({
//   // specific fields for Expense
//   category: { type: Schema.Types.ObjectId, ref: 'category' }
// }));

export { TransactionModel };
