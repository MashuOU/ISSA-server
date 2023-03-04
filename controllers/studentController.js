const { Student, Attendance, Score, Lesson, Class, Teacher } = require('../models');

class StudentController {
  static async allStudents(req, res, next) {
    try {
      const teacherClass = await Class.findOne({ where: { TeacherId: req.user.idTeacher } });
      const data = await Student.findAll({
        where: { ClassId: teacherClass.id },
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
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async studentById(req, res, next) {
    try {
      const id = req.params.id;
      const data = await Student.findByPk(id, {
        include: [
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
      if (!data) {
        throw { name: 'notFound' };
      }
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async addStudent(req, res, next) {
    const teacherClass = await Class.findOne({ where: { TeacherId: req.user.idTeacher } });
    try {
      const { NIM, name, age, gender, birthDate, feedback, imgUrl } = req.body;
      const data = await Student.create({ NIM, name, age, gender, birthDate, feedback, ClassId: teacherClass.id, imgUrl });
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async deleteStudent(req, res, next) {
    try {
      const id = req.params.id;
      const student = await Student.findByPk(id);
      if (!student) {
        throw { name: 'notFound' };
      }
      const data = await Student.destroy({ where: { id } });
      res.status(200).json({ message: `Student with NIM ${student.NIM} success delete from list` });
    } catch (error) {
      next(error);
    }
  }
  static async editStudent(req, res, next) {
    const teacherClass = await Class.findOne({ where: { TeacherId: req.user.idTeacher } });
    try {
      const { NIM, name, age, gender, birthDate, feedback, imgUrl } = req.body;
      const id = req.params.id;
      const data = await Student.update(
        {
          NIM,
          name,
          age,
          gender,
          birthDate,
          feedback,
          ClassId: teacherClass.id,
          imgUrl,
        },
        { where: { id } }
      );
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = StudentController;
