import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    password: { type: String },
    role: { type: String, enum: ['student', 'admin'], default: 'student' },
    college: { type: String, trim: true },
    department: { type: String, trim: true },
    semester: { type: String, trim: true },
    city: { type: String, trim: true },
    profileImage: { type: String, default: '' },
    googleId: { type: String },
    isEmailVerified: { type: Boolean, default: false },
    status: { type: String, enum: ['active', 'blocked'], default: 'active' },
    lastLogin: { type: Date },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = async function (password) {
  if (!this.password) return false;
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
