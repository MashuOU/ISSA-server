const { compareHash, createToken } = require('../helpers');
const { Teacher } = require('../models');

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
          res.status(200).json({ access_token, id: data.id });
        }
      }
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { NIP, password, name } = req.body;
      console.log(NIP);
      const data = await Teacher.create({ NIP, password, name });
      res.status(201).json({ msg: `succesfuly registered` })

    } catch (error) {
      next(error);
    }
  }

  static async allTeacher(req, res, next) {
    try {
      const data = await Teacher.findAll();

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

}

module.exports = TeacherController;
