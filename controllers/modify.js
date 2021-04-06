const models = require('../models');
const bcrypt = require('bcryptjs');
const { validate } = require('./utility');

const modify = async (req, res, next) => {
  const { u_nm, u_input_original_pwd, u_after_pwd } = req.body;
  const token = req.headers['authorization'];
  //프론트에서 바꿀 비밀번호는 대조 비교해서 올라와야 한다.
  let decodeToken = await validate(token);
  const { user_id } = decodeToken;
  let userStatus = await models.tbl_user.findOne({ where: { u_id: user_id } });
  const { u_id, u_pwd } = userStatus.dataValues;
  let checkPassword = await bcrypt.compare(u_input_original_pwd, u_pwd);
  let hashedPassword = await bcrypt.hash(u_after_pwd, 12);
  let u_nmlen = u_nm.length;
  let u_after_pwdlen = u_after_pwd.length;

  try {
    if (checkPassword) {
      u_nmlen === 0
        ? await models.tbl_user.update(
            { u_pwd: hashedPassword, mod_dt: new Date().toISOString() },
            { where: { u_id: u_id } }
          )
        : u_after_pwdlen === 0
        ? await models.tbl_user.update(
            { u_nm: u_nm, mod_dt: new Date().toISOString() },
            { where: { u_id: u_id } }
          )
        : await models.tbl_user.update(
            {
              u_pwd: hashedPassword,
              u_nm: u_nm,
              mod_dt: new Date().toISOString(),
            },
            { where: { u_id: u_id } }
          );
      res.status(201).json({ success: true, msg: 'updated' });
    } else {
      res.status(403).json({ success: false, msg: 'Forbidden' });
    }
  } catch (err) {
    next(err);
    console.error(err);
  }
};

module.exports = modify;
