const cardsRouter = require('express').Router();
const cardController = require('../controllers/cardsController');
const { validateCardId, validateCardData } = require('../units/validators/cardValidators');

cardsRouter.get('/', cardController.getCards);
cardsRouter.delete('/:cardId', validateCardId, cardController.deleteCard);
cardsRouter.delete('/:cardId/likes', validateCardId, cardController.dislikeCard);
cardsRouter.put('/:cardId/likes', validateCardId, cardController.likeCard);
cardsRouter.post('/', validateCardData, cardController.createCard);

module.exports = cardsRouter;
