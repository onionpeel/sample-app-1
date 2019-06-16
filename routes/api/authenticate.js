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
      const user = await User.findOne({email});
      if(!user) {
        return res.status(400).json({errors: [{message: 'User does not exist'}]});
      };

      //Verify the password
      const match = await bcrypt.compare(password, user.password);
      if(!match) {
        return res.status(400).json({errors: [{message: 'Invalid credentials'}]});
      };

      //Create token and send the token to client
      const payload = {
        user: {
          id: user.id
        }
      };

      const token = await jwt.sign(payload, config.get('jwtPrivateKey'));
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
      const user = await User.findById(req.user.id).select('-password');
      console.log(user)
      res.json(user);
    }catch(err) {
      res.status(400).json({message: 'User not found'})
    };
});

module.exports = router;
