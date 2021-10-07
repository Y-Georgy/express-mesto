const router = require("express").Router(); // создали роутер
const {
  getCards,
  createCard,
  deleteCardById,
<<<<<<< HEAD
  patchProfile,
  patchAvatar,
=======
>>>>>>> main
} = require("../controllers/cards"); // импортируем контроллеры

router.get("/", getCards);
router.post("/", createCard);
router.delete("/:cardId", deleteCardById);
<<<<<<< HEAD
router.patch("/me", patchProfile);
router.patch("/me/avatar", patchAvatar);
=======
router.patch("/:cardId", deleteCardById);
router.patch("/:cardId", deleteCardById);
>>>>>>> main

module.exports = router; // экспортировали роутер
