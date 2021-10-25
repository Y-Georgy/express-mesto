const bcrypt = require('bcryptjs'); // установленный модуль для хеширования пароля
const validator = require('validator');
const jwt = require('jsonwebtoken'); // модуль для создания токенов
const User = require('../models/user'); // импортируем модель
const IncorrectDataError = require('../errors/incorrect-data-err');
const UnauthorizedError = require('../errors/unauthorized-err');
// const ForbiddenDataError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');

// const {
//   ERROR_CODE_400,
//   ERROR_CODE_401,
//   ERROR_CODE_404,
//   ERROR_CODE_500,
// } = require('./errorCodes');

module.exports.getUser = (req, res, next) => {
  const { userId } = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (user) {
        return res.send({
          data: user,
        });
      }
      // return res.status(ERROR_CODE_404).send({
      //   message: 'Пользователь по указанному _id не найден',
      // });
      throw new NotFoundError('Пользователь по указанному _id не найден');
    })
    // .catch((err) => {
    //   if (err.name === 'CastError') {
    //     return res.status(ERROR_CODE_400).send({
    //       message: 'Передан некорректный id пользователя',
    //     });
    //   }
    //   return res.status(ERROR_CODE_500).send({
    //     message: 'Произошла ошибка сервера',
    //   });
    // });
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res
      .send({
        data: users,
      }))
    // .catch((err) => {
    //   // eslint-disable-next-line no-console
    //   console.log(err);
    //   res.status(ERROR_CODE_500).send({
    //     message: 'Произошла ошибка',
    //   });
    // });
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (user) {
        return res.send({
          data: user,
        });
      }
      // return res.status(ERROR_CODE_404).send({
      //   message: 'Пользователь по указанному _id не найден',
      // });
      throw new NotFoundError('Пользователь по указанному _id не найден');
    })
    // .catch((err) => {
    //   if (err.name === 'CastError') {
    //     return res.status(ERROR_CODE_400).send({
    //       message: 'Передан некорректный id пользователя',
    //     });
    //   }
    //   return res.status(ERROR_CODE_500).send({
    //     message: 'Произошла ошибка сервера',
    //   });
    // });
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt
    .hash(password, 10) // хешируем пароль
    .then((hash) => {
      if (!validator.isEmail('foo@bar.com')) {
        // return res.status(ERROR_CODE_400).send({
        //   message: 'Передан некорректный e-mail',
        // });
        throw new IncorrectDataError('Передан некорректный e-mail');
      }
      return User.create({
        name,
        about,
        avatar,
        email,
        password: hash, // вместо пароля передаем его хеш
      });
    })
    .then((user) => res
      .send({
        data: user,
      }))
    // .catch((err) => {
    //   if (err.name === 'ValidationError') {
    //     return res.status(ERROR_CODE_400).send({
    //       message: 'Переданы некорректные данные при создании пользователя',
    //     });
    //   }
    //   return res.status(ERROR_CODE_500).send({
    //     message: 'Произошла ошибка',
    //   });
    // });
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id, // первый параметр - id пользователя
    {
      name,
      about,
    }, // что обновляем
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => {
      if (user) {
        return res.send({
          data: user,
        });
      }
      // return res.status(ERROR_CODE_404).send({
      //   message: 'Пользователь по указанному _id не найден',
      // });
      throw new NotFoundError('Пользователь по указанному _id не найден');
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        // return res.status(ERROR_CODE_400).send({
        //   message: 'Переданы некорректные данные при обновлении профиля',
        // });
        throw new IncorrectDataError('Переданы некорректные данные при обновлении профиля');
      }
      if (err.name === 'CastError') {
        // return res.status(ERROR_CODE_400).send({
        //   message: 'Передан некорректный id пользователя',
        // });
        throw new IncorrectDataError('Передан некорректный id пользователя');
      }
      // return res.status(ERROR_CODE_500).send({
      //   message: 'Произошла ошибка',
      // });
      next(err);
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id, // первый параметр - id пользователя
    {
      avatar,
    }, // что обновляем
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => {
      if (user) {
        return res.send({
          data: user,
        });
      }
      // return res.status(ERROR_CODE_404).send({
      //   message: 'Пользователь по указанному _id не найден',
      // });
      throw new NotFoundError('Пользователь по указанному _id не найден');
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        // return res.status(ERROR_CODE_400).send({
        //   message: 'Переданы некорректные данные при обновлении аватара',
        // });
        throw new IncorrectDataError('Переданы некорректные данные при обновлении аватара');
      }
      if (err.name === 'CastError') {
        // return res.status(ERROR_CODE_400).send({
        //   message: 'Передан некорректный id пользователя',
        // });
        throw new IncorrectDataError('Передан некорректный id пользователя');
      }
      // return res.status(ERROR_CODE_500).send({
      //   message: 'Произошла ошибка',
      // });
      next(err);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        // пользователь с такой почтой не найден
        // return res.status(ERROR_CODE_401).send({
        //   message: 'Неправильные почта или пароль',
        // });
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            // хеши паролей не совпали — отправляем ошибку
            // return res.status(ERROR_CODE_401).send({
            //   message: 'Неправильные почта или пароль',
            // });
            throw new UnauthorizedError('Неправильные почта или пароль');
          }

          // аутентификация успешна
          const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
          // return res.send({ jwt: token });
          return res
            // отправляем jwt в cookie для защиты от XSS-атаки.
            .cookie(jwt, token, { maxAge: 3600000 * 24 * 7, httpOnly: true })
            .end();
        });
    })
    // .catch(() => res.status(ERROR_CODE_500).send({
    //   message: 'Произошла ошибка',
    // }));
    .catch(next);
};
