const router = require("express").Router(); // создали роутер
const User = require("../models/user"); // импортируем модель

router.get("/", (req, res) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
      // console.log("users");
    })
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
});

router.get("/:userId", (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      res.send({ data: user });
      // console.log("userid");
    })
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
});

router.post("/", (req, res) => {
  const { name, about, avatar } = req.body;
  // console.log(req.body);
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
});

module.exports = router; // экспортировали роутер
