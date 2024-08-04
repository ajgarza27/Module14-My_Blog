const router = require('express').Router();

// Import route modules
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

// Routes for user-related operations
router.use('/users', userRoutes); 
// Routes for post-related operations
router.use('/posts', postRoutes); 
// Routes for comment-related operations
router.use('/comments', commentRoutes);

module.exports = router;