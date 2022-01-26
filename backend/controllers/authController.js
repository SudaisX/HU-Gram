import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// @desc    Test Route
// @route   GET api/auth
// @access  Public
const auth = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    res.json(user);
});

export { auth };
