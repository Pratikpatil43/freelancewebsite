import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    icon: { type: String },
    description: { type: String, required: true },
    technologies: [{ type: String }],
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Service = mongoose.model('Service', serviceSchema);
export default Service;
