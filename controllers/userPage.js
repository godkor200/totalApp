const models = require('../models');
const { validate, userfilter } = require('./utility');

const userPage = async (req, res, next) => {
  const token = req.headers['authorization'];
  let decodeToken = await validate(token);
  const { email } = decodeToken;

  try {
    //관리자 권한
    if (email === process.env.ADMIN_NAME) {
      //필터링 : 이메일, 사용자이름, 가입일자, 휴대폰번호
      let result = await userfilter(req);
      result
        ? res.status(200).json({
            success: true,
            usersData: [result],
          })
        : res.status(404).json({ success: false, msg: 'Not found' });
    } else {
      res.status(403).json({ success: false, msg: 'Forbidden' });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = userPage;
