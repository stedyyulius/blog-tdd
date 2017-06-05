var express = require('express');
var router = express.Router();
const BlogController = require('../Controllers/blog-controller.js')

/* GET home page. */
router.get('/blog',BlogController.listBlogs)
router.post('/blog',BlogController.addBlog)
router.delete('/blog/:id',BlogController.deleteBlog)
router.put('/blog/:id',BlogController.updateBlog)
router.get('/blog/:id',BlogController.getBlog)
// router.get('/blog/user',BlogController.userBlogs)

module.exports = router;
