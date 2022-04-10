import asyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import gravatar from 'gravatar';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';
import Profile from '../models/profileModel.js';

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

// @desc    Delete Profile, User and Posts
// @route   DELETE api/users/:userId
// @access  Private & Admin
const deleteUser = asyncHandler(async (req, res) => {
    try {
        // @todo Remove User's Posts

        // Remove Profile
        await Profile.findOneAndRemove({ user: req.params.userId });

        // Remove User
        await User.findOneAndRemove({ _id: req.params.userId });

        res.json({ msg: 'User and their Profile and their Posts have been deleted' });
    } catch (error) {
        console.error(error.message);
        if (error.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }

        res.status(500).send('Server Error');
    }
});

export { registerUser, deleteUser };
