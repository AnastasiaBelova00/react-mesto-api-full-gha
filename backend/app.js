const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const { errors } = require('celebrate');

const route = require('./routes/route');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const centralError = require('./middlewares/centralError');
const cors = require('./middlewares/cors');

const { PORT = 4000 } = process.env;

const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

// использование cors
app.use(cors);

// хелмет от уязвимостей
app.use(helmet());

// логгер запросов
app.use(requestLogger);

// подключение роутов
app.use(route);

// логгер ошибок
app.use(errorLogger);

// обработчики ошибок celebrate и миддлвара
app.use(errors());
app.use(centralError);

// слушаем порт
app.listen(PORT, () => {
  console.log(`Приложение запущено, порт ${PORT}`);
});
