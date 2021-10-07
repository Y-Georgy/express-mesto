const router = require("express").Router(); // создали роутер
const {
  getCards,
  createCard,
  deleteCardById,
} = require("../controllers/cards"); // импортируем контроллеры

router.get("/", getCards);
router.post("/", createCard);
router.delete("/:cardId", deleteCardById);
router.patch("/:cardId", deleteCardById);
router.patch("/:cardId", deleteCardById);

module.exports = router; // экспортировали роутер
