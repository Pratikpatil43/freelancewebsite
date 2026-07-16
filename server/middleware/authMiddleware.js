import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { errorResponse } from '../utils/apiResponse.js';

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return errorResponse(res, 'Authentication token missing', 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    const user = await User.findById(decoded.id).select('-password');

    if (!user || user.status === 'blocked') {
      return errorResponse(res, 'User not found or blocked', 401);
    }

    req.user = user;
    next();
  } catch (error) {
    return errorResponse(res, 'Invalid or expired token', 401);
  }
};
