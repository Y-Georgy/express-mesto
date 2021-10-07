const express = require("express");
const { PORT = 3000 } = process.env;
const app = express();
const router = require("./routes"); // импортируем роутер
const path = require("path"); // модуль для использования универсальных путей

// для подключения к БД
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mestodb");

// Массив разешённых доменов
const allowedCors = [
  "https://praktikum.tk",
  "http://praktikum.tk",
  "localhost:3000",
];

// для безопасности
app.use(function (req, res, next) {
  const { origin } = req.headers; // Записываем в переменную origin соответствующий заголовок

  if (allowedCors.includes(origin)) {
    // Проверяем, что значение origin есть среди разрешённых доменов
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");

  next();
});

app.use(express.static(path.join(__dirname, "public"))); // теперь клиент имеет доступ только к публичным файлам

// временный костыль по ТЗ
app.use((req, res, next) => {
  req.user = {
    _id: "615c7d2fd1e07a1d59a48cb9111",
  };
  next();
});

app.use(express.json());

app.use(router); // запускаем роутер

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
