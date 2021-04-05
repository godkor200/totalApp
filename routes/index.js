const usersRouter = require('./users');
const inquiryRouter = require('./inquiry');
const modifyRouter = require('./modify');

const router = (app) => {
  app.use('/auth', usersRouter);
  app.use('/inquiry', inquiryRouter);
  app.use('/modify', modifyRouter);
};

module.exports = router;
