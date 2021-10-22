const bcrypt = require('bcryptjs'); // установленный модуль для хеширования пароля
const validator = require('validator');
const User = require('../models/user'); // импортируем модель

const {
  ERROR_CODE_400,
  ERROR_CODE_404,
  ERROR_CODE_500,
} = require('./errorCodes');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res
      .send({
        data: users,
      }))
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      res.status(ERROR_CODE_500).send({
        message: 'Произошла ошибка',
      });
    });
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (user) {
        return res.send({
          data: user,
        });
      }
      return res.status(ERROR_CODE_404).send({
        message: 'Пользователь по указанному _id не найден',
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE_400).send({
          message: 'Передан некорректный id пользователя',
        });
      }
      return res.status(ERROR_CODE_500).send({
        message: 'Произошла ошибка сервера',
      });
    });
};

module.exports.createUser = (req, res) => {
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
        return res.status(ERROR_CODE_400).send({
          message: 'Передан некорректный e-mail',
        });
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
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE_400).send({
          message: 'Переданы некорректные данные при создании пользователя',
        });
      }
      return res.status(ERROR_CODE_500).send({
        message: 'Произошла ошибка',
      });
    });
};

module.exports.updateProfile = (req, res) => {
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
      return res.status(ERROR_CODE_404).send({
        message: 'Пользователь по указанному _id не найден',
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE_400).send({
          message: 'Переданы некорректные данные при обновлении профиля',
        });
      }
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE_400).send({
          message: 'Передан некорректный id пользователя',
        });
      }
      return res.status(ERROR_CODE_500).send({
        message: 'Произошла ошибка',
      });
    });
};

module.exports.updateAvatar = (req, res) => {
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
      return res.status(ERROR_CODE_404).send({
        message: 'Пользователь по указанному _id не найден',
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE_400).send({
          message: 'Переданы некорректные данные при обновлении аватара',
        });
      }
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE_400).send({
          message: 'Передан некорректный id пользователя',
        });
      }
      return res.status(ERROR_CODE_500).send({
        message: 'Произошла ошибка',
      });
    });
};
