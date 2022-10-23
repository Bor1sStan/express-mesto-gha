const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');

const NOT_FOUND_CODE = 404;

const { PORT = 3000 } = process.env;
const app = express();

// app.use((req, res, next) => {
//   req.user = {
//     _id: '36c0e76f0e695277fffa6ade',
//   };

//   next();
// });

app.use('/', router);
app.use((req, res) => {
  res.status(NOT_FOUND_CODE).send({ message: 'Страница не найдена' });
});

function main() {
  mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });
  app.listen(PORT);
}

main();

// _id: "36c0e76f0e695277fffa6ade"  мой айди c прошлого проекта
