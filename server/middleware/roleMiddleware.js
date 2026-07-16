import { errorResponse } from '../utils/apiResponse.js';

export const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return errorResponse(res, 'Admin access required', 403);
  }
  next();
};
