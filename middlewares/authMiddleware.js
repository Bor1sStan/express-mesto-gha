const jwt = require('jsonwebtoken');
const { JWT } = require('../units/constants');
const UnauthorixedErrorCode = require('../errors/unauthorixedErrorCode');

module.exports = (req, _, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthorixedErrorCode('Необходима авторизация');
  }
  let payload;
  try {
    payload = jwt.verify(token, JWT);
  } catch (err) {
    return next(new UnauthorixedErrorCode('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};
