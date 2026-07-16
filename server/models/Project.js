import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    projectRequest: { type: mongoose.Schema.Types.ObjectId, ref: 'ProjectRequest' },
    title: { type: String, required: true },
    category: { type: String, required: true },
    status: {
      type: String,
      enum: ['Requested', 'Quotation Sent', 'Confirmed', 'In Development', 'Testing', 'Revision', 'Completed', 'Delivered', 'Cancelled'],
      default: 'Requested',
    },
    progress: { type: Number, default: 0 },
    currentMilestone: { type: String, default: 'Requirement Review' },
    assignedDeveloper: { type: mongoose.Schema.Types.ObjectId, ref: 'TeamMember' },
    startDate: { type: Date },
    deliveryDate: { type: Date },
    paymentStatus: { type: String, enum: ['Pending', 'Partially Paid', 'Paid', 'Overdue'], default: 'Pending' },
    totalAmount: { type: Number, default: 0 },
    paidAmount: { type: Number, default: 0 },
    remainingAmount: { type: Number, default: 0 },
    requirements: { type: String },
    internalNotes: { type: String },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', projectSchema);
export default Project;
