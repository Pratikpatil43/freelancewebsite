export const successResponse = (res, message, data = null, status = 200) => {
  res.status(status).json({ success: true, message, data });
};

export const errorResponse = (res, message, status = 500, errors = null) => {
  res.status(status).json({ success: false, message, errors });
};
