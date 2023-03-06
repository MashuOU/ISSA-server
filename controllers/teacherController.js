const { compareHash, createToken } = require('../helpers');
const { Teacher, History, Class } = require('../models');

class TeacherController {
  static async login(req, res, next) {
    try {
      const { NIP, password } = req.body;
      if (!NIP || !password) throw { name: `loginError` }

      const data = await Teacher.findOne({ where: { NIP } });
      const ClassId = await Teacher.findOne({ where: { TeacherId: data.id } })
      console.log();

      if (!data) {
        throw { name: 'loginError' };
      } else {
        const isValid = compareHash(password, data.password);
        if (!isValid) {
          throw { name: 'loginError' };
        } else {
          const access_token = createToken(data.NIP);
          res.status(200).json({ access_token, ClassId: ClassId.id });
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
      console.log(NIP);
      const data = await Teacher.create({ NIP, password, name });

      const history = await History.create({ description: `Teacher with name ${data.name} has been created`, createdBy: teacherClass.Teacher.name })

      res.status(201).json({ msg: `succesfuly registered`, history })

    } catch (error) {
      next(error);
    }
  }

  static async deleteTeacher(req, res, next) {
    try {
      const teacherClass = await Class.findOne({ where: { TeacherId: req.user.idTeacher }, include: Teacher });

      const id = req.params.id
      const check = await Teacher.findByPk(id)
      if (!check) throw { name: `notFound` }
      const data = await Teacher.destroy({ where: { id } })

      const history = await History.create({ description: `Teacher with name ${check.name} has been deleted`, createdBy: teacherClass.Teacher.name })

      res.status(200).json({ message: "Success delete", history })
    } catch (error) {
      next(error)
    }
  }
  static async editTeacher(req, res, next) {
    try {
      const teacherClass = await Class.findOne({ where: { TeacherId: req.user.idTeacher }, include: Teacher });

      const { NIP, name, password, imgUrl } = req.body
      const id = req.params.id
      const check = await Teacher.findByPk(id)
      if (!check) throw { name: `notFound` }

      const data = await Teacher.update({ NIP, name, password, imgUrl }, { where: { id } })

      const history = await History.create({ description: `Teacher with name ${check.name} has been edited`, createdBy: teacherClass.Teacher.name })

      res.status(201).json({ data, history })
    } catch (error) {
      next(error)
    }
  }



}

module.exports = TeacherController;
