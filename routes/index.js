const express = require('express');

const router = express.Router();

const usersRouter = require('./usersRouter');
const cardsRouter = require('./cardsRouter');

router.use('/cards', cardsRouter);
router.use('/users', usersRouter);

module.exports = router;
