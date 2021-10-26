const router = require('express').Router(); // создали роутер
const { celebrate, Joi } = require('celebrate'); // валидация приходящих данных
const {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards'); // импортируем контроллеры

router.get('/', getCards);
router.post('/', celebrate({
  // валидируем body
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(), // TODO сделать валидацию ссылки по регулярному выражению
  }),
}), createCard);
router.delete('/:cardId', celebrate({
  // валидируем параметры
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24),
  }),
}), deleteCardById);
router.put('/:cardId/likes', celebrate({
  // валидируем параметры
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24),
  }),
}), likeCard);
router.delete('/:cardId/likes', celebrate({
  // валидируем параметры
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24),
  }),
}), dislikeCard);

module.exports = router; // экспортировали роутер
