import mongoose from 'mongoose';

const KYCSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    documentType: { type: String, required: true }, // e.g., 'passport', 'id_card'
    documentNumber: { type: String, required: true },
    documentImageUrl: { type: String }, // URL to uploaded document
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    submittedAt: { type: Date, default: Date.now },
    reviewedAt: { type: Date },
    rejectionReason: { type: String },
  },
  { timestamps: true }
);

const KYC = mongoose.models.KYC || mongoose.model('KYC', KYCSchema);

export default KYC;