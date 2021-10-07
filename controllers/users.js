const User = require("../models/user"); // импортируем модель

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  const owner = req.user._id;

  User.findByIdAndUpdate(
    req.user._id, // первый параметр - id пользователя
    { name, about }, // что обновляем
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      upsert: true, // если пользователь не найден, он будет создан
    }
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const owner = req.user._id;

  User.findByIdAndUpdate(
    req.user._id, // первый параметр - id пользователя
    { avatar }, // что обновляем
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      upsert: true, // если пользователь не найден, он будет создан
    }
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};
