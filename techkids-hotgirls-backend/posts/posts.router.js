const express = require('express');
const PostsModel = require('./posts.model');

const postRouter = express.Router();

postRouter.get('/', (req, res) => {
  // sortBy: price
  // sortOrder: asc|desc
  const pageNumber = Number(req.query.pageNumber);
  const pageSize = Number(req.query.pageSize);

  // validate
  if (isNaN(pageNumber) || isNaN(pageSize)) {
    res.status(500).json({
      success: false,
      message: 'pageNmber && pageSize is invalid'
    });
  }
  if (pageNumber < 1 || pageSize < 1 || pageSize > 20) {
    res.status(500).json({
      success: false,
      message: 'pageNmber && pageSize is invalid'
    });
  }

  // query db | 1|-1
  PostsModel.find({})
    .sort({createdAt: -1})
    .skip(pageSize * (pageNumber - 1))
    .limit(pageSize)
    .exec((error, data) => {
      if (error) {
        res.status(500).json({
          success: false,
          message: error.message
        });
      } else {
        PostsModel.find({}).countDocuments().exec((err, total) => {
          if (err) {
            res.status(500).json({
              success: false,
              message: err.message
            });
          } else {
            res.status(200).json({
              success: true,
              data: data,
              total: total,
            })
          }
        });
      }
    });
});

postRouter.post('/create', (req, res) => {
  // check user login ?
  if (req.session.currentUser && req.session.currentUser._id) {
    // create post
    const newPost = {
      content: req.body.content,
      imageUrl: req.body.imageUrl,
      author: req.session.currentUser._id,
    };
    PostsModel.create(newPost, (error, data) => {
      if (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(201).json({
          success: true,
          data: data,
        });
      }
    });
  } else {
    res.status(403).json({
      success: false,
      message: 'Unauthenticated',
    });
  }
});

// get-by-id
postRouter.get('/get/:postId', (req, res) => {
  PostsModel.findById(req.params.postId)
    .populate('author', 'email fullName')
    .exec((error, data) => {
      if (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(200).json({
          success: true,
          data: data,
        });
      }
    });
});

module.exports = postRouter;