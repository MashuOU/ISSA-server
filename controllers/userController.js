const { compareHash, createToken } = require('../helpers');
const { User, Student, Attendance, Score, Lesson, Class, Teacher } = require('../models');

class UserController {
  static async login(req, res, next) {
    try {
      const { NIM, password } = req.body;
      if (!NIM || !password) throw { name: `loginError` }

      const data = await User.findOne({
        where: { NIM },
      });
      if (!data) {
        throw { name: 'loginError' };
      } else {
        const isValid = compareHash(password, data.password);
        if (!isValid) {
          throw { name: 'loginError' };
        } else {
          const access_token = createToken(data.NIM);
          res.status(200).json({ access_token });
        }
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
