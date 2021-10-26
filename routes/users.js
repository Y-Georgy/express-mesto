const router = require('express').Router(); // создали роутер
const { celebrate, Joi } = require('celebrate'); // валидация приходящих данных
const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getUser,
} = require('../controllers/users'); // импортируем контроллеры

router.get('/', getUsers);
router.get('/:userId', celebrate({
  // валидируем параметры
  params: Joi.object().keys({
    userId: Joi.string().required().alphanum().length(24),
  }),
}), getUserById);
router.get('/me', getUser);
router.patch('/me', celebrate({
  // валидируем body
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfile);
router.patch('/me/avatar', updateAvatar); // TODO валидация ссылки

module.exports = router; // экспортировали роутер
