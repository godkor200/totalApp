const models = require('../models');
const validate = require('./utility');

const modify = async (req, res, next) => {
  const { u_nm, u_pwd, u_after_pwd, u_confirm_pwd } = req.body;
  let decodeToken = await validate(token);
};

module.exports = modify;
