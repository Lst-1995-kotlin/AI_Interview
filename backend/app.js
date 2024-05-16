var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var geminiRouter =  require('./routes/gemini');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/gemini', geminiRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Gemini API 설정
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI('AIzaSyBIpZ5MzBRZZmKRfIGiGGMB3vpZOHF8HdM');

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "role = user: hello" }],
      },
      {
        role: "model",
        parts: [{ text: "role = model: hello" }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 100,
    },
  });

  const msg = "안녕 반가워";

  const result = await chat.sendMessage(msg);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();

module.exports = app;
