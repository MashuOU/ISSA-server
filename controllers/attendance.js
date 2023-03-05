const { Attendance, Student } = require('../models');

class AttendanceController {
  static async addAttendance(req, res, next) {
    try {
      const { StudentId, status } = req.body;

      const check = await Student.findByPk(StudentId)
      if (!check) throw { name: `notFound` }

      const attendance = await Attendance.findAll({ where: { StudentId }, order: [['date', 'DESC']] })
      if (attendance[0].createdAt.getDate() == new Date().getDate()) throw { name: `absentError` }

      const data = await Attendance.create({ StudentId, status });
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  // static async editAttendance(req, res, next) {
  //   try {
  //     const { StudentId, status, date } = req.body;
  //     console.log(StudentId, status, date);
  //     const check = await Student.findByPk(StudentId)
  //     if (!check) throw { name: `notFound` }
  //     const attendance = await Attendance.findAll({ where: { StudentId, createdAt: date } })
  //     console.log(attendance);
  //     // res.status(201).json(data);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}
module.exports = AttendanceController;
