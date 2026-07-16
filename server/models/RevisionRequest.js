import mongoose from 'mongoose';

const revisionRequestSchema = new mongoose.Schema(
  {
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    relatedMilestone: { type: String },
    screenshotOrFile: { type: String },
    status: {
      type: String,
      enum: ['Submitted', 'Under Review', 'Approved', 'In Progress', 'Completed', 'Rejected'],
      default: 'Submitted',
    },
    adminResponse: { type: String },
    expectedCompletionDate: { type: Date },
  },
  { timestamps: true }
);

const RevisionRequest = mongoose.model('RevisionRequest', revisionRequestSchema);
export default RevisionRequest;
