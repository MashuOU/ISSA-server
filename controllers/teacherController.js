const { compareHash, createToken } = require('../helpers');
const { Teacher, Class } = require('../models');

class TeacherController {
  static async login(req, res, next) {
    try {
      const { NIP, password } = req.body;
      if (!NIP || !password) throw { name: `loginError` }

      const data = await Teacher.findOne({ where: { NIP } });
      if (!data) {
        throw { name: 'loginError' };
      } else {
        const isValid = compareHash(password, data.password);
        if (!isValid) {
          throw { name: 'loginError' };
        } else {
          const access_token = createToken(data.NIP);
          res.status(200).json({ access_token, ClassId: data.id });
        }
      }
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const teacherClass = await Class.findOne({ where: { TeacherId: req.user.idTeacher }, include: Teacher });

      const { NIP, password, name } = req.body;
      const data = await Teacher.create({ NIP, password, name });
      res.status(201).json({ msg: `succesfuly registered` })

    } catch (error) {
      next(error);
    }
  }

  static async allTeacher(req, res, next) {
    const data = await Teacher.findAll();
    res.status(200).json(data);
  }

}

module.exports = TeacherController;
