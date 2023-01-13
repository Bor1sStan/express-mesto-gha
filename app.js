const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const errorsHandler = require('./middlewares/errorsHandler');

const router = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(router);
app.use(errors());
app.use(errorsHandler);

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
