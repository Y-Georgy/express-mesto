const Card = require("../models/card"); // импортируем модель
const {
  ERROR_CODE_400,
  ERROR_CODE_404,
  ERROR_CODE_500,
} = require("./errorCodes");

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) =>
      res.status(ERROR_CODE_500).send({ message: "Произошла ошибка" })
    );
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(ERROR_CODE_400).send({
          message: "Переданы некорректные данные при создании карточки",
        });
      }
      res.status(ERROR_CODE_500).send({ message: "Произошла ошибка" });
    });
};

module.exports.deleteCardById = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(ERROR_CODE_404).send({
          message: "Карточка с указанным _id не найдена",
        });
      }
      res.status(ERROR_CODE_500).send({ message: "Произошла ошибка" });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(ERROR_CODE_400).send({
          message: "Переданы некорректные данные для постановки/снятии лайка",
        });
      }
      if (err.name === "CastError") {
        return res.status(ERROR_CODE_404).send({
          message: "Передан несуществующий _id карточки",
        });
      }
      res.status(ERROR_CODE_500).send({ message: "Произошла ошибка" });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true, runValidators: true }
  )
    .then((card) => {
      if (card) {
        return res.send({ data: card });
      }
      return res.status(ERROR_CODE_404).send({
        message: "Передан несуществующий _id карточки",
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(ERROR_CODE_400).send({
          message: "Переданы некорректные данные для постановки/снятии лайка",
        });
      }
      res.status(ERROR_CODE_500).send({ message: "Произошла ошибка" });
    });
};
