const models = require('../models');
const { validate } = require('./utility');

const inquiry = async (req, res, next) => {
  const token = req.headers['authorization'];
  let decodeToken = await validate(token);
  const { user_id } = decodeToken;
  let emailStatus = await models.tbl_user.findOne({ where: { u_id: user_id } });
  const {
    u_email,
    u_nm,
    u_mobile_no,
    reg_dt,
    last_login_dt,
  } = emailStatus.dataValues;

  try {
    res.status(200).json({
      success: true,
      userData: [
        {
          u_email: u_email,
          u_nm: u_nm,
          u_mobile_no: u_mobile_no,
          reg_dt: reg_dt,
          last_login_dt: last_login_dt,
        },
      ],
    });
  } catch (err) {
    next(err);
  }
};

module.exports = inquiry;
