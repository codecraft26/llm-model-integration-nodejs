import ErrorHander from '../utils/errorhander.js';
import catchAsyncErrors from './catchAsyncErrors.js';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import dotenv from 'dotenv'


dotenv.config({
  path:'./.env'
})

export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  
  if (!token) {
    return next(new ErrorHander('Please Login to access this resource', 401));
  }
  
  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
  } catch (error) {
    return next(new ErrorHander('Invalid token, please log in again', 401));
  }
});

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHander(`Role: ${req.user.role} is not allowed to access this resource`, 403)
      );
    }

    next();
  };
};