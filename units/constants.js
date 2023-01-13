const SUCCES_CREATE_CODE = 201;

const SERVER_ERROR_CODE_MESSAGE = 'Произошла ошибка на сервере';
const ERROR_CODE_MESSAGE = 'Ошибка валидации. Переданные данные не корректны';
const NOT_FOUND_CODE_USER_MESSAGE = 'Пользователь не найден';
const NOT_FOUND_CODE_CARD_MESSAGE = 'Карточка не найдена';
const NOT_FOUND_CODE_PAGE_MESSAGE = 'Страница не найдена';
const NOT_FOUND_CODE_MATCHED_MESSAGE = 'Пароль неверный';
const NOT_FOUND_CODE_EMAIL_MESSAGE = 'Пользователь с тиким email уже существует';
const SUCCES_LOGIN_MESSAGE = 'Пользователь успешно залогинелся';
const FORBIDDEN_ERROR_CARD_MESSAGE = 'Чужие карточки удалять нельзя!';
const WRONG_EMAIL_OR_PASSWORD_MESSAGE = 'Неправильные почта или пароль';

const JWT = 'ecac93fb9cedcfc00ffb549cc8934adac8a6aab4d74758e9c12481d9611fb16c';
const URL_REGEXP = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

module.exports = {
  SUCCES_CREATE_CODE,
  SERVER_ERROR_CODE_MESSAGE,
  ERROR_CODE_MESSAGE,
  NOT_FOUND_CODE_USER_MESSAGE,
  NOT_FOUND_CODE_CARD_MESSAGE,
  NOT_FOUND_CODE_PAGE_MESSAGE,
  NOT_FOUND_CODE_MATCHED_MESSAGE,
  NOT_FOUND_CODE_EMAIL_MESSAGE,
  SUCCES_LOGIN_MESSAGE,
  FORBIDDEN_ERROR_CARD_MESSAGE,
  WRONG_EMAIL_OR_PASSWORD_MESSAGE,
  JWT,
  URL_REGEXP,
};
