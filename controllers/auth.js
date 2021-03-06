const models = require('../models');
const bcrypt = require('bcryptjs');
const { createToken } = require('./utility');

const signUp = async (req, res, next) => {
  const { u_email, u_nm, u_pwd, u_mobile_no } = req.body;
  let hashedPassword = await bcrypt.hash(u_pwd, 12);
  let userData = {
    u_email,
    u_pwd: hashedPassword,
    u_nm,
    u_mobile_no,
    reg_dt: new Date().toISOString(),
    mod_dt: null,
    last_login_dt: null,
  };

  try {
    await models.tbl_user.create(userData);
    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
};

const signIn = async (req, res, next) => {
  const { u_email, u_pwd } = req.body;
  try {
    let emailStatus = await models.tbl_user.findOne({
      where: { u_email: u_email },
    });
    let checkPassword = await bcrypt.compare(u_pwd, emailStatus.u_pwd);
    let token = createToken(emailStatus);
    if (!u_email || !u_pwd || !emailStatus || !checkPassword) {
      res.status(403).json({ success: true, msg: 'Forbidden' });
    } else {
      await models.tbl_user.update(
        { last_login_dt: new Date().toISOString() },
        { where: { u_email: u_email } }
      );
      res.status(201).json({ success: true, token: token });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { signUp, signIn };
