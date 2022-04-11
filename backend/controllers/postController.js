import asyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import User from '../models/userModel.js';
import Profile from '../models/profileModel.js';
import Post from '../models/postModel.js';

// @desc    Create a Post
// @route   POST api/posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id,
        });
        if (req.body.image) newPost.image = req.body.image;

        const post = await newPost.save();

        res.json(post);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @desc    Get all Posts
// @route   GET api/posts
// @access  Private
const getAllPosts = asyncHandler(async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

export { createPost, getAllPosts };
