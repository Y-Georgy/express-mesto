const router = require('express').Router();
const userRouter = require('./users.js');
const cardRouter = require('./cards.js');
// const { ERROR_CODE_404 } = require('../controllers/errorCodes');
const NotFoundError = require('../errors/not-found-err');

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use((req, res, next) => {
  // res.status(ERROR_CODE_404).send({ message: 'Ошибка - некорректный запрос' });
  next(new NotFoundError('Ошибка - некорректный запрос'));
});

module.exports = router;
