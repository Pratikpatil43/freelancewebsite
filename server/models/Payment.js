import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    milestoneName: { type: String },
    amount: { type: Number, required: true },
    paidAmount: { type: Number, default: 0 },
    status: { type: String, enum: ['Pending', 'Partially Paid', 'Paid', 'Overdue', 'Refunded'], default: 'Pending' },
    receiptUrl: { type: String },
    paymentMethod: { type: String, default: 'Manual' },
    paidOn: { type: Date },
  },
  { timestamps: true }
);

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
