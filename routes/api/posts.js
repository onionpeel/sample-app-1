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
  '/',
  async (req, res) => {
    try {
      const posts = await Post.find()
        .populate({path: 'user', select: '-password'})
        .sort({date: -1});
      res.status(200).json(posts);
    }catch(err) {
      console.log(err);
      res.status(400).json({message: "There is an error trying to retrieve all posts"});
    };
  }
);

//THIS IS FOR DEVELOPMENT ONLY
//@route         POST /api/posts
//@description   Create a post
//@access        Private
// router.post(
//   '/anyone',
//   [
//     check('text', 'A text entry is required').not().isEmpty()
//   ],
//   async (req, res) => {
//     try {
//       //Create post
//       let post = new Post({
//         text: req.body.text,
//       });
//       //Save post and send response to client
//       let newPost = await post.save();
//       res.json(newPost);
//     }catch(err) {
//       console.error(error.message);
//       res.status(500).send('Server error');
//     };
//   }
// );

//@route         POST /api/posts
//@description   Create a post
//@access        Private
router.post(
  '/',
  [
  authenticate,
    [
      check('text', 'An entry is required').isLength({min: 1})
    ]
  ],
  async (req, res) => {
    //Find the validation errors in the request
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array() });
    };

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
      res.status(500).json({message: "There was an error attempting to post this item"});
    };
  }
);

//@route         GET /api/posts
//@description   Retrieves all posts for specified user
//@access        Private
// router.get(
//   '/',
//   authenticate,
//   async (req, res) => {
//     //String of user ID
//     let userId = req.user.id;
//     try {
//       //Retrieve all posts for a user by userId
//       let userPosts = await Post.find({user: userId})
//         .populate({path: 'user', select: '-password'});
//       //Send array of the user's posts to the client
//       res.json(userPosts);
//     }catch(err) {
//       res.status(500).send('Server error');
//     };
//   }
// );

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
      const post = await Post.find({_id: postId, user: userId})
        .populate({path: 'user', select: '-password'});
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

//TEMPORARY ROUTE ONLY
//@route        DELETE api/users/public/:id
//@description  Delete the specified post for a user
//@access       Private
// router.delete(
//   '/public/:id',
//   async (req, res) => {
//     //Store user ID and post ID in variables
//     const postId = req.params.id;
//     try{
//       //Delete from Post collection the post that matches post ID and user ID
//       const deletedPost = await Post.findOneAndDelete({_id: postId});
//       //Send deleted post to the client
//       res.json(deletedPost);
//     }catch(err) {
//       res.status(500).send('Server error');
//     };
//   }
// );

//@route        DELETE api/posts/:id
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
      res.status(400).json({message: 'There was an error in attempting to delete this post'});
    };
  }
);

//@route        PATCH api/posts/:id
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
