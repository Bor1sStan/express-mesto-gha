const User = require('../models/user');
const {
  ERROR_CODE,
  NOT_FOUND_CODE,
  ERROR_DATA_CODE,
  SUCCES_CREATE_CODE,
  ERROR_CODE_MESSAGE,
  ERROR_DATA_CODE_MESSAGE,
  NOT_FOUND_CODE_USER_MESSAGE,
} = require('../units/constants');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка на сервере' }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId).then((user) => {
    if (!user) {
      return res.status(NOT_FOUND_CODE).send({ message: NOT_FOUND_CODE_USER_MESSAGE });
    }
    return res.send({ user });
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_DATA_CODE)
          .send({ message: ERROR_DATA_CODE_MESSAGE });
      }
      return res.status(ERROR_CODE).send({ message: ERROR_CODE_MESSAGE });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(SUCCES_CREATE_CODE).send({ data: user }))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        return res.status(ERROR_DATA_CODE).send({ message: ERROR_DATA_CODE_MESSAGE });
      }
      return res.status(ERROR_CODE).send({ message: ERROR_CODE_MESSAGE });
    });
};

const updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND_CODE).send({ message: NOT_FOUND_CODE_USER_MESSAGE });
      }
      return res.send({ user });
    })
    .catch((e) => {
      if (e.name === 'CastError' || e.name === 'ValidationError') {
        return res.status(ERROR_DATA_CODE).send({ message: ERROR_DATA_CODE });
      }
      return res.status(ERROR_CODE).send({ message: ERROR_CODE_MESSAGE });
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND_CODE).send({ message: NOT_FOUND_CODE_USER_MESSAGE });
      }
      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(ERROR_DATA_CODE).send({ message: ERROR_DATA_CODE_MESSAGE });
      }
      return res.status(ERROR_CODE).send({ message: ERROR_CODE_MESSAGE });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
};
