const { compareHash, createToken } = require('../helpers');
const { User, Student, Attendance, Score, Lesson, Class, Teacher } = require('../models');

class UserController {
  static async login(req, res, next) {
    try {
      const { NIM, password } = req.body;
      if (!NIM || !password) throw { name: `loginError` };

      const data = await User.findOne({
        where: { NIM },
      });
      if (!data) {
        throw { name: 'loginError' };
      } else {
        const isValid = compareHash(password, data.password);
        if (!isValid) {
          console.log(data, '<><><><><><><><><><><><><><><><><><><><><><><><><><>');
          throw { name: 'loginError' };
        } else {
          const access_token = createToken(data.NIM);
          res.status(200).json({ access_token, id: data.id });
        }
      }
    } catch (error) {
      next(error);
    }
  }

  static async userChild(req, res, next) {
    try {
      const userChild = await Student.findOne({
        where: { NIM: req.user.NIM },
        include: [
          {
            model: Class,
            include: {
              model: Teacher,
              attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
            },
          },
          {
            model: Attendance,
          },
          {
            model: Score,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: {
              model: Lesson,
              attributes: { exclude: ['createdAt', 'updatedAt'] },
            },
          },
        ],
      });
      res.status(200).json(userChild);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
