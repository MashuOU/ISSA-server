const { Attendance, Student } = require('../models');

class AttendanceController {
  static async addAttendance(req, res, next) {
    try {
      const { StudentId, status } = req.body;
      const check = await Student.findByPk(StudentId)
      if (!check) throw { name: `notFound` }

      const attendance = await Attendance.findAll({ where: { id: StudentId } })

      if (attendance[0].updatedAt.getDay() == new Date().getDay()) throw { name: `absentError` }
      const data = await Attendance.create({ StudentId, status });
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  // static async editAttendance(req, res, next) {
  //   try {
  //     const { StudentId, status } = req.body;
  //     const check = await Student.findByPk(StudentId)
  //     if (!check) throw { name: `notFound` }

  //     const attendance = await Attendance.findAll({ where: { id: StudentId } })

  //     if (attendance[0].createdAt.getDay() == new Date().getDay()) throw { name: `absentError` }
  //     const data = await Attendance.create({ StudentId, status });
  //     res.status(201).json(data);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}
module.exports = AttendanceController;
