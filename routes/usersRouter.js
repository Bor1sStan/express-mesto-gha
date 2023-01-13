const usersRouter = require('express').Router();
const userController = require('../controllers/usersController');
const { validateUserId, validateUserInfo, validateUserAvatar } = require('../units/validators/userValidators');

usersRouter.get('/', userController.getUsers);
usersRouter.get('/:id', validateUserId, userController.getUserById);
usersRouter.get('/me', userController.getProfile);
usersRouter.patch('/me', validateUserInfo, userController.updateUserInfo);
usersRouter.patch('/me', validateUserAvatar, userController.updateUserAvatar);

module.exports = usersRouter;
