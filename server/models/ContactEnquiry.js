import mongoose from 'mongoose';

const contactEnquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    projectTopic: { type: String },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'In Discussion', 'Converted', 'Closed'],
      default: 'New',
    },
    internalNotes: { type: String },
  },
  { timestamps: true }
);

const ContactEnquiry = mongoose.model('ContactEnquiry', contactEnquirySchema);
export default ContactEnquiry;
