const router = require('express').Router();
const userRouter = require('./users.js');
const cardRouter = require('./cards.js');
const loginRouter = require('./login.js');
const createUserRouter = require('./createUser.js');
const { ERROR_CODE_404 } = require('../controllers/errorCodes');

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('/signin', loginRouter);
router.use('/signup', createUserRouter);
router.use((req, res) => {
  res.status(ERROR_CODE_404).send({ message: 'Ошибка - некорректный запрос' });
});

module.exports = router;
