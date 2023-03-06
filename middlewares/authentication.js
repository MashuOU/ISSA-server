const { decodeToken } = require('../helpers');
const { Teacher, User, Student, Class } = require('../models');

async function teacherAuth(req, res, next) {
  try {
    let { access_token } = req.headers;
    if (!access_token) throw { name: `unAuthentication` };

    let payload = decodeToken(access_token);
    let teacher = await Teacher.findOne({ where: { NIP: payload } });
    if (!teacher) throw { name: `unAuthentication` };

    // classId = await Classes.findOne({where:{TeacherId : teacher.id}})
    req.user = {
      idTeacher: teacher.id,
      //classId : 
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
    if (!user) throw { name: `unAuthentication` };

    let className = await Student.findOne({ where: { NIM: user.NIM }, include: { model: Class } })

    req.user = {
      NIM: user.NIM,
      id: user.id,
      className: className.Class.name,
      classId: className.Class.id,
      teacherId: className.Class.TeacherId,
    };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { teacherAuth, userAuth };
