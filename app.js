const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/index');

const {
  NOT_FOUND_CODE,
  NOT_FOUND_CODE_PAGE_MESSAGE,
} = require('./units/constants');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());

app.use('/', router);

app.use((req, res, next) => {
  req.user = {
    _id: '63556a2f5f4b71e9cb563f6f',
  };

  next();
});

app.use((req, res) => {
  res.status(NOT_FOUND_CODE).send(NOT_FOUND_CODE_PAGE_MESSAGE);
});

app.listen(PORT);
