const express = require('express');

const { notFoundController } = require('../controllers/notFoundController');

const router = express.Router();

const usersRouter = require('./usersRouter');
const cardsRouter = require('./cardsRouter');

router.use('/cards', cardsRouter);
router.use('/users', usersRouter);

router.use('*', notFoundController);

module.exports = router;
