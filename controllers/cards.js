const Card = require('../models/card'); // импортируем модель
const IncorrectDataError = require('../errors/incorrect-data-err');
// const UnauthorizedError = require('../errors/unauthorized-err');
const ForbiddenDataError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');

// const {
//   ERROR_CODE_400,
//   ERROR_CODE_403,
//   ERROR_CODE_404,
//   ERROR_CODE_500,
// } = require('./errorCodes');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    // .catch(() => {
    //   res.status(ERROR_CODE_500).send({ message: 'Произошла ошибка' });
    // });
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        // return res.status(ERROR_CODE_400).send({
        //   message: 'Переданы некорректные данные при создании карточки',
        // });
        next(new IncorrectDataError('Переданы некорректные данные при создании карточки'));
      }
      // return res.status(ERROR_CODE_500).send({ message: 'Произошла ошибка' });
      next(err);
    });
};

module.exports.deleteCardById = (req, res, next) => {
  const { cardId } = req.params;
  const { userId } = req.user._id;

  Card.findById(cardId)
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (!card) {
        // return res.status(ERROR_CODE_404).send({
        //   message: 'Карточка с указанным _id не найдена',
        // });
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
      if (card.owner._id === userId) {
        Card.findByIdAndRemove(cardId)
          .orFail(() => {
            // const error = new Error('Карточка с указанным _id не найдена');
            // error.statusCode = 404;
            // throw error;
            throw new NotFoundError('Карточка с указанным _id не найдена');
          })
          .then((deletedCard) => {
            res.send({ data: deletedCard });
          })
          .catch((err) => {
            // if (err.statusCode === 404) {
            //   return res.status(err.statusCode).send({ message: err.message });
            // }
            if (err.name === 'CastError') {
              // return res.status(ERROR_CODE_400).send({
              //   message: 'Передан некорректный id при удалении карточки',
              // });
              next(new IncorrectDataError('Передан некорректный id при удалении карточки'));
            }
            // return res.status(ERROR_CODE_500).send({ message: 'Произошла ошибка' });
            next(err);
          });
      } else {
        // return res.status(ERROR_CODE_403).send({
        //   message: 'У Вас нет прав на удаление карточки с этим id',
        // });
        next(new ForbiddenDataError('У Вас нет прав на удаление карточки с этим id'));
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (card) {
        return res.send({ data: card });
      }
      // return res.status(ERROR_CODE_404).send({
      //   message: 'Передан несуществующий _id карточки',
      // });
      throw new NotFoundError('Передан несуществующий _id карточки');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        // return res.status(ERROR_CODE_400).send({
        //   message: 'Переданы некорректные данные для постановки/снятии лайка',
        // });
        next(new IncorrectDataError('Переданы некорректные данные для постановки/снятии лайка'));
      }
      // return res.status(ERROR_CODE_500).send({ message: 'Произошла ошибка' });
      next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (card) {
        return res.send({ data: card });
      }
      // return res.status(ERROR_CODE_404).send({
      //   message: 'Передан несуществующий _id карточки',
      // });
      throw new NotFoundError('Передан несуществующий _id карточки');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        // return res.status(ERROR_CODE_400).send({
        //   message: 'Переданы некорректные данные для постановки/снятии лайка',
        // });
        next(new IncorrectDataError('Переданы некорректные данные для постановки/снятии лайка'));
      }
      // return res.status(ERROR_CODE_500).send({ message: 'Произошла ошибка' });
      next(err);
    });
};
