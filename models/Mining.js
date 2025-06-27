import mongoose from 'mongoose';

const MiningSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    hashRate: { type: Number, required: true }, // e.g., 60, 120, 240, 480
    reward: { type: Number, required: true },   // BTC earned
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    startedAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

const Mining = mongoose.models.Mining || mongoose.model('Mining', MiningSchema);

export default Mining;