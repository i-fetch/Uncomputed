import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['deposit', 'withdrawal', 'transfer', 'mining_reward'],
      required: true,
    },
    coin: { type: String, required: true }, // e.g., BTC, ETH
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    txHash: { type: String }, // Blockchain transaction hash if applicable
    toAddress: { type: String }, // For withdrawals/transfers
    fromAddress: { type: String }, // For deposits/transfers
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);

export default Transaction;