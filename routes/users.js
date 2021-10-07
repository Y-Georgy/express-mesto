const router = require("express").Router(); // создали роутер
const { getUsers, getUserById, createUser } = require("../controllers/users"); // импортируем контроллеры

router.get("/", getUsers);
router.get("/:userId", getUserById);
router.post("/", createUser);

router.get("/users/:userId", (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
});

router.post("/users", (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
});

// patchProfile,
// patchAvatar
