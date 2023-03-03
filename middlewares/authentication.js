const { decodeToken } = require('../helpers');
const { Teacher } = require('../models');

async function authentication(req, res, next) {
  try {
    let { access_token } = req.headers;
    if (!access_token) throw { name: `unAuthentication` };

    let payload = decodeToken(access_token);
    let teacher = await Teacher.findOne({ where: { NIP: payload } });
    if (!teacher) throw { name: `unAuthentication` };
    req.user = {
      idTeacher: teacher.id,
    };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { authentication };
