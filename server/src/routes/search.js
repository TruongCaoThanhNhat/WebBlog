import express from 'express';
import { search } from '../controllers/searchController.js'
const router = express.Router()
router.get('/', search)

const Post = require('../models/PostModel.js');
const User = require('../models/UserModel.js');

// Route để lấy gợi ý tìm kiếm
router.get('/suggestions', async(req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.json({ suggestions: [] });
    }

    try {
        // Tìm kiếm bài viết và người dùng dựa trên từ khóa
        const postSuggestions = await Post.find({ title: new RegExp(query, 'i') }).limit(5);
        const userSuggestions = await User.find({ displayName: new RegExp(query, 'i') }).limit(5);

        const suggestions = [
            ...postSuggestions.map(post => post.title),
            ...userSuggestions.map(user => user.displayName),
        ];

        res.json({ suggestions });
    } catch (error) {
        console.error('Error fetching suggestions', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
export default router