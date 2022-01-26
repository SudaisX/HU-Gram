import asyncHandler from 'express-async-handler';

// @desc    Test Route
// @route   GET api/posts
// @access  Public
const testController = async (req, res) => {
    res.json({ test: 'hello' });
};

export { testController };
