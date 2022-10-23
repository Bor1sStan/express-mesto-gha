const Card = require('../models/card');

const ERROR_CODE = 500;
const ERROR_DATA_CODE = 400;
const NOT_FOUND_CODE = 404;

const getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send({ cards }))
    .catch(() => res
      .status(ERROR_CODE)
      .send({ message: 'Произошла ошибка на сервере' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ card }))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        return res
          .status(ERROR_DATA_CODE)
          .send({
            message: 'Ошибка валидации. Переданные данные не корректны',
          });
      }
      return res
        .status(ERROR_CODE)
        .send({ message: 'Произошла ошибка на сервере' });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res
          .status(NOT_FOUND_CODE)
          .send({ message: 'Карточка не найдена' });
      }
      return res.send({ card });
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        return res
          .status(ERROR_DATA_CODE)
          .send({
            message: 'Ошибка валидации. Переданные данные не корректны',
          });
      }
      return res.status(ERROR_CODE).send({ message: 'Произошла ошибка на сервере' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        return res
          .status(NOT_FOUND_CODE)
          .send({ message: 'Карточка не найдена' });
      }
      return res.send({ card });
    })
    .catch((e) => {
      if (e.name === 'CastError' || e.name === 'ValidationError') {
        return res
          .status(ERROR_DATA_CODE)
          .send({
            message: 'Ошибка валидации. Переданные данные не корректны',
          });
      }
      return res.status(ERROR_CODE).send({ message: 'Произошла ошибка на сервере' });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res
          .status(NOT_FOUND_CODE)
          .send({ message: 'Карточка не найдена' });
      }
      return res.send({ card });
    })
    .catch((e) => {
      if (e.name === 'CastError' || e.name === 'ValidationError') {
        return res
          .status(ERROR_DATA_CODE)
          .send({
            message: 'Ошибка валидации. Переданные данные не корректны',
          });
      }
      return res.status(ERROR_CODE).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
