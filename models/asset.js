import mongoose from 'mongoose';

const AssetSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    coin: { type: String, required: true }, // e.g., 'BTC', 'ETH'
    amount: { type: Number, required: true, default: 0 },
  },
  {timestamps: true}
);

const Asset = mongoose.models.Asset || mongoose.model('Asset', AssetSchema);
export default Asset;