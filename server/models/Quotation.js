import mongoose from 'mongoose';

const quotationSchema = new mongoose.Schema(
  {
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    quotationNumber: { type: String, required: true, unique: true },
    scopeOfWork: { type: String, required: true },
    includedModules: [{ type: String }],
    technologies: [{ type: String }],
    deliveryTimeline: { type: String },
    totalPrice: { type: Number, required: true },
    bookingAmount: { type: Number, required: true },
    paymentMilestones: [{ type: String }],
    revisions: { type: Number, default: 2 },
    termsAndConditions: { type: String },
    validUntil: { type: Date },
    status: { type: String, enum: ['Draft', 'Sent', 'Accepted', 'Rejected', 'Modified'], default: 'Sent' },
  },
  { timestamps: true }
);

const Quotation = mongoose.model('Quotation', quotationSchema);
export default Quotation;
