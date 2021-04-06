const DataTypes = require('sequelize').DataTypes;
const _tbl_user = require('./tbl_user');
const _tbl_user1 = require('./tbl_user1');

function initModels(sequelize) {
  var tbl_user = _tbl_user(sequelize, DataTypes);
  var tbl_user1 = _tbl_user1(sequelize, DataTypes);

  return {
    tbl_user,
    tbl_user1,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
