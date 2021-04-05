const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const logger = require('morgan');
const router = require('./routes');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, './config/.env') });
app
  .use(logger('dev'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

/* GET home page. */
app.get('/', function (req, res, next) {
  res.send('Welcome To Total App');
});

router(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
