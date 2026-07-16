import mongoose from 'mongoose';

const projectFileSchema = new mongoose.Schema(
  {
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fileName: { type: String, required: true },
    fileCategory: { type: String, required: true },
    url: { type: String, required: true },
    size: { type: Number, default: 0 },
    description: { type: String },
    downloadPermission: { type: String, enum: ['Admin', 'Student', 'Both'], default: 'Both' },
  },
  { timestamps: true }
);

const ProjectFile = mongoose.model('ProjectFile', projectFileSchema);
export default ProjectFile;
