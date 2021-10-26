const UnauthorizedError = require('../errors/unauthorized-err');

// eslint-disable-next-line consistent-return
module.exports.auth = (req, res, next) => {
  const { jwt } = req.cookies;

  // TODO проверить в каком виде приходит токен из cookie
  if (!jwt || !jwt.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  let payload;

  // верифицируем токен
  try {
    payload = jwt.verify(jwt, 'some-secret-key');
  } catch (err) {
    // отправим ошибку, если не получилось
    next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  next();
};
