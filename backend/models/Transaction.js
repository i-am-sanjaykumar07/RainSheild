const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['rental', 'refund', 'deposit', 'withdrawal', 'cashback'], required: true },
  amount: { type: Number, required: true },
  description: { type: String },
  paymentId: { type: String },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'completed' },
  withdrawalStatus: { type: String, enum: ['pending', 'completed', 'rejected'], default: 'pending' },
  withdrawalDetails: {
    method: { type: String },
    upiId: { type: String },
    accountName: { type: String },
    accountNumber: { type: String },
    ifscCode: { type: String }
  },
  note: { type: String } // For reference IDs, rejection reasons, etc.
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);