import mongoose from 'mongoose';

const portfolioProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String },
    description: { type: String, required: true },
    technologies: [{ type: String }],
    keyFeatures: [{ type: String }],
    completionTime: { type: String },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const PortfolioProject = mongoose.model('PortfolioProject', portfolioProjectSchema);
export default PortfolioProject;
