const { decodeToken } = require('../helpers');
const { Teacher, User, Student } = require('../models');

async function teacherAuth(req, res, next) {
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
async function userAuth(req, res, next) {
  try {
    let { access_token } = req.headers;
    if (!access_token) throw { name: `unAuthentication` };

    let payload = decodeToken(access_token);
    let user = await User.findOne({ where: { NIM: payload } });
    let student = await Student.findOne({ where: { NIM: payload } });
    if (!user) throw { name: `unAuthentication` };
    req.user = {
      id: user.id,
      NIM: user.NIM,
      ClassId: student.ClassId
    };
    next();
  } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    next(error);
  }
}

module.exports = { teacherAuth, userAuth };
