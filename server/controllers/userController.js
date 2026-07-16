import Project from '../models/Project.js';
import ProjectRequest from '../models/ProjectRequest.js';
import Notification from '../models/Notification.js';
import User from '../models/User.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    return successResponse(res, 'User profile fetched', { user });
  } catch (error) {
    next(error);
  }
};

export const updateUserProfile = async (req, res, next) => {
  try {
    const updates = { ...req.body };
    const user = await User.findById(req.user._id);

    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }

    Object.keys(updates).forEach((key) => {
      if (updates[key] !== undefined && key !== 'password') {
        user[key] = updates[key];
      }
    });

    if (updates.password) {
      user.password = updates.password;
    }

    await user.save();
    return successResponse(res, 'Profile updated successfully', { user: { ...user.toObject(), password: undefined } });
  } catch (error) {
    next(error);
  }
};

export const getDashboardSummary = async (req, res, next) => {
  try {
    const projects = await Project.find({ user: req.user._id });
    const projectRequests = await ProjectRequest.find({ user: req.user._id });
    const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(5);

    const summary = {
      activeProjects: projects.filter((p) => p.status !== 'Completed' && p.status !== 'Delivered').length,
      completedProjects: projects.filter((p) => p.status === 'Completed' || p.status === 'Delivered').length,
      pendingQuotations: projectRequests.filter((p) => p.status === 'Quotation Sent' || p.status === 'New').length,
      outstandingPayments: projects.filter((p) => p.paymentStatus !== 'Paid').length,
      notifications,
      projects,
    };

    return successResponse(res, 'Dashboard summary fetched', summary);
  } catch (error) {
    next(error);
  }
};

export const getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
    return successResponse(res, 'Notifications fetched', { notifications });
  } catch (error) {
    next(error);
  }
};
