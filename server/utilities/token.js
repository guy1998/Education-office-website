const jwt = require('jsonwebtoken');
require('dotenv').config();

const tokenChecker = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    return { result: true, payload: decoded };
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return { result: false, code: 2 }
    } else {
      return { result: false, code: 3 }
    }
  }
}

const userFromPayload = (payload) => {
  return {
    _id: payload._id,
    name: payload.name,
    username: payload.username,
    password: payload.password,
    email: payload.email
  }
}

const tokenRefresher = (refreshToken) => {
  console.log('Refreshing token');
  const checkToken = tokenChecker(refreshToken);
  if (checkToken.result) {
    return { result: true, content: jwt.sign(userFromPayload(checkToken.payload), process.env.JWT_KEY, { expiresIn: 900 }) }
  } else if (checkToken.code === 2) {
    return { result: false, content: "Token expired" }
  } else {
    return { result: false, content: "Token is invalid" }
  }
}

const authorize = (req, res, proceeding) => {
  const tokens = req.cookies.tokenCookie;
  if (tokens) {
    const checkAccess = tokenChecker(tokens.accessToken);
    if (checkAccess.result) {
      proceeding();
    } else {
      const refreshAccess = tokenRefresher(tokens.refreshToken);
      if (refreshAccess.result) {
        res.cookie('tokenCookie', { accessToken: refreshAccess.content, refreshToken: tokens.refreshToken }, {
          maxAge: 3600000,
          httpOnly: true,
          secure: true,
          sameSite: 'none',
        });
        proceeding();
      } else {
        res.status(401).json(refreshAccess.content);
      }
    }
  } else {
    res.status(401).json('No token presented');
  }
}

module.exports = authorize;