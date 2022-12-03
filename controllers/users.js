const mongoose = require('mongoose');
const User = require('../models/user');

// eslint-disable-next-line consistent-return
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    return res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};

const getUserById = (req, res) => {
  User.findById(req.params.userId).orFail(new Error('NotFound'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      if (err instanceof mongoose.Error.CastError) {
        return res.status(400).send({ message: 'Некоректный id' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
  } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return res.status(400).send({ message: 'Ошибка валидации' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

// eslint-disable-next-line consistent-return
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send('Пользователь не найден');
    }
    const { name, about } = req.body;
    // eslint-disable-next-line max-len
    const newUser = await User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true });
    res.send(newUser);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError || err instanceof mongoose.Error.CastError) {
      return res.status(400).send({ message: 'Ошибка валидации. Переданные данные не корректны' });
    }
    return res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};

// eslint-disable-next-line consistent-return
const updateAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send('Пользователь не найден');
    }
    const { avatar } = req.body;
    // eslint-disable-next-line max-len
    const newAvatar = User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidation: true });
    res.send(newAvatar);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError || err instanceof mongoose.Error.CastError) {
      res.status(400).send({ message: 'Ошибка валидации. Переданные данные не корректны' });
    }
    return res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
