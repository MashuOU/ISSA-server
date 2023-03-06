const { Student, Attendance, Score, Lesson, Class, Teacher, History } = require('../models');

class StudentController {
  static async allStudents(req, res, next) {
    const { ClassId } = req.query
    try {
      const teacherClass = await Class.findOne({ where: { TeacherId: req.user.idTeacher } });
      let filter = { ClassId }
      const data = await Student.findAll({
        where: filter,
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
            include: [
              { model: Assignment, attributes: { exclude: ['createdAt', 'updatedAt'] } },
              {
                model: Lesson,
                attributes: { exclude: ['createdAt', 'updatedAt'] },
              },
            ],
          },
        ],
      });
      // const scoreExam = data.Scores.filter((x) => x.Assignment.type == 'Exam').map((y) => {
      //   return y.value * 0.45;
      // });
      // console.log(scoreExam);
      const scoreTask = data.Scores.filter((x) => x.Assignment.type == 'Task').map((y) => {
        return y.value * 0.45;
      });
      console.log(scoreTask);
      // const scoreExam = data.Scores.filter((x) => x.assignmentType == 'Exam').map((y) => {
      //   return y.value * 0.45;
      // });
      // console.log(scoreExam);

      if (!data) {
        throw { name: 'notFound' };
      }
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async addStudent(req, res, next) {
    try {
      const teacherClass = await Class.findOne({ where: { TeacherId: req.user.idTeacher }, include: Teacher });
      const { NIM, name, age, gender, birthDate, feedback, imgUrl } = req.body;
      const data = await Student.create({ NIM, name, age, gender, birthDate, feedback, ClassId: teacherClass.id, imgUrl });
      const history = await History.create({ description: `student with name ${data.name} has been created`, createdBy: teacherClass.Teacher.name })
      res.status(201).json({ data, history });
    } catch (error) {
      next(error);
    }
  }
  static async deleteStudent(req, res, next) {
    try {
      const teacherClass = await Class.findOne({ where: { TeacherId: req.user.idTeacher }, include: Teacher });

      const id = req.params.id;
      const student = await Student.findByPk(id);
      if (!student) throw { name: 'notFound' };

      const data = await Student.destroy({ where: { id } });
      const history = await History.create({ description: `student with name ${student.name} has been deleted`, createdBy: teacherClass.Teacher.name })
      res.status(200).json({ message: `Student with NIM ${student.NIM} success delete from list`, history });
    } catch (error) {
      next(error);
    }
  }
  static async editStudent(req, res, next) {
    try {
      const teacherClass = await Class.findOne({ where: { TeacherId: req.user.idTeacher }, include: Teacher });
      const { NIM, name, age, gender, birthDate, feedback, imgUrl } = req.body;
      const id = req.params.id;

      const check = await Student.findByPk(id);
      if (!check) throw { name: `notFound` };
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
      const history = await History.create({ description: `student with name ${check.name} has been edited`, createdBy: teacherClass.Teacher.name })

      res.status(201).json({ status: `updated`, history });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = StudentController;
