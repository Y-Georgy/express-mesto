const router = require('express').Router(); // создали роутер
const { login } = require('../controllers/users'); // импортируем контроллеры

router.get('/', login);

module.exports = router; // экспортировали роутер
