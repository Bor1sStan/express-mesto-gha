const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const { ErrorCode } = require('../errors/errorCode');
const { NotFoundCodeError } = require('../errors/notFoundCodeError');
const { ConflictEmailError } = require('../errors/conflictEmailError');

const {
  SUCCES_CREATE_CODE,
  ERROR_CODE_MESSAGE,
  NOT_FOUND_CODE_USER_MESSAGE,
  JWT,
  NOT_FOUND_CODE_EMAIL_MESSAGE,
} = require('../units/constants');

const getUsers = (req, res, next) => {
  User.find({}).then((users) => res.send(users))
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      if (!user) {
        throw new NotFoundCodeError(NOT_FOUND_CODE_USER_MESSAGE);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorCode(NOT_FOUND_CODE_USER_MESSAGE));
      } else {
        next(err);
      }
    });
};

const createUser = async (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name, about, avatar, email, password: hash,
    });
    res.status(SUCCES_CREATE_CODE).send(newUser);
  } catch (err) {
    if (err.code === 11000) {
      next(new ConflictEmailError(NOT_FOUND_CODE_EMAIL_MESSAGE));
    } else if (err.name === 'ValidationError') {
      next(new ErrorCode(ERROR_CODE_MESSAGE));
    } else {
      next(err);
    }
  }
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUser(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT, { expiresIn: '7d' });
      if (!user) {
        return new NotFoundCodeError(NOT_FOUND_CODE_USER_MESSAGE);
      }
      return res.cookie('token', token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: true,
      }).send({ email });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorCode(err.message));
      } else {
        next(err);
      }
    });
};

const logout = (req, res) => {
  res.clearCookie('token').send({ message: 'Вы вышли из профиля' });
};

const updateUser = (req, res, next, userData) => {
  User.findByIdAndUpdate(
    req.user._id,
    userData,
    {
      new: true,
      runValidation: true,
    },
  )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorCode(ERROR_CODE_MESSAGE));
      } else {
        next(err);
      }
    });
};

const updateUserInfo = (req, res, next) => {
  const userData = {
    name: req.body.name,
    about: req.body.about,
  };
  updateUser(req, res, next, userData);
};

const updateUserAvatar = (req, res, next) => {
  const userData = {
    avatar: req.body.avatar,
  };
  updateUser(req, res, next, userData);
};

const getProfile = (req, res, next) => {
  const userData = {
    name: req.body.name,
    about: req.body.about,
  };
  updateUser(req, res, next, userData);
};

module.exports = {
  getUsers,
  getUserById,
  getProfile,
  createUser,
  updateUser,
  updateUserInfo,
  updateUserAvatar,
  login,
  logout,
};
