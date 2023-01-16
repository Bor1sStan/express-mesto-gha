const jwt = require('jsonwebtoken');
const { JWT } = require('../units/constants');
const UnauthorixedError = require('../errors/unauthorixedError');

module.exports = (req, _, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new UnauthorixedError('Необходима авторизация'));
  }
  let payload;
  try {
    payload = jwt.verify(token, JWT);
  } catch (err) {
    return next(new UnauthorixedError('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};
