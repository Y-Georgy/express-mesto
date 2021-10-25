const { ERROR_CODE_401 } = require('../controllers/errorCodes');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { jwt } = req.cookies;

  // TODO проверить в каком виде приходит токен из cookie
  if (!jwt || !jwt.startsWith('Bearer ')) {
    return res
      .status(ERROR_CODE_401)
      .send({ message: 'Необходима авторизация' });
  }

  let payload;

  // верифицируем токен
  try {
    payload = jwt.verify(jwt, 'some-secret-key');
  } catch (err) {
    // отправим ошибку, если не получилось
    return res
      .status(ERROR_CODE_401)
      .send({ message: 'Необходима авторизация' });
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  next();
};