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
      res.status(500).send('Server error');
    };
  }
);

//@route         GET /api/posts/:id
//@description   Retrieves a post by ID for specified user
//@access        Private
router.get(
  '/:id',
  authenticate,
  async (req, res) => {
    //Store user ID and post ID in variables
    const postId = req.params.id;
    const userId = req.user.id;
    try{
      //Retrieve from Post collection the post that matches post ID and user ID
      const post = await Post.find({_id: postId, user: userId});
      //Send post to the client
      res.json(post);
    }catch(err) {
      res.status(500).send('Server error');
    };
  }
);


module.exports = router;
