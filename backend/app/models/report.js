import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Ensure this matches your User model name
    required: [true, 'User ID is required']
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required'],
    validate: {
      validator: function(endDate) {
        return endDate >= this.startDate;
      },
      message: 'End date must be greater than or equal to start date'
    }
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Catagory', 
  }],
  frequency: {
    type: String,
    enum: ['Daily', 'Weekly', 'Monthly', 'Yearly'],
    required: [true, 'Frequency is required']
  },
  includeExpenses: {
    type: Boolean,
    default: true
  },
  includeIncomes: {
    type: Boolean,
    default: true
  },
  specificSources: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Source', 
  }],
  reportName: {
    type: String,
    required: [true, 'Report name is required'],
    trim: true // Removes any leading or trailing whitespace
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields automatically
});

const Report = mongoose.model('Report', reportSchema);

export default Report;


