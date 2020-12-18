const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const validations = require('../../validations/validations');

var refreshTokenList = [];
// implemented with the help of below mentioned blog
// https://jasonwatmore.com/post/2020/06/17/nodejs-mongodb-api-jwt-authentication-with-refresh-tokens
// Generate Access Token
const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '60s' });
};

// Generate Refresh Token
const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_KEY, { expiresIn: '60m' });
};

// @route POST/pb/auth/register
router.post('/register', (req, res) => {
  const { errors, isValid } = validations.validateRegistration(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = 'Email address already in use';
      return res.status(403).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      newUser
        .save()
        .then((user) => {
          user.salt = '';
          user.encrypted_password = '';
          const payload = {
            id: user._id,
            name: user.name,
            email: user.email,
          };
          // Sign Token
          const accessToken = generateAccessToken(payload);
          const refreshToken = generateRefreshToken(payload);
          refreshTokenList.push(refreshToken);
          res.cookie('token', accessToken);
          // Return user and token to client
          const { _id, name, email } = user;
          return res.json({
            success: true,
            user: { _id, name, email },
            token: `Bearer ${accessToken}`,
            refresh: refreshToken,
          });
        })
        .catch((err) => console.log(err));
    }
  });
});

// @route POST /pb/auth/login
router.post('/login', (req, res) => {
  const { errors, isValid } = validations.validateLogin(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  // Find the user by email
  User.findOne({ email }).then((user) => {
    // Check for User
    if (!user) {
      errors.email = 'User not found';
      return res.status(400).json(errors);
    } else {
      // Check for Password
      if (!user.authenticate(password)) {
        errors.password = 'Incorrect Password';
        return res.status(400).json(errors);
      }
      // Generate a token for authentication
      const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
      };
      const accessToken = generateAccessToken(payload);
      const refreshToken = generateRefreshToken(payload);
      refreshTokenList.push(refreshToken);
      res.cookie('token', accessToken);
      // Return user and token to client
      const { _id, name, email } = user;
      return res.json({
        success: true,
        user: { _id, name, email },
        token: `Bearer ${accessToken}`,
        refresh: refreshToken,
      });
    }
  });
});

// @route GET /pb/auth/logout
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({
    message: 'Logout Successful',
  });
});

// @route GET /pb/auth/token
router.post('/token', (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) {
    return res.status(401).json({
      errors: 'Refresh Token Not Found',
    });
  }
  if (!refreshTokenList.includes(refreshToken)) {
    return res.status(403).json({
      errors: 'Invalid Refresh Token',
    });
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({
        errors: err,
      });
    }
    console.log(user);
    const accessToken = generateAccessToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });
    res.cookie('token', accessToken);
    const { id, name, email } = user;
    return res.json({
      success: true,
      user: { _id: id, name, email },
      token: `Bearer ${accessToken}`,
    });
  });
});

module.exports = router;
