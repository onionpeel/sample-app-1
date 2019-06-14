const jwt = require('jsonwebtoken');
const config = require('config');

const authenticate = (req, res, next) => {
  //Get token from header
  let token = req.header('x-auth-token');
  //Check if token exists
  if(!token) {
    return res.status(401).json({message: 'No token exists, access denied'});
  };
  //Verify token and set user ID property on request object
  try {
    let decodedPayload = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decodedPayload.user;
    next();
  }catch(err) {
    res.status(400).json({message: 'Invalid token'});
  };
};

module.exports = authenticate;
