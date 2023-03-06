const { Attendance, Student } = require('../models');

class AttendanceController {
  static async addAttendance(req, res, next) {
    try {
      const { StudentId, status } = req.body;
      const check = await Student.findByPk(StudentId);
      if (!check) throw { name: `notFound` };

      const attendance = await Attendance.findAll({ where: { StudentId: StudentId } });

      const temp = attendance.map((el) => {
        return el.createdAt;
      });

      const result = new Date(temp[temp.length - 1]).getDate();
      const now = new Date().getDate();

      // console.log(result, now);

      if (result == now) throw { name: `absentError` };
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
