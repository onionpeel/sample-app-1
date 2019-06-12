const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator/check');

const User = require('./../../models/User');

const router = express.Router();

//@route        POST api/users
//@description  Register users
//@access       Public
router.post(
  '/',
  [
    check('name', 'User name is required').isLength({min: 1}),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({min: 6})
  ],
  async (req, res) => {
    //Find the validation errors in the request
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array() });
    };

    //Deconstruct properties from client request
    let {name, email, password} = req.body;

    try {
      //Check if user already exists in database
      let user = await User.findOne({email});
      if(user) {
        return res
        .status(400)
        .json({errors: [{msg: "A user with that email already exists"}]});
      };

      //Encrypt password
      const salt = await bcrypt.genSalt(11);
      password = await bcrypt.hash(password, salt);

      //Create user instance
      user = new User({
        name,
        email,
        password
      });

      //Save user to database
      user = await user.save();

      //Create token and send the token to client
      const payload = {
        user: {
          id: user.id
        }
      };

      const token = await jwt.sign(payload, config.get('jwtPrivateKey'));
      res.json({token});

    } catch(err) {
      res.status(400).send(err);
    };
  }
);


module.exports = router;
