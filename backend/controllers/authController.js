import asyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

// @desc    Get User
// @route   GET api/auth
// @access  Public
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    res.json(user);
});

// @desc    Authenticate User & Get Token
// @route   POST api/auth
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Check if User Exists
    const user = await User.findOne({ email: email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }
});

export { getUser, loginUser };
