const { hashSync, compareSync, genSaltSync } = require('bcryptjs');
const { sign, verify } = require('jsonwebtoken');
// let secret = process.env.JWT_SECRET;
// console.log(secret, '<<<<');

module.exports = {
  hashPassword: (password) => hashSync(password, genSaltSync(10)),
  compareHash: (pw, pw_db) => compareSync(pw, pw_db),

  createToken: (payload) => sign(payload, 'issahehe'),
  decodeToken: (payload) => verify(payload, 'issahehe'),
};
