import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const sourceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true
  }
});

const Source = mongoose.model('source', sourceSchema);

export default Source;
