import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    role: { type: String, enum: ['Developer', 'Designer', 'Tester', 'Documentation Writer', 'Project Manager'], required: true },
    skills: [{ type: String }],
    profileImage: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);
export default TeamMember;
