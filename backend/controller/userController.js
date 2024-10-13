import User from '../models/userModel.js';
import catchAsyncErrors from '../middleware/catchAsyncErrors.js';
import sendToken from '../utils/jwtToken.js';
import ErrorHander from '../utils/errorhander.js';

// Register User
export const registerUser = catchAsyncErrors(async (req, res, next) => {
    const {  email, password } = req.body;

    try {
        // Check if user exists with the same email or username
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            if (existingUser.email === email) {
                return next(new ErrorHander('Email already exists. Please use a different email.', 400));
            }
        }

        // Create new user
        const user = await User.create({  email, password });

        // Send JWT token as response
        sendToken(user, 201, res);
    } catch (err) {
        return next(new ErrorHander(err.message, 500));
    }
});


// Login User
export const loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // Check if user has provided both email and password
    if (!email || !password) {
        return next(new ErrorHander('Please enter email and password', 400));
    }

    // Find user by email
    const user = await User.findOne({ email }).select('+password'); // Ensure password field is selected

    // Check if user exists
    if (!user) {
        return next(new ErrorHander('Invalid email or password', 401));
    }

    // Check if password matches
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHander('Invalid email or password', 401));
    }

    // Send JWT token as response
    sendToken(user, 200, res);
});

export const logout = catchAsyncErrors(async (req, res, next) => {
    // Clear the 'token' cookie to log the user out
    res.cookie('token', null, {
        expires: new Date(Date.now()), // Set the expiration date to now, effectively deleting it
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Secure cookies only in production
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax'
    });

    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
});