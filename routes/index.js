const express = require('express');

// const {
//   NOT_FOUND_CODE,
//   NOT_FOUND_CODE_PAGE_MESSAGE,
// } = require('../units/constants');

const { notFoundController } = require('../controllers/notFoundController');
// надо разобраться с этим безобразием

const router = express.Router();

const usersRouter = require('./usersRouter');
const cardsRouter = require('./cardsRouter');

router.use('/cards', cardsRouter);
router.use('/users', usersRouter);

router.use('*', notFoundController);

// router.use((req, res) => {
//   res.status(NOT_FOUND_CODE).send({ message: NOT_FOUND_CODE_PAGE_MESSAGE });
// });

module.exports = router;
