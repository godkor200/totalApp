const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'tbl_user1',
    {
      u_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        comment: 'pk',
      },
      u_email: {
        type: DataTypes.STRING(320),
        allowNull: false,
        comment: '유저 이메일',
        unique: 'u_email',
      },
      u_nm: {
        type: DataTypes.STRING(20),
        allowNull: false,
        comment: '유저 이름',
      },
      u_pwd: {
        type: DataTypes.STRING(200),
        allowNull: false,
        comment: '유저 비밀번호',
      },
      u_mobile_no: {
        type: DataTypes.STRING(15),
        allowNull: true,
        comment: '연락처',
      },
      reg_dt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      mod_dt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      last_login_dt: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: '최근 로그인 일시',
      },
    },
    {
      sequelize,
      tableName: 'tbl_user1',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'u_id' }],
        },
        {
          name: 'u_email',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'u_email' }],
        },
      ],
    }
  );
};
