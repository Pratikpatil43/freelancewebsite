import mongoose from 'mongoose';

const milestoneSchema = new mongoose.Schema(
  {
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    title: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date },
    dueDate: { type: Date },
    completionDate: { type: Date },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed', 'Blocked'], default: 'Pending' },
    progressPercentage: { type: Number, default: 0 },
    attachedScreenshots: [{ type: String }],
    demoFile: { type: String },
    adminUpdate: { type: String },
  },
  { timestamps: true }
);

const Milestone = mongoose.model('Milestone', milestoneSchema);
export default Milestone;
