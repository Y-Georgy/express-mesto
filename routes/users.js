const router = require('express').Router(); // создали роутер
const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getUser,
} = require('../controllers/users'); // импортируем контроллеры

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.get('/me', getUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router; // экспортировали роутер
