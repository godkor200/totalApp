const jwt = require('jsonwebtoken');

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
  let result = await jwt.verify(token, process.env.SECRET_KEY);
  return result ? result : undefined;
};

module.exports = { validate, createToken };
