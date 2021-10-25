const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const router = require('./routes');
const auth = require('./middlewares/auth');
const errors = require('./middlewares/errors');

const { createUser, login } = require('./controllers/users');

const { PORT = 3000 } = process.env;
const app = express();

// для подключения к БД
mongoose.connect('mongodb://localhost:27017/mestodb');

// Массив разешённых доменов
const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'localhost:3000',
];

// для безопасности
app.use((req, res, next) => {
  const { origin } = req.headers; // Записываем в переменную origin соответствующий заголовок

  if (allowedCors.includes(origin)) {
    // Проверяем, что значение origin есть среди разрешённых доменов
    res.header('Access-Control-Allow-Origin', origin);
  }

  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');

  next();
});

app.use(cookieParser());
app.use(express.json());

app.post('/signup', createUser);
app.post('/signin', login);

// авторизация
app.use(auth);

app.use(router); // запускаем роутер
app.use(errors); // централизованная обработка ошибок

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
