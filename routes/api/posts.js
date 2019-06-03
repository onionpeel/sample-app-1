const express = require('express');
const {check, validationResult} = require('express-validator/check');
const Post = require('../../models/Post');
const User = require('../../models/User');
const authenticate = require('../../middleware/authenticate');

const router = express.Router();

//@route         POST /api/posts
//@description   Create a post
//@access        Private
router.post(
  '/',
  [
  authenticate,
    [
      check('text', 'A text entry is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    try {
      //Create post
      let post = new Post({
        text: req.body.text,
        user: req.user.id
      });
      //Save post and send response to client
      let newPost = await post.save();
      res.json(newPost);
    }catch(err) {
      console.error(error.message);
      res.status(500).send('Server error');
    };
  }
);

//@route         GET /api/posts
//@description   Retrieves all posts for specified user
//@access        Private
router.get(
  '/',
  authenticate,
  async (req, res) => {
    //String of user ID
    let userId = req.user.id;
    try {
      //Retrieve all posts for a user by userId
      let userPosts = await Post.find({user: userId})
      //Send array of the user's posts to the client
      res.json(userPosts);
    }catch(err) {
      console.log(err);
      res.status(500).send('Server error');
    };
  }
);

//@route         GET /api/posts
//@description   Retrieves a post by ID for specified user
//@access        Private

module.exports = router;
