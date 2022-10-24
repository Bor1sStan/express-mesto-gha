const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// const router = express.Router();
const cardsRouter = require('./routes/cardsRouter');
const usersRouter = require('./routes/usersRouter');

const NOT_FOUND_CODE = 404;

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '63556a2f5f4b71e9cb563f6f',
  };

  next();
});

app.use('/cards', cardsRouter);
app.use('/users', usersRouter);

app.use((req, res) => {
  res.status(NOT_FOUND_CODE).send({ message: 'Страница не найдена' });
});

app.listen(PORT);
