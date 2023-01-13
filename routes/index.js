const router = require('express').Router();
const userController = require('../controllers/usersController');
const { validateLoginData, validateRegisterData } = require('../units/validators/userValidators');
const auth = require('../middlewares/authMiddleware');
const usersRouter = require('./usersRouter');
const cardsRouter = require('./cardsRouter');

const NotFoundCodeError = require('../errors/notFoundCodeError');

router.post('/signin', validateLoginData, userController.login);
router.post('/signup', validateRegisterData, userController.createUser);

router.use(auth);
router.use('/cards', cardsRouter);
router.use('/users', usersRouter);
router.get('/signout', userController.logout);
router.use(() => {
  throw new NotFoundCodeError('Ресурс не найден. Проверьте адрес');
});

module.exports = router;
