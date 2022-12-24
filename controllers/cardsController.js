const Card = require('../models/cardModel');
const {
  ERROR_CODE,
  NOT_FOUND_CODE,
  ERROR_DATA_CODE,
  SUCCES_CREATE_CODE,
  ERROR_CODE_MESSAGE,
  ERROR_DATA_CODE_MESSAGE,
  NOT_FOUND_CODE_CART_MESSAGE,
} = require('../units/constants');

const getCards = (req, res) => {
  Card.find({})
    .populate('owner', 'likes')
    .then((cards) => res.send({ cards }))
    .catch(() => res
      .status(ERROR_CODE)
      .send({ message: ERROR_CODE_MESSAGE }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(SUCCES_CREATE_CODE).send({ card }))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        return res
          .status(ERROR_DATA_CODE)
          .send({ message: ERROR_DATA_CODE_MESSAGE });
      }
      return res
        .status(ERROR_CODE)
        .send({ message: ERROR_CODE_MESSAGE });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res
          .status(NOT_FOUND_CODE)
          .send({ message: NOT_FOUND_CODE_CART_MESSAGE });
      }
      return res.send({ card });
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        return res
          .status(ERROR_DATA_CODE)
          .send({ message: ERROR_DATA_CODE_MESSAGE });
      }
      return res.status(ERROR_CODE).send({ message: ERROR_CODE_MESSAGE });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res
          .status(NOT_FOUND_CODE)
          .send({ message: NOT_FOUND_CODE_CART_MESSAGE });
      }
      return res.send({ card });
    })
    .catch(() => res.status(ERROR_CODE).send({ message: ERROR_CODE_MESSAGE }));
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
          .send({ message: NOT_FOUND_CODE_CART_MESSAGE });
      }
      return res.send({ card });
    })
    .catch(() => res.status(ERROR_CODE).send({ message: ERROR_DATA_CODE_MESSAGE }));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
