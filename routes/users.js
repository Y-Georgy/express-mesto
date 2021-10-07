const router = require("express").Router(); // создали роутер
const { getUsers, getUserById, createUser } = require("../controllers/users"); // импортируем контроллеры

router.get("/", getUsers);
router.get("/:userId", getUserById);
router.post("/", createUser);

module.exports = router; // экспортировали роутер
