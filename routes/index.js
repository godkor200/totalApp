const usersRouter = require('./users');
const inquiryRouter = require('./inquiry');
const modifyRouter = require('./modify');
const userPageRouter = require('./userPage');

const router = (app) => {
  app.use('/auth', usersRouter);
  app.use('/inquiry', inquiryRouter);
  app.use('/modify', modifyRouter);
  app.use('/users', userPageRouter);
};

module.exports = router;
