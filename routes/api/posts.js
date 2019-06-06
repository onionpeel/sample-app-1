const express = require('express');
const {check, validationResult} = require('express-validator/check');
const Post = require('../../models/Post');
const User = require('../../models/User');
const authenticate = require('../../middleware/authenticate');

const router = express.Router();

//THIS IS FOR DEVELOPMENT ONLY
//@route         GET /api/posts
//@description   Retrieves all posts from DB
//@access        Public
router.get(
  '/all',
  async (req, res) => {
    try {
      const posts = await Post.find();
      res.status(200).json(posts);
    }catch(err) {
      console.log(err);
      res.status(400).send(err);
    };
  }
);

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
      if(!post) {
        return res.status(404).json({message: 'Post not found'});
      };
      //Send post to the client
      res.json(post);
    }catch(err) {
      res.status(500).send('Server error');
    };
  }
);

//@route        DELETE api/users/:id
//@description  Delete the specified post for a user
//@access       Private
router.delete(
  '/:id',
  authenticate,
  async (req, res) => {
    //Store user ID and post ID in variables
    const postId = req.params.id;
    const userId = req.user.id;
    try{
      //Delete from Post collection the post that matches post ID and user ID
      const deletedPost = await Post.findOneAndDelete({_id: postId, user: userId});
      //Send deleted post to the client
      res.json(deletedPost);
    }catch(err) {
      res.status(500).send('Server error');
    };
  }
);

//@route        PATCH api/users/:id
//@description  Updates the specified post
//@access       Private
router.patch(
  '/:id',
  [
    authenticate,
    [
      check('text', 'A text entry is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    //Store user ID, post ID and text input in variables
    const postId = req.params.id;
    const userId = req.user.id;
    const text = req.body.text;
    try{
      //Delete from Post collection the post that matches post ID and user ID
      const updatedPost = await Post.findOneAndUpdate({_id: postId, user: userId}, {text}, {new: true});
      //Send post to the client
      res.json(updatedPost);
    }catch(err) {
      res.status(500).send('Server error');
    };
  }
);

module.exports = router;
