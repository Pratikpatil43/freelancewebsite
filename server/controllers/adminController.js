import User from '../models/User.js';
import ProjectRequest from '../models/ProjectRequest.js';
import Project from '../models/Project.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';
import { sendProjectEmail } from '../utils/mailer.js';

export const getAdminDashboard = async (req, res, next) => {
  try {
    const [users, requests, projects] = await Promise.all([
      User.countDocuments(),
      ProjectRequest.countDocuments(),
      Project.countDocuments(),
    ]);

    return successResponse(res, 'Admin dashboard summary fetched', {
      totalUsers: users,
      newProjectRequests: requests,
      activeProjects: projects,
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminAnalytics = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 }).limit(4);
    return successResponse(res, 'Admin analytics fetched', { projects });
  } catch (error) {
    next(error);
  }
};

export const getAdminProjectRequests = async (req, res, next) => {
  try {
    const requests = await ProjectRequest.find().sort({ createdAt: -1 });
    return successResponse(res, 'Project requests fetched', { requests });
  } catch (error) {
    next(error);
  }
};

export const getAdminClients = async (req, res, next) => {
  try {
    const clients = await User.find({ role: 'student' }).sort({ createdAt: -1 });
    return successResponse(res, 'Clients fetched', { clients });
  } catch (error) {
    next(error);
  }
};

const allowedStatuses = ['Under Review', 'More Information Required', 'Confirmed', 'In Development', 'Testing', 'Completed', 'Paid', 'Delivered', 'Rejected'];

export const updateProjectRequest = async (req, res, next) => {
  try {
    const request = await ProjectRequest.findById(req.params.id);
    if (!request) return errorResponse(res, 'Project request not found', 404);
    if (req.body.status && !allowedStatuses.includes(req.body.status)) return errorResponse(res, 'Invalid status', 400);
    const previousStatus = request.status;
    if (req.body.status) request.status = req.body.status;
    if (req.body.progress !== undefined) request.progress = Math.min(100, Math.max(0, Number(req.body.progress)));
    if (req.body.adminNotes !== undefined) request.adminNotes = req.body.adminNotes;
    if (req.body.deliveryUrl !== undefined) request.deliveryUrl = req.body.deliveryUrl;
    if (req.body.demoVideoUrl !== undefined) request.demoVideoUrl = req.body.demoVideoUrl;
    if (req.body.deploymentUrl !== undefined) request.deploymentUrl = req.body.deploymentUrl;
    if (req.body.status === 'Completed') request.progress = 100;
    await request.save();
    if (request.status !== previousStatus && request.status === 'Confirmed') {
      await sendProjectEmail({ to: request.email, subject: `Project confirmed: ${request.projectTitle}`, text: `Hello ${request.studentName}, your project ${request.requestId} has been confirmed. Development will begin shortly. You can follow progress and message the team from your dashboard.` });
    }
    if (request.status !== previousStatus && request.status === 'Delivered') {
      const links = [
        request.deliveryUrl && `Project files (Google Drive): ${request.deliveryUrl}`,
        request.demoVideoUrl && `Project demo video: ${request.demoVideoUrl}`,
        request.deploymentUrl && `Live deployment: ${request.deploymentUrl}`,
      ].filter(Boolean).join('\n');
      await sendProjectEmail({ to: request.email, subject: `Your project is ready: ${request.projectTitle}`, text: `Dear ${request.studentName},\n\nGreetings from ProjectDesk! We are pleased to confirm that your project “${request.projectTitle}” has been completed and released successfully.\n\n${links || 'Please sign in to your ProjectDesk dashboard for the delivery details.'}\n\nThank you for choosing ProjectDesk. We wish you every success with your project.\n\nWarm regards,\nProjectDesk Team` });
    }
    return successResponse(res, 'Project updated', { request });
  } catch (error) { next(error); }
};

export const addAdminMessage = async (req, res, next) => {
  try {
    const request = await ProjectRequest.findById(req.params.id);
    if (!request) return errorResponse(res, 'Project request not found', 404);
    request.messages.push({ sender: 'admin', text: req.body.text.trim() });
    await request.save();
    return successResponse(res, 'Message sent', { request });
  } catch (error) { next(error); }
};

export const releaseProject = async (req, res, next) => {
  try {
    const request = await ProjectRequest.findById(req.params.id);
    if (!request) return errorResponse(res, 'Project request not found', 404);
    if (request.status !== 'Paid') return errorResponse(res, 'Verify payment before releasing the project', 400);
    if (!req.body.deliveryUrl && !request.deliveryUrl) return errorResponse(res, 'Google Drive project link is required', 400);
    request.deliveryUrl = req.body.deliveryUrl || request.deliveryUrl;
    request.demoVideoUrl = req.body.demoVideoUrl || request.demoVideoUrl || '';
    request.deploymentUrl = req.body.deploymentUrl || request.deploymentUrl || '';
    const links = [`Project files (Google Drive): ${request.deliveryUrl}`, request.demoVideoUrl && `Demo video: ${request.demoVideoUrl}`, request.deploymentUrl && `Live deployment: ${request.deploymentUrl}`].filter(Boolean).join('\n');
    const emailSent = await sendProjectEmail({ to: request.email, subject: `Project Delivery Complete — ${request.projectTitle} (${request.requestId})`, text: `Dear ${request.studentName},\n\nGreetings from ProjectDesk!\n\nYour payment has been verified and your project “${request.projectTitle}” is ready.\n\nProject ID: ${request.requestId}\nPackage: ${request.package}\nCategory: ${request.projectCategory}\nStatus: Delivered\n\n${links}\n\nThank you for choosing ProjectDesk. We wish you every success with your project.\n\nWarm regards,\nProjectDesk Team` });
    if (!emailSent) return errorResponse(res, 'SMTP email is not configured. Project was not marked delivered.', 503);
    request.status = 'Delivered'; request.progress = 100; await request.save();
    return successResponse(res, emailSent ? 'Project released and delivery email sent' : 'Project released; SMTP is not configured', { request, emailSent });
  } catch (error) { next(error); }
};

export const getPaymentScreenshot = async (req, res, next) => {
  try {
    const request = await ProjectRequest.findById(req.params.id).select('+paymentScreenshot +paymentScreenshotMime');
    if (!request?.paymentScreenshot) return errorResponse(res, 'Payment screenshot not found', 404);
    res.set('Content-Type', request.paymentScreenshotMime || 'image/jpeg');
    res.set('Cache-Control', 'private, no-store');
    return res.send(request.paymentScreenshot);
  } catch (error) { next(error); }
};
