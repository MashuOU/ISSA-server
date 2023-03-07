const { Student, Attendance, Score, Lesson, Class, Teacher, Assignment, History } = require('../models');
const { Sequelize, Op } = require("sequelize");

class StudentController {
  static async allStudents(req, res, next) {
    const {  pageIndex, ClassId } = req.query;
    const paramQuerySQL = {
      include: [
        {
          model: Class,
          include: {
            model: Teacher,
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
          },
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
    };
    let limit;
    let offset;
    let pageSize = 7;

    // filtering by category
    if (ClassId !== '' && typeof ClassId !== 'undefined') {
      paramQuerySQL.where = {
        ClassId
      };
    }

    // pagination
    if (pageSize !== '' && typeof pageSize !== 'undefined') {
      if (pageSize !== '' && typeof pageSize !== 'undefined') {
        limit = pageSize;
        paramQuerySQL.limit = limit;
      }

      if (pageIndex !== '' && typeof pageIndex !== 'undefined') {
        offset = pageIndex * limit - limit;
        paramQuerySQL.offset = offset;
      }
    } else {
      limit = 5 // limit 5 item
      offset = 1;
      paramQuerySQL.limit = limit;
      paramQuerySQL.offset = offset;
    }

    try {

      const data = await Student.findAndCountAll(paramQuerySQL)
      if (pageSize || pageIndex) {
        data.page = pageIndex
        data.totalPages = Math.ceil(data.count / pageSize)
      }
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
      if (!data) {
        throw { name: 'notFound' };
      }
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
      const history = await History.create({ description: `student with name ${data.name} has been deleted`, createdBy: teacherClass.Teacher.name })
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

      res.status(200).json({ status: `updated`, history });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = StudentController;
