import ProjectRequest from '../models/ProjectRequest.js';
import Project from '../models/Project.js';
import Notification from '../models/Notification.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

const makeRequestId = () => {
  return `PD-${Date.now().toString().slice(-6)}`;
};

export const createProjectRequest = async (req, res, next) => {
  try {
    const amount = req.body.package === 'Premium' ? 12000 : 10000;
    const payload = { ...req.body, amount, user: req.user._id, requestId: makeRequestId() };
    const projectRequest = await ProjectRequest.create(payload);

    await Notification.create({
      user: req.user._id,
      title: 'Project request submitted',
      message: `Your project request ${projectRequest.requestId} has been submitted successfully.`,
      type: 'project-request',
      link: '/user/projects',
    });

    await Notification.create({
      user: req.user._id,
      title: 'New project request',
      message: `Admin has a new request from ${projectRequest.studentName}.`,
      type: 'project-request',
      link: '/admin/requests',
    });

    return successResponse(res, 'Project request created successfully', { projectRequest }, 201);
  } catch (error) {
    next(error);
  }
};

export const addProjectMessage = async (req, res, next) => {
  try {
    const projectRequest = await ProjectRequest.findOne({ _id: req.params.id, user: req.user._id });
    if (!projectRequest) return errorResponse(res, 'Project request not found', 404);
    if (projectRequest.status === 'Delivered') return errorResponse(res, 'This project is completed and closed', 409);
    projectRequest.messages.push({ sender: 'student', text: req.body.text.trim() });
    await projectRequest.save();
    return successResponse(res, 'Message sent', { projectRequest });
  } catch (error) { next(error); }
};

export const submitPayment = async (req, res, next) => {
  try {
    const projectRequest = await ProjectRequest.findOne({ _id: req.params.id, user: req.user._id, status: 'Completed' });
    if (!projectRequest) return errorResponse(res, 'Only completed projects can be marked as paid', 400);
    if (!req.file) return errorResponse(res, 'Payment screenshot is required', 400);
    if (!['image/png', 'image/jpeg', 'image/webp'].includes(req.file.mimetype)) return errorResponse(res, 'Upload a PNG, JPG or WebP image', 400);
    projectRequest.paymentScreenshot = req.file.buffer;
    projectRequest.paymentScreenshotMime = req.file.mimetype;
    projectRequest.paymentScreenshotUploaded = true;
    projectRequest.status = 'Payment Submitted';
    await projectRequest.save();
    return successResponse(res, 'Payment submitted for admin verification', { projectRequest });
  } catch (error) { next(error); }
};

export const getProjectRequests = async (req, res, next) => {
  try {
    const projectRequests = await ProjectRequest.find({ user: req.user._id }).sort({ createdAt: -1 });
    return successResponse(res, 'Project requests fetched', { projectRequests });
  } catch (error) {
    next(error);
  }
};

export const getProjectRequestById = async (req, res, next) => {
  try {
    const projectRequest = await ProjectRequest.findOne({ _id: req.params.id, user: req.user._id });
    if (!projectRequest) {
      return errorResponse(res, 'Project request not found', 404);
    }
    return successResponse(res, 'Project request fetched', { projectRequest });
  } catch (error) {
    next(error);
  }
};
