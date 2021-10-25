const router = require('express').Router(); // создали роутер
const { createUser } = require('../controllers/users'); // импортируем контроллеры

router.get('/', createUser);

module.exports = router; // экспортировали роутер
