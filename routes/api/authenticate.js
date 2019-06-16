const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator/check');
const authenticate = require('../../middleware/authenticate');

const User = require('./../../models/User');

const router = express.Router();

//@route        POST api/authenticate
//@description  User authentication to get a token
//@access       Public
router.post(
  '/',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').isLength({min: 6})
  ],
  async (req, res) => {
    //Find the validation errors in the request
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array() });
    };

    //Deconstruct properties from client request
    let {email, password} = req.body;

    try{
      //Retrieve the user from the DB
      const existingUser = await User.findOne({email});
      if(!existingUser) {
        return res.status(400).json({errors: [{message: 'User does not exist'}]});
      };

      //Verify the password
      const match = await bcrypt.compare(password, existingUser.password);
      if(!match) {
        return res.status(400).json({errors: [{message: 'Invalid credentials'}]});
      };

      //Create token and send the token to client
      const payload = {
        user: {
          id: existingUser.id
        }
      };

      const token = await jwt.sign(payload, config.get('jwtPrivateKey'));
      const user = await User.findById(existingUser.id).select('-password');
      res.json({token, user});

    }catch(err) {
      res.status(400).send(err);
    };
  }
);

//@Route        GET api/authenticate/user
//@Description  Returns user from database
//@Access       Private
router.get(
  '/user',
  authenticate,
  async (req, res) => {
    try{
      let user = await User.findById(req.user.id).select('-password');
      res.json(user);
    }catch(err) {
      res.status(400).json({message: 'User not found'})
    };
});

module.exports = router;
