import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import crypto from 'crypto';
import User from '../models/User.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'devsecret', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

const setAuthCookie = (res, token) => {
  const isProduction = process.env.NODE_ENV === 'production';
  res.cookie('token', token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return errorResponse(res, 'User already exists', 409);
    }

    const user = await User.create({ name, email, phone, password, role: 'student' });
    const token = generateToken(user);
    setAuthCookie(res, token);

    return successResponse(res, 'User registered successfully', {
      user: { ...user.toObject(), password: undefined },
      token,
    }, 201);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return errorResponse(res, 'Invalid email or password', 401);
    }

    if (user.status === 'blocked') {
      return errorResponse(res, 'Account is blocked', 403);
    }

    const token = generateToken(user);
    setAuthCookie(res, token);

    return successResponse(res, 'Login successful', {
      user: { ...user.toObject(), password: undefined },
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const { token } = req.body;
    const ticket = await googleClient.verifyIdToken({ idToken: token, audience: process.env.GOOGLE_CLIENT_ID });
    const payload = ticket.getPayload();

    if (!payload?.email) {
      return errorResponse(res, 'Google authentication failed', 400);
    }

    let user = await User.findOne({ email: payload.email });

    if (user?.role === 'admin') {
      return errorResponse(res, 'Administrator accounts must use the secure admin login portal', 403);
    }

    if (!user) {
      user = await User.create({
        name: payload.name || payload.email,
        email: payload.email,
        phone: '',
        role: 'student',
        googleId: payload.sub,
        profileImage: payload.picture || '',
        isEmailVerified: true,
      });
    }

    const authToken = generateToken(user);
    setAuthCookie(res, authToken);

    return successResponse(res, 'Google sign-in successful', {
      user: { ...user.toObject(), password: undefined },
      token: authToken,
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = (req, res) => {
  const isProduction = process.env.NODE_ENV === 'production';
  res.clearCookie('token', {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
  });
  return successResponse(res, 'Logged out successfully');
};

export const getCurrentUser = async (req, res) => {
  return successResponse(res, 'Current user fetched', {
    user: { ...req.user.toObject(), password: undefined },
  });
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return errorResponse(res, 'No account found for that email', 404);
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = Date.now() + 60 * 60 * 1000;
    await user.save();

    return successResponse(res, 'Password reset token generated', { resetToken });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    const user = await User.findOne({ passwordResetToken: token, passwordResetExpires: { $gt: Date.now() } });

    if (!user) {
      return errorResponse(res, 'Invalid or expired password reset token', 400);
    }

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    return successResponse(res, 'Password reset successfully');
  } catch (error) {
    next(error);
  }
};
