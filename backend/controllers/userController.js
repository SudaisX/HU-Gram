import asyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import gravatar from 'gravatar';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

// @desc    Register a New User
// @route   POST api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    // Check if User Exists
    const userExist = await User.findOne({ email: email });
    if (userExist) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    // Get User Gravatar // Replace it with a default kabbu image
    const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
    });

    const user = await User.create({
        name,
        email,
        avatar,
        password,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        return res.status(400).json({ errors: [{ msg: 'Invalid User Data' }] });
    }
});

export { registerUser };
