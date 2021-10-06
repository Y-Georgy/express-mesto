const express = require("express");
const { PORT = 3000 } = process.env;
const app = express();
const router = require("./routes"); // импортируем роутер

// для подключения к БД
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mestodb");

// временный костыль по ТЗ
app.use((req, res, next) => {
  req.user = {
    _id: "615c7d2fd1e07a1d59a48cb9",
  };
  next();
});

app.use(express.json());

app.use(router); // запускаем роутер

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
