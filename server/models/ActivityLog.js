import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    action: { type: String, required: true },
    entityType: { type: String },
    entityId: { type: mongoose.Schema.Types.ObjectId },
    details: { type: String },
  },
  { timestamps: true }
);

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);
export default ActivityLog;
