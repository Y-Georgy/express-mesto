const router = require("express").Router(); // создали роутер
const {
  getCards,
  createCard,
  deleteCardById,
  patchProfile,
  patchAvatar,
} = require("../controllers/cards"); // импортируем контроллеры

router.get("/", getCards);
router.post("/", createCard);
router.delete("/:cardId", deleteCardById);
router.patch("/me", patchProfile);
router.patch("/me/avatar", patchAvatar);

module.exports = router; // экспортировали роутер
