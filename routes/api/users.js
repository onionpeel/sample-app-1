const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator/check');

const router = express.Router();

const User = require('./../../models/User');

//@route        POST api/users
//@description  Register users
//@access       Public
router.post('/', [
  check('email').isEmail(),
  check('name').exists(),
  check('password').isLength({min: 6})
], async (req, res) => {
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
      .json({errors: [{message: "A user with that email already exists"}]});
    };

    //Encrypt password
    password = await bcrypt.hash(password, 11);

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
    const jwtPrivateKey = config.get('jwtPrivateKey');

    jwt.sign(payload, config.get('jwtPrivateKey'), (err, token) => {
      if(err) {
        throw err;
      };
      res.json({token});
    });
  } catch(err) {
    res.status(400).send(err);
  };
});

module.exports = router;
