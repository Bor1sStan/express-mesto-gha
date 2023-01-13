const Card = require('../models/cardModel');
const {
  SUCCES_CREATE_CODE,
  ERROR_CODE_MESSAGE,
  SERVER_ERROR_CODE_MESSAGE,
  NOT_FOUND_CODE_CARD_MESSAGE,
  NOT_FOUND_CODE_USER_MESSAGE,
  FORBIDDEN_ERROR_CARD_MESSAGE,
} = require('../units/constants');
const { ErrorCode } = require('../errors/errorCode');
const { ServerErrorCode } = require('../errors/serverErrorCode');
const { NotFoundCodeError } = require('../errors/notFoundCodeError');
const { ForbiddenError } = require('../errors/forbiddenError');

const getCards = (req, res, next) => {
  Card.find({}).then((cards) => res.send({ cards }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(SUCCES_CREATE_CODE).send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorCode(ERROR_CODE_MESSAGE));
      } else {
        next(new ServerErrorCode(SERVER_ERROR_CODE_MESSAGE));
      }
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundCodeError(NOT_FOUND_CODE_USER_MESSAGE);
      } if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError(FORBIDDEN_ERROR_CARD_MESSAGE);
      }
      Card.findByIdAndRemove(req.params.cardId)
        .then(() => res.send({ message: 'Пост удален' }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorCode(SERVER_ERROR_CODE_MESSAGE));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundCodeError(NOT_FOUND_CODE_USER_MESSAGE))
    .then((card) => {
      if (!card) {
        return next(new NotFoundCodeError(NOT_FOUND_CODE_CARD_MESSAGE));
      }
      return res.send({ card, message: 'Лайк поставлен' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorCode(SERVER_ERROR_CODE_MESSAGE));
      } else {
        next(err);
      }
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundCodeError(NOT_FOUND_CODE_USER_MESSAGE))
    .then((card) => {
      if (!card) {
        return next(new NotFoundCodeError(NOT_FOUND_CODE_CARD_MESSAGE));
      }
      return res.send({ card, message: 'Лайк удален' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorCode(NOT_FOUND_CODE_CARD_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
