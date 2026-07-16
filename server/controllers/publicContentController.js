import Service from '../models/Service.js';
import PortfolioProject from '../models/PortfolioProject.js';
import PricingPackage from '../models/PricingPackage.js';
import ContactEnquiry from '../models/ContactEnquiry.js';
import { successResponse } from '../utils/apiResponse.js';

export const getLandingContent = async (req, res, next) => {
  try {
    const services = await Service.find({ isPublished: true }).limit(6);
    const portfolio = await PortfolioProject.find({ isPublished: true }).limit(4);
    return successResponse(res, 'Landing content fetched', { services, portfolio });
  } catch (error) {
    next(error);
  }
};

export const getServices = async (req, res, next) => {
  try {
    const services = await Service.find({ isPublished: true });
    return successResponse(res, 'Services fetched', { services });
  } catch (error) {
    next(error);
  }
};

export const getPortfolio = async (req, res, next) => {
  try {
    const portfolio = await PortfolioProject.find({ isPublished: true });
    return successResponse(res, 'Portfolio fetched', { portfolio });
  } catch (error) {
    next(error);
  }
};

export const getPricingPackages = async (req, res, next) => {
  try {
    const packages = await PricingPackage.find({ isEnabled: true });
    return successResponse(res, 'Pricing packages fetched', { packages });
  } catch (error) {
    next(error);
  }
};

export const getContactEnquiries = async (req, res, next) => {
  try {
    const enquiry = await ContactEnquiry.create(req.body);
    return successResponse(res, 'Enquiry submitted successfully', { enquiry }, 201);
  } catch (error) {
    next(error);
  }
};
