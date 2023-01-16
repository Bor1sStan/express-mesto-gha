const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const UnauthorixedErrorCode = require('../errors/unauthorixedError');
const {
  WRONG_EMAIL_OR_PASSWORD_MESSAGE,
} = require('../units/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'минимальное кол-во символов 2'],
    maxlength: [30, 'максимальное кол-во символов 30'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'минимальное кол-во символов 2'],
    maxlength: [30, 'максимальное кол-во символов 30'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v, { protocols: ['http', 'https'], require_protocol: true }),
      message: ({ value }) => `${value} - некоректный фдрес URL. Ожидается адрес в формате: http(s)://(www).site.com`,
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: ({ value }) => `${value} - некорректный email`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, { toObject: { useProjection: true }, toJSON: { useProjection: true } });

userSchema.statics.findUser = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorixedErrorCode(WRONG_EMAIL_OR_PASSWORD_MESSAGE));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorixedErrorCode(WRONG_EMAIL_OR_PASSWORD_MESSAGE));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
