import { errorResponse } from '../utils/apiResponse.js';

export const notFound = (req, res) => {
  errorResponse(res, 'Route not found', 404);
};

export const errorHandler = (err, req, res, next) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  errorResponse(res, message, statusCode, err.errors || null);
};
