const router = require("express").Router(); // создали роутер
const Card = require("../models/card"); // импортируем модель

router.get("/", (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
});

router.post("/", (req, res) => {
  // console.log(req.body);
  const { name, link } = req.body;
  const owner = req.user._id;

  console.log({ name, link, owner });

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
});

//DELETE /cards/:cardId
router.delete("/:cardId", (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
});

module.exports = router; // экспортировали роутер
