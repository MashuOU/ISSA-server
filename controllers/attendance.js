const { Attendance, Student, Class, History, Teacher } = require('../models');

class AttendanceController {
  static async addAttendance(req, res, next) {
    try {
      const teacherClass = await Class.findOne({ where: { TeacherId: req.user.idTeacher }, include: Teacher });

      const { StudentId, status } = req.body;
      const check = await Student.findByPk(StudentId)
      if (!check) throw { name: `notFound` }

      const attendance = await Attendance.findAll({ where: { id: StudentId } })

      if (attendance[0].updatedAt.getDay() == new Date().getDay()) throw { name: `absentError` }
      const data = await Attendance.create({ StudentId, status });

      const history = await History.create({ description: `attendance ${check.name} has been created`, createdBy: teacherClass.Teacher.name })

      res.status(201).json({ data, history });
    } catch (error) {
      next(error);
    }
  }

  static async editAttendance(req, res, next) {
    try {
      const teacherClass = await Class.findOne({ where: { TeacherId: req.user.idTeacher }, include: Teacher });

      const { StudentId, status } = req.body;
      const check = await Student.findByPk(StudentId)
      if (!check) throw { name: `notFound` }

      const attendance = await Attendance.findAll({ where: { id: StudentId } })

      if (attendance[0].createdAt.getDay() == new Date().getDay()) throw { name: `absentError` }
      const data = await Attendance.create({ StudentId, status });

      const history = await History.create({ description: `attendance ${check.name} has been edited`, createdBy: teacherClass.Teacher.name })
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = AttendanceController;
