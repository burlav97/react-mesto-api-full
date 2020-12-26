require('dotenv').config();
const jwt = require('jsonwebtoken');
const AuthError = require('../error/auth-err');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    const error = new AuthError('Необходима авторизация');
    next(error);
  }
  req.user = payload;
  next();
};

module.exports = auth;
