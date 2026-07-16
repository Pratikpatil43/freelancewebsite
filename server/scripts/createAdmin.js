import 'dotenv/config';
import connectDB from '../config/db.js';
import User from '../models/User.js';

const run = async () => {
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD || !process.env.ADMIN_NAME) {
    throw new Error('Set ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD in server/.env first.');
  }
  if (process.env.ADMIN_PASSWORD.length < 12) throw new Error('ADMIN_PASSWORD must contain at least 12 characters.');
  await connectDB();
  const existing = await User.findOne({ email: process.env.ADMIN_EMAIL.toLowerCase() });
  if (existing) {
    existing.name = process.env.ADMIN_NAME; existing.password = process.env.ADMIN_PASSWORD; existing.role = 'admin'; existing.status = 'active'; await existing.save();
    console.log('Admin account updated securely.');
  } else {
    await User.create({ name: process.env.ADMIN_NAME, email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD, role: 'admin', isEmailVerified: true });
    console.log('Admin account created securely.');
  }
  process.exit(0);
};
run().catch((error) => { console.error(error.message); process.exit(1); });
