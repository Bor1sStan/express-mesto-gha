const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'минимальное кол-во символов 2'],
    maxlength: [30, 'максимальное кол-во символов 30'],
  },
  link: {
    validate: {
      validator: (v) => validator.isURL(v, { protocols: ['http', 'https'], require_protocol: true }),
      message: ({ value }) => `${value} - некоректный фдрес URL. Ожидается адрес в формате: http(s)://(www).site.com`,
    },
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
