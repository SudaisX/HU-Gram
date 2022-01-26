import asyncHandler from 'express-async-handler';

// @desc    Test Route
// @route   GET api/profiles
// @access  Public
const testController = async (req, res) => {
    res.json({ test: 'hello' });
};

export { testController };
