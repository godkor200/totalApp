const jwt = require('jsonwebtoken');
const models = require('../models');

const createToken = (user) => {
  const { u_id, u_email } = user.dataValues;
  const token = jwt.sign(
    { user_id: u_id, email: u_email },
    process.env.SECRET_KEY,
    {
      algorithm: 'HS256',
      expiresIn: process.env.ACCESS_TOKEN_LIFE,
    }
  );
  return token;
};

const validate = async (token) => {
  if (!token) {
    return {
      success: false,
      message: 'Not verified',
    };
  }
  // 토큰을 디코딩
  let result = await jwt.verify(token.slice(7), process.env.SECRET_KEY);
  return result ? result : undefined;
};

const userfilter = async (req) => {
  // pagination
  const { page, u_email, u_nm, reg_dt, u_mobile_no } = req.query;
  let pageNum = page; // 요청 페이지 넘버
  let offset = 0;
  if (pageNum > 1) {
    offset = 7 * (pageNum - 1);
  }

  return u_email && !u_nm && !reg_dt && !u_mobile_no
    ? await models.tbl_user.findAll({
        where: { u_email: u_email },
        offset: offset,
        limit: 7,
      })
    : !u_email && u_nm && !reg_dt && !u_mobile_no
    ? await models.tbl_user.findAll({
        where: { u_nm: u_nm },
        offset: offset,
        limit: 7,
      })
    : !u_email && !u_nm && reg_dt && !u_mobile_no
    ? await models.tbl_user.findAll({
        where: { reg_dt: reg_dt },
        offset: offset,
        limit: 7,
      })
    : !u_email && !u_nm && !reg_dt && u_mobile_no
    ? await models.tbl_user.findAll({
        where: { u_mobile_no: u_mobile_no },
        offset: offset,
        limit: 7,
      })
    : u_email && u_nm && !reg_dt && !u_mobile_no
    ? await models.tbl_user.findAll({
        where: { u_email: u_email, u_nm: u_nm },
        offset: offset,
        limit: 7,
      })
    : u_email && u_nm && reg_dt && !u_mobile_no
    ? await models.tbl_user.findAll({
        where: { u_email: u_email, u_nm: u_nm, reg_dt: reg_dt },
        offset: offset,
        limit: 7,
      })
    : u_email && u_nm && reg_dt && u_mobile_no
    ? await models.tbl_user.findAll({
        where: {
          u_email: u_email,
          u_nm: u_nm,
          reg_dt: reg_dt,
          u_mobile_no: u_mobile_no,
        },
        offset: offset,
        limit: 7,
      })
    : !u_email && u_nm && reg_dt && u_mobile_no
    ? await models.tbl_user.findAll({
        where: { u_nm: u_nm, reg_dt: reg_dt, u_mobile_no: u_mobile_no },
        offset: offset,
        limit: 7,
      })
    : u_email && !u_nm && reg_dt && u_mobile_no
    ? await models.tbl_user.findAll({
        where: { u_email: u_email, reg_dt: reg_dt, u_mobile_no: u_mobile_no },
        offset: offset,
        limit: 7,
      })
    : u_email && u_nm && !reg_dt && u_mobile_no
    ? await models.tbl_user.findAll({
        where: { u_email: u_email, u_nm: u_nm, u_mobile_no: u_mobile_no },
        offset: offset,
        limit: 7,
      })
    : !u_email && !u_nm && reg_dt && u_mobile_no
    ? await models.tbl_user.findAll({
        where: { reg_dt: reg_dt, u_mobile_no: u_mobile_no },
        offset: offset,
        limit: 7,
      })
    : !u_email && u_nm && !reg_dt && u_mobile_no
    ? await models.tbl_user.findAll({
        where: { u_nm: u_nm, u_mobile_no: u_mobile_no },
        offset: offset,
        limit: 7,
      })
    : u_email && !u_nm && reg_dt && !u_mobile_no
    ? await models.tbl_user.findAll({
        where: { u_email: u_email, reg_dt: reg_dt },
        offset: offset,
        limit: 7,
      })
    : !u_email && u_nm && reg_dt && !u_mobile_no
    ? await models.tbl_user.findAll({
        where: { u_nm: u_nm, reg_dt: reg_dt },
        offset: offset,
        limit: 7,
      })
    : u_email && !u_nm && !reg_dt && u_mobile_no
    ? await models.tbl_user.findAll({
        where: {
          u_email: u_email,
          u_mobile_no: u_mobile_no,
        },
        offset: offset,
        limit: 7,
      })
    : await models.tbl_user.findAll({
        offset: offset,
        limit: 7,
      });
  //필터링 : 이메일, 사용자이름, 가입일자, 휴대폰번호
};

module.exports = { validate, createToken, userfilter };
