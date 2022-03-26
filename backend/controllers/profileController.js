import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Profile from '../models/profileModel.js';

// @desc    Get Current User's Profile
// @route   GET api/profile/me
// @access  Private
const getCurrProfile = asyncHandler(async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', [
            'name',
            'avatar',
        ]);

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

export { getCurrProfile };
