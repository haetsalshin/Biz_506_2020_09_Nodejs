var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// 쌤) nodejs 서버 생성자
var app = express();

// view engine setup
// 서버에게 너가 이러이러한 일들을 해라 라고 하는 것
// views라는 속성값을 뒤에 있는 값들로 설정하겠다.
// __dirname : 왼쪽 views폴더에 앞으로 화면단에 해당되는 파일을 읽어오면
//      dirname이라는 폴더에서 가져와라 하는 것

// 쌤) __dirname : nodejs의 현재 시스템 폴더
//    임의로 설정하지 않아도 이미 만들어져서 제공되는 변수(시스템변수)
//    __main__
// c:/workspace/nodejs/Hello_Node 가 __에 들어간다
//  path.join : __dirname에 저장된 폴더 문자열과 views라는 문자열을 연결하여
// 하나의 path(폴더)로 지정하라
// /WEB-INF/...
// c:/workspace/nodejs/Hello_Node/views
app.set('views', path.join(__dirname, 'views'));
// view파일 참조 views/*.pug라는 파일을 찾아서 render하라 라는 의미
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 쌤) resources 폴더 처럼 
// Controller를 거치지 않고 직접 핸들링 할 파일들을 저장하는 곳
app.use(express.static(path.join(__dirname, 'public')));

// 쌤) localhost:300/* 이라고 사용자가 요청을 하면
// indexRouter에게 제어권을 넘겨라
app.use('/', indexRouter);
// 쌤) localhost:3000/users/* 라고 요청을 하면
// userRouter에게 제어권을 넘겨라
app.use('/users', usersRouter);

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

module.exports = app;
